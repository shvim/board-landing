/* Loupe landing — interactions and motion.
   Everything degrades: no GSAP or prefers-reduced-motion → static, fully readable page. */
(function () {
  "use strict";

  /* ============================================================ CONFIG
     Set these when the URLs exist. null = fall back to the sign-up app / hide the link. */
  var CONFIG = {
    SIGNUP_URL: "https://board-2-shvim.web.app/",
    SIGNIN_URL: "https://board-2-shvim.web.app/",
    CHROME_URL: null,      // Chrome Web Store listing
    APPSTORE_URL: null,    // App Store listing
    PRICING_URL: null,     // separate pricing page; "See plans" appears when set
    DEMO_VIDEO: null,      // e.g. "media/loupe-demo.mp4" — plays in the hero square, opens full size on click
    DEMO_POSTER: null      // e.g. "media/loupe-demo.jpg"
  };

  var root = document.documentElement;
  window.__loupe = true;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger && window.Flip && window.SplitText);
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MOTION = hasGSAP && !REDUCED;
  if (!MOTION) root.classList.remove("anim");
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var thumb = function (n) { return "../../images/t/img_" + pad(n) + ".jpg"; };
  var full = function (n) { return "../../images/img_" + pad(n) + ".jpg"; };
  function onView(el, cb, opts) {
    if (!("IntersectionObserver" in window)) { cb(true); return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { cb(e.isIntersecting); }); }, opts || { threshold: 0.15 }).observe(el);
  }

  /* ============================================================ LINKS */
  var LINKS = {
    signup: CONFIG.SIGNUP_URL, signin: CONFIG.SIGNIN_URL,
    chrome: CONFIG.CHROME_URL || CONFIG.SIGNUP_URL, appstore: CONFIG.APPSTORE_URL || CONFIG.SIGNUP_URL,
    pricing: CONFIG.PRICING_URL
  };
  $$("[data-href]").forEach(function (a) {
    var u = LINKS[a.getAttribute("data-href")];
    if (u) a.href = u;
  });
  if (CONFIG.PRICING_URL) { var pl = $("#plansLink"); if (pl) pl.hidden = false; }

  /* ============================================================ NAV */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 12); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  var menuBtn = $("#navMenu"), sheet = $("#sheet");
  function setMenu(open) {
    sheet.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
    document.body.style.overflow = open ? "hidden" : "";
    nav.classList.toggle("scrolled", open || window.scrollY > 12);
  }
  menuBtn.addEventListener("click", function () { setMenu(sheet.hidden); });
  $$("#sheet a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) setMenu(false); });

  // current-section highlight
  var navMap = {};
  $$(".nav-links a").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var a = navMap[e.target.id]; if (!a) return;
        if (e.isIntersecting) { $$(".nav-links a").forEach(function (x) { x.classList.remove("on"); }); a.classList.add("on"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navMap).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ============================================================ LOOPER: restartable timeline cycles */
  function looper(build) {
    var tl = null, on = false;
    function next() { if (!on) return; tl = build(); tl.eventCallback("onComplete", next); }
    return {
      play: function () { if (on) return; on = true; if (tl && tl.progress() < 1) tl.play(); else next(); },
      pause: function () { on = false; if (tl) tl.pause(); },
      reset: function () { var was = on; if (tl) tl.kill(); tl = null; on = false; if (was) this.play(); },
      freeze: function (p) { on = false; if (tl) tl.kill(); tl = build(); tl.progress(p).pause(); }
    };
  }
  var loopers = [];
  var rT;
  window.addEventListener("resize", function () {
    clearTimeout(rT);
    rT = setTimeout(function () { loopers.forEach(function (l) { l.reset(); }); }, 250);
  });

  // point inside container for an element (ax/ay = anchor 0..1)
  function at(el, box, ax, ay) {
    var a = el.getBoundingClientRect(), b = box.getBoundingClientRect();
    return { x: a.left - b.left + a.width * (ax == null ? 0.5 : ax), y: a.top - b.top + a.height * (ay == null ? 0.5 : ay), w: a.width, h: a.height, l: a.left - b.left, t: a.top - b.top };
  }
  function tapEl(box) {
    var t = box.querySelector(".tap");
    if (!t) {
      t = document.createElement("span"); t.className = "tap";
      t.style.cssText = "position:absolute;left:0;top:0;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;background:rgba(255,255,255,.35);border:2px solid #fff;pointer-events:none;z-index:30;opacity:0";
      box.appendChild(t);
    }
    return t;
  }
  function tap(tl, box, el, ax, ay, pos) {
    var t = tapEl(box), p = at(el, box, ax, ay);
    tl.set(t, { x: p.x, y: p.y, scale: 0.4, opacity: 0.95 }, pos)
      .to(t, { scale: 1.3, opacity: 0, duration: 0.5, ease: "power2.out" });
    return tl;
  }

  /* ============================================================ HERO: library + self-typing search */
  var LIB = [
    [21, "Cognac Leather Lounge", "cognac leather · rattan pendant · mid-century"],
    [40, "Emerald Velvet Dining", "emerald velvet · brass · glam modern"],
    [38, "Rust Linen Bedroom", "limewash wall · rust linen · oak · japandi"],
    [20, "Sage Calm Living", "sage green wall · knit pouf · warm wood"],
    [27, "Macramé and Cognac", "cognac leather · macramé · boho"],
    [5, "Brass Dome Pendants", "brushed brass · dome pendant · warm metallic"],
    [9, "Emerald Console Vignette", "emerald green · white brick · pampas"],
    [16, "Oak Mirror Bedroom", "round oak mirror · walnut bed · calm"],
    [34, "Terracotta Sofa, Sage Wall", "terracotta tweed · sage green · mid-century"],
    [10, "Shaker Kitchen, Leather Pulls", "white shaker · hex tile · leather pulls"],
    [44, "Teal Gallery Living", "cognac leather · deep teal · gallery wall"],
    [8, "Emerald Lounge Chairs", "emerald velvet · steel windows · floor lamp"],
    [28, "Monochrome Oak Bedroom", "oak floor · black and white rug · minimal"],
    [30, "Oak Stair, Brass Glow", "oak staircase · brass pendants · black rail"],
    [46, "Sage Open Kitchen", "cognac leather · sage green wall · open plan"],
    [37, "Channel-Tufted Bedroom", "channel tufting · brass chandelier · chevron"]
  ];
  var QUERIES = [
    { q: "cognac leather sofa", hits: [21, 27, 44, 46] },
    { q: "emerald green, brass", hits: [40, 8, 9, 5] },
    { q: "oak bedroom, limewash", hits: [38, 16, 28] },
    { q: "sage green walls", hits: [20, 34, 46] }
  ];
  var app = $("#app"), grid = $("#appGrid"), qEl = $("#appQ"), search = $("#appSearch"), countEl = $("#appCount"), headT = $("#appHeadT");
  if (!grid.children.length) LIB.forEach(function (d) {
    grid.insertAdjacentHTML("beforeend",
      '<div class="tile" data-n="' + d[0] + '"><img src="' + thumb(d[0]) + '" alt="" width="360" height="450" decoding="async"><span class="tile-cap">' + d[1] + "<span>" + d[2] + "</span></span></div>");
  });
  var tiles = $$(".tile", grid);
  var byN = {}; tiles.forEach(function (t) { byN[t.getAttribute("data-n")] = t; });
  var LIB_COUNT = 248;

  function setQ(s) { qEl.textContent = s; }
  function setCount(n) {
    if (!MOTION) { countEl.textContent = n; return; }
    var o = { v: parseInt(countEl.textContent, 10) || 0 };
    gsap.to(o, { v: n, duration: 0.6, ease: "power2.out", onUpdate: function () { countEl.textContent = Math.round(o.v); } });
  }
  function filterTo(hits) {
    var state = MOTION ? Flip.getState(tiles) : null;
    if (hits) {
      tiles.forEach(function (t) { t.classList.toggle("gone", hits.indexOf(+t.getAttribute("data-n")) < 0); });
      hits.slice().reverse().forEach(function (n) { grid.insertBefore(byN[n], grid.firstChild); });
    } else {
      tiles.forEach(function (t) { t.classList.remove("gone"); grid.appendChild(t); });
    }
    app.classList.toggle("results", !!hits);
    headT.textContent = hits ? "Results" : "Your library";
    setCount(hits ? hits.length : LIB_COUNT);
    if (state) {
      Flip.from(state, {
        duration: 0.75, ease: "power3.inOut", absolute: true, nested: true, prune: true,
        onEnter: function (els) { return gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.25, stagger: 0.02 }); },
        onLeave: function (els) { return gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.3 }); }
      });
    }
  }

  var heroLoop = hasGSAP ? looper(function () {
    var tl = gsap.timeline();
    QUERIES.forEach(function (Q) {
      tl.call(function () { search.classList.add("focus"); }, null, "+=0.5");
      for (var i = 1; i <= Q.q.length; i++) tl.call(setQ, [Q.q.slice(0, i)], "+=" + (0.045 + (i % 3) * 0.014));
      tl.call(filterTo, [Q.hits], "+=0.3");
      tl.to({}, { duration: 3.1 });
      for (var j = Q.q.length - 1; j >= 0; j--) tl.call(setQ, [Q.q.slice(0, j)], "+=0.016");
      tl.call(filterTo, [null], "+=0.1");
      tl.call(function () { search.classList.remove("focus"); }, null, "+=0.05");
      tl.to({}, { duration: 1.2 });
    });
    return tl;
  }) : null;

  if (MOTION) {
    loopers.push(heroLoop);
    onView(app, function (v) { v ? heroLoop.play() : heroLoop.pause(); }, { threshold: 0.2 });
  } else {
    // static: show one finished search
    search.classList.add("focus"); setQ(QUERIES[0].q); filterTo(QUERIES[0].hits);
  }

  // faded image wall behind the hero (built after load so it never blocks first paint)
  function buildWall() {
    var wall = $("#heroWall"); if (!wall || wall.childElementCount) return;
    var cols = Math.min(9, Math.max(4, Math.ceil(window.innerWidth / 170) + 1));
    var pool = [1, 2, 4, 6, 11, 13, 14, 15, 17, 18, 19, 23, 24, 25, 26, 29, 31, 32, 33, 36, 39, 41, 42, 43, 3, 7, 12, 22];
    var k = 0, html = "";
    for (var c = 0; c < cols; c++) {
      var imgs = "";
      for (var r = 0; r < 5; r++) imgs += '<img src="' + thumb(pool[(k++) % pool.length]) + '" alt="" decoding="async">';
      html += '<div class="hw-col" style="--d:' + (80 + (c % 3) * 18) + 's">' + imgs + imgs + "</div>";
    }
    wall.innerHTML = html;
    requestAnimationFrame(function () { wall.classList.add("on"); });
  }
  if (document.readyState === "complete") setTimeout(buildWall, 300);
  else window.addEventListener("load", function () { setTimeout(buildWall, 300); });

  /* ============================================================ HERO PiP: video or animated fallback */
  var pip = $("#pip"), pipBtn = $("#pipBtn");
  if (CONFIG.DEMO_VIDEO) {
    var v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = !REDUCED; v.preload = "metadata";
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    if (CONFIG.DEMO_POSTER) v.poster = CONFIG.DEMO_POSTER;
    v.src = CONFIG.DEMO_VIDEO;
    v.addEventListener("loadeddata", function () { pip.classList.add("has-video"); $("#pipCap").textContent = "Real recording — tap to watch"; });
    $("#pipVideo").appendChild(v);
  }
  var vbox = $("#vbox"), vboxIn = $("#vboxIn"), lastFocus = null;
  function openVideo() {
    lastFocus = document.activeElement;
    vboxIn.innerHTML = '<video controls autoplay playsinline src="' + CONFIG.DEMO_VIDEO + '"></video>';
    vbox.hidden = false; document.body.style.overflow = "hidden"; $("#vboxX").focus();
  }
  function closeVideo() { vbox.hidden = true; vboxIn.innerHTML = ""; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  $("#vboxX").addEventListener("click", closeVideo);
  vbox.addEventListener("click", function (e) { if (e.target === vbox) closeVideo(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !vbox.hidden) closeVideo(); });
  pipBtn.addEventListener("click", function () {
    if (pip.classList.contains("has-video")) openVideo();
    else document.getElementById("how").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
  });

  if (hasGSAP) {
    var pf = $("#pipFallback");
    var pipLoop = looper(function () {
      var cur = $(".pf-cursor", pf), badge = $(".pf-badge", pf), pop = $(".pf-pop", pf), saveD = $(".pf-save-d", pf), saveL = $(".pf-save-l", pf);
      var tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.set(cur, { left: "72%", top: "96%", x: 0, y: 0, xPercent: 0, yPercent: 0, scale: 1, opacity: 1, transform: "none" })
        .set(badge, { opacity: 0, scale: 0.6 }).set(pop, { opacity: 0, y: 14 }).set(saveD, { opacity: 0 }).set(saveL, { opacity: 1 })
        .to(cur, { left: "52%", top: "58%", duration: 0.9 })
        .to(badge, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, "-=0.2")
        .to(cur, { left: "84%", top: "34%", duration: 0.55 })
        .to(cur, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(pop, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" })
        .to(cur, { left: "62%", top: "88%", duration: 0.6 }, "+=0.25")
        .to(cur, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(saveD, { opacity: 1, duration: 0.2 }, "+=0.35")
        .to({}, { duration: 1.6 })
        .to([pop, badge], { opacity: 0, duration: 0.3 })
        .to(cur, { opacity: 0, duration: 0.2 }, "<");
      return tl;
    });
    if (MOTION) { loopers.push(pipLoop); onView(pip, function (vis) { vis ? pipLoop.play() : pipLoop.pause(); }); }
    else pipLoop.freeze(0.78);
  }

  /* ============================================================ THE LOUPE */
  var LENS = [
    { n: 34, alt: "Terracotta tweed sofa with a blush cushion against a sage green wall",
      generic: ["sofa", "orange", "pillow", "living room"], query: "rust sofa, sage wall",
      spots: [[55, 56, "Material", "Terracotta tweed"], [8, 12, "Color", "Sage green, matte"], [37, 30, "Accent", "Blush channel-quilted cushion"], [14, 73, "Detail", "Tapered oak legs"], [88, 60, "Accent", "Citrus yellow pop"], [25, 88, "Material", "Natural jute rug"]],
      primary: [["Terracotta tweed sofa", 0], ["Sage green wall", 1], ["Mid-century modern", -1]],
      detail: [["tapered oak legs", 3], ["channel-quilted cushion", 2], ["jute rug", 5], ["citrus accent", 4]],
      mood: "warm, playful, sunlit",
      pal: [["Terracotta", "#D05326"], ["Sage", "#7B9D82"], ["Blush", "#EFC0B5"], ["Oak", "#C8874B"], ["Citrus", "#EBBA2C"]] },
    { n: 38, alt: "Japandi bedroom with rust linen bedding against a limewash wall",
      generic: ["bed", "brown", "pillow", "bedroom"], query: "japandi bedroom, rust linen",
      spots: [[40, 14, "Finish", "Limewash plaster, warm grey"], [56, 72, "Material", "Rust stonewashed linen"], [70, 52, "Pattern", "Rust and cream stripe"], [50, 42, "Material", "Mauve bouclé cushion"], [30, 40, "Detail", "Slatted oak headboard"], [22, 92, "Material", "Charcoal wool shag"]],
      primary: [["Japandi bedroom", -1], ["Limewash wall", 0], ["Rust linen bedding", 1]],
      detail: [["slatted oak headboard", 4], ["bouclé cushion", 3], ["striped sheet", 2], ["wool shag rug", 5]],
      mood: "calm, earthy, layered",
      pal: [["Rust", "#8A3A12"], ["Warm grey", "#938E83"], ["Mauve", "#B79A90"], ["Oak", "#B8946A"], ["Charcoal", "#2B2622"]] },
    { n: 40, alt: "Dining room with emerald velvet chairs, a round mirror and a brass globe chandelier",
      generic: ["chairs", "green", "table", "dining room"], query: "emerald velvet dining, brass",
      spots: [[52, 72, "Material", "Emerald velvet"], [38, 88, "Detail", "Brass-capped tapered legs"], [60, 24, "Lighting", "Globe chandelier, brass"], [33, 44, "Object", "Oversized round mirror"], [82, 61, "Material", "White lacquer table"], [94, 38, "Botanical", "Bird of paradise"]],
      primary: [["Emerald velvet dining", 0], ["Brass accents", 2], ["Glam modern", -1]],
      detail: [["round mirror", 3], ["globe chandelier", 2], ["tapered brass legs", 1], ["lacquer table", 4]],
      mood: "polished, lively, made for hosting",
      pal: [["Emerald", "#2F6A50"], ["Brass", "#B08D57"], ["Warm white", "#E6E2D9"], ["Leaf", "#3E5A34"], ["Ink", "#1c1c1c"]] },
    { n: 44, alt: "Cognac leather sofa under a black and white gallery wall on a deep teal wall",
      generic: ["sofa", "wall art", "green", "living room"], query: "teal wall, cognac leather",
      spots: [[86, 20, "Color", "Deep teal, eggshell"], [68, 70, "Material", "Cognac leather"], [52, 42, "Art", "Black and white gallery wall"], [31, 66, "Accent", "Forest velvet cushion"], [10, 83, "Object", "Turned wood side table"], [55, 95, "Material", "Berber shag rug"]],
      primary: [["Cognac leather sofa", 1], ["Deep teal wall", 0], ["Eclectic mid-century", -1]],
      detail: [["gallery wall", 2], ["velvet cushion", 3], ["turned side table", 4], ["berber rug", 5]],
      mood: "moody, collected, cozy",
      pal: [["Deep teal", "#263C3A"], ["Cognac", "#AE7045"], ["Forest", "#3F5B45"], ["Bone", "#E9E2D6"], ["Charcoal", "#363F42"]] }
  ];
  var lensImg = $("#lensImg"), photo = $("#lensPhoto"), lens = $("#lens"), zoom = $("#lensZoom"), tip = $("#lensTip"), spotsEl = $("#lensSpots");
  var picks = $("#lensPicks");
  var Z = 2.3, curL = 0, active = -1, lx = 0, ly = 0, idle = true, tourI = 0, tourT = null, lensVisible = false;
  var moveX, moveY;
  if (MOTION) { moveX = gsap.quickTo(lens, "x", { duration: 0.5, ease: "power3" }); moveY = gsap.quickTo(lens, "y", { duration: 0.5, ease: "power3" }); }
  function lensSize() { return lens.offsetWidth || 190; }

  LENS.forEach(function (d, i) {
    picks.insertAdjacentHTML("beforeend", '<button class="tp-pick" role="tab" aria-selected="' + (i === 0) + '" aria-label="Example ' + (i + 1) + '" data-i="' + i + '"><img src="' + thumb(d.n) + '" alt=""></button>');
  });
  function spans(arr, cls) { return arr.map(function (t) { return '<span data-s="' + t[1] + '">' + t[0] + "</span>"; }).join(""); }
  function renderLens(i, animate) {
    var d = LENS[i]; curL = i; active = -1;
    $$(".tp-pick", picks).forEach(function (b, k) { b.setAttribute("aria-selected", String(k === i)); });
    $("#tpGeneric").innerHTML = d.generic.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    $("#tpPrimary").innerHTML = spans(d.primary);
    $("#tpDetail").innerHTML = spans(d.detail);
    $("#tpMood").textContent = d.mood;
    $("#tpPal").innerHTML = d.pal.map(function (p) { return '<i style="background:' + p[1] + '"></i>'; }).join("");
    $("#tpPalN").innerHTML = d.pal.map(function (p) { return "<span>" + p[0] + "</span>"; }).join("");
    $("#tpQuery").textContent = "“" + d.query + "”";
    spotsEl.innerHTML = d.spots.map(function (s, k) {
      return '<button class="spot" type="button" style="left:' + s[0] + "%;top:" + s[1] + '%" data-k="' + k + '" aria-label="' + s[2] + ": " + s[3] + '"></button>';
    }).join("");
    zoom.style.backgroundImage = "url(" + full(d.n) + ")";
    if (animate && MOTION) {
      lensImg.classList.add("swap");
      var img = new Image(); img.onload = function () { photo.src = full(d.n); photo.alt = d.alt; lensImg.classList.remove("swap"); }; img.src = full(d.n);
      gsap.fromTo([".tp-generic-v span", "#tpPrimary span", "#tpDetail span", "#tpMood", "#tpPal i", "#tpPalN span"], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.025, ease: "power2.out", overwrite: true });
    } else { photo.src = full(d.n); photo.alt = d.alt; }
    tourI = 0;
    setTimeout(function () { goSpot(0); }, animate ? 350 : 0);
  }
  function spotXY(k) { var s = LENS[curL].spots[k]; return { x: s[0] / 100 * lensImg.clientWidth, y: s[1] / 100 * lensImg.clientHeight }; }
  function setLens(x, y, instant) {
    if (!lensVisible) {
      lensVisible = true;
      if (MOTION) { gsap.set(lens, { x: x, y: y }); moveX(x, x); moveY(y, y); gsap.to(lens, { opacity: 1, duration: 0.3 }); paintLens(); return; }
      lens.style.opacity = 1;
    }
    if (MOTION && !instant) { moveX(x); moveY(y); }
    else { if (hasGSAP) gsap.set(lens, { x: x, y: y }); else lens.style.transform = "translate(" + x + "px," + y + "px)"; lx = x; ly = y; paintLens(); }
  }
  function goSpot(k) { var p = spotXY(k); setLens(p.x, p.y); }
  function paintLens() {
    var W = lensImg.clientWidth, H = lensImg.clientHeight, L = lensSize();
    if (hasGSAP) { lx = gsap.getProperty(lens, "x"); ly = gsap.getProperty(lens, "y"); }
    zoom.style.backgroundSize = (W * Z) + "px " + (H * Z) + "px";
    zoom.style.backgroundPosition = (-(lx * Z - L / 2)) + "px " + (-(ly * Z - L / 2)) + "px";
    // nearest spot
    var best = -1, bd = L * 0.42;
    LENS[curL].spots.forEach(function (s, k) {
      var dx = s[0] / 100 * W - lx, dy = s[1] / 100 * H - ly, dd = Math.sqrt(dx * dx + dy * dy);
      if (dd < bd) { bd = dd; best = k; }
    });
    if (best !== active) {
      active = best;
      $$(".tp-primary span, .tp-detail span").forEach(function (sp) { sp.classList.toggle("hit", best >= 0 && +sp.getAttribute("data-s") === best); });
      if (best >= 0) {
        var s = LENS[curL].spots[best];
        $("#lensK").textContent = s[2]; $("#lensV").textContent = s[3];
        var sp = spotsEl.children[best]; if (sp) sp.classList.add("seen");
        tip.style.opacity = 1;
      } else tip.style.opacity = 0;
    }
    if (active >= 0) {
      var tw = tip.offsetWidth, th = tip.offsetHeight, tx = lx + L / 2 + 10, ty = ly - th / 2;
      if (tx + tw > W - 10) tx = lx - L / 2 - 10 - tw;
      if (tx < 10) { tx = Math.max(10, Math.min(W - tw - 10, lx - tw / 2)); ty = ly + L / 2 + 10; if (ty + th > H - 10) ty = ly - L / 2 - th - 10; }
      ty = Math.max(10, Math.min(H - th - 10, ty));
      tip.style.transform = "translate(" + tx + "px," + ty + "px)";
    }
  }
  var lensInView = false;
  if (hasGSAP) gsap.ticker.add(function () { if (lensVisible && lensInView) paintLens(); });

  function startTour() {
    stopTour();
    tourT = setInterval(function () { if (!idle) return; tourI = (tourI + 1) % LENS[curL].spots.length; goSpot(tourI); }, 2400);
  }
  function stopTour() { if (tourT) clearInterval(tourT); tourT = null; }
  var idleTimer;
  function wake(ms) { idle = false; clearTimeout(idleTimer); idleTimer = setTimeout(function () { idle = true; }, ms); }
  function local(e) { var r = lensImg.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  lensImg.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    var p = local(e); wake(1800); setLens(p.x, p.y);
  });
  lensImg.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse") return;
    var p = local(e); wake(5000); setLens(p.x, p.y);
  });
  spotsEl.addEventListener("focusin", function (e) { var k = e.target.getAttribute("data-k"); if (k != null) { wake(6000); goSpot(+k); } });
  spotsEl.addEventListener("click", function (e) { var k = e.target.getAttribute("data-k"); if (k != null) { wake(5000); goSpot(+k); } });
  $(".tagpanel").addEventListener("pointerover", function (e) {
    var s = e.target.getAttribute && e.target.getAttribute("data-s");
    if (s != null && +s >= 0) { wake(3000); goSpot(+s); }
  });
  picks.addEventListener("click", function (e) {
    var b = e.target.closest(".tp-pick"); if (!b) return;
    var i = +b.getAttribute("data-i"); if (i !== curL) renderLens(i, true);
  });
  picks.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var i = (curL + (e.key === "ArrowRight" ? 1 : LENS.length - 1)) % LENS.length;
    renderLens(i, true); picks.children[i].focus();
  });
  renderLens(0, false);
  onView(lensImg, function (v) { lensInView = v; if (v) { goSpot(tourI); if (!REDUCED) startTour(); } else stopTour(); }, { threshold: 0.05 });
  window.addEventListener("resize", function () { goSpot(tourI); });
  // preload the other rooms
  window.addEventListener("load", function () { LENS.slice(1).forEach(function (d) { new Image().src = full(d.n); }); });

  // custom tags (manual tagging demo)
  var ctagForm = $("#ctagForm"), ctagIn = $("#ctagIn"), touched = false;
  function addTag(t) {
    var el = document.createElement("span"); el.className = "ctag new"; el.textContent = t;
    ctagForm.parentNode.insertBefore(el, ctagForm);
    var all = $$(".ctag", ctagForm.parentNode); if (all.length > 4) all[0].remove();
  }
  ctagForm.addEventListener("submit", function (e) {
    e.preventDefault(); var t = ctagIn.value.trim(); if (!t) return;
    touched = true; addTag(t.charAt(0).toUpperCase() + t.slice(1)); ctagIn.value = "";
  });
  ctagIn.addEventListener("focus", function () { touched = true; });
  if (MOTION) {
    var demoed = false;
    onView(ctagForm, function (v) {
      if (!v || demoed || touched) return; demoed = true;
      var s = "Client favorite", i = 0;
      setTimeout(function typeIt() {
        if (touched) return;
        if (i <= s.length) { ctagIn.value = s.slice(0, i++); setTimeout(typeIt, 70); }
        else setTimeout(function () { if (!touched) { addTag(s); ctagIn.value = ""; } }, 500);
      }, 1400);
    }, { threshold: 1 });
  }

  /* ============================================================ HOW IT WORKS: scenes */
  var stage = $("#howStage"), steps = $$(".how-step"), scenes = $$(".scene");
  var desk = window.matchMedia("(min-width:960px)");
  function chromeTL(sc) {
    var br = $(".br", sc), cur = $(".cursor", br), badge = $(".qs-badge", br), ext = $(".ext", br), img = $(".br-img", br),
        stroke = $(".ext-stroke path", br), save = $(".ext-save", br), esL = $(".es-l", br), esS = $(".es-s", br), esD = $(".es-d", br), eImg = $(".ext-img", br);
    var tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    var pImg = at(img, br, 0.45, 0.55), pBadge = at(badge, br), pEImg = at(eImg, br, 0.7, 0.8), pSave = at(save, br, 0.5, 0.5);
    tl.set(cur, { x: br.clientWidth * 0.55, y: br.clientHeight * 0.95, scale: 1, opacity: 1 })
      .set(badge, { opacity: 0, scale: 0.6 }).set(ext, { opacity: 0, y: 12 }).set(stroke, { strokeDashoffset: 1 })
      .set(esL, { opacity: 1 }).set([esS, esD], { opacity: 0 })
      .to(cur, { x: pImg.x, y: pImg.y, duration: 1 })
      .to(badge, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, "-=0.25")
      .to(cur, { x: pBadge.x - 4, y: pBadge.y - 4, duration: 0.6 }, "+=0.15")
      .to(cur, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 })
      .to(ext, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" })
      .to(cur, { x: pEImg.x, y: pEImg.y, duration: 0.7 }, "+=0.1")
      .to(stroke, { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut" }, "+=0.05")
      .to(cur, { x: pSave.x, y: pSave.y, duration: 0.7 }, "+=0.2")
      .to(cur, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 })
      .to(esL, { opacity: 0, duration: 0.12 }).to(esS, { opacity: 1, duration: 0.12 }, "<")
      .to(esS, { opacity: 0, duration: 0.15 }, "+=0.75").to(esD, { opacity: 1, duration: 0.15 }, "<")
      .to({}, { duration: 1.9 })
      .to([ext, badge], { opacity: 0, duration: 0.35 })
      .to(cur, { opacity: 0, duration: 0.25 }, "<");
    return tl;
  }
  function shareTL(sc) {
    var scr = $(".ph-screen", sc), sh = $(".share", scr), card = $(".scard", scr), shareIc = $(".pa-share", scr), lo = $(".sa-loupe", scr), done = $(".btn-mini.pri", scr);
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(sh, { y: 0, yPercent: 105 }).set(card, { y: 0, yPercent: 130 }).to({}, { duration: 0.8 });
    tap(tl, scr, shareIc);
    tl.to(sh, { yPercent: 0, duration: 0.5 }, "-=0.2").to({}, { duration: 0.5 });
    tap(tl, scr, lo, 0.5, 0.35);
    tl.to(sh, { yPercent: 105, duration: 0.4, ease: "power2.in" }, "-=0.2")
      .to(card, { yPercent: 0, duration: 0.55 }, "-=0.1")
      .to({}, { duration: 2 });
    tap(tl, scr, done);
    tl.to(card, { yPercent: 130, duration: 0.45, ease: "power2.in" }, "-=0.25").to({}, { duration: 0.6 });
    return tl;
  }
  function appTL(sc) {
    var scr = $(".ph-screen", sc), fab = $(".fab", scr), nw = $(".pa-new", scr), pill = $(".tagging", nw), sheetEl = $(".pa-sheet", scr);
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(nw, { scale: 0.4, opacity: 0 }).set(pill, { opacity: 1 }).set(sheetEl, { y: 0, yPercent: 105 }).to({}, { duration: 0.7 });
    tap(tl, scr, fab);
    tl.to(fab, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 }, "<")
      .to(nw, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.6)" }, "+=0.2")
      .to(pill, { opacity: 0, duration: 0.3 }, "+=1.6");
    tap(tl, scr, nw, 0.5, 0.5, "+=0.3");
    tl.to(sheetEl, { yPercent: 0, duration: 0.55 }, "-=0.25")
      .fromTo($$(".pas-t, .pas-p, .pas-d, .pas-pal", sheetEl), { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4, immediateRender: false }, "-=0.2")
      .to({}, { duration: 2.4 })
      .to(sheetEl, { yPercent: 105, duration: 0.45, ease: "power2.in" })
      .to(nw, { opacity: 0, scale: 0.9, duration: 0.35 }, "+=0.3");
    return tl;
  }
  var sceneLoops = scenes.map(function (sc) {
    var k = +sc.getAttribute("data-scene");
    return hasGSAP ? looper(function () { return [chromeTL, shareTL, appTL][k](sc); }) : null;
  });
  var activeStep = -1;
  function setStep(i) {
    if (i === activeStep) return; activeStep = i;
    steps.forEach(function (s, k) { s.classList.toggle("on", k === i); });
    scenes.forEach(function (sc, k) { sc.classList.toggle("on", k === i); });
    if (MOTION) sceneLoops.forEach(function (l, k) { if (k === i) { l.reset(); l.play(); } else l.pause(); });
  }
  function layoutHow() {
    if (desk.matches) scenes.forEach(function (sc) { stage.appendChild(sc); });
    else scenes.forEach(function (sc) { steps[+sc.getAttribute("data-scene")].appendChild(sc); });
    activeStep = -1;
    if (desk.matches) setStep(0); else { steps.forEach(function (s) { s.classList.add("on"); }); scenes.forEach(function (s) { s.classList.add("on"); }); }
    if (hasGSAP) ScrollTrigger.refresh();
  }
  layoutHow();
  desk.addEventListener ? desk.addEventListener("change", layoutHow) : desk.addListener(layoutHow);
  if ("IntersectionObserver" in window) {
    var stepTexts = steps.map(function (s) { return $(".hs-text", s); });
    var stepIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting && desk.matches) setStep(stepTexts.indexOf(e.target)); });
    }, { rootMargin: "-38% 0px -38% 0px" });
    stepTexts.forEach(function (s) { stepIO.observe(s); });
  }
  if (MOTION) {
    sceneLoops.forEach(function (l) { loopers.push(l); });
    scenes.forEach(function (sc, i) {
      onView(sc, function (v) { if (desk.matches) return; v ? sceneLoops[i].play() : sceneLoops[i].pause(); }, { threshold: 0.35 });
    });
    // desktop: pause the active scene when the whole section is off screen
    onView($("#how"), function (v) { if (!desk.matches || activeStep < 0) return; v ? sceneLoops[activeStep].play() : sceneLoops[activeStep].pause(); }, { threshold: 0 });
  } else if (hasGSAP) {
    sceneLoops[0].freeze(0.86); sceneLoops[1].freeze(0.7); sceneLoops[2].freeze(0.8);
  }

  /* ============================================================ STUDIOS: live shared board */
  var BOARD = [
    { n: 10, who: "Michael", ini: "MK", src: "instagram.com", t: "Shaker cabinets, leather pulls" },
    { n: 5, who: "Lisa", ini: "L", src: "pinterest.com", t: "Brushed brass pendants" },
    { n: 40, who: "Monica", ini: "MO", src: "archdigest.com", t: "Emerald velvet dining" },
    { n: 12, who: "You", ini: "M", me: true, src: "camera roll", t: "Whitewashed oak stool" },
    { n: 4, who: "Lisa", ini: "L", src: "dezeen.com", t: "Brick loft bar seating" },
    { n: 46, who: "Michael", ini: "MK", src: "houzz.com", t: "Open kitchen, cognac leather" }
  ];
  var bdGrid = $("#bdGrid"), feed = $("#feedList"), bdCount = $("#bdCount");
  bdGrid.innerHTML = BOARD.map(function () { return '<div class="bt"></div>'; }).join("");
  var cells = $$(".bt", bdGrid);
  function fillCell(i, withPill) {
    var d = BOARD[i];
    cells[i].innerHTML = '<img src="' + thumb(d.n) + '" alt="" decoding="async">' +
      '<span class="bt-cred"><b class="' + (d.me ? "me" : "") + '">' + d.ini.charAt(0) + "</b>" + d.who + " <em>· " + d.src + "</em></span>" +
      (withPill ? '<span class="tagging"><i></i>Tagging…</span>' : "");
  }
  function feedItem(i) {
    var d = BOARD[i];
    var av = d.me ? '<span class="avatar xs">M</span>' : '<span class="mav">' + d.ini + "</span>";
    var li = document.createElement("li");
    li.innerHTML = av + '<p class="feed-t"><b>' + d.who + "</b> " + (d.me ? "added" : "saved") + " <b>" + d.t + "</b><span>from " + d.src + " · just now</span></p>";
    feed.insertBefore(li, feed.firstChild);
    while (feed.children.length > 5) feed.lastChild.remove();
    return li;
  }
  var boardLoop = hasGSAP ? looper(function () {
    var tl = gsap.timeline();
    tl.call(function () { cells.forEach(function (c) { c.innerHTML = ""; }); feed.innerHTML = ""; bdCount.textContent = "0 items"; });
    BOARD.forEach(function (d, i) {
      tl.call(function () {
        fillCell(i, true); bdCount.textContent = (i + 1) + (i ? " items" : " item");
        var li = feedItem(i);
        gsap.from($("img", cells[i]), { scale: 1.12, opacity: 0, duration: 0.7, ease: "power3.out" });
        gsap.from($(".bt-cred", cells[i]), { y: 8, opacity: 0, duration: 0.4, delay: 0.25 });
        gsap.from(li, { opacity: 0, y: -10, duration: 0.45, ease: "power2.out" });
        gsap.to($(".tagging", cells[i]), { opacity: 0, duration: 0.3, delay: 1.3 });
      }, null, i ? "+=1.5" : "+=0.4");
    });
    tl.to({}, { duration: 4.5 }).to(cells, { opacity: 0, duration: 0.4, stagger: 0.04 })
      .call(function () { cells.forEach(function (c) { c.innerHTML = ""; }); feed.innerHTML = ""; bdCount.textContent = "0 items"; })
      .set(cells, { opacity: 1 }).to({}, { duration: 0.4 });
    return tl;
  }) : null;
  if (MOTION) { loopers.push(boardLoop); onView($("#boardDemo"), function (v) { v ? boardLoop.play() : boardLoop.pause(); }, { threshold: 0.25 }); }
  else { BOARD.forEach(function (d, i) { fillCell(i, false); }); for (var fi = 0; fi < 5; fi++) feedItem(fi); bdCount.textContent = BOARD.length + " items"; }

  /* ============================================================ CANVAS: drag from the sidebar */
  var cvBody = $(".cv-body"), cvCur = $("#cvCursor"), slotA = $("#slotA"), slotB = $("#slotB");
  function ghostFor(tile) {
    var g = document.createElement("span"); g.className = "ghost";
    g.innerHTML = '<img src="' + $("img", tile).src + '" alt="">'; g.style.opacity = 0;
    cvBody.appendChild(g); return g;
  }
  function cvTL() {
    $$(".ghost", cvBody).forEach(function (g) { g.remove(); });
    var tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    var t1 = $('[data-n="05"]', cvBody), t2 = $('[data-n="12"]', cvBody);
    tl.call(function () { slotA.innerHTML = ""; slotB.innerHTML = ""; })
      .set(cvCur, { x: cvBody.clientWidth * 0.35, y: cvBody.clientHeight * 0.8, scale: 1, opacity: 1 });
    [[t1, slotA, 5], [t2, slotB, 12]].forEach(function (job, idx) {
      var tile = job[0], slot = job[1], tr = at(tile, cvBody), sr = at(slot, cvBody), g = ghostFor(tile);
      tl.to(cvCur, { x: tr.x, y: tr.y, duration: 0.8 }, idx ? "+=0.6" : "+=0.3")
        .to(cvCur, { scale: 0.85, duration: 0.12 })
        .set(g, { x: tr.l, y: tr.t, width: tr.w, height: tr.h, opacity: 1, rotation: 0 })
        .call(function () { tile.classList.add("lift"); })
        .to(g, { rotation: -3, scale: 1.04, duration: 0.2, ease: "power2.out" })
        .addLabel("drag" + idx)
        .to(g, { x: sr.l, y: sr.t, width: sr.w, height: sr.h, rotation: 0, scale: 1, duration: 1.2 }, "drag" + idx)
        .to(cvCur, { x: sr.l + sr.w * 0.5, y: sr.t + sr.h * 0.5, duration: 1.2 }, "drag" + idx)
        .call(function () { slot.classList.add("over"); }, null, "drag" + idx + "+=0.85")
        .call(function () { slot.classList.remove("over"); slot.innerHTML = '<img src="' + full(job[2]) + '" alt="">'; tile.classList.remove("lift"); })
        .set(g, { opacity: 0 })
        .to(cvCur, { scale: 1, duration: 0.12 });
    });
    tl.to(cvCur, { x: cvBody.clientWidth * 0.3, y: cvBody.clientHeight * 0.85, duration: 0.8 }, "+=0.2")
      .to({}, { duration: 2.2 })
      .to([slotA, slotB].map(function (s) { return s; }), { opacity: 0, duration: 0.35 })
      .call(function () { slotA.innerHTML = ""; slotB.innerHTML = ""; })
      .set([slotA, slotB], { opacity: 1 });
    return tl;
  }
  var cvLoop = hasGSAP ? looper(cvTL) : null;
  if (MOTION) { loopers.push(cvLoop); onView($("#cvDemo"), function (v) { v ? cvLoop.play() : cvLoop.pause(); }, { threshold: 0.3 }); }
  else { slotA.innerHTML = '<img src="' + full(5) + '" alt="">'; slotB.innerHTML = '<img src="' + full(12) + '" alt="">'; cvCur.style.display = "none"; }

  /* ============================================================ FAQ: smooth open/close */
  $$(".qa").forEach(function (d) {
    var sum = $("summary", d), body = $(".qa-a", d);
    sum.addEventListener("click", function (e) {
      if (!MOTION) return;
      e.preventDefault();
      if (d.open) {
        gsap.fromTo(body, { height: body.offsetHeight }, { height: 0, duration: 0.32, ease: "power2.inOut", onComplete: function () { d.open = false; body.style.height = ""; } });
      } else {
        d.open = true;
        gsap.fromTo(body, { height: 0 }, { height: body.scrollHeight, duration: 0.4, ease: "power3.out", onComplete: function () { body.style.height = ""; } });
      }
    });
  });

  /* ============================================================ FINAL wall */
  (function () {
    var fw = $("#finalWall"); if (!fw) return;
    var a = [34, 38, 40, 44, 21, 27, 9, 5, 20, 16, 10, 46], b = [42, 43, 37, 8, 30, 28, 13, 19, 24, 2, 11, 36];
    function row(list) { var s = list.map(function (n) { return '<img src="' + thumb(n) + '" alt="" loading="lazy" decoding="async">'; }).join(""); return '<div class="fw-row">' + s + s + "</div>"; }
    fw.innerHTML = row(a) + row(b);
  })();

  /* ============================================================ ENTRANCE + SCROLL REVEALS */
  if (!MOTION) return;

  function splitReveal(el, opts) {
    gsap.set(el, { visibility: "visible" });
    SplitText.create(el, {
      type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
      onSplit: function (self) {
        return gsap.from(self.lines, Object.assign({ yPercent: 108, duration: 1, ease: "expo.out", stagger: 0.09 }, opts));
      }
    });
  }
  function intro() {
    splitReveal($("#heroH1"), { delay: 0.05 });
    var heroRise = $$(".hero [data-rise]");
    gsap.to(heroRise.filter(function (e) { return !e.classList.contains("hero-demo"); }), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.35 });
    gsap.fromTo(".hero-demo", { opacity: 0, y: 48, rotationX: 9, transformPerspective: 1800, transformOrigin: "50% 0%" },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.4, ease: "expo.out", delay: 0.45, clearProps: "transform" });
    $$("[data-split]").forEach(function (el) {
      splitReveal(el, { scrollTrigger: { trigger: el, start: "top 86%", once: true } });
    });
    ScrollTrigger.batch($$("[data-rise]").filter(function (e) { return !e.closest(".hero"); }), {
      start: "top 90%", once: true,
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }); }
    });
    // subtle depth on the studio board and canvas as they arrive
    [".board-demo", ".cv-demo"].forEach(function (s) {
      gsap.from(s, { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 88%", once: true } });
    });
    ScrollTrigger.refresh();
  }
  var started = false;
  function go() { if (started) return; started = true; intro(); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(go); setTimeout(go, 1500); } else go();
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
