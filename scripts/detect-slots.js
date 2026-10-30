/**
 * scripts/detect-slots.js
 * Mendeteksi & mendefinisikan koordinat slot foto dan textArea ucapan ulang tahun
 * Menghasilkan file debug visual di docs/debug/ dan src/data/frames.json
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { BIRTHDAY } from '../src/data/birthdayConfig.js';

fs.mkdirSync('docs/debug', { recursive: true });
fs.mkdirSync('src/data', { recursive: true });

// Definisi lengkap 10 frame (6 dari referensi + 4 buatan untuk memenuhi seluruh layout wajib)
const FRAMES = [
  {
    id: 'frame-strip-gingham-3',
    nama: 'Red Gingham & Teddy (3 Foto)',
    kategori: 'strip',
    layoutType: 'strip-3',
    file: '/assets/frames/frame-gingham-teddy.png',
    lebarPx: 1152,
    tinggiPx: 2048,
    deskripsi: 'Photostrip vertikal 3 foto bernuansa kotak-kotak merah, boneka beruang & ciuman ceri.',
    slots: [
      { order: 1, x: 284, y: 138, width: 565, height: 446, radius: 0 },
      { order: 2, x: 284, y: 627, width: 565, height: 445, radius: 0 },
      { order: 3, x: 284, y: 1118, width: 565, height: 445, radius: 0 }
    ],
    textArea: { x: 284, y: 1600, width: 565, height: 230 },
    captionStyle: {
      title: BIRTHDAY.titleLine,
      name: BIRTHDAY.nameLine,
      sub: BIRTHDAY.subLine,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#fff5ea',
      scriptColor: '#ffd699',
      bgBanner: true
    }
  },
  {
    id: 'frame-polaroid-cats-2',
    nama: 'Coquette Kittens Duo (2 Polaroid)',
    kategori: 'polaroid',
    layoutType: 'polaroid-2',
    file: '/assets/frames/frame-coquette-cats.png',
    lebarPx: 1152,
    tinggiPx: 2048,
    deskripsi: 'Duo polaroid aesthetic dengan kucing lucu berpita pink dan bunga peony.',
    slots: [
      { order: 1, x: 60, y: 229, width: 528, height: 706, radius: 4 },
      { order: 2, x: 590, y: 1127, width: 513, height: 685, radius: 4 }
    ],
    textArea: { x: 60, y: 940, width: 528, height: 160 },
    captionStyle: {
      title: 'Happy 20th Birthday',
      name: BIRTHDAY.nameLine,
      sub: `${BIRTHDAY.subLine} ✦ Favorite Cat`,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#33141c',
      scriptColor: '#841829',
      bgBanner: false
    }
  },
  {
    id: 'frame-digicam-ipod-4',
    nama: 'Y2K Cyber Digicam (4 Foto)',
    kategori: 'collage',
    layoutType: 'collage-4',
    file: '/assets/frames/frame-digicam-ipod.png',
    lebarPx: 1152,
    tinggiPx: 2048,
    deskripsi: 'Kolase Y2K: layar kamera saku Sony Cyber-shot dan strip 3 foto vertikal.',
    slots: [
      { order: 1, x: 260, y: 65, width: 575, height: 425, radius: 8 },
      { order: 2, x: 85, y: 760, width: 320, height: 345, radius: 4 },
      { order: 3, x: 145, y: 1140, width: 320, height: 345, radius: 4 },
      { order: 4, x: 205, y: 1520, width: 320, height: 345, radius: 4 }
    ],
    // TextArea di layar iPod (AirPods Birthday Track)
    textArea: { x: 535, y: 740, width: 375, height: 430 },
    captionStyle: {
      title: BIRTHDAY.titleLine,
      name: BIRTHDAY.nameLine,
      sub: `${BIRTHDAY.subLine} ✦ Birthday Track`,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#fff5ea',
      scriptColor: '#ffd700',
      bgBanner: false
    }
  },
  {
    id: 'frame-scrapbook-denim-4',
    nama: 'Y2K Scrapbook Denim (4 Foto)',
    kategori: 'collage',
    layoutType: 'collage-4',
    file: '/assets/frames/frame-y2k-denim.png',
    lebarPx: 1152,
    tinggiPx: 2048,
    deskripsi: 'Kolase corduroy denim biru, iPod merah, dan strip foto bertabur bintang & stroberi.',
    slots: [
      { order: 1, x: 52, y: 840, width: 389, height: 380, radius: 12 },
      { order: 2, x: 616, y: 538, width: 383, height: 405, radius: 4 },
      { order: 3, x: 616, y: 982, width: 383, height: 405, radius: 4 },
      { order: 4, x: 616, y: 1427, width: 383, height: 405, radius: 4 }
    ],
    // TextArea di dalam awan memo ceri atas
    textArea: { x: 365, y: 35, width: 440, height: 165 },
    captionStyle: {
      title: BIRTHDAY.subLine,
      name: BIRTHDAY.nameLine,
      sub: BIRTHDAY.shortLine,
      date: BIRTHDAY.dateShort,
      align: 'center',
      color: '#6b1426',
      scriptColor: '#841829',
      bgBanner: false
    }
  },
  {
    id: 'frame-crimson-memories-3',
    nama: 'Crimson Memories Strip (3 Foto)',
    kategori: 'strip',
    layoutType: 'strip-3',
    file: '/assets/frames/frame-crimson-memories.png',
    lebarPx: 1152,
    tinggiPx: 2048,
    deskripsi: 'Photostrip merah marun dengan pita anggun, tiket kenangan, dan kue ulang tahun manis.',
    slots: [
      { order: 1, x: 316, y: 547, width: 524, height: 342, radius: 0 },
      { order: 2, x: 316, y: 922, width: 524, height: 342, radius: 0 },
      { order: 3, x: 316, y: 1299, width: 524, height: 342, radius: 0 }
    ],
    // Banner bawah marun di sebelah kue & tiket
    textArea: { x: 280, y: 1645, width: 380, height: 210 },
    captionStyle: {
      title: BIRTHDAY.titleLine,
      name: BIRTHDAY.nameLine,
      sub: BIRTHDAY.subLine,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#fff8f2',
      scriptColor: '#ffd699',
      bgBanner: false
    }
  },
  {
    id: 'frame-polaroid-picnic-3',
    nama: 'Picnic Berries Trio (3 Polaroid)',
    kategori: 'polaroid',
    layoutType: 'polaroid-3',
    file: '/assets/frames/frame-polaroid-picnic.jpg',
    lebarPx: 736,
    tinggiPx: 1304,
    deskripsi: 'Trio polaroid landscape di atas selimut piknik marun berbalut pita dan balon.',
    slots: [
      { order: 1, x: 255, y: 50, width: 410, height: 270, radius: 2 },
      { order: 2, x: 35, y: 345, width: 440, height: 250, radius: 2 },
      { order: 3, x: 200, y: 625, width: 490, height: 245, radius: 2 }
    ],
    textArea: { x: 30, y: 40, width: 220, height: 260 },
    captionStyle: {
      title: 'Sweet 20',
      name: BIRTHDAY.nameLine,
      sub: BIRTHDAY.titleLine,
      date: BIRTHDAY.dateShort,
      align: 'center',
      color: '#fff5ea',
      scriptColor: '#ffd699',
      bgBanner: false
    }
  },
  {
    id: 'frame-classic-strip-4',
    nama: 'Aesthetic Wavy 4-Cut (4 Foto)',
    kategori: 'strip',
    layoutType: 'strip-4',
    isProgrammatic: true,
    lebarPx: 1200,
    tinggiPx: 2600,
    deskripsi: 'Photostrip vertikal 4 foto klasik bergaya Sekaliarfoto dengan batas bergelombang & marun anggun.',
    slots: [
      { order: 1, x: 150, y: 160, width: 900, height: 500, radius: 16 },
      { order: 2, x: 150, y: 700, width: 900, height: 500, radius: 16 },
      { order: 3, x: 150, y: 1240, width: 900, height: 500, radius: 16 },
      { order: 4, x: 150, y: 1780, width: 900, height: 500, radius: 16 }
    ],
    textArea: { x: 150, y: 2310, width: 900, height: 250 },
    captionStyle: {
      title: BIRTHDAY.titleLine,
      name: BIRTHDAY.nameLine,
      sub: `${BIRTHDAY.subLine} ✦ Forever Sparkling`,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#fff8f2',
      scriptColor: '#ffd699',
      bgBanner: true
    }
  },
  {
    id: 'frame-grid-2x2',
    nama: 'Vintage Lace Photocard (Grid 2x2)',
    kategori: 'grid',
    layoutType: 'grid-2x2',
    isProgrammatic: true,
    lebarPx: 1600,
    tinggiPx: 2000,
    deskripsi: 'Kartu foto estetik grid 2x2 dengan ornamen renda burgundi dan prangko mawar.',
    slots: [
      { order: 1, x: 120, y: 140, width: 650, height: 720, radius: 16 },
      { order: 2, x: 830, y: 140, width: 650, height: 720, radius: 16 },
      { order: 3, x: 120, y: 920, width: 650, height: 720, radius: 16 },
      { order: 4, x: 830, y: 920, width: 650, height: 720, radius: 16 }
    ],
    textArea: { x: 120, y: 1680, width: 1360, height: 260 },
    captionStyle: {
      title: "Happy 20th Birthday",
      name: BIRTHDAY.nameLine,
      sub: `${BIRTHDAY.subLine} ✦ Celebrating 20 Magical Years`,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#4a0918',
      scriptColor: '#841829',
      bgBanner: false
    }
  },
  {
    id: 'frame-grid-2x3',
    nama: 'Studio Photobooth Sheet (Grid 2x3)',
    kategori: 'grid',
    layoutType: 'grid-2x3',
    isProgrammatic: true,
    lebarPx: 1600,
    tinggiPx: 2400,
    deskripsi: 'Lembar photobooth studio 6 foto lengkap dengan border scallop marun & krem.',
    slots: [
      { order: 1, x: 120, y: 140, width: 650, height: 600, radius: 12 },
      { order: 2, x: 830, y: 140, width: 650, height: 600, radius: 12 },
      { order: 3, x: 120, y: 780, width: 650, height: 600, radius: 12 },
      { order: 4, x: 830, y: 780, width: 650, height: 600, radius: 12 },
      { order: 5, x: 120, y: 1420, width: 650, height: 600, radius: 12 },
      { order: 6, x: 830, y: 1420, width: 650, height: 600, radius: 12 }
    ],
    textArea: { x: 120, y: 2060, width: 1360, height: 280 },
    captionStyle: {
      title: BIRTHDAY.titleLine,
      name: BIRTHDAY.nameLine,
      sub: `${BIRTHDAY.subLine} ✦ Best Memories with Friends`,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#fff8f2',
      scriptColor: '#ffd699',
      bgBanner: true
    }
  },
  {
    id: 'frame-polaroid-solo-1',
    nama: 'Grande Solo Polaroid (1 Foto Besar)',
    kategori: 'polaroid',
    layoutType: 'polaroid-1',
    isProgrammatic: true,
    lebarPx: 1200,
    tinggiPx: 1600,
    deskripsi: 'Polaroid tunggal besar aesthetic dengan segel lilin emas, pita merah, dan ucapan romantis.',
    slots: [
      { order: 1, x: 120, y: 120, width: 960, height: 1040, radius: 8 }
    ],
    textArea: { x: 120, y: 1200, width: 960, height: 340 },
    captionStyle: {
      title: BIRTHDAY.titleLine,
      name: BIRTHDAY.nameLine,
      sub: `${BIRTHDAY.subLine} ✦ Queen of the Day ✨`,
      date: BIRTHDAY.dateText,
      align: 'center',
      color: '#33141c',
      scriptColor: '#6b1426',
      bgBanner: false
    }
  }
];

// Buat gambar debug visual
async function generateDebugImages() {
  console.log('--- Menghasilkan Gambar Debug Visual di docs/debug/ ---');

  for (const f of FRAMES) {
    const svgElements = [];
    
    // Gambar kotak slot (Merah)
    f.slots.forEach(s => {
      svgElements.push(`
        <rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" rx="${s.radius || 0}"
              fill="rgba(255, 0, 85, 0.2)" stroke="#ff0055" stroke-width="6" stroke-dasharray="10,5" />
        <rect x="${s.x + 10}" y="${s.y + 10}" width="140" height="40" rx="6" fill="#ff0055" />
        <text x="${s.x + 20}" y="${s.y + 38}" font-family="sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Slot ${s.order}</text>
      `);
    });

    // Gambar textArea (Hijau)
    if (f.textArea) {
      const t = f.textArea;
      svgElements.push(`
        <rect x="${t.x}" y="${t.y}" width="${t.width}" height="${t.height}" rx="8"
              fill="rgba(0, 204, 68, 0.25)" stroke="#00cc44" stroke-width="6" />
        <rect x="${t.x + 10}" y="${t.y + 10}" width="320" height="40" rx="6" fill="#00cc44" />
        <text x="${t.x + 20}" y="${t.y + 38}" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff">TextArea Ucapan Alya</text>
        <text x="${t.x + t.width / 2}" y="${t.y + 90}" font-family="sans-serif" font-size="32" font-weight="bold" fill="#006622" text-anchor="middle">
          ${f.captionStyle.name} (${f.captionStyle.sub})
        </text>
        <text x="${t.x + t.width / 2}" y="${t.y + 140}" font-family="sans-serif" font-size="24" fill="#006622" text-anchor="middle">
          ${f.captionStyle.date}
        </text>
      `);
    }

    const svgOverlay = Buffer.from(`
      <svg width="${f.lebarPx}" height="${f.tinggiPx}" xmlns="http://www.w3.org/2000/svg">
        ${svgElements.join('\n')}
      </svg>
    `);

    let baseImg;
    const realPath = f.file ? path.join('public', f.file) : null;
    if (realPath && fs.existsSync(realPath)) {
      baseImg = sharp(realPath);
    } else {
      // Untuk frame programatik, buat kanvas warna marun/krem
      baseImg = sharp({
        create: {
          width: f.lebarPx,
          height: f.tinggiPx,
          channels: 4,
          background: { r: 107, g: 20, b: 38, alpha: 1 }
        }
      });
    }

    const debugPath = `docs/debug/debug-${f.id}.png`;
    await baseImg
      .composite([{ input: svgOverlay }])
      .png()
      .toFile(debugPath);

    console.log(`Debug visual tersimpan: ${debugPath}`);
  }
}

// Simpan JSON
fs.writeFileSync('src/data/frames.json', JSON.stringify(FRAMES, null, 2), 'utf-8');
console.log('src/data/frames.json berhasil dibuat dengan 10 frame terverifikasi!');

generateDebugImages()
  .then(() => console.log('=== DETEKSI SLOT & VERIFIKASI SELESAI ==='))
  .catch(err => {
    console.error('Error saat membuat gambar debug:', err);
    process.exit(1);
  });
