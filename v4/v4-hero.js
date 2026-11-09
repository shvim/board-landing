  /* ============================================================ v4 VORTEX: rings of photos around the headline */
  var WALL = { vp:null, el:null, cards:[], frozen:false, running:true, raf:null, scale:1, dusk:1 };
  (function vortex(){
    var vp = document.getElementById("collageVp"), el = document.getElementById("collage"), dataEl = document.getElementById("wallData");
    if (!vp || !el || !dataEl) return;
    var DATA = JSON.parse(dataEl.textContent), byFile = {};
    DATA.forEach(function(d){ byFile[d.f] = d; });
    WALL.vp = vp; WALL.el = el;
    WALL.setTransform = function(){ el.style.transform = "scale(" + (WALL.scale * WALL.dusk).toFixed(4) + ")"; };
    var rings = [], ringEls = [], built = "", fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    // geometry from the viewport: a tight inner circle that frames the words, two wider rings that run off the screen
    function geometry(){
      var W = window.innerWidth, H = window.innerHeight, phone = W < 768;
      var base = phone ? W * 0.5 : Math.min(H * 0.43, W * 0.3);
      var w1 = phone ? W * 0.21 : base * 0.36, w2 = w1 * 1.6, w3 = w2 * 1.45;
      var R1 = phone ? W * 0.46 : base, R2 = R1 + (w1 + w2) * 0.62, R3 = R2 + (w2 + w3) * 0.62;
      var spec = [ { R:R1, w:w1, depth:0.35, fog:0.7,  speed: 1/150 },
                   { R:R2, w:w2, depth:0.7,  fog:0.8,  speed: 1/210 },
                   { R:R3, w:w3, depth:1.0,  fog:0.92, speed: 1/290 } ];
      spec.forEach(function(s){ s.n = Math.max(8, Math.floor(2 * Math.PI * s.R / (s.w * 1.12))); });
      return { W:W, H:H, phone:phone, spec:spec, hole:R1 - w1 * 0.5 };
    }
    function build(){
      var g = geometry(), key = g.spec.map(function(s){ return s.n; }).join(",");
      document.documentElement.style.setProperty("--hole", Math.round(g.hole) + "px");
      document.documentElement.style.setProperty("--iris", Math.ceil(Math.hypot(g.W, g.H) * 1.04) + "px");
      if (key === built){ place(g); return; }
      built = key; el.innerHTML = ""; rings = []; ringEls = [];
      var k = 0;
      g.spec.forEach(function(s, ri){
        var r = document.createElement("div"); r.className = "ring"; r.style.opacity = s.fog;
        var spin = document.createElement("div"); spin.className = "spin"; r.appendChild(spin);
        var cards = [];
        for (var i = 0; i < s.n; i++){
          var d = DATA[(k++ * 7 + ri * 3) % DATA.length];   // spread the 20 photos so neighbours differ
          var f = document.createElement("figure"); f.className = "cphoto"; f.setAttribute("data-ring", ri); f.setAttribute("data-f", d.f);
          f.style.setProperty("--ar", d.ar);
          f.innerHTML = '<div class="cp-in"><div class="wc-img"><img src="media/wall-' + d.f + '.jpg" alt="" decoding="async"></div><figcaption>' + d.cap + '</figcaption></div>';
          spin.appendChild(f); cards.push(f);
        }
        el.appendChild(r);
        rings.push({ el:r, spin:spin, cards:cards, s:s, phase: ri * 0.37 });
      });
      WALL.cards = [].concat.apply([], rings.map(function(r){ return r.cards; }));
      place(g);
      if (hasGSAP && !REDUCED){
        // the tunnel opens: inner ring first, each photo grows out of the haze
        rings.forEach(function(r, ri){
          r.cards.forEach(function(c, i){
            gsap.fromTo(c.querySelector(".cp-in"), { opacity:0, scale:0.82 }, { opacity:1, scale:1, duration:0.8, ease:"power2.out", delay:0.1 + ri * 0.18 + i * 0.025 });
          });
        });
      }
    }
    function place(g){
      rings.forEach(function(r, ri){
        var s = g.spec[ri]; r.s.R = s.R; r.s.w = s.w;
        r.cards.forEach(function(c, i){
          var th = 360 * i / r.cards.length, ar = parseFloat(c.style.getPropertyValue("--ar")) || 1.5, h = s.w / ar;
          c.style.width = s.w.toFixed(1) + "px"; c.style.left = (-s.w / 2).toFixed(1) + "px"; c.style.top = (-h / 2).toFixed(1) + "px";
          c.style.transform = "rotate(" + th.toFixed(2) + "deg) translate(" + s.R.toFixed(1) + "px,0) rotate(90deg)";   // top edge faces outward: a tunnel
          c._th = th;
        });
      });
    }
    build();
    var rz; window.addEventListener("resize", function(){ clearTimeout(rz); rz = setTimeout(build, 120); });

    // the rings turn (inner fastest, like water going down a drain) and lean toward the mouse at their own depth
    var t0 = performance.now(), tx = 0, ty = 0, mx = 0, my = 0, raf = null, spinT = 0, lastNow = t0;
    if (fine) window.addEventListener("pointermove", function(e){ tx = e.clientX / window.innerWidth * 2 - 1; ty = e.clientY / window.innerHeight * 2 - 1; kick(); }, { passive:true });
    function live(){ return !REDUCED && WALL.running && !WALL.frozen && !document.hidden && window.scrollY < window.innerHeight * 3; }
    WALL.angle = function(card){ var r = rings[+card.getAttribute("data-ring")]; return (r ? r.rot : 0) + card._th + 90; };
    function frame(now){
      raf = null; if (!live()) return;
      spinT += Math.min(50, now - lastNow) / 1000; lastNow = now;
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      rings.forEach(function(r){
        r.rot = (360 * spinT * r.s.speed + r.phase * 57) % 360;
        var d = r.s.depth * 34;
        r.el.style.transform = "translate3d(" + (mx * d).toFixed(2) + "px," + (my * d).toFixed(2) + "px,0)";
        r.spin.style.transform = "rotate(" + r.rot.toFixed(3) + "deg)";
      });
      raf = requestAnimationFrame(frame);
    }
    function kick(){ if (!raf && live()){ lastNow = performance.now(); raf = requestAnimationFrame(frame); } }
    WALL.start = function(){ WALL.running = true; kick(); };
    WALL.stop  = function(){ WALL.running = false; };
    WALL.kick = kick;
    WALL.setClear = function(c){ rings.forEach(function(r){ r.el.style.opacity = String(r.s.fog + (1 - r.s.fog) * c); }); };
    window.addEventListener("scroll", kick, { passive:true });
    document.addEventListener("visibilitychange", kick);
    rings.forEach(function(r){ r.rot = r.phase * 57; r.spin.style.transform = "rotate(" + r.rot + "deg)"; });
    kick();

    // the board re-tags a drop cell for the photo that actually flies in
    WALL.retag = function(d, card){
      var info = byFile[card.getAttribute("data-f")]; if (!info) return;
      d.title = info.t; d.tagsText = info.tags; d.landSrc = "media/wall-" + info.f + ".jpg";
      d.landedImg.src = d.landSrc;
      d.paletteEl.innerHTML = info.pal.split(",").map(function(hex){ return '<i style="background:' + hex + '"></i>'; }).join("");
    };
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

  /* rect (viewport px) of a vortex photo: true centre, unrotated size, current angle */
  function cardRect(card){
    var img = card.querySelector(".wc-img") || card, r = img.getBoundingClientRect(), k = WALL.scale * WALL.dusk;
    return { x:r.left + r.width/2, y:r.top + r.height/2, w:img.offsetWidth * k, h:img.offsetHeight * k, rot: WALL.angle ? WALL.angle(card) : 0 };
  }

  /* ============================================================ INTO THE PRODUCT: the words sink into the tunnel, then a dark iris opens from its centre */
  (function intoTheDark(){
    var root = document.documentElement, night = document.getElementById("night"), fog = document.getElementById("fog");
    var hero = document.querySelector(".hero"), inner = hero && hero.querySelector(".hero-inner");
    var phone = window.matchMedia("(max-width:767px)");
    function heroEnd(){ return hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight; }

    if (REDUCED || !hasST){
      root.classList.add("static-dusk");
      function flip(){ root.classList.toggle("nav-dark", window.scrollY > heroEnd() - 60); }
      window.addEventListener("scroll", flip, { passive:true }); flip();
      return;
    }

    // 1) hero scroll: the words drift back toward the centre and fade, the tunnel edges in a little
    var ticking = false;
    function heroScroll(){
      var H = window.innerHeight, start = Math.max(0, heroEnd() - H), y = window.scrollY;
      var p = clamp01((y - start) / H);
      if (inner){
        var back = start > 0 ? 0 : y * 0.55;               // desktop: hold the words near the centre while they recede
        inner.style.transform = "translate3d(0," + back.toFixed(1) + "px,0) scale(" + (1 - 0.3 * smooth(p)).toFixed(4) + ")";
        inner.style.opacity = String(clamp01(1 - 1.25 * p));
      }
      if (!WALL.frozen){ WALL.dusk = 1 + 0.1 * smooth(p); if (WALL.setTransform) WALL.setTransform(); }
    }
    window.addEventListener("scroll", function(){ if (!ticking){ ticking = true; requestAnimationFrame(function(){ ticking = false; heroScroll(); }); } }, { passive:true });
    window.addEventListener("resize", heroScroll);
    heroScroll();

    // 2) inside the pinned transfer: fog clears so the picks read, then the iris opens while the camera flies into the tunnel
    var pinLen = phone.matches ? 1000 : 1700;              // matches the transfer pin
    function setIris(q, clear){
      var e = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;   // ease in-out: opens slowly, then sweeps
      night.style.transform = "scale(" + e.toFixed(4) + ")";
      if (fog) fog.style.opacity = String(1 - clear);
      if (WALL.setClear) WALL.setClear(clear);
      var rEdge = e * Math.hypot(window.innerWidth, window.innerHeight) * 0.52;
      root.classList.toggle("nav-dark", rEdge > window.innerHeight / 2 - 10);
    }
    setIris(0, 0);
    ScrollTrigger.create({ trigger:"#transfer", start:"top top", end:"+=" + pinLen, scrub:1,
      onUpdate:function(self){ setIris(seg(self.progress, 0.2, 0.5), seg(self.progress, 0, 0.1)); },
      onLeaveBack:function(){ setIris(0, 0); } });
  })();
