// Original cartoon cast for Hindi Master (all drawn here as SVG - no outside artwork).
//   Toon.svg(name, mood, size)   name: parrot | elephant | girl | boy | cat   mood: happy | cheer | sad | think
//   Toon.cast                    names, Hindi names and roles
const Toon = (() => {
  const INK = '#2b2140';
  const eyes = (m, x1, x2, y, r = 6.5) => {
    if (m === 'cheer') return [x1, x2].map(x => `<path d="M${x - r} ${y + 2}q${r} ${-r * 1.5} ${r * 2} 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`).join('');
    const dx = m === 'think' ? 2 : 0, dy = m === 'think' ? -2 : m === 'sad' ? 1.5 : 0;
    const e = [x1, x2].map(x => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + dx}" cy="${y + dy}" r="${r * .55}" fill="${INK}"/><circle cx="${x + dx + 1.4}" cy="${y + dy - 1.6}" r="1.5" fill="#fff"/>`).join('');
    const brow = m === 'sad' ? `<path d="M${x1 - r} ${y - r - 2}l${r * 1.6} -3M${x2 + r} ${y - r - 2}l${-r * 1.6} -3" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M${x2 + 2} ${y + r}q3 6 0 9q-3 -3 0 -9z" fill="#7ad7ff"/>` : m === 'think' ? `<path d="M${x2 - r} ${y - r - 4}h${r * 2}" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` : '';
    return e + brow;
  };
  const mouth = (m, x, y, w = 9) => {
    if (m === 'cheer') return `<path d="M${x - w} ${y}q${w} ${w * 1.9} ${w * 2} 0z" fill="#7a1f3d"/><path d="M${x - w * .55} ${y + w * .9}q${w * .55} ${w * .5} ${w * 1.1} 0" fill="#ff7a93"/>`;
    if (m === 'sad') return `<path d="M${x - w * .7} ${y + 3}q${w * .7} ${-w * .9} ${w * 1.4} 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    if (m === 'think') return `<path d="M${x - w * .5} ${y + 1}h${w}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    return `<path d="M${x - w} ${y - 1}q${w} ${w} ${w * 2} 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  };
  const star = (x, y, s, c = '#ffc93c') => `<path d="M${x} ${y - s}l${s * .3} ${s * .7} ${s * .75} .1 -${s * .6} ${s * .5} ${s * .22} ${s * .75} -${s * .67} -${s * .42} -${s * .67} ${s * .42} ${s * .22} -${s * .75} -${s * .6} -${s * .5} ${s * .75} -.1z" fill="${c}"/>`;
  const fx = m => m === 'cheer' ? star(12, 20, 9) + star(108, 14, 7, '#ff4f8b') + star(104, 60, 6, '#7c5cff') : m === 'think' ? `<circle cx="104" cy="22" r="3" fill="#cfc6ff"/><circle cx="110" cy="12" r="5" fill="#cfc6ff"/><text x="96" y="14" font-size="16" font-weight="800" fill="#7c5cff" font-family="sans-serif">?</text>` : '';
  const shadow = '<ellipse cx="60" cy="116" rx="30" ry="4" fill="#2b214022"/>';
  const cheeks = (a, b, y) => `<circle cx="${a}" cy="${y}" r="5" fill="#ff8fab" opacity=".55"/><circle cx="${b}" cy="${y}" r="5" fill="#ff8fab" opacity=".55"/>`;

  const parts = {
    parrot: m => `${shadow}
      <path d="M50 92Q40 118 54 116Q58 104 60 92z" fill="#17a05a"/><path d="M66 92Q80 116 66 116Q60 104 62 92z" fill="#ff5d73"/>
      <ellipse cx="60" cy="74" rx="28" ry="32" fill="#34c76b"/><ellipse cx="60" cy="82" rx="17" ry="22" fill="#c4f5d2"/>
      <path d="M34 66Q22 90 42 98Q44 80 43 66z" fill="#17a05a"/><path d="M86 66Q98 90 78 98Q76 80 77 66z" fill="#17a05a"/>
      <path d="M50 104l-5 7M50 104v8M50 104l5 7M70 104l-5 7M70 104v8M70 104l5 7" stroke="#ff9f1c" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="44" r="27" fill="#34c76b"/><path d="M50 20Q52 6 58 16Q62 4 66 16Q72 8 72 22z" fill="#ff5d73"/>
      <ellipse cx="60" cy="54" rx="21" ry="17" fill="#eafff1"/>
      ${eyes(m, 49, 71, 49, 6.5)}${cheeks(40, 80, 60)}
      <path d="M53 56Q60 49 67 56Q67 69 60 72Q53 69 53 56z" fill="#ff9f1c"/>${m === 'cheer' ? '<ellipse cx="60" cy="65" rx="4" ry="3.4" fill="#7a1f3d"/>' : ''}
      <g transform="translate(0 -7)"><path d="M34 28L60 17L86 28L60 39z" fill="${INK}"/><path d="M46 33v6Q60 45 74 39v-6" fill="#3d2f63"/><path d="M84 29v13" stroke="#ffc93c" stroke-width="2.4"/><circle cx="84" cy="44" r="3" fill="#ffc93c"/></g>
      ${fx(m)}`,
    elephant: m => `${shadow}
      <circle cx="28" cy="58" r="23" fill="#8fb0f5"/><circle cx="92" cy="58" r="23" fill="#8fb0f5"/><circle cx="28" cy="58" r="14" fill="#ffc2d6"/><circle cx="92" cy="58" r="14" fill="#ffc2d6"/>
      <path d="M24 118Q26 92 60 92Q94 92 96 118z" fill="#a9c6ff"/><path d="M42 94Q60 108 78 94L75 105Q60 116 45 105z" fill="#ff6b35"/>
      <circle cx="60" cy="56" r="34" fill="#a9c6ff"/>
      <path d="${m === 'cheer' ? 'M58 64Q46 44 54 34' : 'M56 66Q52 96 66 100Q80 102 78 90'}" fill="none" stroke="#a9c6ff" stroke-width="17" stroke-linecap="round"/>
      <path d="M42 74Q34 84 41 92M78 74Q86 84 79 92" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      ${eyes(m, 46, 74, 48, 6.5)}${cheeks(37, 83, 62)}${m === 'cheer' ? mouth(m, 60, 80, 6) : ''}${fx(m)}`,
    girl: m => `${shadow}
      <circle cx="25" cy="56" r="12" fill="${INK}"/><circle cx="95" cy="56" r="12" fill="${INK}"/><circle cx="28" cy="44" r="5" fill="#ffc93c"/><circle cx="92" cy="44" r="5" fill="#ffc93c"/>
      <path d="M28 118Q30 86 60 83Q90 86 92 118z" fill="#ff4f8b"/><path d="M60 84v34" stroke="#ffd0e0" stroke-width="3"/><path d="M48 84Q60 98 72 84" fill="#fff" opacity=".9"/>
      <rect x="53" y="72" width="14" height="16" rx="6" fill="#f1b48a"/>
      <circle cx="60" cy="48" r="31" fill="${INK}"/><circle cx="60" cy="54" r="26" fill="#f7c59f"/>
      <path d="M33 50Q38 24 60 24Q82 24 87 50Q74 36 60 38Q46 36 33 50z" fill="${INK}"/><circle cx="60" cy="38" r="2.8" fill="#e11d48"/>
      ${eyes(m, 50, 70, 55, 5.8)}${cheeks(42, 78, 64)}${mouth(m, 60, 66, 7)}${fx(m)}`,
    boy: m => `${shadow}
      <path d="M28 118Q30 86 60 83Q90 86 92 118z" fill="#3b82f6"/><path d="M45 85L40 118M75 85L80 118" stroke="#ffc93c" stroke-width="6" stroke-linecap="round"/><path d="M50 84L60 96L70 84" fill="#fff"/>
      <rect x="53" y="72" width="14" height="16" rx="6" fill="#e3a073"/>
      <circle cx="33" cy="56" r="6" fill="#eaa97c"/><circle cx="87" cy="56" r="6" fill="#eaa97c"/>
      <circle cx="60" cy="54" r="27" fill="#eaa97c"/>
      <path d="M34 46Q36 24 60 24Q84 24 86 46Q74 38 60 40Q46 38 34 46z" fill="${INK}"/>
      <path d="M34 42Q60 6 86 42z" fill="#ff6b35"/><path d="M58 41Q92 38 99 47Q80 50 58 45z" fill="#e5531d"/><circle cx="60" cy="14" r="3.4" fill="#fff"/>
      ${eyes(m, 50, 70, 56, 5.8)}${cheeks(42, 78, 65)}${mouth(m, 60, 67, 7)}${fx(m)}`,
    cat: m => `${shadow}
      <path d="M88 100Q112 96 108 72Q106 64 100 70" fill="none" stroke="#ff9f43" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="60" cy="96" rx="27" ry="22" fill="#ffb35c"/><ellipse cx="60" cy="102" rx="15" ry="14" fill="#fff1dc"/>
      <path d="M30 40L32 14L52 30z" fill="#ffb35c"/><path d="M90 40L88 14L68 30z" fill="#ffb35c"/><path d="M35 34L35 21L46 30z" fill="#ff9fb8"/><path d="M85 34L85 21L74 30z" fill="#ff9fb8"/>
      <ellipse cx="60" cy="54" rx="34" ry="30" fill="#ffb35c"/>
      <path d="M52 26v9M60 24v10M68 26v9" stroke="#e8852b" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="60" cy="62" rx="15" ry="11" fill="#fff1dc"/>
      ${eyes(m, 45, 75, 52, 7)}${cheeks(36, 84, 64)}
      <path d="M56 60h8l-4 4z" fill="#ff6b8a"/>${m === 'cheer' ? mouth(m, 60, 66, 6) : `<path d="M60 64q-5 7 -10 3M60 64q5 7 10 3" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`}
      <path d="M24 58l-14 -3M24 64l-14 3M96 58l14 -3M96 64l14 3" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>
      ${fx(m)}`
  };

  const cast = {
    parrot:   { hi: 'मिट्ठू', roman: 'Mitthu', role: 'teacher' },
    elephant: { hi: 'गजू', roman: 'Gajju', role: 'friend' },
    girl:     { hi: 'मीनू', roman: 'Meenu', role: 'friend' },
    boy:      { hi: 'बिट्टू', roman: 'Bittu', role: 'friend' },
    cat:      { hi: 'बिल्लू', roman: 'Billu', role: 'friend' }
  };
  const svg = (name = 'parrot', mood = 'happy', size = 96) => {
    const f = parts[name] || parts.parrot;
    return `<svg class="toon toon-${name} mood-${mood}" viewBox="0 0 120 120" width="${size}" height="${size}" role="img" aria-label="${(cast[name] || cast.parrot).roman}">${f(mood)}</svg>`;
  };
  return { svg, cast, names: Object.keys(parts) };
})();
