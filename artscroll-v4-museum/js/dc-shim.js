/* A small stand-in for the Design canvas runtime, so the artboards open
   straight from this folder. It supports what the artboards use:
   {{ dotted.path }} holes in text and attributes, onX="{{ fn }}" events,
   and <sc-for list="{{ items }}" as="item"> for static repeats. */
(function () {
  function lookup(vals, path) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, vals);
  }
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (patch) {
    var p = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, p);
    if (this.__update) this.__update();
  };
  DCLogic.prototype.forceUpdate = function () { if (this.__update) this.__update(); };
  window.DCLogic = DCLogic;

  function expandFor(root, vals) {
    var loops = Array.prototype.slice.call(root.querySelectorAll('sc-for'));
    loops.forEach(function (el) {
      var m = WHOLE.exec(el.getAttribute('list') || '');
      var list = m ? lookup(vals, m[1]) : [];
      var as = el.getAttribute('as') || 'item';
      var tpl = el.innerHTML;
      var out = (list || []).map(function (item, i) {
        return tpl.replace(HOLE, function (all, p) {
          if (p === '$index') return String(i);
          if (p === as) return String(item);
          if (p.indexOf(as + '.') === 0) { var v = lookup(item, p.slice(as.length + 1)); return v == null ? '' : String(v); }
          return all;
        });
      }).join('');
      var frag = document.createRange().createContextualFragment(out);
      el.parentNode.replaceChild(frag, el);
    });
  }

  function mount(root, Comp) {
    var inst = new Comp({});
    var vals = inst.renderVals();
    expandFor(root, vals);
    var texts = [], attrs = [], events = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    var n;
    while ((n = walker.nextNode())) {
      if (n.nodeType === 3) {
        if (n.nodeValue.indexOf('{{') !== -1) texts.push({ node: n, tpl: n.nodeValue });
        continue;
      }
      Array.prototype.slice.call(n.attributes).forEach(function (a) {
        if (a.name === 'data-on') {
          a.value.split(/\s+/).forEach(function (pair) {
            var bits = pair.split(':');
            events.push({ el: n, type: bits[0], path: bits[1] });
          });
        } else if (a.name.indexOf('data-dc-') === 0) {
          attrs.push({ el: n, name: a.name.slice(8), tpl: a.value });
        }
      });
    }
    function apply() {
      vals = inst.renderVals();
      texts.forEach(function (t) {
        t.node.nodeValue = t.tpl.replace(HOLE, function (all, p) { var v = lookup(vals, p); return v == null ? '' : String(v); });
      });
      attrs.forEach(function (a) {
        var m = WHOLE.exec(a.tpl), v;
        if (m) v = lookup(vals, m[1]);
        else v = a.tpl.replace(HOLE, function (all, p) { var x = lookup(vals, p); return x == null ? '' : String(x); });
        var name = a.name, el = a.el;
        if (name === 'value') { if (String(el.value) !== String(v)) el.value = v; el.setAttribute('value', v); return; }
        if (name.indexOf('aria-') === 0) { el.setAttribute(name, String(v)); return; }
        if (v === true) el.setAttribute(name, '');
        else if (v === false || v == null) el.removeAttribute(name);
        else el.setAttribute(name, String(v));
      });
    }
    events.forEach(function (e) {
      var type = e.type.toLowerCase();
      if (type === 'change' && (e.el.tagName === 'INPUT' || e.el.tagName === 'TEXTAREA')) type = 'input';
      e.el.addEventListener(type, function (ev) {
        var fn = lookup(vals, e.path);
        if (typeof fn === 'function') fn(ev);
      });
    });
    inst.__update = apply;
    apply();
  }
  window.mountDC = mount;
})();
