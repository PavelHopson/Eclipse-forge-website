const xml = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const motifs = {
  platform: '<circle r="73"/><ellipse rx="104" ry="36" transform="rotate(-35)"/><circle r="31"/><path d="M0-89V-48M48 0H89M0 48V89M-89 0H-48"/><circle cx="76" cy="-51" r="6" fill="currentColor"/>',
  creative: '<path d="M-88-64H-50M-88-64V-26M88-64H50M88-64V-26M-88 52H-50M-88 52V14M88 52H50M88 52V14"/><path d="M-28-34L36-6-28 22Z"/><path d="M-93 80H93M-65 68V92M-26 74V86M14 68V92M54 74V86"/>',
  business: '<path d="M-92 65H90M-72 45V10H-42V45M-16 45V-14H14V45M40 45V-46H70V45"/><path d="M-84-26L-28-45 22-62 77-82M52-84L77-82 67-59"/>',
  life: '<circle r="82" stroke-dasharray="4 12"/><path d="M-65 6C-65-71 65-71 65 6S-65 83-65 6"/><path d="M-33 3L-7 28 39-27"/><path d="M-83 5H-55M55 5H83"/>',
  engineering: '<path d="M-80-44L-35-10-80 24M9 26H65M-100-76H100V66H-100Z"/><path d="M-69 85H69M-25 66V85M25 66V85"/><circle cx="77" cy="-56" r="3" fill="currentColor"/>',
};
export function renderCover(p, index, groupLabel) {
  const accent = p.group === 'engineering' ? '#6BA3FF' : '#D4AF37';
  const size = p.title.length > 23 ? 45 : p.title.length > 17 ? 52 : 62;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="360" viewBox="0 0 1200 360" role="img" aria-labelledby="title desc">
<title id="title">${xml(p.title)}</title>
<desc id="desc">${xml(p.type + '. ' + p.flow.join(' → ') + '. Редакционная схема проекта, не скриншот приложения.')}</desc>
<!-- ECLIPSE FORGE / PROJECT NOTES — locally generated artwork; no external assets -->
<defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#1C2536" stroke-width=".5"/></pattern><linearGradient id="shade"><stop stop-color="#05070A"/><stop offset="1" stop-color="#0D1420"/></linearGradient></defs>
<rect width="1200" height="360" fill="url(#shade)"/>
<rect x="808" y="0" width="392" height="250" fill="url(#grid)" opacity=".6"/>
<path d="M48 66H1152M48 235H1152M48 309H1152" stroke="#283345"/>
<path d="M48 66H124" stroke="${accent}" stroke-width="3"/>
<g font-family="Arial, sans-serif">
<text x="48" y="41" fill="#AAB6C5" font-size="12" letter-spacing="2.4">ECLIPSE FORGE / SOURCE NOTES</text>
<text x="1152" y="41" text-anchor="end" fill="${accent}" font-size="12" letter-spacing="1.5">PROJECT ${String(index + 1).padStart(2, '0')}</text>
<text x="46" y="149" fill="#F2F5F9" font-size="${size}" font-weight="700" letter-spacing="-1">${xml(p.title)}</text>
<text x="49" y="191" fill="#B7C2CF" font-size="20">${xml(p.type)}</text>
${p.flow.map((step, i) => `<text x="${48 + i * 374}" y="278" fill="${accent}" font-size="12">0${i + 1}</text><text x="${80 + i * 374}" y="280" fill="#F2F5F9" font-size="18">${xml(step)}</text>${i < 2 ? `<path d="M${328 + i * 374} 272h39m-7-4 7 4-7 4" fill="none" stroke="#687A92"/>` : ''}`).join('\n')}
<text x="48" y="337" fill="#AAB6C5" font-size="11" letter-spacing="1.8">${xml(groupLabel.toUpperCase())}</text>
<text x="1152" y="337" text-anchor="end" fill="#AAB6C5" font-size="11" letter-spacing="1.8">ОБЗОР / ИСХОДНИКИ / ПЕРВЫЙ ЗАПУСК</text>
</g>
<g transform="translate(992 148) scale(.78)" fill="none" stroke="${accent}" color="${accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".8">${motifs[p.group]}</g>
</svg>\n`;
}
