/* Loupe landing v2. No library needed. Everything is visible without JS; motion only plays over visible content. */
(function () {
  "use strict";
  var CONFIG = {
    SIGNUP_URL: "https://board-2-shvim.web.app/",
    SIGNIN_URL: "https://board-2-shvim.web.app/",
    CHROME_URL: null,    // Chrome Web Store listing: when set, desktop CTAs become "Add to Chrome — free"
    APPSTORE_URL: null,  // App Store listing: when set, iPhone CTAs become "Get the iPhone app — free"
    PRICING_URL: null    // pricing page: when set, "See plans" appears
  };
  var IMG = (document.documentElement.getAttribute("data-img-base") || "../images/");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var thumb = function (n) { return IMG + "t/img_" + pad(n) + ".jpg"; };
  var full = function (n) { return IMG + "img_" + pad(n) + ".jpg"; };

  /* Links and context-aware primary CTA */
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
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  var menu = $("#navMenu"), sheet = $("#sheet");
  function setMenu(open) {
    sheet.hidden = !open; menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    $("use", menu).setAttribute("href", open ? "#i-x" : "#i-menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  menu.addEventListener("click", function () { setMenu(sheet.hidden); });
  $$("#sheet a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) setMenu(false); });

  /* Hero: the first frame already shows a finished search. One short demo then rests; Replay toggles. */
  var SEARCHES = [
    { q: "cognac leather sofa, deep teal wall", terms: ["cognac leather", "deep teal"], res: [
      [44, "Teal Gallery Living", "cognac leather · deep teal · gallery wall"],
      [46, "Open Kitchen Lounge", "cognac leather · sage-teal wall · white oak"],
      [21, "Cognac Leather Lounge", "cognac leather · rattan pendant · mid-century"],
      [27, "Macramé and Cognac", "cognac leather · macramé · brass sputnik"],
      [42, "Cognac Lounge Corner", "cognac leather chair · open shelving"]] },
    { q: "emerald velvet, brass", terms: ["emerald velvet", "emerald", "brass"], res: [
      [40, "Emerald Velvet Dining", "emerald velvet · brass-capped legs · globe chandelier"],
      [8, "Emerald Lounge Corner", "emerald velvet · steel windows · black floor lamp"],
      [5, "Brass Dome Pendants", "brushed brass · dome pendant · warm metallic"],
      [9, "Emerald Console Vignette", "emerald lacquer · whitewashed brick · pampas"],
      [37, "Channel-Tufted Bedroom", "channel tufting · brass sputnik · chevron rug"]] }
  ];
  var win = $("#heroWin"), hq = $("#hq"), hcount = $("#hcount"), cards = $$(".res", win), current = 0, busy = false;
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function markTags(tags, terms) {
    return tags.split(" · ").map(function (t) {
      var hit = terms.some(function (w) { return t.indexOf(w) >= 0; });
      return hit ? '<em class="m">' + esc(t) + "</em>" : esc(t);
    }).join(" · ");
  }
  function paint(i) {
    var S = SEARCHES[i];
    cards.forEach(function (c, k) {
      var r = S.res[k]; $("img", c).src = k === 0 ? full(r[0]) : thumb(r[0]);
      $("b", c).textContent = r[1]; $("figcaption span", c).innerHTML = markTags(r[2], S.terms);
    });
    hcount.textContent = S.res.length;
    win.setAttribute("aria-label", "Loupe library: a search for “" + S.q + "” returns " + S.res.length + " saved interiors, each tagged with materials, colors and styles.");
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function preload(i) { SEARCHES[i].res.forEach(function (r, k) { new Image().src = k === 0 ? full(r[0]) : thumb(r[0]); }); }
  async function run(next) {
    if (busy) return; busy = true;
    var target = SEARCHES[next];
    if (REDUCED) { hq.textContent = target.q; paint(next); current = next; busy = false; return; }
    win.classList.add("typing");
    var s = hq.textContent;
    while (s.length) { s = s.slice(0, -2); hq.textContent = s; await wait(14); }
    for (var i = 1; i <= target.q.length; i++) { hq.textContent = target.q.slice(0, i); await wait(42 + (i % 3) * 14); }
    await wait(260);
    cards.forEach(function (c) { c.classList.add("swap"); });
    await wait(280);
    paint(next);
    cards.forEach(function (c, k) { setTimeout(function () { c.classList.remove("swap"); }, 60 + k * 70); });
    await wait(700);
    win.classList.remove("typing");
    current = next; busy = false;
  }
  $("#replay").addEventListener("click", function () { run((current + 1) % SEARCHES.length); });
  preload(1);
  if (!REDUCED && "IntersectionObserver" in window) {
    var played = false;
    new IntersectionObserver(function (es, o) {
      es.forEach(function (e) { if (e.isIntersecting && !played) { played = true; o.disconnect(); setTimeout(function () { run(1); }, 1600); } });
    }, { threshold: 0.6 }).observe(win);
  }

  /* Try it: preset descriptions always return results */
  var POOL = {
    34: ["Terracotta Sofa, Sage Wall", "terracotta tweed · sage green · tapered oak legs"],
    20: ["Sage Calm Living", "sage limewash · knit pouf · turned walnut tables"],
    46: ["Open Kitchen Lounge", "cognac leather · sage-teal wall · white oak floor"],
    38: ["Rust Linen Bedroom", "limewash plaster · rust linen · slatted oak · japandi"],
    16: ["Oak Mirror Bedroom", "round oak mirror · walnut bed · white lacquer"],
    28: ["Monochrome Bedroom", "white oak floor · graphic wool rug · japandi calm"],
    40: ["Emerald Velvet Dining", "emerald velvet · brass-capped legs · globe chandelier"],
    8: ["Emerald Lounge Corner", "emerald velvet · steel windows · black floor lamp"],
    9: ["Emerald Console Vignette", "emerald lacquer · whitewashed brick · pampas"],
    5: ["Brass Dome Pendants", "brushed brass · dome pendant · warm metallic"],
    44: ["Teal Gallery Living", "cognac leather · deep teal · gallery wall"],
    21: ["Cognac Leather Lounge", "cognac leather · rattan pendant · mid-century"],
    27: ["Macramé and Cognac", "cognac leather · macramé · brass sputnik"],
    39: ["Dark Timber Bedroom", "ebonised panelling · leather bench · moody"],
    36: ["Teak Retreat Bedroom", "dark teak · warm cove light · moody"],
    19: ["Forest Green Lounge", "forest green wall · walnut sideboard · moody"]
  };
  var ORDER = [34, 38, 40, 44, 20, 16, 8, 21, 46, 28, 9, 27, 39, 5, 36, 19];
  var PRESETS = [
    { q: "sage walls, warm wood", terms: ["sage", "oak", "walnut"], hits: [20, 34, 46] },
    { q: "japandi bedroom, oak", terms: ["japandi", "oak"], hits: [38, 28, 16] },
    { q: "emerald velvet, brass", terms: ["emerald", "brass"], hits: [40, 8, 9, 5] },
    { q: "cognac leather, deep teal", terms: ["cognac leather", "deep teal"], hits: [44, 21, 27, 46] },
    { q: "moody, dark timber", terms: ["moody", "ebonised", "teak", "walnut"], hits: [39, 36, 19] }
  ];
  var wall = $("#wall");
  wall.innerHTML = ORDER.map(function (n) { return '<span data-n="' + n + '"><img src="' + thumb(n) + '" alt="" width="360" height="450" loading="lazy" decoding="async"></span>'; }).join("");
  var tiles = $$("span", wall);
  function hl(tags, terms) {
    return tags.split(" · ").map(function (t) { var hit = terms.some(function (w) { return t.indexOf(w) >= 0; }); return hit ? "<mark>" + esc(t) + "</mark>" : esc(t); }).join(" · ");
  }
  function pick(i) {
    var P = PRESETS[i];
    $$(".preset").forEach(function (b, k) { b.setAttribute("aria-pressed", String(k === i)); });
    tiles.forEach(function (t) { var hit = P.hits.indexOf(+t.getAttribute("data-n")) >= 0; t.classList.toggle("hit", hit); t.classList.toggle("dim", !hit); });
    $("#foundN").textContent = P.hits.length; $("#foundQ").textContent = "“" + P.q + "”";
    $("#foundList").innerHTML = P.hits.map(function (n) {
      return '<li><img src="' + thumb(n) + '" alt="" width="52" height="64" loading="lazy"><p><b>' + esc(POOL[n][0]) + "</b><span>" + hl(POOL[n][1], P.terms) + "</span></p></li>";
    }).join("");
  }
  $("#presets").addEventListener("click", function (e) { var b = e.target.closest(".preset"); if (b) pick(+b.getAttribute("data-p")); });
  pick(0);
})();
