/**
 * src/data/stickers.js
 * Daftar lengkap stiker photobooth:
 * - 16 Stiker Kucing Lucu (Aset Referensi e68a24c2)
 * - 14 Stiker Prangko Vintage Pink (Aset Referensi 55ea1a9b)
 * - 70 Stiker Vektor SVG Custom Bertema Ulang Tahun Sweet 20 Alya Diva (Memenuhi aturan Bagian 5.2)
 */

export function svgToDataUrl(svgString) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString.trim());
}

// 1. STIKER REFERENSI: KUCING LUCU (16 Buah)
export const REFERENCE_CATS = [
  { id: 'ref-cat-1', nama: 'Kucing Macaron Pink', kategori: 'kucing', src: '/assets/stickers/cats/cat-1.png' },
  { id: 'ref-cat-2', nama: 'Kucing Senyum Pita', kategori: 'kucing', src: '/assets/stickers/cats/cat-2.png' },
  { id: 'ref-cat-3', nama: 'Kucing Kesal Imut', kategori: 'kucing', src: '/assets/stickers/cats/cat-3.png' },
  { id: 'ref-cat-4', nama: 'Kucing Minum Boba', kategori: 'kucing', src: '/assets/stickers/cats/cat-4.png' },
  { id: 'ref-cat-5', nama: 'Kucing Melambai', kategori: 'kucing', src: '/assets/stickers/cats/cat-5.png' },
  { id: 'ref-cat-6', nama: 'Kucing Tutup Muka', kategori: 'kucing', src: '/assets/stickers/cats/cat-6.png' },
  { id: 'ref-cat-7', nama: 'Kucing Angkat Cakar', kategori: 'kucing', src: '/assets/stickers/cats/cat-7.png' },
  { id: 'ref-cat-8', nama: 'Kucing Mengernyit', kategori: 'kucing', src: '/assets/stickers/cats/cat-8.png' },
  { id: 'ref-cat-9', nama: 'Kucing Smug', kategori: 'kucing', src: '/assets/stickers/cats/cat-9.png' },
  { id: 'ref-cat-10', nama: 'Kucing Kalung Bunga', kategori: 'kucing', src: '/assets/stickers/cats/cat-10.png' },
  { id: 'ref-cat-11', nama: 'Kucing Menangis Manja', kategori: 'kucing', src: '/assets/stickers/cats/cat-11.png' },
  { id: 'ref-cat-12', nama: 'Kucing Mahkota Bunga', kategori: 'kucing', src: '/assets/stickers/cats/cat-12.png' },
  { id: 'ref-cat-13', nama: 'Kucing Malu-Malu', kategori: 'kucing', src: '/assets/stickers/cats/cat-13.png' },
  { id: 'ref-cat-14', nama: 'Kucing Kedip Mata', kategori: 'kucing', src: '/assets/stickers/cats/cat-14.png' },
  { id: 'ref-cat-15', nama: 'Kucing Ngambek Lucu', kategori: 'kucing', src: '/assets/stickers/cats/cat-15.png' },
  { id: 'ref-cat-16', nama: 'Kucing Say Hello', kategori: 'kucing', src: '/assets/stickers/cats/cat-16.png' },
];

// 2. STIKER REFERENSI: PRANGKO VINTAGE (14 Buah)
export const REFERENCE_STAMPS = [
  { id: 'ref-stamp-1', nama: 'Prangko Bunga 50c', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-1.png' },
  { id: 'ref-stamp-2', nama: 'Prangko Peony 24c', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-2.png' },
  { id: 'ref-stamp-3', nama: 'Prangko Mahkota 25s', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-3.png' },
  { id: 'ref-stamp-4', nama: 'Prangko Love Gingham', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-4.png' },
  { id: 'ref-stamp-5', nama: 'Prangko Kucing La Poste', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-5.png' },
  { id: 'ref-stamp-6', nama: 'Prangko Angsa 10 Bani', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-6.png' },
  { id: 'ref-stamp-7', nama: 'Prangko Classic Lady 15c', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-7.png' },
  { id: 'ref-stamp-8', nama: 'Prangko Kucing Danmark', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-8.png' },
  { id: 'ref-stamp-9', nama: 'Prangko Sakura Nippon', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-9.png' },
  { id: 'ref-stamp-10', nama: 'Prangko Kupu-Kupu 2R', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-10.png' },
  { id: 'ref-stamp-11', nama: 'Prangko Bunga Prem', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-11.png' },
  { id: 'ref-stamp-12', nama: 'Prangko Bunga Ethiopia', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-12.png' },
  { id: 'ref-stamp-13', nama: 'Prangko Stroberi Manis', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-13.png' },
  { id: 'ref-stamp-14', nama: 'Prangko Air Mail NZ', kategori: 'prangko', src: '/assets/stickers/stamps/stamp-14.png' },
];

// 3. STIKER BUATAN (SVG): ULANG TAHUN SWEET 20 (26 Buah)
const BIRTHDAY_SVGS = [
  {
    id: 'bday-cake-layered',
    nama: 'Kue Ulang Tahun Bertingkat',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="55" width="50" height="30" rx="6" fill="#ffccd5" stroke="#6b1426" stroke-width="3"/><rect x="33" y="38" width="34" height="20" rx="5" fill="#fff0f3" stroke="#6b1426" stroke-width="3"/><path d="M25 58 Q31 66 37 58 Q43 66 50 58 Q57 66 63 58 Q69 66 75 58" fill="none" stroke="#ff4d6d" stroke-width="4" stroke-linecap="round"/><rect x="47" y="22" width="6" height="16" rx="2" fill="#fff" stroke="#6b1426" stroke-width="2"/><path d="M50 14 Q54 18 50 22 Q46 18 50 14 Z" fill="#ffb703"/></svg>`
  },
  {
    id: 'bday-badge-20',
    nama: 'Badge Emas 20 Besar',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="#ffd166" stroke="#b07d00" stroke-width="4"/><circle cx="50" cy="50" r="36" fill="#fff9eb" stroke="#ffd166" stroke-width="2" stroke-dasharray="4,3"/><text x="50" y="58" font-family="sans-serif" font-weight="900" font-size="34" fill="#6b1426" text-anchor="middle">20</text><text x="50" y="74" font-family="sans-serif" font-weight="700" font-size="11" fill="#b07d00" text-anchor="middle">SWEET</text></svg>`
  },
  {
    id: 'bday-ribbon-sweet20',
    nama: 'Pita Banner Sweet 20',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg"><path d="M10 30 L25 15 L115 15 L130 30 L115 45 L25 45 Z" fill="#6b1426" stroke="#4a0918" stroke-width="2"/><text x="70" y="36" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ffd699" text-anchor="middle">✦ SWEET 20 ✦</text></svg>`
  },
  {
    id: 'bday-balloon-trio',
    nama: 'Trio Balon Pesta',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><path d="M35 50 Q20 20 50 15 Q80 20 65 50 Q50 65 50 68 L48 68 Z" fill="#ff758f" stroke="#6b1426" stroke-width="2.5"/><path d="M22 62 Q8 38 32 30 Q56 35 46 62 Q35 75 35 77 L33 77 Z" fill="#ffb3c1" stroke="#6b1426" stroke-width="2.5"/><path d="M78 62 Q92 38 68 30 Q44 35 54 62 Q65 75 65 77 L67 77 Z" fill="#ffd166" stroke="#b07d00" stroke-width="2.5"/><path d="M49 68 Q45 95 48 115" fill="none" stroke="#888" stroke-width="1.5"/></svg>`
  },
  {
    id: 'bday-balloon-heart',
    nama: 'Balon Hati Merah Marun',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg"><path d="M40 70 C10 45 10 15 32 15 C40 15 40 22 40 22 C40 22 40 15 48 15 C70 15 70 45 40 70 Z" fill="#a82036" stroke="#6b1426" stroke-width="2"/><polygon points="38,70 42,70 40,75" fill="#6b1426"/><path d="M40 75 Q36 90 40 105" fill="none" stroke="#666" stroke-width="1.5"/></svg>`
  },
  {
    id: 'bday-balloon-gold',
    nama: 'Balon Emas Berkilau',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 70 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="35" cy="40" rx="25" ry="32" fill="#ffd166" stroke="#b07d00" stroke-width="2"/><polygon points="33,72 37,72 35,76" fill="#b07d00"/><path d="M35 76 Q30 90 35 98" fill="none" stroke="#aaa" stroke-width="1.5"/></svg>`
  },
  {
    id: 'bday-cupcake-cherry',
    nama: 'Cupcake Ceri Manis',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg"><path d="M20 50 L25 80 L55 80 L60 50 Z" fill="#d4a373" stroke="#6b1426" stroke-width="2.5"/><path d="M16 50 Q22 32 40 32 Q58 32 64 50 Z" fill="#ffccd5" stroke="#6b1426" stroke-width="2.5"/><circle cx="40" cy="24" r="8" fill="#d90429" stroke="#6b1426" stroke-width="2"/><path d="M42 16 Q52 8 50 2" fill="none" stroke="#386641" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'bday-party-hat',
    nama: 'Topi Kerucut Pesta',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg"><polygon points="40,15 15,80 65,80" fill="#ff758f" stroke="#6b1426" stroke-width="3"/><circle cx="40" cy="14" r="7" fill="#ffd166"/><ellipse cx="40" cy="80" rx="26" ry="6" fill="#fff" stroke="#6b1426" stroke-width="2.5"/></svg>`
  },
  {
    id: 'bday-gift-box',
    nama: 'Kado Ulang Tahun Cantik',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="40" width="50" height="42" rx="4" fill="#ffb3c1" stroke="#6b1426" stroke-width="3"/><rect x="16" y="32" width="58" height="12" rx="3" fill="#ff4d6d" stroke="#6b1426" stroke-width="3"/><rect x="42" y="32" width="6" height="50" fill="#ffd166"/><ellipse cx="36" cy="24" rx="8" ry="6" fill="#ffd166" stroke="#b07d00" stroke-width="2"/><ellipse cx="54" cy="24" rx="8" ry="6" fill="#ffd166" stroke="#b07d00" stroke-width="2"/></svg>`
  },
  {
    id: 'bday-gift-blue',
    nama: 'Kado Kotak Pita Emas',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="35" width="50" height="38" rx="4" fill="#a2d2ff" stroke="#2b4c7e" stroke-width="2.5"/><rect x="12" y="28" width="56" height="10" rx="2" fill="#bde0fe" stroke="#2b4c7e" stroke-width="2.5"/><rect x="37" y="28" width="6" height="45" fill="#ffd166"/><circle cx="40" cy="24" r="5" fill="#ffd166"/></svg>`
  },
  {
    id: 'bday-crown-gold',
    nama: 'Mahkota Putri Queen of the Day',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg"><polygon points="15,60 20,25 38,45 50,15 62,45 80,25 85,60" fill="#ffd166" stroke="#b07d00" stroke-width="3"/><circle cx="20" cy="23" r="4" fill="#ff4d6d"/><circle cx="50" cy="13" r="5" fill="#ff4d6d"/><circle cx="80" cy="23" r="4" fill="#ff4d6d"/><rect x="18" y="54" width="64" height="6" rx="2" fill="#fff"/></svg>`
  },
  {
    id: 'bday-text-hbd',
    nama: 'Tipografi Ceria HBD',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg"><text x="60" y="44" font-family="sans-serif" font-weight="900" font-size="36" fill="#ff4d6d" stroke="#6b1426" stroke-width="3" text-anchor="middle">HBD!</text><text x="60" y="44" font-family="sans-serif" font-weight="900" font-size="36" fill="#fff" text-anchor="middle">HBD!</text></svg>`
  },
  {
    id: 'bday-text-makeawish',
    nama: 'Kutipan Make A Wish ✨',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 150 45" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="140" height="35" rx="18" fill="#fff9f0" stroke="#6b1426" stroke-width="2"/><text x="75" y="27" font-family="cursive, sans-serif" font-weight="bold" font-size="16" fill="#6b1426" text-anchor="middle">✦ Make a Wish ✦</text></svg>`
  },
  {
    id: 'bday-text-queen',
    nama: 'Queen of the Day 👑',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 160 45" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="150" height="35" rx="18" fill="#6b1426" stroke="#ffd166" stroke-width="2"/><text x="80" y="27" font-family="sans-serif" font-weight="bold" font-size="13" fill="#ffd699" text-anchor="middle">👑 QUEEN OF THE DAY</text></svg>`
  },
  {
    id: 'bday-confetti-popper',
    nama: 'Terompet Pesta & Confetti',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><polygon points="15,75 55,50 65,65" fill="#ff758f" stroke="#6b1426" stroke-width="2"/><polygon points="50,45 75,30 85,75 60,65" fill="#ffd166" stroke="#b07d00" stroke-width="2"/><circle cx="75" cy="20" r="3" fill="#ff4d6d"/><circle cx="85" cy="35" r="2.5" fill="#06d6a0"/><circle cx="65" cy="15" r="3" fill="#118ab2"/></svg>`
  },
  {
    id: 'bday-fireworks',
    nama: 'Kembang Api Sparkle Emas',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="4" fill="#ffd166"/><line x1="40" y1="12" x2="40" y2="26" stroke="#ffb703" stroke-width="3" stroke-linecap="round"/><line x1="40" y1="54" x2="40" y2="68" stroke="#ffb703" stroke-width="3" stroke-linecap="round"/><line x1="12" y1="40" x2="26" y2="40" stroke="#ffb703" stroke-width="3" stroke-linecap="round"/><line x1="54" y1="40" x2="68" y2="40" stroke="#ffb703" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'bday-bunting-flags',
    nama: 'Bendera Segitiga Pesta',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><path d="M5 15 Q80 30 155 15" fill="none" stroke="#6b1426" stroke-width="2"/><polygon points="15,16 35,18 25,45" fill="#ff758f"/><polygon points="45,19 65,21 55,48" fill="#ffd166"/><polygon points="75,22 95,22 85,50" fill="#ffb3c1"/><polygon points="105,21 125,19 115,48" fill="#ff4d6d"/></svg>`
  },
  {
    id: 'bday-candle-number',
    nama: 'Lilin Angka 20 Berkelip',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg"><text x="30" y="55" font-family="sans-serif" font-weight="900" font-size="34" fill="#ff758f" stroke="#6b1426" stroke-width="2">2</text><text x="60" y="55" font-family="sans-serif" font-weight="900" font-size="34" fill="#ffd166" stroke="#b07d00" stroke-width="2">0</text><ellipse cx="28" cy="20" rx="4" ry="7" fill="#ffb703"/><ellipse cx="58" cy="20" rx="4" ry="7" fill="#ffb703"/></svg>`
  },
  {
    id: 'bday-text-hbd-alya',
    nama: 'Badge HBD Alya Diva',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="150" height="40" rx="20" fill="#ffccd5" stroke="#6b1426" stroke-width="2.5"/><text x="80" y="30" font-family="sans-serif" font-weight="900" font-size="15" fill="#6b1426" text-anchor="middle">HBD ALYA DIVA ✨</text></svg>`
  },
  {
    id: 'bday-banner-cheers',
    nama: 'Banner Cheers to 20',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 150 45" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="140" height="35" rx="8" fill="#ffd166" stroke="#6b1426" stroke-width="2"/><text x="75" y="27" font-family="sans-serif" font-weight="bold" font-size="14" fill="#6b1426" text-anchor="middle">CHEERS TO 20! 🥂</text></svg>`
  },
  {
    id: 'bday-candle-single',
    nama: 'Lilin Ulang Tahun Melodi',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 40 70" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="25" width="8" height="40" rx="2" fill="#ff85a2" stroke="#6b1426" stroke-width="2"/><ellipse cx="20" cy="14" rx="4" ry="8" fill="#ffd166"/><circle cx="20" cy="16" r="2" fill="#d90429"/></svg>`
  },
  {
    id: 'bday-balloon-star',
    nama: 'Balon Bintang Pastel',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg"><polygon points="40,10 48,28 68,30 52,44 57,64 40,52 23,64 28,44 12,30 32,28" fill="#ffb3c1" stroke="#6b1426" stroke-width="2.5"/><path d="M40 64 Q36 80 40 95" fill="none" stroke="#888" stroke-width="1.5"/></svg>`
  },
  {
    id: 'bday-cake-slice',
    nama: 'Sepotong Kue Tart Stroberi',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><polygon points="15,60 65,60 65,30 15,45" fill="#fbeee2" stroke="#6b1426" stroke-width="2.5"/><polygon points="15,45 65,30 45,15" fill="#ffccd5" stroke="#6b1426" stroke-width="2"/><circle cx="50" cy="22" r="5" fill="#d90429"/></svg>`
  },
  {
    id: 'bday-noisemaker',
    nama: 'Terompet Pesta Polkadot',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 90 50" xmlns="http://www.w3.org/2000/svg"><polygon points="15,25 75,10 75,40" fill="#ffd166" stroke="#b07d00" stroke-width="2"/><ellipse cx="75" cy="25" rx="5" ry="15" fill="#ff758f"/><circle cx="35" cy="24" r="3" fill="#ff4d6d"/><circle cx="55" cy="22" r="3" fill="#ff4d6d"/></svg>`
  },
  {
    id: 'bday-confetti-streamer',
    nama: 'Pita Konfeti Bergelombang',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><path d="M15 15 Q35 30 25 50 Q15 70 45 80" fill="none" stroke="#ff4d6d" stroke-width="5" stroke-linecap="round"/><path d="M45 10 Q65 25 55 45 Q45 65 75 75" fill="none" stroke="#ffd166" stroke-width="5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'bday-badge-sweet20-star',
    nama: 'Bintang Emas Sweet 20',
    kategori: 'ultah',
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><polygon points="45,8 54,32 78,35 60,52 65,76 45,63 25,76 30,52 12,35 36,32" fill="#ffd166" stroke="#b07d00" stroke-width="2"/><text x="45" y="52" font-family="sans-serif" font-weight="900" font-size="14" fill="#6b1426" text-anchor="middle">20th</text></svg>`
  }
];

// 4. STIKER BUATAN (SVG): HATI & KILAU (20 Buah)
const HEARTS_STARS_SVGS = [
  {
    id: 'sparkle-gold-4pt',
    nama: 'Sparkle Bintang 4 Titik',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 5 Q40 40 5 40 Q40 40 40 75 Q40 40 75 40 Q40 40 40 5 Z" fill="#ffd166" stroke="#b07d00" stroke-width="2"/><circle cx="40" cy="40" r="4" fill="#fff"/></svg>`
  },
  {
    id: 'sparkle-cluster',
    nama: 'Kumpulan Kilau Sparkle',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 Q50 35 25 35 Q50 35 50 60 Q50 35 75 35 Q50 35 50 10 Z" fill="#ff758f"/><path d="M25 55 Q25 70 10 70 Q25 70 25 85 Q25 70 40 70 Q25 70 25 55 Z" fill="#ffd166"/><circle cx="70" cy="70" r="4" fill="#ffd166"/></svg>`
  },
  {
    id: 'heart-coquette-bow',
    nama: 'Hati Berpita Coquette',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><path d="M45 75 C10 50 10 20 32 20 C42 20 45 28 45 28 C45 28 48 20 58 20 C80 20 80 50 45 75 Z" fill="#ffb3c1" stroke="#6b1426" stroke-width="2.5"/><circle cx="45" cy="26" r="3" fill="#6b1426"/></svg>`
  },
  {
    id: 'heart-candy-duo',
    nama: 'Duo Hati Manis',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 90 80" xmlns="http://www.w3.org/2000/svg"><path d="M35 65 C5 45 5 15 25 15 C35 15 35 23 35 23 C35 23 35 15 45 15 C65 15 65 45 35 65 Z" fill="#ff4d6d" stroke="#6b1426" stroke-width="2"/><path d="M60 55 C40 40 40 18 53 18 C60 18 60 23 60 23 C60 23 60 18 67 18 C80 18 80 40 60 55 Z" fill="#ffd166" stroke="#b07d00" stroke-width="2"/></svg>`
  },
  {
    id: 'heart-doodle-drawn',
    nama: 'Doodle Hati Estetik',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 68 C15 45 12 18 30 18 C38 18 40 25 40 25 C40 25 42 18 50 18 C68 18 65 45 40 68 Z" fill="none" stroke="#6b1426" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="28" r="2" fill="#6b1426"/><circle cx="50" cy="28" r="2" fill="#6b1426"/></svg>`
  },
  {
    id: 'moon-crescent-sweet',
    nama: 'Bulan Sabit Emas Manis',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M50 15 C30 15 20 30 20 50 C20 65 30 75 50 75 C35 68 32 40 50 15 Z" fill="#ffd166" stroke="#b07d00" stroke-width="2.5"/><circle cx="58" cy="25" r="3" fill="#ff758f"/></svg>`
  },
  {
    id: 'star-chubby-pink',
    nama: 'Bintang Chubby Lucu',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10 L48 28 L68 30 L52 44 L57 64 L40 52 L23 64 L28 44 L12 30 L32 28 Z" fill="#ffccd5" stroke="#6b1426" stroke-width="2.5"/><circle cx="34" cy="38" r="2.5" fill="#6b1426"/><circle cx="46" cy="38" r="2.5" fill="#6b1426"/></svg>`
  },
  {
    id: 'star-retro-denim',
    nama: 'Bintang Jahit Merah Retro',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><polygon points="40,8 49,29 72,30 54,45 60,68 40,54 20,68 26,45 8,30 31,29" fill="#9c2d42" stroke="#fff" stroke-width="2" stroke-dasharray="3,2"/></svg>`
  },
  {
    id: 'heart-winged',
    nama: 'Hati Bersayap Bidadari',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><path d="M50 48 C30 30 30 15 42 15 C47 15 50 20 50 20 C50 20 53 15 58 15 C70 15 70 30 50 48 Z" fill="#ff4d6d"/><path d="M34 25 C15 15 5 30 20 40 C28 35 32 30 34 25 Z" fill="#ffccd5"/><path d="M66 25 C85 15 95 30 80 40 C72 35 68 30 66 25 Z" fill="#ffccd5"/></svg>`
  },
  {
    id: 'sparkle-diamond',
    nama: 'Berlian Berkilau',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><polygon points="35,10 55,35 35,60 15,35" fill="#a2d2ff" stroke="#2b4c7e" stroke-width="2"/><line x1="35" y1="10" x2="35" y2="60" stroke="#fff" stroke-width="1.5"/><line x1="15" y1="35" x2="55" y2="35" stroke="#fff" stroke-width="1.5"/></svg>`
  },
  {
    id: 'shooting-star',
    nama: 'Bintang Jatuh Harapan',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg"><polygon points="65,15 70,28 85,28 72,36 76,50 65,42 54,50 58,36 45,28 60,28" fill="#ffd166" stroke="#b07d00" stroke-width="1.5"/><line x1="55" y1="20" x2="10" y2="40" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/><line x1="60" y1="32" x2="20" y2="52" stroke="#ff758f" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'heart-glitter-group',
    nama: 'Kelompok Hati Manis',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M35 55 C15 38 15 18 28 18 C35 18 35 24 35 24 C35 24 35 18 42 18 C55 18 55 38 35 55 Z" fill="#ff758f"/><path d="M55 45 C45 35 45 22 52 22 C56 22 56 25 56 25 C56 25 56 22 60 22 C68 22 68 35 55 45 Z" fill="#ffd166"/></svg>`
  },
  {
    id: 'star-doodle-drawn',
    nama: 'Doodle Bintang Tangan',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><polygon points="35,10 42,28 60,28 46,38 52,56 35,46 18,56 24,38 10,28 28,28" fill="none" stroke="#6b1426" stroke-width="3.5" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'heart-maroon-ribbon',
    nama: 'Hati Marun Berbalut Pita',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 65 C15 45 15 18 30 18 C38 18 40 25 40 25 C40 25 42 18 50 18 C65 18 65 45 40 65 Z" fill="#6b1426"/><ellipse cx="40" cy="22" rx="10" ry="4" fill="#ffd699"/></svg>`
  },
  {
    id: 'glitter-cross',
    nama: 'Kilauan Salib Retro',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><polygon points="30,5 34,26 55,30 34,34 30,55 26,34 5,30 26,26" fill="#ff4d6d"/><circle cx="30" cy="30" r="3" fill="#fff"/></svg>`
  },
  {
    id: 'star-sparkle-pink',
    nama: 'Bintang Berkedip Pink',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><path d="M35 5 Q35 35 5 35 Q35 35 35 65 Q35 35 65 35 Q35 35 35 5 Z" fill="#ff758f"/><circle cx="35" cy="35" r="4" fill="#fff"/></svg>`
  },
  {
    id: 'heart-stamp-mini',
    nama: 'Cap Stempel Hati Merah',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="28" fill="none" stroke="#6b1426" stroke-width="3" stroke-dasharray="4,2"/><path d="M35 48 C20 35 20 20 28 20 C32 20 35 25 35 25 C35 25 38 20 42 20 C50 20 50 35 35 48 Z" fill="#6b1426"/></svg>`
  },
  {
    id: 'sparkle-dots',
    nama: 'Titik Sparkle Ajaib',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="20" r="4" fill="#ffd166"/><circle cx="45" cy="38" r="3" fill="#ff758f"/><circle cx="18" cy="40" r="2.5" fill="#ffd166"/></svg>`
  },
  {
    id: 'heart-clean-pink',
    nama: 'Hati Merah Muda Polos',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><path d="M35 58 C15 40 15 18 27 18 C33 18 35 24 35 24 C35 24 37 18 43 18 C55 18 55 40 35 58 Z" fill="#ff85a2" stroke="#fff" stroke-width="2.5"/></svg>`
  },
  {
    id: 'star-burst-gold',
    nama: 'Ledakan Bintang Emas',
    kategori: 'hati-kilau',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="8" fill="#ffd166"/><polygon points="40,10 44,30 50,20 48,34 68,30 52,40 65,48 48,46 54,66 42,50 38,70 36,50 24,64 30,46 14,48 26,40 10,32 30,34 26,20 34,30" fill="#ffd166"/></svg>`
  }
];

// 5. STIKER BUATAN (SVG): AESTHETIC & LUCU (24 Buah)
const AESTHETIC_SVGS = [
  {
    id: 'aest-pink-bow',
    nama: 'Pita Coquette Merah Muda',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><path d="M50 40 C35 25 15 25 18 42 C20 55 45 45 50 40 Z" fill="#ff85a2" stroke="#6b1426" stroke-width="2.5"/><path d="M50 40 C65 25 85 25 82 42 C80 55 55 45 50 40 Z" fill="#ff85a2" stroke="#6b1426" stroke-width="2.5"/><circle cx="50" cy="40" r="6" fill="#ff4d6d" stroke="#6b1426" stroke-width="2"/></svg>`
  },
  {
    id: 'aest-cute-bear',
    nama: 'Beruang Teddy Imut',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="26" r="10" fill="#d4a373" stroke="#6b1426" stroke-width="2.5"/><circle cx="62" cy="26" r="10" fill="#d4a373" stroke="#6b1426" stroke-width="2.5"/><ellipse cx="45" cy="50" rx="28" ry="24" fill="#e9c46a" stroke="#6b1426" stroke-width="3"/><ellipse cx="45" cy="56" rx="12" ry="9" fill="#fff"/><circle cx="36" cy="44" r="3" fill="#6b1426"/><circle cx="54" cy="44" r="3" fill="#6b1426"/></svg>`
  },
  {
    id: 'aest-cute-bunny',
    nama: 'Kelinci Cantik Berbunga',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="34" cy="28" rx="8" ry="22" fill="#fff" stroke="#6b1426" stroke-width="2.5"/><ellipse cx="56" cy="28" rx="8" ry="22" fill="#fff" stroke="#6b1426" stroke-width="2.5"/><circle cx="45" cy="62" r="26" fill="#fff" stroke="#6b1426" stroke-width="2.5"/><circle cx="37" cy="58" r="3" fill="#6b1426"/><circle cx="53" cy="58" r="3" fill="#6b1426"/></svg>`
  },
  {
    id: 'aest-cherry-duo',
    nama: 'Ceri Merah Berpasangan',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="56" r="14" fill="#d90429" stroke="#6b1426" stroke-width="2.5"/><circle cx="54" cy="56" r="14" fill="#d90429" stroke="#6b1426" stroke-width="2.5"/><circle cx="24" cy="50" r="3" fill="#fff"/><circle cx="50" cy="50" r="3" fill="#fff"/><path d="M28 44 Q35 22 45 15" fill="none" stroke="#386641" stroke-width="3"/></svg>`
  },
  {
    id: 'aest-retro-camera',
    nama: 'Kamera Saku Vintage',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="20" width="60" height="42" rx="6" fill="#e9ecef" stroke="#6b1426" stroke-width="2.5"/><circle cx="45" cy="41" r="14" fill="#6b1426"/><circle cx="45" cy="41" r="10" fill="#212529"/></svg>`
  },
  {
    id: 'aest-washi-tape-gingham',
    nama: 'Washi Tape Kotak-Kotak Merah',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg"><polygon points="5,8 115,5 112,32 2,35" fill="#f8d7da" stroke="#6b1426" stroke-width="1.5"/><line x1="20" y1="7" x2="17" y2="34" stroke="#c92a2a" stroke-width="4"/><line x1="45" y1="6" x2="42" y2="33" stroke="#c92a2a" stroke-width="4"/><line x1="70" y1="6" x2="67" y2="33" stroke="#c92a2a" stroke-width="4"/></svg>`
  },
  {
    id: 'aest-bubble-tea',
    nama: 'Gelas Boba Milk Tea',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 70 90" xmlns="http://www.w3.org/2000/svg"><polygon points="18,30 24,78 46,78 52,30" fill="#ddb892" stroke="#6b1426" stroke-width="2.5"/><line x1="35" y1="10" x2="35" y2="30" stroke="#ff758f" stroke-width="5" stroke-linecap="round"/><circle cx="28" cy="70" r="3" fill="#4a0918"/><circle cx="36" cy="72" r="3" fill="#4a0918"/><circle cx="42" cy="69" r="3" fill="#4a0918"/></svg>`
  },
  {
    id: 'aest-cloud-dreamy',
    nama: 'Awan Dreamy Pastel',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg"><path d="M25 45 L65 45 C75 45 78 35 72 28 C74 18 62 14 54 18 C48 10 32 10 28 20 C18 20 16 32 25 45 Z" fill="#fff" stroke="#ffb3c1" stroke-width="3"/></svg>`
  },
  {
    id: 'aest-rainbow-pastel',
    nama: 'Pelangi Pastel Manis',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg"><path d="M15 50 A30 30 0 0 1 75 50" fill="none" stroke="#ff758f" stroke-width="6"/><path d="M23 50 A22 22 0 0 1 67 50" fill="none" stroke="#ffd166" stroke-width="6"/></svg>`
  },
  {
    id: 'aest-text-smile',
    nama: 'Kutipan Smile! 📸',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="100" height="30" rx="15" fill="#ffd166" stroke="#b07d00" stroke-width="2"/><text x="55" y="25" font-family="sans-serif" font-weight="900" font-size="16" fill="#6b1426" text-anchor="middle">SMILE! ✨</text></svg>`
  },
  {
    id: 'aest-text-besties',
    nama: 'Kutipan Besties Forever',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="110" height="30" rx="15" fill="#ffb3c1" stroke="#6b1426" stroke-width="2"/><text x="60" y="25" font-family="sans-serif" font-weight="bold" font-size="14" fill="#6b1426" text-anchor="middle">BESTIES 💖</text></svg>`
  },
  {
    id: 'aest-text-socute',
    nama: 'Kutipan So Cute!',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="100" height="30" rx="15" fill="#fff" stroke="#ff4d6d" stroke-width="2"/><text x="55" y="25" font-family="cursive, sans-serif" font-weight="bold" font-size="18" fill="#ff4d6d" text-anchor="middle">so cute ~</text></svg>`
  },
  {
    id: 'aest-cassette-retro',
    nama: 'Kaset Pita Mixtape',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="70" height="40" rx="4" fill="#ffccd5" stroke="#6b1426" stroke-width="2.5"/><rect x="22" y="20" width="46" height="20" rx="2" fill="#fff"/><circle cx="34" cy="30" r="5" fill="#6b1426"/><circle cx="56" cy="30" r="5" fill="#6b1426"/></svg>`
  },
  {
    id: 'aest-flower-daisy',
    nama: 'Bunga Daisy Putih',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="24" r="8" fill="#fff" stroke="#6b1426" stroke-width="1.5"/><circle cx="40" cy="56" r="8" fill="#fff" stroke="#6b1426" stroke-width="1.5"/><circle cx="24" cy="40" r="8" fill="#fff" stroke="#6b1426" stroke-width="1.5"/><circle cx="56" cy="40" r="8" fill="#fff" stroke="#6b1426" stroke-width="1.5"/><circle cx="40" cy="40" r="10" fill="#ffd166"/></svg>`
  },
  {
    id: 'aest-flower-sakura',
    nama: 'Kelopak Bunga Sakura',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="22" r="9" fill="#ffccd5"/><circle cx="35" cy="48" r="9" fill="#ffccd5"/><circle cx="22" cy="35" r="9" fill="#ffccd5"/><circle cx="48" cy="35" r="9" fill="#ffccd5"/><circle cx="35" cy="35" r="6" fill="#ff4d6d"/></svg>`
  },
  {
    id: 'aest-butterfly-pink',
    nama: 'Kupu-Kupu Merah Muda',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg"><ellipse cx="26" cy="28" rx="14" ry="12" fill="#ff85a2" stroke="#6b1426" stroke-width="1.5"/><ellipse cx="54" cy="28" rx="14" ry="12" fill="#ff85a2" stroke="#6b1426" stroke-width="1.5"/><ellipse cx="28" cy="46" rx="9" ry="8" fill="#ffb3c1" stroke="#6b1426" stroke-width="1.5"/><ellipse cx="52" cy="46" rx="9" ry="8" fill="#ffb3c1" stroke="#6b1426" stroke-width="1.5"/><ellipse cx="40" cy="36" rx="3" ry="16" fill="#6b1426"/></svg>`
  },
  {
    id: 'aest-ice-cream-cone',
    nama: 'Es Krim Cone Manis',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg"><polygon points="15,40 45,40 30,85" fill="#d4a373" stroke="#6b1426" stroke-width="2"/><circle cx="30" cy="35" r="18" fill="#ff758f" stroke="#6b1426" stroke-width="2"/><circle cx="30" cy="18" r="5" fill="#d90429"/></svg>`
  },
  {
    id: 'aest-text-cheese',
    nama: 'Kutipan Say Cheese! 🧀',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="110" height="30" rx="15" fill="#ffeedd" stroke="#6b1426" stroke-width="2"/><text x="60" y="25" font-family="sans-serif" font-weight="900" font-size="14" fill="#6b1426" text-anchor="middle">CHEESE! 🧀</text></svg>`
  },
  {
    id: 'aest-doodle-arrow',
    nama: 'Doodle Panah Melingkar',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><path d="M20 50 Q15 20 45 20 Q55 20 55 35" fill="none" stroke="#6b1426" stroke-width="3" stroke-linecap="round"/><polygon points="48,32 55,42 62,32" fill="#6b1426"/></svg>`
  },
  {
    id: 'aest-doodle-sparkle-line',
    nama: 'Doodle Garis Zigzag Ceria',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg"><path d="M10 20 L25 10 L40 30 L55 10 L70 20" fill="none" stroke="#ff4d6d" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'aest-stamp-wax-seal',
    nama: 'Segel Lilin Merah Marun',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="26" fill="#841829" stroke="#4a0918" stroke-width="2.5"/><circle cx="35" cy="35" r="19" fill="#9c2d42"/><text x="35" y="41" font-family="cursive, sans-serif" font-weight="bold" font-size="18" fill="#ffd699" text-anchor="middle">A</text></svg>`
  },
  {
    id: 'aest-matcha-latte',
    nama: 'Gelas Kopi Cantik',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><path d="M15 25 L22 60 L48 60 L55 25 Z" fill="#fff" stroke="#6b1426" stroke-width="2"/><ellipse cx="35" cy="25" rx="20" ry="5" fill="#d4a373"/></svg>`
  },
  {
    id: 'aest-safety-pin',
    nama: 'Peniti Perak Estetik',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="15" width="20" height="15" rx="3" fill="#ced4da" stroke="#495057" stroke-width="2"/><path d="M30 18 L70 22 Q75 25 70 28 L30 32" fill="none" stroke="#6c757d" stroke-width="2.5"/></svg>`
  },
  {
    id: 'aest-red-ribbon-tied',
    nama: 'Pita Merah Bersimpul',
    kategori: 'aesthetic',
    svg: `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="28" rx="16" ry="10" fill="#a82036" transform="rotate(-25 32 28)"/><ellipse cx="58" cy="28" rx="16" ry="10" fill="#a82036" transform="rotate(25 58 28)"/><circle cx="45" cy="28" r="5" fill="#6b1426"/><path d="M42 32 Q35 55 28 62" stroke="#a82036" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M48 32 Q55 55 62 62" stroke="#a82036" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`
  }
];

// Konversi SVG array menjadi format stiker utuh dengan src DataURL
const BUILTIN_STICKERS = [
  ...BIRTHDAY_SVGS.map(s => ({ id: s.id, nama: s.nama, kategori: s.kategori, src: svgToDataUrl(s.svg) })),
  ...HEARTS_STARS_SVGS.map(s => ({ id: s.id, nama: s.nama, kategori: s.kategori, src: svgToDataUrl(s.svg) })),
  ...AESTHETIC_SVGS.map(s => ({ id: s.id, nama: s.nama, kategori: s.kategori, src: svgToDataUrl(s.svg) }))
];

// Gabungan seluruh stiker: Referensi Kucing (16) + Referensi Prangko (14) + Buatan Vektor (70) = 100 Stiker!
export const ALL_STICKERS = [
  ...REFERENCE_CATS,
  ...REFERENCE_STAMPS,
  ...BUILTIN_STICKERS
];

export const STICKER_CATEGORIES = [
  { id: 'all', nama: 'Semua (100)' },
  { id: 'ultah', nama: 'Ulang Tahun 🎂' },
  { id: 'kucing', nama: 'Kucing Ref 🐱' },
  { id: 'prangko', nama: 'Prangko Ref 💌' },
  { id: 'hati-kilau', nama: 'Hati & Kilau ✨' },
  { id: 'aesthetic', nama: 'Aesthetic 🎀' }
];

export default ALL_STICKERS;
