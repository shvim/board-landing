  /* ============================================================ v4 COLLAGE (gallery wall; feeds the transfer flight like the old wall) */
  var WALL = { vp:null, el:null, cards:[], frozen:false, running:true, raf:null, scale:1, dusk:1 };
  (function initCollage(){
    var vp = document.getElementById("collageVp"), el = document.getElementById("collage");
    if (!vp || !el) return;
    WALL.vp = vp; WALL.el = el;
    WALL.cards = Array.prototype.slice.call(el.querySelectorAll(".cphoto"));
    WALL.setTransform = function(){ el.style.transform = "scale(" + (WALL.scale * WALL.dusk) + ")"; };
    WALL.start = function(){ WALL.running = true; };
    WALL.stop  = function(){ WALL.running = false; };
    var ins = WALL.cards.map(function(c){ return c.querySelector(".cp-in"); });
    if (hasGSAP && !REDUCED){
      // drift in: staggered, easing out, no bounce
      ins.forEach(function(inner, i){
        var c = WALL.cards[i], dx = parseFloat(c.getAttribute("data-dx") || 0);
        gsap.fromTo(inner, { opacity:0, x:dx, y:22 }, { opacity:1, x:0, y:0, duration:0.75 + (i % 3) * 0.08, ease:"power2.out", delay:0.15 + i * 0.07 });
      });
    }
  })();

  /* ============================================================ HERO SEARCH (light): types a description, your library answers */
  var HERO_SEARCH = { start:function(){}, stop:function(){} };
  (function(){
    var textEl = document.getElementById("hsText"), countEl = document.getElementById("hsCount"), hits = document.getElementById("hits");
    if (!textEl) return;
    var QUERIES = [
      { q:"cognac leather sofa, gallery wall", imgs:[44,27,46,21] },
      { q:"japandi bedroom, linen, natural light", imgs:[38,16,28,13] },
      { q:"emerald velvet, brass", imgs:[40,8,9,5] }
    ];
    QUERIES.forEach(function(it){ it.imgs.forEach(function(n){ new Image().src = imgPath(n); }); });
    function show(item){
      hits.innerHTML = item.imgs.map(function(n){ return '<img src="' + imgPath(n) + '" alt="">'; }).join("") + "<span>" + item.imgs.length + " found in your library</span>";
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ hits.classList.add("show"); }); });
      countEl.textContent = item.imgs.length + " found"; countEl.classList.add("show");
    }
    if (REDUCED){ textEl.textContent = QUERIES[0].q; show(QUERIES[0]); return; }
    var timers = [], running = false, qi = 0;
    function later(fn, ms){ timers.push(setTimeout(fn, ms)); }
    function clear(){ hits.classList.remove("show"); countEl.classList.remove("show"); }
    function run(){
      if (!running) return;
      var item = QUERIES[qi % QUERIES.length], q = item.q, i = 0; qi++;
      textEl.textContent = "";
      (function type(){
        if (!running) return;
        textEl.textContent = q.slice(0, ++i);
        if (i < q.length) return later(type, 42 + Math.random() * 40);
        later(function(){ show(item); later(function(){ clear(); later(run, 600); }, 3200); }, 260);
      })();
    }
    HERO_SEARCH.start = function(){ if (running) return; running = true; later(run, 1100); };
    HERO_SEARCH.stop  = function(){ if (!running) return; running = false; timers.forEach(clearTimeout); timers = []; };
    HERO_SEARCH.start();
  })();

  /* rect (viewport px) of a collage photo */
  function cardRect(card){
    var r = (card.querySelector(".wc-img") || card).getBoundingClientRect();
    return { x:r.left + r.width/2, y:r.top + r.height/2, w:r.width, h:r.height };
  }

  /* ============================================================ DUSK: light hero -> dark product, tied to scroll */
  (function dusk(){
    var root = document.documentElement;
    var A = { bg:[246,241,234,1], fg:[28,26,23,1], muted:[28,26,23,.66], border:[28,26,23,.14] };
    var B = { bg:[14,14,14,1], fg:[255,255,255,1], muted:[255,255,255,.72], border:[255,255,255,.12] };
    function mix(a, b, t){ return "rgba(" + Math.round(lerp(a[0],b[0],t)) + "," + Math.round(lerp(a[1],b[1],t)) + "," + Math.round(lerp(a[2],b[2],t)) + "," + lerp(a[3],b[3],t).toFixed(3) + ")"; }
    var ins = WALL.cards.map(function(c){ return c.querySelector(".cp-in"); });
    var depth = WALL.cards.map(function(c){ return parseFloat(c.getAttribute("data-depth") || 0.6); });
    var phone = window.matchMedia("(max-width:767px)");

    if (REDUCED){
      // no parallax or drift: a short, simple crossfade once the hero is mostly gone
      root.classList.add("dusk-fade");
      function flip(){ var dark = window.scrollY > window.innerHeight * 0.5; root.classList.toggle("dusk-dark", dark); root.classList.toggle("dusk", !dark); }
      window.addEventListener("scroll", flip, { passive:true }); flip();
      return;
    }
    var last = -1;
    function apply(){
      var y = window.scrollY, H = window.innerHeight;
      var t = smooth(clamp01(y / H));                 // one viewport of scrolling = the whole dusk
      if (t !== last){
        var first = last < 0; last = t;
        root.style.setProperty("--bg", mix(A.bg, B.bg, t));
        root.style.setProperty("--fg", mix(A.fg, B.fg, t));
        root.style.setProperty("--muted", mix(A.muted, B.muted, t));
        root.style.setProperty("--border", mix(A.border, B.border, t));
        WALL.dusk = 1 - 0.08 * t;                     // photos step back to 0.92
        if (WALL.setTransform) WALL.setTransform();
        if (!(first && t === 0)) ins.forEach(function(inner){ inner.style.opacity = String(1 - 0.7 * t); });   // ... and fade to 30% (left alone on first paint so the drift-in can play)
      }
      if (!phone.matches){
        var p = clamp01(y / H);
        WALL.cards.forEach(function(c, i){ c.style.setProperty("--py", (-30 * depth[i] * p).toFixed(1) + "px"); });   // max 30px, each at its own speed
      }
    }
    var ticking = false;
    window.addEventListener("scroll", function(){ if (!ticking){ ticking = true; requestAnimationFrame(function(){ ticking = false; apply(); }); } }, { passive:true });
    window.addEventListener("resize", apply);
    apply();
  })();

