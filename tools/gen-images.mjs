// Generates the illustration set (SVG) used by the site.
// Usage: node tools/gen-images.mjs   ->  docs/assets/img/*.svg
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'assets', 'img');
mkdirSync(out, { recursive: true });

const save = (name, w, h, defs, body) =>
  writeFileSync(join(out, name + '.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${defs}</defs>${body}</svg>\n`);

// ---------- helpers ----------
const lin = (id, c1, c2) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
const rad = (id, c, o = .9) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const cone = `<linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c4" stop-opacity=".55"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></linearGradient>`;
const CCTV_DEFS = `<pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1.4" fill="#000" opacity=".16"/></pattern><radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>`;
const CCTV = `<rect width="640" height="360" fill="#0a2a4a" opacity=".18"/><rect width="640" height="360" fill="url(#scan)"/><rect width="640" height="360" fill="url(#vig)"/>`;

const range = (a, b, step = 1) => { const r = []; for (let i = a; i < b; i += step) r.push(i); return r; };
const person = (x, y, s = 1, c = '#0b1228') =>
  `<g fill="${c}"><circle cx="${x}" cy="${y - 72 * s}" r="${9 * s}"/><rect x="${x - 14 * s}" y="${y - 62 * s}" width="${28 * s}" height="${38 * s}" rx="${11 * s}"/><rect x="${x - 12 * s}" y="${y - 28 * s}" width="${10 * s}" height="${28 * s}" rx="${4 * s}"/><rect x="${x + 2 * s}" y="${y - 28 * s}" width="${10 * s}" height="${28 * s}" rx="${4 * s}"/></g>`;
const win = (x, y, w, h, fill, frame = '#e8eefc') =>
  `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"/><path d="M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}" stroke="#0b1533" stroke-opacity=".35" stroke-width="3"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="${frame}" stroke-opacity=".7" stroke-width="3"/></g>`;
const tree = (x, y, s, c) =>
  `<rect x="${x - 5 * s}" y="${y - 50 * s}" width="${10 * s}" height="${50 * s}" fill="#4a3324"/><circle cx="${x}" cy="${y - 80 * s}" r="${38 * s}" fill="${c}"/><circle cx="${x - 26 * s}" cy="${y - 58 * s}" r="${28 * s}" fill="${c}"/><circle cx="${x + 26 * s}" cy="${y - 60 * s}" r="${30 * s}" fill="${c}"/>`;
const pine = (x, y, s, c, snow) =>
  `<rect x="${x - 5 * s}" y="${y - 6 * s}" width="${10 * s}" height="${16 * s}" fill="#5a3d2c"/><path d="M${x} ${y - 120 * s}l${28 * s} ${46 * s}h${-56 * s}zM${x} ${y - 88 * s}l${36 * s} ${48 * s}h${-72 * s}zM${x} ${y - 52 * s}l${44 * s} ${56 * s}h${-88 * s}z" fill="${c}"/>` +
  (snow ? `<path d="M${x} ${y - 120 * s}l${12 * s} ${20 * s}h${-24 * s}zM${x} ${y - 88 * s}l${16 * s} ${21 * s}h${-32 * s}z" fill="#f4f8ff"/>` : '');
const cloud = (x, y, s = 1) => `<g fill="#fff" opacity=".92"><ellipse cx="${x}" cy="${y}" rx="${44 * s}" ry="${14 * s}"/><ellipse cx="${x + 24 * s}" cy="${y - 10 * s}" rx="${28 * s}" ry="${16 * s}"/><ellipse cx="${x - 24 * s}" cy="${y - 6 * s}" rx="${26 * s}" ry="${12 * s}"/></g>`;
const wallcam = (x, y, s = 1, flip = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})"><rect x="-6" y="-6" width="10" height="14" rx="2" fill="#cbd6ee"/><rect x="0" y="-9" width="36" height="16" rx="7" fill="#fff" stroke="#b9c6e3" stroke-width="1.5"/><circle cx="36" cy="-1" r="6.5" fill="#0a1a45"/><circle cx="36" cy="-1" r="2.6" fill="#2f6bff"/></g>`;
const badge = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle r="30" fill="#fff" stroke="#e6eeff" stroke-width="4"/><path d="M0-18 15-12V2C15 12 8 18 0 22-8 18-15 12-15 2V-12Z" fill="#14307a" stroke="#ffc21a" stroke-width="3" stroke-linejoin="round"/><path d="M-7 1l5 5 10-11" fill="none" stroke="#ffc21a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const detect = (x, y, w, h, label) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#ffc21a" stroke-width="2" stroke-dasharray="6 4"/><rect x="${x}" y="${y - 17}" width="${label.length * 7.4 + 10}" height="17" fill="#ffc21a"/><text x="${x + 5}" y="${y - 5}" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" fill="#0a1a45">${label}</text>`;

// =====================================================================
// LIVE VIEWS (CCTV style, 640x360)
// =====================================================================
save('cam-front', 640, 360,
  lin('sky', '#0a1738', '#2a4886') + rad('glow', '#ffd98a', .9) + lin('lawn', '#1e4b39', '#122b22') + CCTV_DEFS,
  `<rect width="640" height="360" fill="url(#sky)"/>
   ${range(0, 26).map(i => `<circle cx="${(i * 97) % 640}" cy="${(i * 53) % 70 + 6}" r="1.2" fill="#fff" opacity=".6"/>`).join('')}
   <rect y="262" width="640" height="98" fill="url(#lawn)"/>
   ${tree(56, 270, 1.15, '#0f2e20')}${tree(598, 274, 1.3, '#0f2e20')}
   <polygon points="92,90 320,22 548,90" fill="#14224a"/>
   <rect x="110" y="90" width="420" height="180" fill="#8f97b3"/>
   <g stroke="#7a829f" stroke-width="2">${range(106, 268, 16).map(y => `<path d="M110 ${y}h420"/>`).join('')}</g>
   <rect x="110" y="86" width="420" height="8" fill="#1b2c5c"/>
   ${win(140, 140, 84, 84, '#ffd489')}${win(416, 140, 84, 84, '#ffd489')}
   <polygon points="262,148 320,122 378,148" fill="#14224a"/>
   <rect x="266" y="148" width="108" height="6" fill="#1b2c5c"/>
   <rect x="270" y="154" width="5" height="114" fill="#cfd6ea"/><rect x="365" y="154" width="5" height="114" fill="#cfd6ea"/>
   <rect x="290" y="156" width="60" height="112" rx="3" fill="#4c3227"/>
   <rect x="298" y="166" width="19" height="38" fill="#5b3d31"/><rect x="323" y="166" width="19" height="38" fill="#5b3d31"/>
   <rect x="298" y="212" width="19" height="42" fill="#5b3d31"/><rect x="323" y="212" width="19" height="42" fill="#5b3d31"/>
   <circle cx="337" cy="214" r="3" fill="#ffc21a"/>
   <circle cx="252" cy="182" r="72" fill="url(#glow)"/><circle cx="388" cy="182" r="72" fill="url(#glow)"/>
   <rect x="248" y="176" width="8" height="12" rx="2" fill="#fff4cf"/><rect x="384" y="176" width="8" height="12" rx="2" fill="#fff4cf"/>
   <rect x="262" y="268" width="116" height="9" fill="#7d8494"/><rect x="254" y="277" width="132" height="9" fill="#6d7486"/>
   <polygon points="262,286 378,286 470,360 170,360" fill="#b9c1d6" opacity=".85"/>
   <ellipse cx="128" cy="268" rx="46" ry="18" fill="#0f2e20"/><ellipse cx="512" cy="268" rx="46" ry="18" fill="#0f2e20"/>
   ${person(332, 350, 1.05)}
   ${detect(304, 258, 56, 96, 'PERSON 96%')}
   ${CCTV}`);

save('cam-drive', 640, 360,
  lin('sky', '#070f28', '#1c3266') + rad('lamp', '#ffe7a8', .85) + lin('road', '#2b3450', '#161c30') + CCTV_DEFS,
  `<rect width="640" height="360" fill="url(#sky)"/>
   ${range(0, 22).map(i => `<circle cx="${(i * 83) % 640}" cy="${(i * 47) % 60 + 8}" r="1.1" fill="#fff" opacity=".55"/>`).join('')}
   <rect y="270" width="640" height="90" fill="url(#road)"/>
   <rect y="258" width="640" height="18" fill="#123222"/>
   <rect x="0" y="52" width="330" height="208" fill="#767f9d"/>
   <rect x="0" y="40" width="340" height="18" fill="#14224a"/>
   <g stroke="#666f8c" stroke-width="2">${range(70, 258, 16).map(y => `<path d="M0 ${y}h330"/>`).join('')}</g>
   <rect x="36" y="118" width="190" height="142" fill="#b6bed4"/>
   <g stroke="#8f99b6" stroke-width="3">${range(146, 260, 28).map(y => `<path d="M36 ${y}h190"/>`).join('')}</g>
   <g fill="#e6ecfa" opacity=".85">${range(0, 6).map(i => `<rect x="${44 + i * 30}" y="124" width="22" height="12" rx="2"/>`).join('')}</g>
   ${win(250, 120, 56, 64, '#ffd489', '#dfe6f5')}
   <rect x="226" y="98" width="8" height="10" rx="2" fill="#fff4cf"/><circle cx="230" cy="106" r="46" fill="url(#lamp)" opacity=".7"/>
   <rect x="596" y="86" width="6" height="184" fill="#2b3552"/><rect x="560" y="82" width="46" height="8" rx="4" fill="#2b3552"/>
   <circle cx="566" cy="94" r="110" fill="url(#lamp)"/><rect x="558" y="88" width="16" height="6" rx="3" fill="#fff4cf"/>
   <ellipse cx="420" cy="322" rx="120" ry="12" fill="#000" opacity=".3"/>
   <rect x="330" y="252" width="220" height="44" rx="16" fill="#1f3b7a"/>
   <path d="M366 252 388 220Q392 214 402 214H480Q490 214 496 222L518 252Z" fill="#1a3268"/>
   <path d="M378 250 394 224H436V250ZM444 250V224H478L500 250Z" fill="#8fb1e6" opacity=".75"/>
   <circle cx="382" cy="298" r="20" fill="#10182f"/><circle cx="382" cy="298" r="9" fill="#6c7793"/>
   <circle cx="506" cy="298" r="20" fill="#10182f"/><circle cx="506" cy="298" r="9" fill="#6c7793"/>
   <rect x="536" y="262" width="16" height="10" rx="4" fill="#fff4cf"/><polygon points="552,262 640,244 640,296 552,272" fill="#fff4cf" opacity=".12"/>
   <rect x="330" y="262" width="10" height="10" rx="3" fill="#e5484d"/>
   ${detect(322, 208, 236, 96, 'VEHICLE')}
   ${CCTV}`);

save('cam-dock', 640, 360,
  lin('sky', '#070f28', '#1b2d5e') + cone + lin('asph', '#2c3550', '#151b2e') + CCTV_DEFS,
  `<rect width="640" height="360" fill="url(#sky)"/>
   <rect y="272" width="640" height="88" fill="url(#asph)"/>
   <rect y="96" width="640" height="182" fill="#6f7a94"/>
   <rect y="84" width="640" height="14" fill="#4b5573"/>
   ${[30, 250, 470].map(x => `<rect x="${x}" y="140" width="140" height="132" fill="#a9b3c9"/><g stroke="#8892ad" stroke-width="2">${range(152, 272, 12).map(y => `<path d="M${x} ${y}h140"/>`).join('')}</g>`).join('')}
   <rect x="250" y="140" width="140" height="132" fill="#0d1428"/>
   <rect x="262" y="150" width="116" height="122" fill="#e8edf8"/>
   <path d="M320 150V272" stroke="#b9c3da" stroke-width="3"/>
   <g stroke="#c7d0e4" stroke-width="2">${range(168, 270, 16).map(y => `<path d="M262 ${y}h116"/>`).join('')}</g>
   <rect x="264" y="256" width="14" height="8" rx="2" fill="#e5484d"/><rect x="362" y="256" width="14" height="8" rx="2" fill="#e5484d"/>
   <rect x="258" y="262" width="124" height="10" fill="#1b2340"/>
   <rect x="30" y="266" width="140" height="8" fill="#1b2340"/><rect x="470" y="266" width="140" height="8" fill="#1b2340"/>
   <polygon points="204,112 222,112 290,272 130,272" fill="url(#cone)"/><polygon points="418,112 436,112 520,272 360,272" fill="url(#cone)"/>
   <rect x="198" y="104" width="30" height="10" rx="4" fill="#dfe6f5"/><rect x="412" y="104" width="30" height="10" rx="4" fill="#dfe6f5"/>
   <path d="M120 272 74 360M330 272 322 360M540 272 590 360" stroke="#e5b61a" stroke-width="4"/>
   <rect x="196" y="246" width="12" height="26" rx="3" fill="#f5b800"/><rect x="432" y="246" width="12" height="26" rx="3" fill="#f5b800"/>
   ${wallcam(590, 120, .9, -1)}
   ${detect(250, 138, 140, 138, 'DOCK 2 Â· OPEN')}
   ${CCTV}`);

save('cam-store', 640, 360,
  lin('sky', '#0a1330', '#22386f') + rad('lamp', '#ffe7a8', .8) + lin('walk', '#59617a', '#2f364d') + lin('shop', '#ffe2a8', '#f7b24a') + CCTV_DEFS,
  `<rect width="640" height="360" fill="url(#sky)"/>
   <rect x="80" y="46" width="480" height="248" fill="#3a4666"/>
   <rect x="72" y="38" width="496" height="14" fill="#1b2340"/>
   <rect x="110" y="64" width="420" height="56" rx="6" fill="#14307a"/>
   <rect x="140" y="84" width="130" height="16" rx="8" fill="#ffc21a"/><rect x="286" y="84" width="84" height="16" rx="8" fill="#fff" opacity=".65"/><rect x="386" y="84" width="60" height="16" rx="8" fill="#fff" opacity=".35"/>
   ${range(0, 8).map(i => `<polygon points="${100 + i * 55},128 ${155 + i * 55},128 ${160 + i * 55},170 ${100 + i * 55 - 5 + 0},170" fill="${i % 2 ? '#f4f7ff' : '#2f6bff'}"/>`).join('')}
   <rect x="120" y="180" width="234" height="106" rx="4" fill="url(#shop)"/>
   <g fill="#8a5a25" opacity=".55">${range(0, 5).map(i => `<rect x="${134 + i * 44}" y="${206}" width="30" height="${30 + (i % 3) * 10}" rx="3"/>`).join('')}</g>
   <path d="M120 240h234M120 270h234" stroke="#8a5a25" stroke-width="3" opacity=".6"/>
   <rect x="120" y="180" width="234" height="106" rx="4" fill="none" stroke="#14224a" stroke-width="5"/>
   <rect x="376" y="180" width="96" height="112" rx="4" fill="#ffe2a8"/><rect x="376" y="180" width="96" height="112" rx="4" fill="none" stroke="#14224a" stroke-width="5"/>
   <path d="M424 180v112" stroke="#14224a" stroke-width="4"/>
   <rect x="392" y="206" width="56" height="24" rx="4" fill="#0b1228"/><text x="420" y="223" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="700" fill="#4ade80">OPEN</text>
   <rect y="292" width="640" height="68" fill="url(#walk)"/>
   <rect x="34" y="112" width="6" height="184" fill="#2b3552"/><circle cx="37" cy="116" r="100" fill="url(#lamp)"/><rect x="26" y="106" width="22" height="7" rx="3" fill="#fff4cf"/>
   ${wallcam(546, 130, .9, -1)}
   ${CCTV}`);

// =====================================================================
// BUNDLE SCENES (daytime, 640x360)
// =====================================================================
const DAY = lin('sky', '#bcd9ff', '#f3f8ff') + lin('lawn', '#7bc98f', '#4aa56e') + lin('pave', '#dbe2f2', '#c2cce2');
const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="30" fill="#ffe08a"/><circle cx="${x}" cy="${y}" r="46" fill="#ffe08a" opacity=".3"/>`;

save('bundle-condo', 640, 360, DAY,
  `<rect width="640" height="360" fill="url(#sky)"/>${sun(96, 70)}${cloud(470, 60)}${cloud(300, 40, .7)}
   <rect x="70" y="140" width="120" height="190" fill="#b7c6e6"/><rect x="470" y="170" width="120" height="160" fill="#c6d3ee"/>
   ${range(0, 3).flatMap(i => range(0, 4).map(j => `<rect x="${86 + i * 34}" y="${158 + j * 40}" width="22" height="24" rx="2" fill="#8fa8d8"/>`)).join('')}
   ${range(0, 3).flatMap(i => range(0, 3).map(j => `<rect x="${486 + i * 34}" y="${188 + j * 40}" width="22" height="24" rx="2" fill="#9db3de"/>`)).join('')}
   <rect x="200" y="46" width="240" height="284" fill="#e9eefb"/><rect x="200" y="46" width="240" height="14" fill="#14307a"/>
   ${range(0, 5).flatMap(i => range(0, 6).map(j => `<rect x="${222 + i * 40}" y="${78 + j * 40}" width="26" height="24" rx="2" fill="${(i * 3 + j * 5) % 4 === 0 ? '#ffd489' : '#7fa2e6'}"/><rect x="${218 + i * 40}" y="${104 + j * 40}" width="34" height="4" fill="#c3cee8"/>`)).join('')}
   <rect x="300" y="290" width="40" height="40" fill="#14307a"/><rect x="304" y="294" width="14" height="36" fill="#7fa2e6"/><rect x="322" y="294" width="14" height="36" fill="#7fa2e6"/>
   <rect y="328" width="640" height="32" fill="url(#pave)"/>
   ${tree(48, 340, .8, '#4aa56e')}${tree(596, 340, .85, '#4aa56e')}
   ${wallcam(456, 300, .8, -1)}
   ${badge(540, 90, 1.1)}`);

save('bundle-family', 640, 360, DAY,
  `<rect width="640" height="360" fill="url(#sky)"/>${sun(560, 66)}${cloud(120, 64)}${cloud(400, 44, .7)}
   <rect y="270" width="640" height="90" fill="url(#lawn)"/>
   <polygon points="380,282 470,282 520,360 340,360" fill="#cfd6e6"/>
   ${tree(52, 290, 1.1, '#3f9e64')}${tree(596, 292, 1.05, '#3f9e64')}
   <rect x="96" y="196" width="108" height="86" fill="#eadcc4"/><polygon points="88,198 150,166 212,198" fill="#14307a"/>
   <rect x="110" y="214" width="80" height="68" fill="#cfd7ea"/><g stroke="#a7b2cd" stroke-width="3">${range(230, 282, 16).map(y => `<path d="M110 ${y}h80"/>`).join('')}</g>
   <rect x="204" y="150" width="256" height="132" fill="#f6e9d6"/>
   <rect x="234" y="104" width="196" height="56" fill="#f6e9d6"/>
   <polygon points="190,154 332,92 474,154" fill="#14307a"/><polygon points="252,110 332,74 412,110" fill="#1b3f9a"/>
   ${win(226, 178, 60, 52, '#a9c9f5')}${win(378, 178, 60, 52, '#a9c9f5')}${win(300, 118, 64, 30, '#a9c9f5')}
   <rect x="308" y="214" width="46" height="68" rx="3" fill="#8a5a3c"/><circle cx="345" cy="250" r="3.5" fill="#ffc21a"/>
   <rect x="364" y="224" width="9" height="18" rx="3" fill="#fff" stroke="#b9c6e3"/><circle cx="368.5" cy="231" r="3" fill="#2f6bff"/>
   <g stroke="#2f6bff" stroke-width="2" fill="none" opacity=".7"><path d="M378 218q8 6 0 16M384 214q12 10 0 24"/></g>
   ${wallcam(452, 160, .9, 1)}
   <g fill="#fff">${range(0, 8).map(i => `<rect x="${500 + i * 14}" y="248" width="8" height="34" rx="2"/>`).join('')}</g><rect x="496" y="258" width="118" height="4" fill="#fff"/>
   ${badge(80, 84, 1)}`);

save('bundle-senior', 640, 360, DAY + rad('halo', '#ffc21a', .35),
  `<rect width="640" height="360" fill="url(#sky)"/>${sun(90, 66)}${cloud(300, 54, .8)}
   <rect y="272" width="640" height="88" fill="url(#lawn)"/>
   <polygon points="188,282 240,282 260,360 150,360" fill="#cfd6e6"/>
   <rect x="60" y="176" width="280" height="106" fill="#f7ecd0"/><polygon points="38,180 200,112 362,180" fill="#14307a"/>
   ${win(84, 200, 64, 50, '#a9c9f5')}${win(252, 200, 64, 50, '#a9c9f5')}
   <rect x="172" y="212" width="52" height="70" rx="3" fill="#2f6bff"/><rect x="180" y="220" width="16" height="26" fill="#5b8bff"/><rect x="202" y="220" width="16" height="26" fill="#5b8bff"/><circle cx="217" cy="252" r="3.5" fill="#ffc21a"/>
   <rect x="160" y="196" width="76" height="8" fill="#e6eeff"/>
   ${[80, 110, 290, 322].map((x, i) => `<circle cx="${x}" cy="${280 + (i % 2) * 6}" r="7" fill="${['#e5484d', '#ffc21a', '#ff8fb1', '#fff'][i]}"/><circle cx="${x}" cy="${280 + (i % 2) * 6}" r="2.5" fill="#f5a800"/>`).join('')}
   <circle cx="510" cy="186" r="120" fill="url(#halo)"/>
   <circle cx="510" cy="186" r="96" fill="#fff" stroke="#e6eeff" stroke-width="6"/>
   <path d="M474 96l36 76 36-76" fill="none" stroke="#14307a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
   <circle cx="510" cy="196" r="40" fill="#fff" stroke="#ffc21a" stroke-width="7"/><circle cx="510" cy="196" r="22" fill="#e5484d"/><ellipse cx="503" cy="188" rx="7" ry="4" fill="#fff" opacity=".5"/>
   <path d="M430 258h32l10-16 14 30 12-22 8 8h40" fill="none" stroke="#2f6bff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 6)"/>
   ${badge(90, 300, .8)}`);

save('bundle-cottage', 640, 360, lin('sky', '#28407f', '#f4c3ae') + lin('snow', '#f4f8ff', '#c9d7f2') + rad('warm', '#ffd489', .7),
  `<rect width="640" height="360" fill="url(#sky)"/>
   ${range(0, 30).map(i => `<circle cx="${(i * 71) % 640}" cy="${(i * 37) % 130 + 6}" r="1.3" fill="#fff" opacity=".7"/>`).join('')}
   <polygon points="0,250 120,200 250,240 380,196 520,236 640,206 640,360 0,360" fill="#7a8fc0"/>
   <rect y="250" width="640" height="110" fill="url(#snow)"/>
   ${pine(70, 290, 1, '#1f5a44', true)}${pine(130, 300, .8, '#246650', true)}${pine(566, 292, 1.05, '#1f5a44', true)}${pine(512, 304, .78, '#246650', true)}
   <circle cx="320" cy="222" r="150" fill="url(#warm)"/>
   <rect x="204" y="168" width="232" height="104" fill="#9a6a45"/>
   <g stroke="#7d5236" stroke-width="3">${range(180, 272, 14).map(y => `<path d="M204 ${y}h232"/>`).join('')}</g>
   <rect x="392" y="110" width="28" height="52" fill="#6b4a3a"/><circle cx="408" cy="98" r="10" fill="#fff" opacity=".7"/><circle cx="420" cy="80" r="14" fill="#fff" opacity=".5"/><circle cx="438" cy="60" r="18" fill="#fff" opacity=".35"/>
   <polygon points="184,174 320,104 456,174" fill="#5b6690"/><polygon points="196,170 320,110 444,170 444,160 320,98 196,160" fill="#f4f8ff"/>
   ${win(226, 194, 56, 46, '#ffd489', '#f4e3c2')}${win(358, 194, 56, 46, '#ffd489', '#f4e3c2')}
   <rect x="300" y="208" width="40" height="64" rx="3" fill="#4b3021"/><circle cx="332" cy="242" r="3" fill="#ffc21a"/>
   <rect x="192" y="266" width="256" height="14" rx="6" fill="#f4f8ff"/>
   ${wallcam(456, 176, .8, 1)}
   ${range(0, 24).map(i => `<circle cx="${(i * 53 + 20) % 640}" cy="${(i * 29) % 240 + 20}" r="2.2" fill="#fff" opacity=".85"/>`).join('')}
   ${badge(80, 84, 1)}`);

save('bundle-business', 640, 360, DAY,
  `<rect width="640" height="360" fill="url(#sky)"/>${sun(560, 60)}${cloud(120, 56)}${cloud(380, 40, .7)}
   <rect x="110" y="96" width="420" height="192" fill="#e6c9b0"/>
   <g stroke="#d3b298" stroke-width="2">${range(108, 288, 14).map(y => `<path d="M110 ${y}h420"/>`).join('')}</g>
   <rect x="100" y="84" width="440" height="16" fill="#14307a"/>
   <rect x="170" y="110" width="300" height="38" rx="6" fill="#fff"/><rect x="190" y="122" width="110" height="14" rx="7" fill="#14307a"/><rect x="312" y="122" width="70" height="14" rx="7" fill="#ffc21a"/><rect x="394" y="122" width="54" height="14" rx="7" fill="#14307a" opacity=".35"/>
   ${range(0, 8).map(i => `<polygon points="${140 + i * 45},154 ${185 + i * 45},154 ${190 + i * 45},190 ${135 + i * 45},190" fill="${i % 2 ? '#fff' : '#14307a'}"/>`).join('')}
   <rect x="150" y="198" width="160" height="82" rx="4" fill="#a9c9f5"/><path d="M150 280 220 198h30l-70 82zM230 280l60-82h16l-60 82z" fill="#fff" opacity=".28"/><rect x="150" y="198" width="160" height="82" rx="4" fill="none" stroke="#14307a" stroke-width="5"/>
   <rect x="336" y="198" width="76" height="90" rx="4" fill="#a9c9f5"/><rect x="336" y="198" width="76" height="90" rx="4" fill="none" stroke="#14307a" stroke-width="5"/><path d="M374 198v90" stroke="#14307a" stroke-width="4"/>
   <rect x="422" y="234" width="12" height="20" rx="3" fill="#14307a"/><circle cx="428" cy="241" r="2.6" fill="#ffc21a"/>
   ${wallcam(514, 170, .9, -1)}
   <rect y="288" width="640" height="72" fill="url(#pave)"/>
   ${tree(590, 340, .9, '#4aa56e')}
   <rect x="448" y="270" width="60" height="18" rx="3" fill="#7a5a44"/><g fill="#4aa56e"><circle cx="462" cy="266" r="9"/><circle cx="478" cy="264" r="10"/><circle cx="494" cy="266" r="9"/></g>
   ${badge(72, 84, 1)}`);

save('bundle-industrial', 640, 360, DAY + lin('grav', '#c5ccdc', '#a4adc4') + `<linearGradient id="fov" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc21a" stop-opacity=".5"/><stop offset="1" stop-color="#ffc21a" stop-opacity=".05"/></linearGradient>`,
  `<rect width="640" height="360" fill="url(#sky)"/>${sun(90, 66)}${cloud(300, 50, .8)}
   <rect y="284" width="640" height="76" fill="url(#grav)"/>
   <rect x="80" y="156" width="290" height="132" fill="#c3cbe0"/>
   ${range(0, 5).map(i => `<polygon points="${80 + i * 58},156 ${80 + i * 58},120 ${138 + i * 58},156" fill="#9aa6c6"/>`).join('')}
   ${[104, 184, 264].map(x => `<rect x="${x}" y="226" width="56" height="62" fill="#8791ac"/><g stroke="#727c98" stroke-width="2">${range(236, 288, 10).map(y => `<path d="M${x} ${y}h56"/>`).join('')}</g>`).join('')}
   ${range(0, 6).map(i => `<rect x="${100 + i * 40}" y="176" width="26" height="16" rx="2" fill="#a9c9f5"/>`).join('')}
   <rect x="330" y="58" width="32" height="130" fill="#dfe6f5"/><rect x="330" y="76" width="32" height="14" fill="#e5484d"/><rect x="330" y="104" width="32" height="14" fill="#e5484d"/>
   <rect x="326" y="52" width="40" height="8" rx="3" fill="#8791ac"/>
   <rect x="400" y="174" width="82" height="114" fill="#dfe6f5"/><ellipse cx="441" cy="174" rx="41" ry="10" fill="#f3f6fd"/>
   <rect x="500" y="196" width="82" height="92" fill="#cbd6ee"/><ellipse cx="541" cy="196" rx="41" ry="10" fill="#eaf0fb"/>
   <path d="M400 214h82M500 232h82" stroke="#b1bfdc" stroke-width="3"/>
   <polygon points="566,198 380,300 640,330 640,240" fill="url(#fov)"/>
   <rect x="0" y="262" width="640" height="4" fill="#5b6690"/>
   ${range(0, 22).map(i => `<rect x="${i * 30}" y="252" width="4" height="48" fill="#5b6690"/>`).join('')}
   <g stroke="#7a86a6" stroke-width="1">${range(262, 300, 8).map(y => `<path d="M0 ${y}h640"/>`).join('')}</g>
   <path d="M0 252l10-8 10 8 10-8 10 8" stroke="#5b6690" stroke-width="2" fill="none" transform="scale(1)"/>
   <rect x="563" y="176" width="6" height="110" fill="#2b3552"/>${wallcam(566, 178, .9, -1)}
   ${badge(560, 76, 1.1)}`);

// =====================================================================
// LIFESENTRY (640x360)
// =====================================================================
save('lifesentry', 640, 360, lin('bg', '#e6eeff', '#f7faff') + lin('wh', '#ffffff', '#e3eaf8') + rad('halo', '#ffc21a', .3) + lin('table', '#c7d2ea', '#a9b7d6'),
  `<rect width="640" height="360" fill="url(#bg)"/>
   <circle cx="470" cy="170" r="150" fill="url(#halo)"/>
   <path d="M60 96h150l14-26 26 58 22-40 12 8h160" fill="none" stroke="#2f6bff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>
   <rect y="282" width="640" height="78" fill="url(#table)"/>
   <ellipse cx="220" cy="286" rx="150" ry="14" fill="#0a1a45" opacity=".14"/>
   <rect x="90" y="176" width="260" height="110" rx="24" fill="url(#wh)" stroke="#cbd6ee" stroke-width="2"/>
   <rect x="112" y="192" width="216" height="18" rx="9" fill="#dfe6f5"/>
   <circle cx="220" cy="244" r="30" fill="#e5484d" stroke="#fff" stroke-width="5"/><ellipse cx="211" cy="235" rx="9" ry="5" fill="#fff" opacity=".5"/>
   <g fill="#b9c6e3">${range(0, 5).flatMap(i => range(0, 3).map(j => `<circle cx="${124 + i * 8}" cy="${232 + j * 9}" r="2.2"/>`)).join('')}</g>
   <circle cx="316" cy="204" r="4" fill="#2f6bff"/>
   <path d="M410 40 470 178 530 40" fill="none" stroke="#14307a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
   <ellipse cx="470" cy="266" rx="70" ry="10" fill="#0a1a45" opacity=".14"/>
   <circle cx="470" cy="214" r="62" fill="url(#wh)" stroke="#cbd6ee" stroke-width="2"/>
   <circle cx="470" cy="214" r="50" fill="none" stroke="#ffc21a" stroke-width="5"/>
   <circle cx="470" cy="206" r="30" fill="#e5484d"/><ellipse cx="461" cy="196" rx="10" ry="6" fill="#fff" opacity=".45"/>
   <text x="470" y="212" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="700" fill="#fff">HELP</text>
   <g fill="#b9c6e3">${range(0, 5).map(i => `<circle cx="${452 + i * 9}" cy="248" r="2.2"/>`).join('')}</g>
   ${badge(580, 60, .95)}`);

// =====================================================================
// PRODUCTS (320x240, transparent)
// =====================================================================
const PD = lin('wh', '#ffffff', '#e3eaf8') + lin('dk', '#2b3552', '#131a30') + rad('halo', '#ffd489', .55);
const shadow = (rx = 90) => `<ellipse cx="160" cy="218" rx="${rx}" ry="10" fill="#0a1a45" opacity=".13"/>`;
const WHITE = 'fill="url(#wh)" stroke="#c3cee8" stroke-width="2"';
const product = (name, body, extraDefs = '') => save('product-' + name, 320, 240, PD + extraDefs, shadow() + body);

product('panel', `
  <rect x="80" y="24" width="160" height="186" rx="18" ${WHITE}/>
  <rect x="96" y="42" width="128" height="86" rx="9" fill="#0a1a45"/>
  <path d="M160 54 178 61V77C178 88 170 94 160 98 150 94 142 88 142 77V61Z" fill="none" stroke="#ffc21a" stroke-width="3" stroke-linejoin="round"/>
  <path d="M153 76l5 5 9-10" fill="none" stroke="#ffc21a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="160" y="118" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" fill="#fff" letter-spacing="1.5">ARMED</text>
  ${[122, 160, 198].map(x => `<circle cx="${x}" cy="152" r="11" fill="#e3eaf8" stroke="#c3cee8" stroke-width="2"/>`).join('')}
  <rect x="104" y="174" width="112" height="18" rx="9" fill="#ffc21a"/>
  <circle cx="226" cy="36" r="3" fill="#22c55e"/>`);

product('keypad', `
  <rect x="104" y="20" width="112" height="196" rx="18" ${WHITE}/>
  <rect x="118" y="36" width="84" height="30" rx="6" fill="#0a1a45"/>
  ${[136, 160, 184].map(x => `<circle cx="${x}" cy="51" r="4" fill="#ffc21a"/>`).join('')}
  ${range(0, 4).flatMap(j => range(0, 3).map(i => `<circle cx="${132 + i * 28}" cy="${94 + j * 30}" r="11" fill="#e3eaf8" stroke="#c3cee8" stroke-width="2"/>`)).join('')}
  <circle cx="204" cy="202" r="3" fill="#22c55e"/>`);

product('contact', `
  <rect x="34" y="150" width="252" height="12" fill="#c3cee8"/>
  <rect x="64" y="86" width="112" height="46" rx="9" ${WHITE}/>
  <rect x="204" y="94" width="56" height="34" rx="8" ${WHITE}/>
  <circle cx="82" cy="109" r="4" fill="#2f6bff"/>
  <path d="M182 111h16" stroke="#2f6bff" stroke-width="3" stroke-dasharray="3 3" stroke-linecap="round"/>
  <ellipse cx="160" cy="218" rx="112" ry="10" fill="#0a1a45" opacity=".13"/>`);

product('motion', `
  <rect x="92" y="32" width="136" height="150" rx="28" ${WHITE}/>
  <rect x="112" y="62" width="96" height="98" rx="30" fill="#e8eefc" stroke="#c3cee8" stroke-width="2"/>
  <g stroke="#b9c6e3" stroke-width="3" stroke-linecap="round">${range(0, 6).map(i => `<path d="M${128 + i * 13} 76v70"/>`).join('')}</g>
  <circle cx="160" cy="47" r="4.5" fill="#2f6bff"/>
  <rect x="140" y="182" width="40" height="22" rx="6" fill="#cbd6ee"/>`);

product('glassbreak', `
  <circle cx="160" cy="112" r="76" ${WHITE}/>
  <circle cx="160" cy="112" r="58" fill="#f1f5fd" stroke="#c3cee8" stroke-width="2"/>
  ${range(0, 37).map(k => { const a = k * 2.4, r = 6 + 6.6 * Math.sqrt(k); return `<circle cx="${(160 + r * Math.cos(a)).toFixed(1)}" cy="${(112 + r * Math.sin(a)).toFixed(1)}" r="2.6" fill="#b9c6e3"/>`; }).join('')}
  <circle cx="160" cy="46" r="5" fill="#2f6bff"/>`);

product('indoor-cam', `
  <rect x="104" y="156" width="112" height="42" rx="14" ${WHITE}/>
  <rect x="148" y="122" width="24" height="38" fill="#e3eaf8" stroke="#c3cee8" stroke-width="2"/>
  <circle cx="160" cy="92" r="52" ${WHITE}/>
  <circle cx="160" cy="92" r="34" fill="#0a1a45"/><circle cx="160" cy="92" r="34" fill="none" stroke="#2f6bff" stroke-width="4"/>
  <circle cx="160" cy="92" r="14" fill="#1b2c5c"/><circle cx="148" cy="80" r="6" fill="#fff" opacity=".7"/>
  <circle cx="204" cy="60" r="3.5" fill="#22c55e"/>`);

product('outdoor-cam', `
  <rect x="40" y="46" width="22" height="146" rx="6" fill="#cbd6ee" stroke="#b1bfdc" stroke-width="2"/>
  <rect x="58" y="116" width="52" height="16" rx="6" fill="#e3eaf8" stroke="#c3cee8" stroke-width="2"/>
  <rect x="92" y="88" width="150" height="62" rx="28" ${WHITE}/>
  <rect x="88" y="76" width="118" height="18" rx="9" fill="#f3f6fd" stroke="#c3cee8" stroke-width="2"/>
  <circle cx="242" cy="119" r="30" fill="#0a1a45"/><circle cx="242" cy="119" r="30" fill="none" stroke="#2f6bff" stroke-width="4"/><circle cx="242" cy="119" r="12" fill="#1b2c5c"/>
  ${range(0, 6).map(i => `<circle cx="${(242 + 22 * Math.cos(i * 1.047)).toFixed(1)}" cy="${(119 + 22 * Math.sin(i * 1.047)).toFixed(1)}" r="2.4" fill="#ff8a8a"/>`).join('')}`);

product('doorbell', `
  <rect x="124" y="20" width="72" height="196" rx="24" ${WHITE}/>
  <rect x="136" y="34" width="48" height="52" rx="14" fill="#0a1a45"/>
  <circle cx="160" cy="60" r="15" fill="#1b2c5c" stroke="#2f6bff" stroke-width="3"/><circle cx="155" cy="55" r="4" fill="#fff" opacity=".7"/>
  <circle cx="160" cy="146" r="26" fill="#fff" stroke="#c3cee8" stroke-width="2"/>
  <circle cx="160" cy="146" r="18" fill="none" stroke="#ffc21a" stroke-width="5"/>
  <g fill="#b9c6e3">${range(0, 3).map(i => `<circle cx="${150 + i * 10}" cy="100" r="2"/>`).join('')}</g>
  <circle cx="160" cy="196" r="4" fill="#2f6bff"/>`);

product('nvr', `
  <rect x="40" y="128" width="150" height="64" rx="10" fill="url(#dk)"/>
  <rect x="52" y="140" width="70" height="8" rx="4" fill="#3a4666"/><rect x="52" y="156" width="46" height="8" rx="4" fill="#3a4666"/>
  <circle cx="150" cy="146" r="4" fill="#22c55e"/><circle cx="164" cy="146" r="4" fill="#2f6bff"/><circle cx="178" cy="146" r="4" fill="#ffc21a"/>
  <rect x="140" y="164" width="40" height="14" rx="4" fill="#0a1a45"/>
  <path d="M230 74C210 74 200 100 190 138M240 158C214 158 204 156 190 156" fill="none" stroke="#8a97b8" stroke-width="3" stroke-linecap="round"/>
  <rect x="208" y="50" width="70" height="28" rx="13" ${WHITE}/><circle cx="278" cy="64" r="12" fill="#0a1a45"/><circle cx="278" cy="64" r="5" fill="#2f6bff"/>
  <rect x="222" y="146" width="66" height="28" rx="13" ${WHITE}/><circle cx="288" cy="160" r="12" fill="#0a1a45"/><circle cx="288" cy="160" r="5" fill="#2f6bff"/>`);

product('smoke', `
  <circle cx="160" cy="112" r="78" ${WHITE}/>
  <circle cx="160" cy="112" r="62" fill="#f1f5fd" stroke="#c3cee8" stroke-width="2"/>
  ${range(0, 12).map(i => `<rect x="158" y="62" width="4" height="22" rx="2" fill="#b9c6e3" transform="rotate(${i * 30} 160 112)"/>`).join('')}
  <circle cx="160" cy="112" r="14" fill="#fff" stroke="#c3cee8" stroke-width="2"/><circle cx="160" cy="112" r="5" fill="#e5484d"/>`);

product('co', `
  <rect x="88" y="44" width="144" height="144" rx="22" ${WHITE}/>
  <rect x="108" y="66" width="104" height="48" rx="7" fill="#0a1a45"/>
  <text x="122" y="98" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="700" fill="#ffc21a">CO</text>
  <text x="196" y="98" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700" fill="#fff">0</text>
  <text x="204" y="108" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="8" fill="#9fb3e8">ppm</text>
  <circle cx="160" cy="150" r="14" fill="#e3eaf8" stroke="#c3cee8" stroke-width="2"/><circle cx="206" cy="170" r="4" fill="#22c55e"/>
  <g fill="#b9c6e3">${range(0, 4).map(i => `<rect x="${112 + i * 10}" y="170" width="5" height="4" rx="1"/>`).join('')}</g>`);

product('water', `
  <ellipse cx="160" cy="208" rx="104" ry="13" fill="#2f6bff" opacity=".25"/>
  <path d="M132 156C126 178 118 192 108 204M188 156C194 178 202 192 212 204" fill="none" stroke="#8a97b8" stroke-width="3" stroke-linecap="round"/>
  <rect x="100" y="204" width="16" height="6" rx="2" fill="#c3cee8"/><rect x="204" y="204" width="16" height="6" rx="2" fill="#c3cee8"/>
  <rect x="98" y="88" width="124" height="70" rx="35" ${WHITE}/>
  <path d="M160 100C150 114 146 120 146 128a14 14 0 0 0 28 0C174 120 170 114 160 100Z" fill="#2f6bff"/>
  <circle cx="204" cy="112" r="4" fill="#22c55e"/>`);

product('lock', `
  <rect x="96" y="16" width="128" height="206" rx="24" fill="url(#dk)"/>
  <circle cx="160" cy="62" r="30" fill="#3a4666" stroke="#ffc21a" stroke-width="3"/><path d="M160 44v36" stroke="#ffc21a" stroke-width="5" stroke-linecap="round"/>
  ${range(0, 4).flatMap(j => range(0, 3).map(i => `<circle cx="${130 + i * 30}" cy="${118 + j * 26}" r="9" fill="#3a4666" stroke="#57628a" stroke-width="1.5"/><circle cx="${130 + i * 30}" cy="${118 + j * 26}" r="1.8" fill="#dfe6f5"/>`)).join('')}
  <circle cx="210" cy="30" r="3" fill="#22c55e"/>`);

product('bulb', `
  <circle cx="160" cy="98" r="110" fill="url(#halo)"/>
  <path d="M160 34a58 58 0 0 0-34 105c6 5 8 10 8 16h52c0-6 2-11 8-16A58 58 0 0 0 160 34Z" fill="#fff6d8" stroke="#f0d78a" stroke-width="2"/>
  <path d="M142 150V110l18 14 18-14v40" fill="none" stroke="#f5a800" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="132" y="156" width="56" height="12" rx="4" fill="#cbd6ee"/><rect x="136" y="168" width="48" height="12" rx="4" fill="#b9c6e3"/><rect x="142" y="180" width="36" height="14" rx="6" fill="#9aa8ca"/>
  <g fill="none" stroke="#2f6bff" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M232 62q14 10 0 24M244 54q22 18 0 40"/></g>`);

product('reader', `
  <rect x="104" y="20" width="112" height="160" rx="20" fill="url(#dk)"/>
  <rect x="118" y="36" width="84" height="72" rx="10" fill="#0a1a45"/>
  <g fill="none" stroke="#ffc21a" stroke-width="4" stroke-linecap="round"><path d="M142 72a24 24 0 0 1 0-0.1M150 58q18 14 0 28M162 52q28 20 0 40"/></g>
  <circle cx="140" cy="72" r="5" fill="#ffc21a"/>
  <rect x="128" y="126" width="64" height="12" rx="6" fill="#22c55e"/>
  <g fill="#3a4666">${range(0, 5).map(i => `<circle cx="${134 + i * 13}" cy="156" r="3"/>`).join('')}</g>
  <g transform="rotate(-12 236 186)"><rect x="192" y="160" width="92" height="58" rx="9" ${WHITE}/><rect x="192" y="172" width="92" height="12" fill="#14307a"/><rect x="204" y="194" width="20" height="16" rx="3" fill="#ffc21a"/></g>`);

product('pendant', `
  <path d="M96 12 160 100 224 12" fill="none" stroke="#14307a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="160" cy="148" r="62" ${WHITE}/>
  <circle cx="160" cy="148" r="50" fill="none" stroke="#ffc21a" stroke-width="5"/>
  <circle cx="160" cy="140" r="30" fill="#e5484d"/><ellipse cx="151" cy="130" rx="10" ry="6" fill="#fff" opacity=".45"/>
  <text x="160" y="146" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="700" fill="#fff">HELP</text>
  <g fill="#b9c6e3">${range(0, 5).map(i => `<circle cx="${142 + i * 9}" cy="182" r="2.2"/>`).join('')}</g>`);

console.log('generated images in', out);
