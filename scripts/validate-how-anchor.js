"use strict";

const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");

const checks = [
  ['How-it-works anchor exists', /href="#how"/],
  ['How-it-works target exists', /<section class="how" id="how">/],
  ['Anchor arrival clears timeline opacity', /\.how\.anchor-arrival \.vt-step\{opacity:1;transform:none;\}/],
  ['Anchor arrival accounts for fixed nav', /\.how\{scroll-margin-top:84px;\}/],
  ['Anchor arrival state is temporary', /howArrivalTimer = window\.setTimeout/],
  ['Reduced-motion fallback remains intact', /document\.querySelectorAll\("\.vt-step"\)\.forEach\(function\(st\)\{ st\.classList\.add\("active"\); \}\);/]
];

const failures = checks.filter(([, pattern]) => !pattern.test(html));
if (failures.length) {
  console.error(failures.map(([label]) => `FAIL: ${label}`).join("\n"));
  process.exit(1);
}

console.log(`PASS: ${checks.length} How-it-works anchor regression checks`);
