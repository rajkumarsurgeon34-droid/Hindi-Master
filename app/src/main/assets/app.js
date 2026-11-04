// Hindi Master v2 - app engine.  Data: course/level*.js (90 days) + course/extra*.js (more examples), i18n.js + i18n2.js (text)
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const COURSE = (window.COURSE || []).slice().sort((a, b) => a.d - b.d);
const TOTAL = 90, GOAL_XP = 50, PASS = 6, QN = 8;
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v } catch (e) { return d } }, set(k, v) { try { localStorage.setItem(k, v) } catch (e) { } } };

/* ---------- language ---------- */
let lang = store.get('hm-language', 'en'); if (!LANGS.includes(lang)) lang = 'en';
window.teachingLanguage = lang;
const li = () => LANGS.indexOf(lang);
const tr = k => { const v = (I18N[lang] || {})[k]; return v !== undefined ? v : (I18N.en[k] !== undefined ? I18N.en[k] : k) };
const pick = a => Array.isArray(a) ? (a[li()] || a[0]) : (a || '');
const meaning = w => w[2 + li()] || w[2];
const levelOf = d => Math.ceil(d / 15);
const SK_ICON = { vocab: '🗂️', grammar: '🧩', read: '📖', write: '✍️', speak: '🗣️' };
const LV_EMOJI = ['🌱', '🌿', '🌳', '🚀', '🏔️', '👑'];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };
const rnd = a => a[Math.floor(Math.random() * a.length)];
const CHARS = Toon.names;

/* ---------- extra examples (course/extra*.js push text blocks:  #day  then  hindi|roman|en|ta|kn|ml|te|mr per line) ---------- */
(window.EXTRA || []).forEach(txt => {
  let cur = null;
  String(txt).split('\n').forEach(l => {
    l = l.trim(); if (!l) return;
    if (l[0] === '#') { cur = COURSE.find(c => c.d === +l.slice(1)); return }
    if (!cur) return;
    const p = l.split('|').map(x => x.trim());
    if (p.length === 8 && p.every(Boolean)) (cur.more = cur.more || []).push(p);
  });
});
const allWords = c => c.w.concat(c.more || []);
let _bank = null; const bank = () => _bank || (_bank = COURSE.flatMap(allWords));

/* ---------- state ---------- */
let state; try { state = JSON.parse(store.get('hm-progress', 'null')) } catch (e) { }
if (!state || !Array.isArray(state.done)) state = { done: [], points: 0, streak: 0, last: '' };
Object.assign(state, { known: state.known || {}, today: state.today || { d: '', xp: 0 }, badges: state.badges || [], storiesRead: state.storiesRead || [], journal: state.journal || [], dq: state.dq || 0 });
const todayStr = () => new Date().toDateString();
function save() { store.set('hm-progress', JSON.stringify(state)); render() }
function award(n) { if (state.today.d !== todayStr()) state.today = { d: todayStr(), xp: 0 }; state.points += n; state.today.xp += n }
function touchStreak() { const t = todayStr(); if (state.last !== t) { const y = new Date(Date.now() - 864e5).toDateString(); state.streak = state.last === y ? state.streak + 1 : 1; state.last = t } }
const knownCount = () => Object.values(state.known).reduce((n, a) => n + a.length, 0);
const BADGES = [
  ['🌱', 'First lesson', () => state.done.length >= 1], ['🔥', '3-day streak', () => state.streak >= 3], ['🔥', '7-day streak', () => state.streak >= 7], ['📚', '10 lessons', () => state.done.length >= 10],
  ['🏅', 'Level 1 done', () => COURSE.filter(c => c.d <= 15).every(c => state.done.includes(c.d - 1))], ['⭐', '300 XP', () => state.points >= 300], ['📖', '3 stories', () => state.storiesRead.length >= 3],
  ['✍️', 'Wrote a story', () => state.journal.length >= 1], ['🎯', 'Daily quiz', () => state.dq >= 1], ['🌟', '50 words', () => knownCount() >= 50], ['🏔️', 'Level 4', () => COURSE.filter(c => c.d <= 60).every(c => state.done.includes(c.d - 1))], ['👑', 'Course done', () => state.done.length >= 90]
];
function checkBadges() { BADGES.forEach((b, i) => { if (!state.badges.includes(i) && b[2]()) { state.badges.push(i); store.set('hm-progress', JSON.stringify(state)); setTimeout(() => toast(b[0] + ' ' + b[1] + '!'), 600); } }) }

/* ---------- speech ---------- */
let speaking = 0;
let ttsSeq = 0; const ttsCbs = {};
window.__ttsDone = id => { const f = ttsCbs[id]; delete ttsCbs[id]; if (f) f() };
function speak(t, onend) {
  if (window.HMTTS) {
    const id = String(++ttsSeq); ttsCbs[id] = onend || null;
    let r = 'error'; try { r = HMTTS.speak(t, id) } catch (e) { }
    if (r !== 'ok') { delete ttsCbs[id]; if (onend) setTimeout(onend, 400) }
    return;
  }
  if (!('speechSynthesis' in window)) { if (onend) onend(); return }
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'hi-IN'; u.rate = .85;
  const v = speechSynthesis.getVoices().find(v => /hi[-_]IN/i.test(v.lang)); if (v) u.voice = v;
  u.onend = u.onerror = () => { if (onend) onend() }; speechSynthesis.speak(u);
}
function stopSpeak() { speaking++; try { speechSynthesis.cancel() } catch (e) { } try { window.HMTTS && HMTTS.stop() } catch (e) { } document.querySelectorAll('.ex.playing').forEach(e => e.classList.remove('playing')); const b = $('playAll'); if (b) b.textContent = '▶ ' + tr('playAll') }
function playList(list, each, done) { const id = ++speaking; let n = 0; const next = () => { if (id !== speaking) return; if (n >= list.length) { if (done) done(); return } const k = n++; if (each) each(k); speak(list[k], () => setTimeout(next, 350)) }; next() }

/* ---------- small ui helpers ---------- */
function toast(msg) { let t = $('toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t) } t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2400) }
function confetti() {
  let c = $('confetti'); if (!c) { c = document.createElement('canvas'); c.id = 'confetti'; document.body.appendChild(c) }
  const W = c.width = innerWidth, H = c.height = innerHeight, x = c.getContext('2d'), cols = ['#ff6b35', '#ff4f8b', '#7c5cff', '#ffc93c', '#14b8a6', '#3b82f6'];
  const ps = Array.from({ length: 110 }, () => ({ x: W / 2 + (Math.random() - .5) * 80, y: H * .62, vx: (Math.random() - .5) * 13, vy: -Math.random() * 15 - 5, s: 5 + Math.random() * 7, c: rnd(cols), r: Math.random() * 6, vr: (Math.random() - .5) * .4 }));
  let f = 0; (function tick() { x.clearRect(0, 0, W, H); ps.forEach(p => { p.vy += .42; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); x.restore() }); if (++f < 110) requestAnimationFrame(tick); else x.clearRect(0, 0, W, H) })();
  try { navigator.vibrate && navigator.vibrate(30) } catch (e) { }
}

/* ---------- sheet (lesson / tools) ---------- */
const S = {
  el: null,
  set(o) {
    this.el.querySelector('.sheet').innerHTML = '<div class="sheet-bar"><button class="x" data-act="close" aria-label="Close">×</button><div class="ttl"><small>' + (o.kicker || '') + '</small><b>' + (o.title || '') + '</b></div>' + (o.right || '') + '</div>' + (o.steps ? '<div class="steps">' + o.steps + '</div>' : '') + '<div class="sheet-body" id="sbody">' + (o.body || '') + '</div>' + (o.foot ? '<div class="sheet-foot">' + o.foot + '</div>' : '');
    this.el.classList.add('show'); this.el.setAttribute('aria-hidden', 'false');
  },
  body(html) { const b = $('sbody'); b.innerHTML = html; b.scrollTop = 0 },
  foot(html) { const sh = this.el.querySelector('.sheet'); let f = sh.querySelector('.sheet-foot'); if (!html) { if (f) f.remove(); return } if (!f) { f = document.createElement('div'); f.className = 'sheet-foot'; sh.appendChild(f) } f.innerHTML = html },
  open: () => $('sheet').classList.contains('show')
};
function closeSheet() { stopSpeak(); S.el.classList.remove('show'); S.el.setAttribute('aria-hidden', 'true'); render() }

/* ---------- pages / tabs ---------- */
let tab = store.get('hm-tab', 'learn'), lvSel = 0, view = store.get('hm-view', 'map');
const curTab = () => tab;
function goTab(t) { tab = t; store.set('hm-tab', t); document.querySelectorAll('.page').forEach(p => p.classList.toggle('on', p.id === 'p-' + t)); document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.t === t)); render(); scrollTo({ top: 0 }) }
function nextIdx() { const i = COURSE.findIndex(c => !state.done.includes(c.d - 1)); return i < 0 ? COURSE.length - 1 : i }

function localize() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n) });
  document.documentElement.lang = lang;
  $('langBtn').textContent = '🌐 ' + (LANG_NAMES[lang].split(' · ')[0]);
  document.querySelectorAll('.tab small').forEach(s => { s.textContent = tr(s.dataset.k) });
}

function render() {
  if (state.today.d !== todayStr()) state.today = { d: todayStr(), xp: 0 };
  $('streak').textContent = state.streak; localize();
  if (tab === 'learn') renderLearn(); else if (tab === 'practice') renderPractice(); else if (tab === 'stories') renderStories(); else renderLibrary();
}

function renderLearn() {
  const n = nextIdx(), c = COURSE[n], h = new Date().getHours();
  const g = h < 12 ? ['सुप्रभात!', 'suprabhaat'] : h < 17 ? ['नमस्ते!', 'namaste'] : ['शुभ संध्या!', 'shubh sandhya'];
  const pct = Math.min(100, Math.round(state.today.xp / GOAL_XP * 100)), done = state.done.length;
  $('hello').innerHTML = '<div class="hello-top"><button data-act="say" data-t="' + g[0] + '" aria-label="Hear">' + Toon.svg('parrot', 'happy', 104) + '</button><div class="speech"><span class="dev">' + g[0] + '</span>' + g[1] + '</div></div>' +
    '<h1>' + (c ? c.e + ' ' + esc(tr('day')) + ' ' + c.d + ' · ' + esc(pick(c.t)) : '') + '</h1><p class="dev">' + esc(c ? c.h : '') + '</p>' +
    '<div class="goal"><div class="ring" style="--p:' + pct + '"><i>' + pct + '%</i></div><div><b>' + esc(tr('goalT')) + '</b><div style="font-size:13px;font-weight:700;opacity:.92">' + state.today.xp + ' / ' + GOAL_XP + ' XP</div></div></div>' +
    '<button class="btn cta block big" data-act="lesson" data-i="' + n + '">' + esc(done ? tr('continue') + ' ' + c.d : tr('start')) + ' →</button>';
  $('stats').innerHTML = [['🎯', done + '/' + TOTAL, tr('days')], ['⭐', state.points, tr('xp')], ['🔥', state.streak, tr('streak')], ['🗂️', knownCount(), tr('wordsK')]].map(s => '<div class="stat"><span>' + s[0] + '</span><b>' + s[1] + '</b><small>' + esc(s[2]) + '</small></div>').join('');
  // level tabs
  const lvl = [1, 2, 3, 4, 5, 6].map(lv => { const ds = COURSE.filter(x => levelOf(x.d) === lv), dn = ds.filter(x => state.done.includes(x.d - 1)).length; return '<button class="lv' + (lv - 1 === lvSel ? ' on' : '') + '" data-act="lv" data-n="' + (lv - 1) + '"><span>' + LV_EMOJI[lv - 1] + '</span><b>' + esc(tr('level')) + ' ' + lv + '</b><small>' + dn + '/15</small></button>' }).join('');
  const days = COURSE.filter(x => levelOf(x.d) === lvSel + 1), dn = days.filter(x => state.done.includes(x.d - 1)).length;
  const cell = x => { const idx = COURSE.indexOf(x), isDone = state.done.includes(x.d - 1), isNext = idx === n && !isDone; return { idx, isDone, isNext } };
  const path = view === 'map' ? '<div class="path">' + days.map(x => { const k = cell(x); return '<button class="node s-' + x.s + (k.isDone ? ' done' : '') + (k.isNext ? ' next' : '') + '" data-act="lesson" data-i="' + k.idx + '"><span class="node-dot">' + x.e + '</span><span class="node-txt"><small>' + esc(tr('day')) + ' ' + x.d + ' · ' + esc(tr(x.s)) + '</small><b>' + esc(pick(x.t)) + '</b><span class="dev">' + esc(x.h || '') + '</span></span></button>' }).join('') + '</div>'
    : '<div class="dgrid">' + days.map(x => { const k = cell(x); return '<button class="dcell s-' + x.s + (k.isDone ? ' done' : '') + (k.isNext ? ' next' : '') + '" data-act="lesson" data-i="' + k.idx + '"><small>' + esc(tr('day')) + ' ' + x.d + '</small><span class="e">' + x.e + '</span><b>' + esc(pick(x.t)) + '</b></button>' }).join('') + '</div>';
  $('journey').innerHTML = '<div class="sec"><div><div class="eyebrow">' + esc(tr('path')) + '</div><h2 class="h2">' + esc(tr('journey')) + '</h2></div><div class="seg"><button data-act="view" data-v="map" class="' + (view === 'map' ? 'on' : '') + '">🗺️ ' + esc(tr('mapV')) + '</button><button data-act="view" data-v="grid" class="' + (view === 'grid' ? 'on' : '') + '">▦ ' + esc(tr('gridV')) + '</button></div></div>' +
    '<div class="lvtabs">' + lvl + '</div><div class="lvhead"><span class="big">' + LV_EMOJI[lvSel] + '</span><div class="grow"><b class="h2" style="font-size:17px">' + esc(tr('level')) + ' ' + (lvSel + 1) + ' · ' + esc(tr('levels')[lvSel]) + '</b><div class="sub">' + esc(tr('lvDesc')[lvSel]) + '</div><div class="bar"><i style="width:' + dn / 15 * 100 + '%"></i></div></div><b>' + dn + '/15</b></div><div class="mt">' + path + '</div>';
}

function renderPractice() {
  const tile = (cls, ic, k, sub, act, t, g) => '<button class="tile ' + cls + '" data-act="' + act + '" data-t="' + t + '" data-g="' + g + '"><span class="ti">' + ic + '</span><b>' + esc(k) + '</b><small>' + esc(sub) + '</small></button>';
  $('p-practice-body').innerHTML = '<div class="tiles">' + tile('a', '✍️', tr('wStudio'), tr('wStudioSub'), 'tool', 'write', 'क') + tile('b', '🎙️', tr('sStudio'), tr('sStudioSub'), 'tool', 'speak', 'बो') + tile('c', '🗂️', tr('fCards'), tr('fCardsSub'), 'tool', 'words', 'श') + tile('d', '🎯', tr('dailyQ'), tr('dailyQSub'), 'tool', 'dailyq', '१०') + tile('e', '🎧', tr('dictK'), tr('dictSub'), 'tool', 'dict', 'ल') + tile('f', '📚', tr('refK'), 'अ आ क ख', 'tool', 'ref', 'अ') + '</div>' +
    '<div class="sec"><h2 class="h2">' + esc(tr('badgesK')) + '</h2><span class="sub">' + state.badges.length + '/' + BADGES.length + '</span></div><div class="badges">' + BADGES.map((b, i) => '<div class="badge' + (state.badges.includes(i) ? ' got' : '') + '"><span>' + b[0] + '</span><small>' + b[1] + '</small></div>').join('') + '</div>';
}
function renderStories() { if (window.Stories) Stories.shelf($('p-stories-body')); }
function renderLibrary() {
  const mi = (bg, ic, t, s, id, act, extra) => '<button class="mi" ' + (id ? 'id="' + id + '"' : '') + ' data-act="' + (act || '') + '" ' + (extra || '') + '><span class="mi-i" style="background:' + bg + '">' + ic + '</span><span><b>' + t + '</b><small>' + s + '</small></span><span class="go">›</span></button>';
  $('p-library-body').innerHTML = '<div class="menu">' + mi('#ffe9de', '📚', esc(tr('refK')), 'Vowels · consonants · days · months · barakhadi', '', 'tool', 'data-t="ref"') + mi('#e0f7f3', '🌐', esc(tr('learn')), esc(LANG_NAMES[lang]), '', 'lang') + '</div>' +
    '<div class="card mt2 center"><div class="row" style="justify-content:center">' + Toon.svg('elephant', 'happy', 84) + Toon.svg('cat', 'happy', 84) + '</div><p class="sub mt">Hindi Master · 90 days</p><button class="btn ghost sm mt" data-act="reset">Reset progress</button></div>';
}

/* ---------- lesson ---------- */
let LS = { i: 0, step: 0 }, hideM = false;
function openLesson(i, step) {
  LS = { i, step: step || 0 }; hideM = false; stopSpeak(); renderLesson();
}
function renderLesson() {
  const c = COURSE[LS.i], st = LS.step, words = allWords(c);
  const steps = ['stepLearn', 'stepEx', 'stepPractice', 'stepQuiz'].map((k, n) => '<button class="step ' + (n === st ? 'on' : n < st ? 'ok' : '') + '" data-act="step" data-n="' + n + '">' + (n < st ? '✓ ' : '') + esc(tr(k)) + '</button>').join('');
  const o = { kicker: esc(tr('day')) + ' ' + c.d + ' · ' + esc(tr('level')) + ' ' + levelOf(c.d) + ' · ' + esc(tr(c.s)), title: c.e + ' ' + esc(pick(c.t)), steps };
  if (st === 0) {
    const mood = 'happy', char = CHARS[c.d % CHARS.length];
    o.body = '<div class="teach">' + Toon.svg('parrot', mood, 92) + '<div class="bubble">' + esc(pick(c.x)) + (c.h ? '<div class="focus">' + esc(c.h) + '</div>' : '') + (lang !== 'en' ? '<details class="en"><summary>' + esc(tr('inEnglish')) + '</summary>' + esc(c.x[0]) + '</details>' : '') + '</div></div>' +
      '<div class="card mt"><div class="tags"><span class="tag s-' + c.s + '">' + SK_ICON[c.s] + ' ' + esc(tr(c.s)) + '</span><span class="tag">' + words.length + ' ' + esc(tr('stepEx')).toLowerCase() + '</span></div><p class="mt" style="font-weight:700">' + esc(tr('task_' + c.s)) + '</p></div>' +
      '<div class="card mt"><div class="row">' + Toon.svg(char, 'cheer', 64) + '<div class="grow"><b class="h2" style="font-size:17px">' + esc(Toon.cast[char].hi) + ' (' + Toon.cast[char].roman + ')</b><div class="sub">' + esc(pick(c.t)) + '</div></div><button class="play" data-act="say" data-t="' + esc(words[0][0]) + '">🔊</button></div></div>';
    o.foot = '<button class="btn block" data-act="step" data-n="1">' + esc(tr('stepEx')) + ' →</button>';
  } else if (st === 1) {
    const known = state.known[c.d] || [];
    const row = (w, k) => '<div class="ex' + (known.includes(k) ? ' known' : '') + '" data-k="' + k + '"><span class="n">' + (k + 1) + '</span><div class="t" data-act="reveal"><div class="hi">' + esc(w[0]) + '</div><div class="ro">' + esc(w[1]) + '</div><div class="mn">' + esc(meaning(w)) + '</div></div><button class="play" data-act="say" data-t="' + esc(w[0]) + '" aria-label="Listen">🔊</button><button class="star' + (known.includes(k) ? ' on' : '') + '" data-act="know" data-k="' + k + '" aria-label="Learned">⭐</button></div>';
    o.body = '<div class="exbar"><div class="row"><div class="grow"><b class="h2" style="font-size:18px">' + words.length + ' ' + esc(tr('stepEx')) + '</b><div class="sub"><span id="knownN">' + known.length + '</span>/' + words.length + ' ' + esc(tr('learnedK')) + '</div></div><button class="btn sm" id="playAll" data-act="playall">▶ ' + esc(tr('playAll')) + '</button><button class="btn sm ghost" data-act="hidem">🙈</button></div><div class="bar"><i id="knownBar" style="width:' + known.length / words.length * 100 + '%"></i></div></div>' +
      '<div id="exlist" class="' + (hideM ? 'hide-m' : '') + '">' + words.map((w, k) => (k === c.w.length && c.w.length < words.length ? '<div class="more-h">' + esc(tr('moreEx')) + '</div>' : '') + row(w, k)).join('') + '</div>';
    o.foot = '<button class="btn ghost" data-act="step" data-n="0">←</button><button class="btn" data-act="step" data-n="2">' + esc(tr('stepPractice')) + ' →</button>';
  } else if (st === 2) {
    const tile = (cls, ic, k, act, g) => '<button class="tile ' + cls + '" data-act="' + act + '" data-g="' + g + '"><span class="ti">' + ic + '</span><b>' + esc(k) + '</b></button>';
    o.body = '<div class="teach">' + Toon.svg('girl', 'cheer', 84) + '<div class="bubble">' + esc(tr('task_' + c.s)) + '</div></div><div class="tiles mt">' + tile('a', '✍️', tr('wStudio'), 'dwrite', 'क') + tile('b', '🎙️', tr('sStudio'), 'dspeak', 'बो') + tile('c', '🗂️', tr('fCards'), 'dcards', 'श') + tile('e', '🎧', tr('dictK'), 'ddict', 'ल') + '</div>';
    o.foot = '<button class="btn ghost" data-act="step" data-n="1">←</button><button class="btn" data-act="step" data-n="3">' + esc(tr('stepQuiz')) + ' →</button>';
  } else {
    o.body = '<div class="card center"><div class="row" style="justify-content:center">' + Toon.svg('boy', 'think', 96) + Toon.svg('cat', 'cheer', 96) + '</div><h2 class="h2 mt">' + esc(tr('quiz')) + '</h2><p class="sub">' + QN + ' · 🎯 ' + PASS + '/' + QN + '</p></div>';
    o.foot = '<button class="btn ghost" data-act="step" data-n="2">←</button><button class="btn green" data-act="startquiz">' + esc(tr('takeQuiz')) + ' →</button>';
  }
  const keep = $('sbody') && S.open() && o.steps && $('sbody').dataset.lesson === String(LS.i) ? $('sbody').scrollTop : 0;
  S.set(o); $('sbody').dataset.lesson = LS.i; $('sbody').scrollTop = st === 1 ? keep : 0;
}

/* ---------- quiz engine (lesson quiz + daily quiz) ---------- */
let Q = null;
function distract(w, pool, n) {
  const seen = new Set([w[0], meaning(w)]), out = [];
  for (const src of [shuffle(pool), shuffle(bank())]) for (const x of src) { if (out.length >= n) return out; const m = meaning(x); if (seen.has(x[0]) || seen.has(m)) continue; seen.add(x[0]); seen.add(m); out.push(x) }
  return out;
}
function mkQuiz(pool, n) {
  const types = ['meaning', 'listen', 'hindi', 'roman', 'meaning', 'listen', 'hindi', 'meaning', 'roman', 'listen'];
  const picks = shuffle(pool).slice(0, n); while (picks.length < n) picks.push(pool[picks.length % pool.length]);
  return picks.map((w, k) => { const t = types[k % types.length], ds = distract(w, pool, 3), ans = t === 'meaning' ? meaning(w) : w[0]; return { t, w, ans, show: t === 'meaning' ? w[0] : t === 'hindi' ? meaning(w) : t === 'roman' ? w[1] : '', opts: shuffle([ans].concat(ds.map(d => t === 'meaning' ? meaning(d) : d[0]))) } });
}
function startQuiz(ctx) { Q = { qs: mkQuiz(ctx.pool, ctx.n), i: 0, ok: 0, bad: [], ctx, done: false }; showQ() }
function showQ() {
  const q = Q.qs[Q.i], ctx = Q.ctx, prompt = { meaning: 'qMeaning', hindi: 'qHindi', listen: 'qListen', roman: 'qRoman' }[q.t];
  const big = q.t === 'listen' ? '<button class="listen-big" data-act="say" data-t="' + esc(q.w[0]) + '" aria-label="Listen">🔊</button>' : '<div class="qshow ' + (q.t === 'meaning' ? '' : 'txt') + '">' + esc(q.show) + '</div>';
  const o = { kicker: esc(ctx.kicker), title: esc(ctx.title), body: '<div class="qprog">' + Q.qs.map((_, k) => '<i class="' + (k < Q.i ? (Q.bad.includes(k) ? 'bad' : 'past') : k === Q.i ? 'now' : '') + '"></i>').join('') + '</div><div class="card qcard"><p class="sub" style="font-weight:800">' + esc(tr(prompt)) + '</p><div class="mt">' + big + '</div></div><div class="opts" id="opts">' + q.opts.map(x => '<button class="opt' + (q.t === 'meaning' ? '' : ' dv') + '" data-act="opt">' + esc(x) + '</button>').join('') + '</div><div id="fb"></div>', foot: '<button class="btn block" id="qnext" data-act="qnext" disabled>' + esc(Q.i === Q.qs.length - 1 ? tr('results') : tr('next')) + ' →</button>' };
  S.set(o); if (q.t === 'listen') setTimeout(() => speak(q.w[0]), 300);
}
function answer(btn) {
  if (Q.done) return; const q = Q.qs[Q.i], ok = btn.textContent === q.ans; Q.done = true; if (ok) Q.ok++; else Q.bad.push(Q.i);
  document.querySelectorAll('#opts .opt').forEach(b => { b.classList.add('lock'); if (b.textContent === q.ans) b.classList.add('correct') }); if (!ok) btn.classList.add('wrong');
  $('fb').innerHTML = '<div class="fb ' + (ok ? 'good' : 'bad') + '">' + Toon.svg(rnd(CHARS), ok ? 'cheer' : 'sad', 54) + '<div>' + (ok ? '🎉 ' + esc(tr('correct')) : esc(tr('wrong')) + ' <b>' + esc(q.ans) + '</b>') + '<small>' + esc(q.w[0]) + ' · ' + esc(q.w[1]) + ' · ' + esc(meaning(q.w)) + '</small></div></div>';
  speak(q.w[0]); $('qnext').disabled = false; try { navigator.vibrate && navigator.vibrate(ok ? 15 : [20, 40, 20]) } catch (e) { }
}
function showResult() {
  const ctx = Q.ctx, n = Q.qs.length, passed = Q.ok >= ctx.pass, xp = Q.ok * 5 + (passed && ctx.kind === 'lesson' ? 20 : 0);
  if (ctx.kind === 'lesson') { const i = ctx.day.d - 1; if (passed && !state.done.includes(i)) { state.done.push(i); award(xp); touchStreak() } else if (passed) award(Q.ok * 5); else award(Q.ok * 2) }
  else { award(Q.ok * 3); state.dq++; touchStreak() }
  store.set('hm-progress', JSON.stringify(state)); checkBadges();
  const ni = ctx.kind === 'lesson' ? LS.i + 1 : -1, hasNext = ni >= 0 && COURSE[ni];
  S.set({ kicker: esc(ctx.kicker), title: esc(ctx.title), body: '<div class="result">' + Toon.svg(rnd(CHARS), passed ? 'cheer' : 'sad', 140) + '<h2 class="h2 mt" style="font-size:28px">' + esc(passed ? tr('passTitle') : tr('retryTitle')) + '</h2><div class="score">' + Q.ok + ' / ' + n + '</div><p class="sub">🎯 ' + ctx.pass + '/' + n + '</p><div class="rewards"><span class="reward">⭐ +' + (ctx.kind === 'lesson' && !passed ? Q.ok * 2 : xp) + ' XP</span>' + (passed && ctx.kind === 'lesson' ? '<span class="reward">🔥 ' + state.streak + '</span>' : '') + '</div></div>' + (ctx.kind === 'lesson' ? '<button class="btn violet block mt" data-act="bonus">🧩 ' + esc(tr('matchQ')) + ' · ' + esc(tr('goodJob')) + '</button>' : ''),
    foot: ctx.kind === 'lesson' ? '<button class="btn ghost" data-act="step" data-n="1">↺ ' + esc(tr('stepEx')) + '</button>' + (passed ? (hasNext ? '<button class="btn green" data-act="lesson" data-i="' + ni + '">' + esc(tr('nextDay')) + ' →</button>' : '<button class="btn green" data-act="close">✓</button>') : '<button class="btn" data-act="startquiz">' + esc(tr('retry')) + '</button>') : '<button class="btn ghost" data-act="close">✓</button><button class="btn" data-act="tool" data-t="dailyq">' + esc(tr('retry')) + '</button>' });
  if (passed) confetti();
}
function dailyQuiz() {
  const dn = COURSE.filter(c => state.done.includes(c.d - 1)), src = dn.length ? dn : COURSE.slice(0, 3), pool = src.flatMap(allWords);
  startQuiz({ kind: 'daily', pool, n: 10, pass: 7, kicker: '🎯', title: tr('dailyQ') });
}
function bonusPairs() {
  const c = COURSE[LS.i], ws = shuffle(allWords(c)).slice(0, 5), right = shuffle(ws.map((w, k) => ({ m: meaning(w), k })));
  let sel = null, matched = 0, done = false;
  S.set({ kicker: '🧩', title: esc(tr('matchQ')), body: '<div class="pairs" id="pairs">' + ws.map((w, k) => '<button class="pair dev" data-l="' + k + '">' + esc(w[0]) + '</button><button class="pair" data-r="' + right[k].k + '">' + esc(right[k].m) + '</button>').join('') + '</div>', foot: '<button class="btn block" data-act="close">✓</button>' });
  $('pairs').onclick = e => {
    const b = e.target.closest('.pair'); if (!b || b.classList.contains('ok')) return;
    if (b.dataset.l !== undefined) { document.querySelectorAll('.pair[data-l]').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = b.dataset.l; speak(ws[+sel][0]); return }
    if (sel === null) return; const rb = b;
    if (rb.dataset.r === sel) { rb.classList.add('ok'); document.querySelector('.pair[data-l="' + sel + '"]').classList.replace('sel', 'ok'); sel = null; if (++matched === ws.length && !done) { done = true; award(10); store.set('hm-progress', JSON.stringify(state)); confetti(); toast('⭐ +10 XP') } }
    else { rb.classList.add('no'); setTimeout(() => rb.classList.remove('no'), 350) }
  };
}

/* ---------- on-screen Devanagari keyboard ---------- */
const KB = { 'स्वर': 'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः'.split(' '), 'व्यंजन': 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ ड़ ढ़'.split(' '), 'मात्रा': 'ा ि ी ु ू ृ े ै ो ौ ं ः ँ ् ़'.split(' '), '१२३': '० १ २ ३ ४ ५ ६ ७ ८ ९ । , ? ! - ’'.split(' ') };
let kbTab = 'व्यंजन';
function kbHtml() {
  return '<div class="dkb"><div class="dkb-tabs">' + Object.keys(KB).map(k => '<button class="' + (k === kbTab ? 'on' : '') + '" data-act="kbtab" data-k="' + k + '">' + k + '</button>').join('') + '</div><div class="dkb-keys">' + KB[kbTab].map(ch => '<button data-act="key" data-ch="' + ch + '">' + (kbTab === 'मात्रा' && ch.length === 1 && /[ा-्ँ-ः़]/.test(ch) ? '◌' + ch : ch) + '</button>').join('') + '<button class="fn" data-act="key" data-ch=" ">␣</button><button class="fn" data-act="key" data-ch="\n">⏎</button><button class="fn" data-act="key" data-ch="⌫">⌫</button></div></div>';
}
function kbPress(ch) {
  const t = $('kbTarget'); if (!t) return; const s = t.selectionStart ?? t.value.length, e = t.selectionEnd ?? t.value.length;
  if (ch === '⌫') { if (s === e && s > 0) { t.value = t.value.slice(0, s - 1) + t.value.slice(e); t.selectionStart = t.selectionEnd = s - 1 } else { t.value = t.value.slice(0, s) + t.value.slice(e); t.selectionStart = t.selectionEnd = s } }
  else { t.value = t.value.slice(0, s) + ch + t.value.slice(e); t.selectionStart = t.selectionEnd = s + ch.length }
  t.dispatchEvent(new Event('input'));
}
window.kbHtml = kbHtml;

/* ---------- tools ---------- */
function openWriting(list, start) {
  const t = list && list.length ? list : ['अ', 'आ', 'क', 'ख', 'ग', 'नमस्ते', 'धन्यवाद']; let ti = start || 0;
  const long = s => s.length > 5;
  S.set({ kicker: '✍️', title: esc(tr('wStudio')), body: '<p class="sub" style="margin-bottom:10px;font-weight:700">' + esc(tr('wStudioSub')) + '</p><div class="pad-wrap"><div class="pad-ghost" id="ghost"></div><canvas class="pad" id="pad"></canvas></div><div class="row mt" style="justify-content:center"><button class="btn ghost sm" data-act="wprev">←</button><button class="btn ghost sm" data-act="wclear">🧽 ' + esc(tr('clear')) + '</button><button class="btn sm" data-act="whear">🔊 ' + esc(tr('hear')) + '</button><button class="btn ghost sm" data-act="wnext">→</button></div><p class="record" id="wcount"></p>' });
  const c = $('pad'), x = c.getContext('2d'); let down = false, last = null;
  const size = () => { const r = c.getBoundingClientRect(); if (!r.width) return; c.width = r.width * devicePixelRatio; c.height = r.height * devicePixelRatio; x.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); x.strokeStyle = '#ff6b35'; x.lineWidth = 6; x.lineCap = x.lineJoin = 'round' };
  const show = () => { const g = $('ghost'); g.textContent = t[ti]; g.classList.toggle('long', long(t[ti])); $('wcount').textContent = (ti + 1) + ' / ' + t.length; x.clearRect(0, 0, c.width, c.height) };
  requestAnimationFrame(() => { size(); show() }); show();
  const pt = e => { const r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] };
  c.onpointerdown = e => { down = true; last = pt(e); c.setPointerCapture(e.pointerId); x.beginPath(); x.arc(last[0], last[1], 3, 0, 7); x.fillStyle = '#ff6b35'; x.fill() };
  c.onpointermove = e => { if (!down) return; const p = pt(e); x.beginPath(); x.moveTo(...last); x.lineTo(...p); x.stroke(); last = p };
  c.onpointerup = c.onpointercancel = () => { down = false };
  W = { prev: () => { ti = (ti + t.length - 1) % t.length; show(); speak(t[ti]) }, next: () => { ti = (ti + 1) % t.length; show(); speak(t[ti]) }, clear: () => x.clearRect(0, 0, c.width, c.height), hear: () => speak(t[ti]) };
}
let W = {};
let cards = [], ci = 0;
function openCards(list) {
  if (list) { cards = list.slice(); ci = 0 }
  if (!cards.length) { const dn = COURSE.filter(c => state.done.includes(c.d - 1)), src = dn.length ? dn : COURSE.slice(0, 2); cards = shuffle(src.flatMap(allWords)).slice(0, 30); ci = 0 }
  const w = cards[ci];
  S.set({ kicker: '🗂️', title: esc(tr('fCards')), body: '<div class="flip" id="flip" data-act="flip"><div class="flip-in"><div class="flip-f"><div class="big">' + esc(w[0]) + '</div><small class="sub">' + esc(tr('tapReveal')) + '</small></div><div class="flip-b"><div class="big" style="font-size:40px">' + esc(w[0]) + '</div><div class="ro" style="color:var(--violet-d);font-style:italic;font-weight:700">' + esc(w[1]) + '</div><div class="mean">' + esc(meaning(w)) + '</div></div></div></div><div class="row" style="justify-content:center"><button class="btn ghost sm" data-act="cprev">←</button><span class="sub" style="font-weight:900">' + (ci + 1) + ' / ' + cards.length + '</span><button class="btn ghost sm" data-act="cnext">→</button></div>', foot: '<button class="btn" data-act="say" data-t="' + esc(w[0]) + '">🔊 ' + esc(tr('listen')) + '</button>' });
}
function openSpeak(c) {
  c = c || COURSE[nextIdx()]; const ws = allWords(c); let k = 0;
  const draw = () => { const w = ws[k]; S.set({ kicker: '🎙️ ' + esc(tr('day')) + ' ' + c.d, title: esc(tr('sStudio')), body: '<p class="sub" style="font-weight:700;margin-bottom:10px">' + esc(tr('sStudioSub')) + '</p><div class="card center"><div class="qshow" style="font-size:34px">' + esc(w[0]) + '</div><div class="ro" style="color:var(--violet-d);font-style:italic;font-weight:700">' + esc(w[1]) + '</div><div style="font-weight:800;margin:6px 0 12px">' + esc(meaning(w)) + '</div><button class="play" style="margin:auto" data-act="say" data-t="' + esc(w[0]) + '">🔊</button></div><button class="btn pink block big mt" data-act="rec">🎙️ ' + esc(tr('speakNow')) + '</button><p class="record" id="rec"></p><div class="row" style="justify-content:center"><button class="btn ghost sm" data-act="sprev">←</button><span class="sub" style="font-weight:900">' + (k + 1) + ' / ' + ws.length + '</span><button class="btn ghost sm" data-act="snext">→</button></div>' }) };
  draw(); W = {
    sprev: () => { k = (k + ws.length - 1) % ws.length; draw() }, snext: () => { k = (k + 1) % ws.length; draw() }, rec: () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition, r = $('rec'); if (!SR) { r.textContent = tr('noSR'); return }
      const sr = new SR(); sr.lang = 'hi-IN'; r.textContent = '🎧 …'; sr.onresult = e => { const said = e.results[0][0].transcript, norm = s => s.replace(/[।?!.,\s]/g, ''), ok = norm(said) === norm(ws[k][0]); r.innerHTML = (ok ? '🎉 ' : '') + esc(tr('heard')) + ' <b class="dev">' + esc(said) + '</b>'; if (ok) { award(2); store.set('hm-progress', JSON.stringify(state)) } }; sr.onerror = e => { r.textContent = e.error }; sr.start()
    }
  };
}
function openDictation(c) {
  const pool = c ? allWords(c) : (COURSE.filter(x => state.done.includes(x.d - 1)).flatMap(allWords).concat(COURSE[0].w)); let w = rnd(pool);
  const draw = () => { S.set({ kicker: '🎧', title: esc(tr('dictK')), body: '<p class="sub" style="font-weight:700;margin-bottom:10px">' + esc(tr('dictSub')) + '</p><div class="card center"><button class="listen-big" data-act="say" data-t="' + esc(w[0]) + '">🔊</button><div style="font-weight:800;margin-top:10px">' + esc(meaning(w)) + '</div></div><textarea id="kbTarget" class="txt mt" style="min-height:70px" inputmode="none" placeholder="' + esc(tr('typeHere')) + '"></textarea><div id="dres" class="record"></div>' + kbHtml(), foot: '<button class="btn ghost" data-act="dnext">→</button><button class="btn green" data-act="dcheck">✓ ' + esc(tr('checkK')) + '</button>' }); setTimeout(() => speak(w[0]), 300) };
  draw(); W = {
    dnext: () => { w = rnd(pool); draw() }, dcheck: () => {
      const v = $('kbTarget').value.replace(/[।?!.,\s]/g, ''), a = w[0].replace(/[।?!.,\s]/g, ''), r = $('dres');
      if (v === a) { r.innerHTML = '🎉 <b class="dev">' + esc(w[0]) + '</b> · ' + esc(w[1]); award(3); store.set('hm-progress', JSON.stringify(state)); confetti() } else r.innerHTML = '❌ <b class="dev">' + esc(w[0]) + '</b> · ' + esc(w[1])
    }
  };
}
function openReference() {
  const R = REF, bara = ch => '<div class="ref-grid" style="grid-template-columns:repeat(5,1fr)">' + R.marks.map(m => '<button class="ref-tile" data-act="say" data-t="' + ch + m[0] + '"><b>' + ch + m[0] + '</b><small>' + m[1] + '</small></button>').join('') + '</div>';
  const pages = {
    letters: () => '<div class="card"><b class="h2" style="font-size:17px">स्वर · Vowels</b><div class="ref-grid mt">' + R.vowels.map(x => '<button class="ref-tile" data-act="say" data-t="' + x[0] + '"><b>' + x[0] + '</b><small>' + x[1] + '</small><span>' + x[2] + '</span><small>' + x[3] + '</small></button>').join('') + '</div></div><div class="card"><b class="h2" style="font-size:17px">व्यंजन · Consonants</b>' + R.groups.map(g => '<p class="mt"><b class="sub">' + g[0] + '</b><br>' + g[1].split(' ').map(l => '<button class="lbtn" data-act="say" data-t="' + l + '">' + l + '</button>').join('') + '</p>').join('') + '</div>',
    days: () => '<div class="card"><b class="h2" style="font-size:17px">दिन · Days</b>' + R.weekdays.map(x => '<div class="ex mt"><div class="t"><div class="hi">' + x[0] + '</div><div class="ro">' + x[1] + '</div><div class="mn">' + x[2] + '</div></div><button class="play" data-act="say" data-t="' + x[0] + '">🔊</button></div>').join('') + '</div>',
    months: () => '<div class="card"><b class="h2" style="font-size:17px">महीने · Months</b><p class="sub">≈ lunar months</p>' + R.months.map(x => '<div class="ex mt"><div class="t"><div class="hi">' + x[0] + '</div><div class="ro">' + x[1] + '</div><div class="mn">' + x[2] + '</div></div><button class="play" data-act="say" data-t="' + x[0] + '">🔊</button></div>').join('') + '</div>',
    bara: () => '<div class="card"><b class="h2" style="font-size:17px">बारहखड़ी</b><select id="baraSel" class="txt mt" style="min-height:0;padding:8px 12px">' + R.bases.map(x => '<option>' + x + '</option>').join('') + '</select><div id="baraOut" class="mt">' + bara('क') + '</div></div>'
  };
  const names = [['letters', 'अक्षर'], ['days', 'दिन'], ['months', 'महीने'], ['bara', 'बारहखड़ी']];
  const draw = k => { S.set({ kicker: '📚', title: esc(tr('refK')), body: '<div class="chips" style="margin-bottom:12px">' + names.map(n => '<button class="chip' + (n[0] === k ? ' on' : '') + '" data-act="refpage" data-k="' + n[0] + '">' + n[1] + '</button>').join('') + '</div>' + pages[k]() }); const s = $('baraSel'); if (s) s.onchange = () => { $('baraOut').innerHTML = bara(s.value) } };
  draw('letters'); W = { refpage: el => draw(el.dataset.k) };
}
function openLangs() {
  S.set({ kicker: '🌐', title: esc(tr('learn')), body: '<div class="langlist">' + LANGS.map(l => '<button class="' + (l === lang ? 'on' : '') + '" data-act="setlang" data-l="' + l + '"><span>' + esc(LANG_NAMES[l]) + '</span>' + (l === lang ? '<span>✓</span>' : '') + '</button>').join('') + '</div>' });
}
function setLang(l) { lang = l; window.teachingLanguage = l; store.set('hm-language', l); const sel = $('teachLanguage'); sel.value = l; sel.dispatchEvent(new Event('change')); localize(); if (S.open()) closeSheet(); else render() }

/* ---------- actions ---------- */
const ACT = {
  close: () => closeSheet(), say: el => speak(el.dataset.t), lesson: el => openLesson(+el.dataset.i), step: el => { stopSpeak(); LS.step = +el.dataset.n; renderLesson() },
  lv: el => { lvSel = +el.dataset.n; render() }, view: el => { view = el.dataset.v; store.set('hm-view', view); render() }, lang: () => openLangs(), setlang: el => setLang(el.dataset.l),
  startquiz: () => { const c = COURSE[LS.i]; startQuiz({ kind: 'lesson', day: c, pool: allWords(c), n: QN, pass: PASS, kicker: esc(tr('day')) + ' ' + c.d + ' · ' + esc(tr('quiz')), title: c.e + ' ' + pick(c.t) }) },
  opt: el => answer(el), qnext: () => { Q.done = false; if (Q.i < Q.qs.length - 1) { Q.i++; showQ() } else showResult() }, bonus: () => bonusPairs(),
  reveal: el => { const ex = el.closest('.ex'); if ($('exlist').classList.contains('hide-m')) ex.classList.toggle('show-m') },
  hidem: () => { hideM = !hideM; $('exlist').classList.toggle('hide-m', hideM); document.querySelectorAll('.ex.show-m').forEach(e => e.classList.remove('show-m')) },
  know: el => { const c = COURSE[LS.i], k = +el.dataset.k, a = state.known[c.d] = state.known[c.d] || [], p = a.indexOf(k); if (p < 0) a.push(k); else a.splice(p, 1); const on = p < 0; el.classList.toggle('on', on); el.closest('.ex').classList.toggle('known', on); $('knownN').textContent = a.length; $('knownBar').style.width = a.length / allWords(c).length * 100 + '%'; store.set('hm-progress', JSON.stringify(state)); if (on) { award(1); checkBadges() } },
  playall: el => { if (el.dataset.on) { el.dataset.on = ''; stopSpeak(); return } const c = COURSE[LS.i], ws = allWords(c); el.dataset.on = 1; el.textContent = '⏹'; playList(ws.map(w => w[0]), k => { document.querySelectorAll('.ex.playing').forEach(e => e.classList.remove('playing')); const r = document.querySelector('.ex[data-k="' + k + '"]'); if (r) { r.classList.add('playing'); r.scrollIntoView({ block: 'center', behavior: 'smooth' }) } }, () => { el.dataset.on = ''; el.textContent = '▶ ' + tr('playAll'); document.querySelectorAll('.ex.playing').forEach(e => e.classList.remove('playing')) }) },
  dwrite: () => { const c = COURSE[LS.i]; openWriting(allWords(c).map(w => w[0])) }, dspeak: () => openSpeak(COURSE[LS.i]), dcards: () => openCards(shuffle(allWords(COURSE[LS.i]))), ddict: () => openDictation(COURSE[LS.i]),
  tool: el => { const t = el.dataset.t; stopSpeak(); if (t === 'write') openWriting(); else if (t === 'speak') openSpeak(); else if (t === 'words') { cards = []; openCards() } else if (t === 'dailyq') dailyQuiz(); else if (t === 'dict') openDictation(); else if (t === 'ref') openReference() },
  wprev: () => W.prev(), wnext: () => W.next(), wclear: () => W.clear(), whear: () => W.hear(), sprev: () => W.sprev(), snext: () => W.snext(), rec: () => W.rec(), dnext: () => W.dnext(), dcheck: () => W.dcheck(), refpage: el => W.refpage(el),
  flip: () => $('flip').classList.toggle('flipped'), cprev: () => { ci = (ci + cards.length - 1) % cards.length; openCards() }, cnext: () => { ci = (ci + 1) % cards.length; openCards() },
  kbtab: el => { kbTab = el.dataset.k; const d = document.querySelector('.dkb'); if (d) d.outerHTML = kbHtml() }, key: el => kbPress(el.dataset.ch),
  reset: el => { if (el.dataset.sure) { try { localStorage.removeItem('hm-progress') } catch (e) { } state = { done: [], points: 0, streak: 0, last: '', known: {}, today: { d: '', xp: 0 }, badges: [], storiesRead: [], journal: [], dq: 0 }; toast('✓'); render() } else { el.dataset.sure = 1; el.textContent = '⚠️ Tap again to erase all progress'; setTimeout(() => { el.dataset.sure = ''; el.textContent = 'Reset progress' }, 3500) } }
};
window.ACT = ACT;
document.addEventListener('click', e => { const t = e.target.closest('[data-act]'); if (!t) return; const f = ACT[t.dataset.act]; if (f) { f(t, e) } });
$('sheet').addEventListener('click', e => { if (e.target === $('sheet')) closeSheet() });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.open()) closeSheet() });

/* ---------- boot ---------- */
S.el = $('sheet');
const sel = $('teachLanguage'); sel.innerHTML = LANGS.map(l => '<option value="' + l + '">' + LANG_NAMES[l] + '</option>').join(''); sel.value = lang;
sel.addEventListener('change', () => { if (sel.value !== lang) { lang = sel.value; window.teachingLanguage = lang; store.set('hm-language', lang); render() } });
document.querySelectorAll('.tab').forEach(b => b.onclick = () => goTab(b.dataset.t));
if (!['learn', 'practice', 'stories', 'library'].includes(tab)) tab = 'learn';
window.renderAll = render; window.goTab = goTab; window.curTab = curTab; window.closeSheet = closeSheet;
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => { };
goTab(tab);
