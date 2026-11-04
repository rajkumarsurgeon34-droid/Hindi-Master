// Sanity-checks the bundled 90-day course before an APK is built.
// Run: node tools/check-course.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'app', 'src', 'main', 'assets');
const L = ['en', 'ta', 'kn', 'ml', 'te', 'mr'];
const script = { en: /[A-Za-z]/, ta: /[஀-௿]/, kn: /[ಀ-೿]/, ml: /[ഀ-ൿ]/, te: /[ఀ-౿]/, mr: /[ऀ-ॿ]/ };
const ctx = { window: {} }; ctx.window.COURSE = []; vm.createContext(ctx);
for (let i = 1; i <= 6; i++) vm.runInContext(fs.readFileSync(path.join(dir, 'course', `level${i}.js`), 'utf8'), ctx, { filename: `level${i}.js` });
const fsx = require('fs'), cdir = path.join(dir, 'course');
ctx.window.EXTRA = [];
for (const f of fsx.readdirSync(cdir).filter(f => /^extra.*\.js$/.test(f)).sort()) vm.runInContext(fsx.readFileSync(path.join(cdir, f), 'utf8'), ctx, { filename: f });
const problems = [], C = ctx.window.COURSE;
const MIN = 25, more = {};
for (const txt of ctx.window.EXTRA) { let cur = null; txt.split('\n').forEach((l, n) => { l = l.trim(); if (!l) return; if (l[0] === '#') { cur = +l.slice(1); more[cur] = more[cur] || []; return; } const f = l.split('|').map(x => x.trim()); if (f.length !== 8 || f.some(x => !x)) { problems.push(`extra day ${cur}: bad line "${l.slice(0, 40)}" (${f.length} fields)`); return; } const sc = [null, ...L.map(x => script[x])]; f.slice(2).forEach((x, i) => { if (!script[L[i]].test(x)) problems.push(`extra day ${cur}: "${f[0]}" ${L[i]} wrong script`); }); if (!/[ऀ-ॿ]/.test(f[0])) problems.push(`extra day ${cur}: "${f[0]}" not Devanagari`); more[cur].push(f); }); }
const days = C.map(c => c.d).sort((a, b) => a - b);
for (let d = 1; d <= 90; d++) if (!days.includes(d)) problems.push(`day ${d} is missing`);
if (C.length !== 90) problems.push(`expected 90 days, found ${C.length}`);
for (const c of C) {
  const p = m => problems.push(`day ${c.d}: ${m}`);
  if (!Array.isArray(c.t) || c.t.length !== 6) p('needs 6 titles');
  else c.t.forEach((t, i) => { if (!t || !script[L[i]].test(t)) p(`title ${L[i]} empty or wrong script`); });
  if (!Array.isArray(c.x) || c.x.length !== 6) p('needs 6 explanations');
  else c.x.forEach((t, i) => { if (!t || t.length < 40 || !script[L[i]].test(t)) p(`explanation ${L[i]} empty/short/wrong script`); });
  const tot = (c.w ? c.w.length : 0) + (more[c.d] || []).length; if (tot < MIN) p(`only ${tot} examples, need ${MIN}`);
  const seen = new Set(); (c.w || []).concat(more[c.d] || []).forEach(w => { if (seen.has(w[0])) p(`duplicate example "${w[0]}"`); seen.add(w[0]); });
  if (!Array.isArray(c.w) || c.w.length < 5) p('needs at least 5 words');
  else c.w.forEach(w => { if (w.length !== 8 || w.some(x => !String(x).trim())) p(`word "${w[0]}" must have 8 filled fields`); });
}
const i18n = { window: {} }; vm.createContext(i18n); vm.runInContext(fs.readFileSync(path.join(dir, 'i18n.js'), 'utf8'), i18n);
const I = i18n.window.I18N;
for (const l of L) for (const k of Object.keys(I.en)) if (I[l] === undefined || I[l][k] === undefined) problems.push(`interface text "${k}" missing for ${l}`);
for (const f of ['index.html', 'app.js', 'app.css', 'legacy.css', 'cartoons.js', 'i18n2.js', 'refdata.js', 'stories.js', 'theme.css', 'playful.css', 'vocabulary-hub.js', 'kids-academy.js']) if (!fs.existsSync(path.join(dir, f))) problems.push(`assets/${f} is missing`);
if (problems.length) { console.error(problems.slice(0, 40).join('\n')); console.error(`\n${problems.length} problem(s)`); process.exit(1); }
console.log(`OK: ${C.length} days, ${C.reduce((n, c) => n + c.w.length + (more[c.d] || []).length, 0)} examples (min ${Math.min(...C.map(c => c.w.length + (more[c.d] || []).length))} per day), ${L.length} languages, ${Object.keys(I.en).length} interface strings each.`);
