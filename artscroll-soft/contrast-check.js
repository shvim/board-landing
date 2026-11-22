// WCAG 2.x contrast for the theme tokens. Run: node contrast-check.js
const T = {
  Linen: { page: '#F3F4F1', surface: '#FCFCFB', ink: '#1F2430', ink2: '#5A6170', accent: '#34507F', gold: '#6886B9', wash: '#DEE7F4', tint: '#E6EBF2' },
  Mist: { page: '#E9EDF2', surface: '#F6F8FA', ink: '#1E2633', ink2: '#556073', accent: '#304B79', gold: '#6585BA', wash: '#D5E0F0', tint: '#DCE4EF' },
  Night: { page: '#12151B', surface: '#1A1F27', ink: '#E4E8EF', ink2: '#9AA4B4', accent: '#9DB5DE', gold: '#7F9CCB', wash: '#24324A', tint: '#243045' }
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
