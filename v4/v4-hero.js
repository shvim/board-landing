  /* ============================================================ v4 COLLAGE (gallery wall; feeds the transfer flight like the old wall) */
  var WALL = { vp:null, el:null, cards:[], frozen:false, running:true, raf:null, scale:1, dusk:1 };
  (function initCollage(){
    var vp = document.getElementById("collageVp"), el = document.getElementById("collage");
    if (!vp || !el) return;
    WALL.vp = vp; WALL.el = el;
    WALL.cards = Array.prototype.slice.call(el.querySelectorAll(".cphoto"));
    WALL.setTransform = function(){ el.style.transform = "scale(" + (WALL.scale * WALL.dusk) + ")"; };
    WALL.start = function(){ WALL.running = true; if (WALL.kick) WALL.kick(); };
    WALL.stop  = function(){ WALL.running = false; };
    var ins = WALL.cards.map(function(c){ return c.querySelector(".cp-in"); });
    if (hasGSAP && !REDUCED){
      // drift in: staggered, easing out, no bounce
      ins.forEach(function(inner, i){
        var c = WALL.cards[i], dx = parseFloat(c.getAttribute("data-dx") || 0);
        gsap.fromTo(inner, { opacity:0, x:dx, y:22 }, { opacity:1, x:0, y:0, duration:0.75 + (i % 3) * 0.08, ease:"power2.out", delay:0.1 + i * 0.045 });
      });
    }
  })();

  /* ============================================================ SUSPENDED: photos hang in the air and follow the mouse */
  (function suspended(){
    if (!WALL.cards.length || REDUCED) return;
    var cards = WALL.cards.map(function(c, i){
      return { el:c, depth:parseFloat(c.getAttribute("data-depth") || 0.6),
               rot:parseFloat(getComputedStyle(c).getPropertyValue("--r")) || 0,
               ph:i * 1.7, sp:0.55 + (i % 5) * 0.09, py:0 };
    });
    WALL.cardState = cards;
    var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    var tx = 0, ty = 0, mx = 0, my = 0, raf = null, t0 = performance.now();
    var AMP = 30;                                         // px at depth 1
    if (fine) window.addEventListener("pointermove", function(e){
      tx = e.clientX / window.innerWidth * 2 - 1; ty = e.clientY / window.innerHeight * 2 - 1; kick();
    }, { passive:true });
    document.addEventListener("mouseleave", function(){ tx = 0; ty = 0; });
    function live(){ return WALL.running && !WALL.frozen && window.scrollY < window.innerHeight * 1.6 && !document.hidden; }
    function frame(now){
      raf = null;
      if (!live()) return;
      mx += (tx - mx) * 0.055; my += (ty - my) * 0.055;   // heavy, slow follow: feels weighted, not twitchy
      var t = (now - t0) / 1000;
      for (var i = 0; i < cards.length; i++){
        var c = cards[i], d = c.depth;
        var fx = Math.sin(t * c.sp * 0.6 + c.ph) * 2.2, fy = Math.cos(t * c.sp * 0.8 + c.ph) * 3.2;   // slow hang-in-the-air sway
        var x = mx * d * AMP + fx, y = my * d * AMP * 0.7 + fy + c.py;
        c.el.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) rotate(" + (c.rot + mx * d * 0.5).toFixed(3) + "deg)";
      }
      raf = requestAnimationFrame(frame);
    }
    function kick(){ if (!raf && live()) raf = requestAnimationFrame(frame); }
    WALL.kick = kick;
    window.addEventListener("scroll", kick, { passive:true });
    document.addEventListener("visibilitychange", kick);
    kick();
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

  /* ============================================================ DUSK: the dark rises as a gradient, tied to scroll */
  (function dusk(){
    var root = document.documentElement, sky = document.getElementById("sky"), hero = document.querySelector(".hero");
    var ins = WALL.cards.map(function(c){ return c.querySelector(".cp-in"); });
    var phone = window.matchMedia("(max-width:767px)");
    if (!sky) return;

    if (REDUCED){
      // no movement: the light simply crossfades to dark once the hero is mostly gone
      root.classList.add("sky-fade");
      function flip(){ var dark = window.scrollY > (hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight) - window.innerHeight * 0.5; root.classList.toggle("sky-off", dark); root.classList.toggle("nav-dark", dark); }
      window.addEventListener("scroll", flip, { passive:true }); flip();
      return;
    }
    var last = -1;
    function apply(){
      var H = window.innerHeight, band = sky.offsetHeight / 3;   // sky = light | gradient | dark, a viewport each
      // the dusk starts once the hero's last line is about to leave (on a phone the hero is taller than the screen)
      var start = hero ? Math.max(0, hero.offsetTop + hero.offsetHeight - H) : 0;
      var y = window.scrollY - start, p = clamp01(y / H);
      if (p !== last){
        var first = last < 0; last = p;
        sky.style.transform = "translate3d(0," + (-2 * band * p).toFixed(1) + "px,0)";
        // nav turns white once the gradient under it is past its midpoint
        var under = (36 - (H - 2 * H * p)) / H;
        root.classList.toggle("nav-dark", under > 0.55);
        WALL.dusk = 1 - 0.08 * smooth(p);                 // photos step back to 0.92 ...
        if (WALL.setTransform) WALL.setTransform();
        if (!(first && p === 0)) ins.forEach(function(inner){ inner.style.opacity = String(1 - 0.7 * smooth(seg(p, 0.3, 1))); });   // ... and fade to 30%, but only once the dark reaches them
        if (!phone.matches && WALL.cardState){
          WALL.cardState.forEach(function(c){ c.py = -30 * c.depth * p; });   // scroll parallax, max 30px, read by the suspended loop
          if (WALL.kick) WALL.kick();
        }
      }
    }
    var ticking = false;
    window.addEventListener("scroll", function(){ if (!ticking){ ticking = true; requestAnimationFrame(function(){ ticking = false; apply(); }); } }, { passive:true });
    window.addEventListener("resize", function(){ last = -1; apply(); });
    apply();
  })();
