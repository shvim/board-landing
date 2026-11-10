  /* ============================================================ v4 CLOUD: photos suspended in 3D across the whole screen */
  var WALL = { vp:null, el:null, cards:[], frozen:false, running:true, raf:null, scale:1, dusk:1 };
  (function cloud(){
    var vp = document.getElementById("collageVp"), el = document.getElementById("collage"), dataEl = document.getElementById("wallData");
    if (!vp || !el || !dataEl) return;
    var DATA = JSON.parse(dataEl.textContent), byFile = {};
    DATA.forEach(function(d){ byFile[d.f] = d; });
    WALL.vp = vp; WALL.el = el;
    WALL.setTransform = function(){ el.style.transform = "scale(" + (WALL.scale * WALL.dusk).toFixed(4) + ")"; };
    var tiles = [], builtFor = "", fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function build(){
      var W = window.innerWidth, H = window.innerHeight, phone = W < 768, key = phone ? "p" : "d";
      if (key === builtFor){ return; }
      builtFor = key; el.innerHTML = ""; tiles = [];
      var R = rng(phone ? 7 : 11), N = phone ? 14 : 30, k = Math.max(0.8, Math.min(1.25, W / 1440));
      var cx = 0.5, cy = 0.48, rx = 0.39, ry = 0.36;           // keep the words clear (desktop: an oval round the copy)
      var placed = [], tries = 0;
      while (placed.length < N && tries++ < 8000){
        var x = -0.03 + R() * 1.06, y = 0.08 + R() * 0.98, z = R();
        var e = Math.pow((x - cx) / rx, 2) + Math.pow((y - cy) / ry, 2);
        if (phone ? (y > 0.29 && x > -0.005 && x < 1.005) : e < 1) continue;   // phone: a band of photos above the headline, a few peeking at the edges below
        var s = (phone ? (58 + z * 60) : (78 + z * 132) * k);
        var ok = placed.every(function(p){ var dx = (p.x - x) * W, dy = (p.y - y) * H; return Math.sqrt(dx*dx + dy*dy) > (p.s + s) * 0.62; });
        if (ok) placed.push({ x:x, y:y, z:z, s:s });
      }
      placed.sort(function(a, b){ return a.z - b.z; });     // far ones first, near ones on top
      placed.forEach(function(p, i){
        var d = DATA[(i * 7) % DATA.length];
        var ar = Math.max(0.8, Math.min(1.3, d.ar));          // squarish tiles, like objects
        var f = document.createElement("figure");
        f.className = "cphoto" + (p.z < 0.22 ? " far" : ""); f.setAttribute("data-f", d.f);
        f.style.setProperty("--ar", ar.toFixed(3));
        if (p.z < 0.22) f.style.setProperty("--blur", (1 + (0.22 - p.z) * 9).toFixed(1) + "px");
        f.style.width = p.s.toFixed(1) + "px";
        f.style.left = (p.x * W - p.s / 2).toFixed(1) + "px"; f.style.top = (p.y * H - p.s / ar / 2).toFixed(1) + "px";
        f.innerHTML = '<div class="cp-in"><div class="wc-img"><img src="media/wall-' + d.f + '.jpg" alt="" decoding="async"></div><figcaption>' + d.cap + '</figcaption></div>';
        el.appendChild(f);
        var t = { el:f, z:p.z, x:p.x, y:p.y,
          rx:(R() - 0.5) * 34, ry:(R() - 0.5) * 40, rz:(R() - 0.5) * 30,           // resting tilt in 3D
          ph:R() * 6.28, sp:0.35 + R() * 0.4 };
        f._rz = t.rz; tiles.push(t);
      });
      WALL.cards = tiles.map(function(t){ return t.el; });
      tiles.forEach(function(t){ t.el.style.transform = tf(t, 0, 0, 0, 0); });
      if (hasGSAP && !REDUCED){
        // they drift in from the haze, nearest the words first
        tiles.slice().sort(function(a, b){ return Math.hypot(a.x - .5, a.y - .5) - Math.hypot(b.x - .5, b.y - .5); })
          .forEach(function(t, i){ gsap.fromTo(t.el.querySelector(".cp-in"), { opacity:0, scale:0.86, y:18 }, { opacity:t.z < 0.22 ? 0.85 : 1, scale:1, y:0, duration:0.8, ease:"power2.out", delay:0.15 + i * 0.03 }); });
      }
    }
    function tf(t, ox, oy, wob, py){
      return "translate3d(" + ox.toFixed(2) + "px," + (oy + py).toFixed(2) + "px,0) rotateX(" + (t.rx + wob * 6).toFixed(2) + "deg) rotateY(" + (t.ry - wob * 7).toFixed(2) + "deg) rotateZ(" + (t.rz + wob * 2.5).toFixed(2) + "deg)";
    }
    build();
    var rz; window.addEventListener("resize", function(){ clearTimeout(rz); rz = setTimeout(function(){ builtFor = ""; build(); kick(); }, 150); });

    // suspended: each photo bobs and turns slowly on its own, leans with the mouse, and moves with the scroll at its own depth
    var tx = 0, ty = 0, mx = 0, my = 0, raf = null, t0 = performance.now();
    if (fine) window.addEventListener("pointermove", function(e){ tx = e.clientX / window.innerWidth * 2 - 1; ty = e.clientY / window.innerHeight * 2 - 1; kick(); }, { passive:true });
    function live(){ return !REDUCED && WALL.running && !WALL.frozen && !document.hidden && window.scrollY < window.innerHeight * 3; }
    function frame(now){
      raf = null; if (!live()) return;
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      var s = (now - t0) / 1000, sy = Math.min(window.scrollY, window.innerHeight), phoneNow = window.innerWidth < 768;
      for (var i = 0; i < tiles.length; i++){
        var t = tiles[i], d = 0.25 + t.z;                     // nearer = moves more
        var wob = Math.sin(s * t.sp + t.ph);
        var ox = mx * 30 * d + Math.cos(s * t.sp * 0.7 + t.ph) * 4 * d;
        var oy = my * 22 * d + wob * 7 * d;
        t.el.style.transform = tf(t, ox, oy, wob, phoneNow ? 0 : -sy * (0.08 + 0.3 * t.z));
        t.el._rz = t.rz + wob * 2.5;
      }
      raf = requestAnimationFrame(frame);
    }
    function kick(){ if (!raf && live()) raf = requestAnimationFrame(frame); }
    WALL.start = function(){ WALL.running = true; kick(); };
    WALL.stop  = function(){ WALL.running = false; };
    WALL.kick = kick;
    WALL.angle = function(card){ return card._rz || 0; };
    window.addEventListener("scroll", kick, { passive:true });
    document.addEventListener("visibilitychange", kick);
    kick();

    // the board re-tags a drop cell for the photo that actually flies in
    WALL.retag = function(d, card){
      var info = byFile[card.getAttribute("data-f")]; if (!info) return;
      d.title = info.t; d.tagsText = info.tags; d.landSrc = "media/wall-" + info.f + ".jpg";
      d.landedImg.src = d.landSrc;
      d.paletteEl.innerHTML = info.pal.split(",").map(function(hex){ return '<i style="background:' + hex + '"></i>'; }).join("");
    };

    // the photo chips in the headline change every few seconds
    var chips = Array.prototype.slice.call(document.querySelectorAll(".hero .chip img"));
    if (chips.length && !REDUCED){
      var order = ["14","09","02","19","07","17","12","05","20","11"], ci = 0;
      order.forEach(function(f){ new Image().src = "media/wall-" + f + ".jpg"; });
      setInterval(function(){
        if (document.hidden || window.scrollY > window.innerHeight) return;
        ci = (ci + 2) % order.length;
        chips.forEach(function(img, i){
          img.style.opacity = "0";
          setTimeout(function(){ img.src = "media/wall-" + order[(ci + i) % order.length] + ".jpg"; img.style.opacity = "1"; }, 360 + i * 120);
        });
      }, 2800);
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

  /* rect (viewport px) of a vortex photo: true centre, unrotated size, current angle */
  function cardRect(card){
    var img = card.querySelector(".wc-img") || card, r = img.getBoundingClientRect(), k = WALL.scale * WALL.dusk;
    return { x:r.left + r.width/2, y:r.top + r.height/2, w:img.offsetWidth * k, h:img.offsetHeight * k, rot: WALL.angle ? WALL.angle(card) : 0 };
  }

  /* ============================================================ INTO THE PRODUCT: the dark app window peeks up, then rises and opens to full screen */
  (function intoTheProduct(){
    var root = document.documentElement, night = document.getElementById("night"), nwIn = document.getElementById("nwIn");
    var hero = document.querySelector(".hero");
    var phone = window.matchMedia("(max-width:767px)");
    if (!night) return;
    function heroEnd(){ return hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight; }
    if (REDUCED || !hasST){
      root.classList.add("static-dusk");
      function flip(){ root.classList.toggle("nav-dark", window.scrollY > heroEnd() - 60); }
      window.addEventListener("scroll", flip, { passive:true }); flip();
      return;
    }
    var q = 0;                                              // progress of the opening, inside the pinned transfer
    function render(){
      var H = window.innerHeight, start = Math.max(0, heroEnd() - H);
      var ph = clamp01((window.scrollY - start) / H);       // hero scroll: the window edges up a little
      var peek = phone.matches ? 0.9 : 0.85, rest = phone.matches ? 0.8 : 0.72;
      var e = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      var top = lerp(lerp(peek, rest, smooth(ph)) * H, -26, e);
      var sc = lerp(lerp(0.84, 0.87, smooth(ph)), 1.05, e);
      night.style.transform = "translate3d(0," + top.toFixed(1) + "px,0) scale(" + sc.toFixed(4) + ")";
      if (nwIn) nwIn.style.opacity = String(1 - seg(q, 0.3, 0.62));   // the preview grid gives way before the real board rises
      root.classList.toggle("nav-dark", top < 64);
    }
    var ticking = false;
    window.addEventListener("scroll", function(){ if (!ticking){ ticking = true; requestAnimationFrame(function(){ ticking = false; render(); }); } }, { passive:true });
    window.addEventListener("resize", render);
    render();
    var pinLen = phone.matches ? 1000 : 1700;              // matches the transfer pin
    ScrollTrigger.create({ trigger:"#transfer", start:"top top", end:"+=" + pinLen, scrub:1,
      onUpdate:function(self){ q = seg(self.progress, 0.18, 0.48); render(); },
      onLeaveBack:function(){ q = 0; render(); } });
  })();
