// WCAG 2.x contrast for the theme tokens. Run: node contrast-check.js
const T = {
  Vellum: { page: '#F7F2E8', surface: '#FBF8F1', ink: '#2A211C', ink2: '#6B5E54', accent: '#7A2430', gold: '#A8822E', wash: '#F1E1A6', tint: '#EEE5D5' },
  Parchment: { page: '#EFE4CF', surface: '#F5ECDB', ink: '#3B2A1E', ink2: '#6E5A47', accent: '#6E2A2A', gold: '#9A7628', wash: '#E8D59A', tint: '#E6D8BE' },
  Lamplight: { page: '#1A1714', surface: '#24201C', ink: '#E6DCCB', ink2: '#A89A88', accent: '#C98B7E', gold: '#C9A55C', wash: '#4A3F22', tint: '#2F2924' }
};
const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const pairs = [['ink', 'page', 7], ['ink', 'surface', 7], ['ink', 'wash', 7], ['ink', 'tint', 7], ['ink2', 'page', 4.5], ['ink2', 'surface', 4.5], ['ink2', 'tint', 4.5], ['accent', 'page', 4.5], ['accent', 'surface', 4.5], ['page', 'accent', 4.5], ['gold', 'page', 3]];
let fail = 0;
for (const [name, t] of Object.entries(T)) {
  console.log(`\n${name}`);
  for (const [fg, bg, min] of pairs) {
    const r = cr(t[fg], t[bg]); const ok = r >= min; if (!ok) fail++;
    console.log(`  ${(fg + ' on ' + bg).padEnd(20)} ${r.toFixed(2).padStart(6)}:1  ${ok ? 'pass' : 'FAIL'} (needs ${min})`);
  }
}
process.exitCode = fail ? 1 : 0;
