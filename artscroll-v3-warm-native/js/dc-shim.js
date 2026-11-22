/* Local runner for the canvas artboards (.dc.html subset).
   Lets each board in boards/ open straight from the folder, with no server:
   {{holes}}, <sc-if>, <sc-for>, onClick/onChange handlers and setState re-render. */
(function () {
  'use strict';

  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      var next = typeof patch === 'function' ? patch(this.state, this.props) : patch;
      this.state = Object.assign({}, this.state, next);
      if (this.__render) this.__render();
    }
    forceUpdate() { if (this.__render) this.__render(); }
  }
  window.DCLogic = DCLogic;

  var WHOLE = /^\s*\{\{([^}]+)\}\}\s*$/;
  var ANY = /\{\{([^}]+)\}\}/g;
  var EVENTS = { onclick: 'click', onchange: 'change', oninput: 'input', onkeydown: 'keydown' };

  function lookup(scope, path) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    var parts = path.split('.');
    var value;
    for (var i = scope.length - 1; i >= 0; i--) {
      if (scope[i] && parts[0] in scope[i]) { value = scope[i][parts[0]]; break; }
    }
    for (var k = 1; k < parts.length && value != null; k++) value = value[parts[k]];
    return value;
  }
  function str(v) { return v == null ? '' : String(v); }
  function holeOf(attr) { var m = (attr || '').match(WHOLE); return m ? m[1] : (attr || ''); }

  function bindAttrs(el, scope) {
    Array.prototype.slice.call(el.attributes).forEach(function (a) {
      var name = a.name, val = a.value;
      if (val.indexOf('{{') < 0) return;
      var whole = val.match(WHOLE);
      var lower = name.toLowerCase();
      if (lower.indexOf('on') === 0 && whole) {
        var fn = lookup(scope, whole[1]);
        el.removeAttribute(name);
        var type = EVENTS[lower] || lower.slice(2);
        if (lower === 'onchange' && el.tagName === 'INPUT' && el.type !== 'checkbox' && el.type !== 'radio') type = 'input';
        (el.__h || (el.__h = {}))[type] = fn;
        return;
      }
      if (whole) {
        var v = lookup(scope, whole[1]);
        if (lower.indexOf('aria-') === 0 || lower.indexOf('data-') === 0) {
          if (v == null) el.removeAttribute(name); else el.setAttribute(name, String(v));
        } else if (v === false || v == null) el.removeAttribute(name);
        else el.setAttribute(name, v === true ? '' : String(v));
      } else {
        el.setAttribute(name, val.replace(ANY, function (_, p) { return str(lookup(scope, p)); }));
      }
    });
  }

  function expand(parent, scope) {
    var child = parent.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (child.nodeType === 3) {
        if (child.data.indexOf('{{') >= 0) child.data = child.data.replace(ANY, function (_, p) { return str(lookup(scope, p)); });
      } else if (child.nodeType === 1) {
        var tag = child.tagName.toLowerCase();
        if (tag === 'sc-if') {
          if (lookup(scope, holeOf(child.getAttribute('value')))) {
            var box = parent.ownerDocument.createElement('div');
            while (child.firstChild) box.appendChild(child.firstChild);
            expand(box, scope);
            while (box.firstChild) parent.insertBefore(box.firstChild, child);
          }
          parent.removeChild(child);
        } else if (tag === 'sc-for') {
          var list = lookup(scope, holeOf(child.getAttribute('list'))) || [];
          var as = child.getAttribute('as') || 'item';
          list.forEach(function (item, i) {
            var holder = parent.ownerDocument.createElement('div');
            Array.prototype.forEach.call(child.childNodes, function (c) { holder.appendChild(c.cloneNode(true)); });
            var frame = { $index: i }; frame[as] = item;
            expand(holder, scope.concat([frame]));
            while (holder.firstChild) parent.insertBefore(holder.firstChild, child);
          });
          parent.removeChild(child);
        } else {
          bindAttrs(child, scope);
          expand(child, scope);
        }
      }
      child = next;
    }
  }

  function sameKind(a, b) { return a.nodeType === b.nodeType && (a.nodeType !== 1 || a.tagName === b.tagName); }
  function morphChildren(live, next) {
    var a = Array.prototype.slice.call(live.childNodes);
    var b = Array.prototype.slice.call(next.childNodes);
    for (var i = 0; i < b.length; i++) {
      if (!a[i]) live.appendChild(b[i]);
      else if (sameKind(a[i], b[i])) morph(a[i], b[i]);
      else live.replaceChild(b[i], a[i]);
    }
    for (var j = b.length; j < a.length; j++) live.removeChild(a[j]);
  }
  function morph(live, next) {
    if (live.nodeType !== 1) { if (live.data !== next.data) live.data = next.data; return; }
    Array.prototype.slice.call(live.attributes).forEach(function (at) { if (!next.hasAttribute(at.name)) live.removeAttribute(at.name); });
    Array.prototype.slice.call(next.attributes).forEach(function (at) { if (live.getAttribute(at.name) !== at.value) live.setAttribute(at.name, at.value); });
    live.__h = next.__h;
    if (live.tagName === 'INPUT' && document.activeElement !== live) {
      var v = next.getAttribute('value');
      if (v != null && live.value !== v) live.value = v;
    }
    morphChildren(live, next);
  }

  window.DC_BOOT = function (Component) {
    var tpl = document.getElementById('dc-template');
    var mount = document.getElementById('dc-root');
    var inst = new Component({});
    var first = true;
    var inert = document.implementation.createHTMLDocument('');
    function render() {
      // Build in an inert document so unresolved {{holes}} never trigger requests.
      var holder = inert.createElement('div');
      holder.appendChild(inert.importNode(tpl.content, true));
      expand(holder, [inst.renderVals()]);
      if (first) { while (holder.firstChild) mount.appendChild(holder.firstChild); first = false; }
      else morphChildren(mount, holder);
    }
    inst.__render = render;
    render();
    ['click', 'input', 'change', 'keydown'].forEach(function (type) {
      mount.addEventListener(type, function (e) {
        for (var n = e.target; n && n !== mount; n = n.parentNode) {
          if (n.__h && typeof n.__h[type] === 'function') { n.__h[type](e); return; }
        }
      });
    });
    if (inst.componentDidMount) inst.componentDidMount();
  };
})();
