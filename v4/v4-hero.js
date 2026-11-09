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
    var AMP = 38;                                         // px at depth 1
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

  /* ============================================================ INTO THE DARK: sheet (default) or warm ombre */
  (function dusk(){
    var root = document.documentElement, sky = document.getElementById("sky"), night = document.getElementById("night");
    var hero = document.querySelector(".hero"), transfer = document.getElementById("transfer");
    var ins = WALL.cards.map(function(c){ return c.querySelector(".cp-in"); });
    var phone = window.matchMedia("(max-width:767px)");
    if (!sky) return;

    // preview-only: compare the two transitions (remove this block and the .tswitch CSS before launch)
    var MODE = "sheet";
    try { MODE = (location.search.match(/[?&]t=(sheet|ombre)/) || [])[1] || localStorage.getItem("loupe-t") || "sheet"; } catch(e){}
    root.classList.toggle("t-ombre", MODE === "ombre");
    (function switcher(){
      var w = document.createElement("div"); w.className = "tswitch"; w.setAttribute("role", "group"); w.setAttribute("aria-label", "Preview transition");
      w.innerHTML = '<span>Transition</span><button type="button" data-m="sheet">Sheet</button><button type="button" data-m="ombre">Ombre</button>';
      Array.prototype.forEach.call(w.querySelectorAll("button"), function(b){
        b.setAttribute("aria-pressed", String(b.getAttribute("data-m") === MODE));
        b.addEventListener("click", function(){
          try { localStorage.setItem("loupe-t", b.getAttribute("data-m")); } catch(e){}
          window.scrollTo(0, 0); location.reload();
        });
      });
      document.body.appendChild(w);
    })();

    function heroEnd(){ return hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight; }

    if (REDUCED || !hasST){
      // no movement: the product section is dark with a rounded top (CSS); the nav flips when it arrives
      root.classList.add("static-dusk");
      if (MODE === "ombre") root.classList.add("sky-fade");
      function flip(){
        var dark = window.scrollY > heroEnd() - 60;
        root.classList.toggle("nav-dark", dark);
        if (MODE === "ombre") root.classList.toggle("sky-off", window.scrollY > heroEnd() - window.innerHeight * 0.5);
      }
      window.addEventListener("scroll", flip, { passive:true }); flip();
      return;
    }

    /* ---- SHEET: rises with the transfer, after the four photos are picked and lifting ---- */
    if (MODE === "sheet"){
      var pinLen = phone.matches ? 1000 : 1700;              // matches the transfer pin
      var setSheet = function(q){
        var H = window.innerHeight, e = 1 - Math.pow(1 - q, 3);     // ease out: the sheet arrives softly
        var y = (1 - e) * (H + 30) - 48 * e;                    // ends 48px above the top so its rounded corners are off-screen
        night.style.transform = "translate3d(0," + y.toFixed(1) + "px,0) scaleX(" + (0.94 + 0.06 * e).toFixed(4) + ")";
        root.classList.toggle("nav-dark", y < 64);
        WALL.dusk = 1 - 0.04 * e; if (WALL.setTransform) WALL.setTransform();   // the wall steps back a little as it is covered
      };
      setSheet(0);
      ScrollTrigger.create({ trigger:"#transfer", start:"top top", end:"+=" + pinLen, scrub:1,
        onUpdate:function(self){ setSheet(seg(self.progress, 0.22, 0.5)); },
        onLeaveBack:function(){ setSheet(0); } });
    }

    /* ---- OMBRE: the wall dusks through warm colours over one screen as the hero leaves ---- */
    if (MODE === "ombre"){
      var last = -1;
      var apply = function(){
        var H = window.innerHeight, band = sky.offsetHeight / 3;
        var start = Math.max(0, heroEnd() - H);              // on a phone, wait until the hero copy has gone
        var p = clamp01((window.scrollY - start) / H);
        if (p === last) return;
        var first = last < 0; last = p;
        sky.style.transform = "translate3d(0," + (-2 * band * p).toFixed(1) + "px,0)";
        root.classList.toggle("nav-dark", (36 - (H - 2 * H * p)) / H > 0.5);
        WALL.dusk = 1 - 0.06 * smooth(p); if (WALL.setTransform) WALL.setTransform();
        if (!(first && p === 0)) ins.forEach(function(inner){ inner.style.opacity = String(1 - 0.55 * smooth(seg(p, 0.4, 1))); });
      };
      var ticking = false;
      window.addEventListener("scroll", function(){ if (!ticking){ ticking = true; requestAnimationFrame(function(){ ticking = false; apply(); }); } }, { passive:true });
      window.addEventListener("resize", function(){ last = -1; apply(); });
      apply();
    }

    /* scroll parallax on the wall (desktop), max 30px, read by the suspended loop */
    if (!phone.matches && WALL.cardState){
      var par = function(){
        var p = clamp01(window.scrollY / window.innerHeight);
        WALL.cardState.forEach(function(c){ c.py = -30 * c.depth * p; });
        if (WALL.kick) WALL.kick();
      };
      window.addEventListener("scroll", par, { passive:true }); par();
    }
  })();
