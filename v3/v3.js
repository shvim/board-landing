/* Loupe landing v3 — darkroom gallery. No library. Headline, search and buttons are visible before any script runs. */
(function () {
  "use strict";
  var CONFIG = {
    SIGNUP_URL: "https://board-2-shvim.web.app/",
    SIGNIN_URL: "https://board-2-shvim.web.app/",
    CHROME_URL: null,    // when set, desktop Chrome CTAs read "Add to Chrome — free"
    APPSTORE_URL: null,  // when set, iPhone CTAs read "Get the iPhone app — free"
    PRICING_URL: null    // when set, "See plans" appears
  };
  var IMG = "../images/";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var thumb = function (n) { return IMG + "t/img_" + pad(n) + ".jpg"; };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* Links + context-aware CTA */
  var L = { signup: CONFIG.SIGNUP_URL, signin: CONFIG.SIGNIN_URL, chrome: CONFIG.CHROME_URL || CONFIG.SIGNUP_URL, appstore: CONFIG.APPSTORE_URL || CONFIG.SIGNUP_URL, pricing: CONFIG.PRICING_URL };
  $$("[data-href]").forEach(function (a) { var u = L[a.getAttribute("data-href")]; if (u) a.href = u; });
  if (CONFIG.PRICING_URL) $("#plansLink").hidden = false;
  var ua = navigator.userAgent, isIOS = /iPhone|iPod/.test(ua), isDesktopChrome = /Chrome\//.test(ua) && !/Mobile|Edg\//.test(ua);
  $$('[data-cta="primary"]').forEach(function (a) {
    if (isIOS && CONFIG.APPSTORE_URL) { a.href = CONFIG.APPSTORE_URL; a.textContent = "Get the iPhone app — free"; }
    else if (isDesktopChrome && CONFIG.CHROME_URL) { a.href = CONFIG.CHROME_URL; a.textContent = "Add to Chrome — free"; }
  });

  /* Nav */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 12); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  var menu = $("#navMenu"), sheet = $("#sheet");
  function setMenu(open) {
    sheet.hidden = !open; menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    $("use", menu).setAttribute("href", open ? "#i-x" : "#i-menu");
    document.body.style.overflow = open ? "hidden" : "";
    nav.classList.toggle("scrolled", open || window.scrollY > 12);
  }
  menu.addEventListener("click", function () { setMenu(sheet.hidden); });
  $$("#sheet a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) setMenu(false); });

  /* The wall */
  var TAGS = {
    44: ["Teal Gallery Living", "cognac leather · deep teal"], 21: ["Cognac Leather Lounge", "cognac leather · rattan"],
    27: ["Macramé and Cognac", "cognac leather · macramé"], 46: ["Open Kitchen Lounge", "cognac leather · teal wall"],
    40: ["Emerald Velvet Dining", "emerald velvet · brass"], 8: ["Emerald Lounge", "emerald velvet · steel windows"],
    9: ["Emerald Console", "emerald lacquer · brass vase"], 5: ["Brass Dome Pendants", "brushed brass · warm metallic"],
    38: ["Rust Linen Bedroom", "japandi · limewash · oak"], 16: ["Oak Mirror Bedroom", "warm oak · walnut bed"],
    28: ["Monochrome Bedroom", "japandi · white oak"], 34: ["Terracotta Sofa", "terracotta tweed · sage wall"],
    20: ["Sage Calm Living", "sage limewash · warm wood"]
  };
  var QUERIES = [
    { q: "cognac leather, deep teal", hits: [44, 21, 27, 46] },
    { q: "emerald velvet, brass", hits: [40, 8, 9, 5] },
    { q: "japandi bedroom, warm oak", hits: [38, 16, 28] },
    { q: "terracotta, sage walls", hits: [34, 20] }
  ];
  var FILL = [1, 2, 4, 6, 11, 13, 14, 15, 17, 18, 19, 23, 24, 25, 26, 29, 30, 31, 32, 33, 36, 37, 39, 41, 42, 43, 3, 7, 10, 12, 22];
  function tile(n) {
    var t = TAGS[n];
    return '<div class="tile" data-n="' + n + '"><img src="' + thumb(n) + '" alt="" width="360" height="450" decoding="async">' +
      (t ? '<p class="tg">' + t[0] + "<span>" + t[1] + "</span></p>" : "") + "</div>";
  }
  function buildWall(el, withHits) {
    var W = window.innerWidth, cols = W < 768 ? 4 : Math.min(9, Math.max(6, Math.ceil(W / 200) + 1)), per = 6;
    var grid = []; for (var c = 0; c < cols; c++) grid.push(new Array(per).fill(null));
    if (withHits) {
      // outer columns first, so lit photos sit beside the headline, not under it
      var edge = cols >= 6 ? 1 : 0, order = []; for (var k = edge; k < Math.ceil(cols / 2); k++) { order.push(k); if (cols - 1 - k !== k) order.push(cols - 1 - k); }
      var hits = Object.keys(TAGS).map(Number), slot = 0;
      [0, 1].forEach(function (copy) {
        hits.forEach(function (n, i) {
          var col = order[(i + copy * 3) % Math.min(order.length, cols < 6 ? cols : 4)];
          var row = 1 + ((i + copy * 2 + slot) % (per - 1));
          var tries = 0; while (grid[col][row] !== null && tries < per) { row = (row + 1) % per; tries++; }
          if (grid[col][row] === null) grid[col][row] = n;
        });
        slot++;
      });
    }
    var f = 0, html = "";
    for (var c2 = 0; c2 < cols; c2++) {
      var items = grid[c2].map(function (n) { return n === null ? FILL[(f++) % FILL.length] : n; });
      var s = items.map(tile).join("");
      html += '<div class="col" style="--d:' + (95 + (c2 % 3) * 22) + 's">' + s + s + "</div>";
    }
    el.innerHTML = html;
  }
  var wall = $("#wall"), wall2 = $("#wall2");
  buildWall(wall, true); buildWall(wall2, false);

  var qEl = $("#q"), foundN = $("#foundN"), search = $("#search"), cur = 0, paused = REDUCED, running = false;
  function light(i) {
    var hits = QUERIES[i].hits;
    $$(".tile", wall).forEach(function (t) { t.classList.toggle("lit", hits.indexOf(+t.getAttribute("data-n")) >= 0); });
    wall.classList.add("searching");
    foundN.textContent = hits.length;
    search.setAttribute("aria-label", "A search for “" + QUERIES[i].q + "” lighting up the matching saved interiors.");
  }
  light(0);

  async function cycle() {
    if (running) return; running = true;
    while (!paused) {
      await wait(3800); if (paused) break;
      var next = (cur + 1) % QUERIES.length;
      search.classList.add("searching-now");
      $$(".tile.lit", wall).forEach(function (t) { t.classList.remove("lit"); });
      var s = qEl.textContent;
      while (s.length && !paused) { s = s.slice(0, -2); qEl.textContent = s; await wait(16); }
      var target = QUERIES[next].q;
      for (var i = 1; i <= target.length && !paused; i++) { qEl.textContent = target.slice(0, i); await wait(48 + (i % 3) * 16); }
      qEl.textContent = target; await wait(220);
      search.classList.remove("searching-now");
      cur = next; light(cur);
    }
    running = false;
  }

  /* Pause control (WCAG 2.2.2) */
  var toggle = $("#motionToggle");
  function setPaused(p) {
    paused = p;
    document.body.classList.toggle("paused", p);
    toggle.setAttribute("aria-pressed", String(p));
    $("use", toggle).setAttribute("href", p ? "#i-play" : "#i-pause");
    $("span", toggle).textContent = p ? "Play motion" : "Pause motion";
    if (!p) cycle();
  }
  toggle.addEventListener("click", function () { setPaused(!paused); });
  if (!REDUCED) {
    // only animate while the hero is on screen
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (toggle.getAttribute("aria-pressed") === "true") return; paused = !e.isIntersecting; if (!paused) cycle(); });
      }, { threshold: 0.2 }).observe($("#top"));
    } else cycle();
  }

  /* Reveals: transform only, content always visible */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.25 });
    $$("[data-reveal], #plate").forEach(function (el) { io.observe(el); });
  } else $$("[data-reveal], #plate").forEach(function (el) { el.classList.add("in"); });
})();
