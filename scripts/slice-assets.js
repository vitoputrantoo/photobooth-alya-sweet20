/**
 * scripts/slice-assets.js
 * Memproses dan mengekstrak aset referensi:
 * - Menyalin frame asli ke public/assets/frames/
 * - Mengekstrak 16 stiker kucing berlatar transparan dari e68a24c273e6e86ecba5560a76b764bf.jpg
 * - Mengekstrak 14 stiker prangko berlatar transparan dari 55ea1a9b2c69e6a180feaacbf6393320.jpg
 * - Menyalin moodboard & transparent spacer
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Pastikan direktori tujuan tersedia
const dirs = [
  'public/assets/frames',
  'public/assets/stickers',
  'public/assets/stickers/cats',
  'public/assets/stickers/stamps',
  'public/assets/backgrounds',
  'public/assets/moodboards',
  'public/assets/masks'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// Fungsi BFS flood-fill untuk menghapus warna latar tepi (menjadikan transparan)
function makeEdgeTransparent(data, w, h, isBgColor) {
  const visited = new Uint8Array(w * h);
  const queue = [];

  for (let x = 0; x < w; x++) {
    queue.push(x, (h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    queue.push(y * w, y * w + (w - 1));
  }

  for (let i = 0; i < queue.length; i++) {
    const pos = queue[i];
    if (visited[pos]) continue;
    visited[pos] = 1;
    const idx = pos * 4;
    if (isBgColor(data[idx], data[idx + 1], data[idx + 2])) {
      data[idx + 3] = 0; // Transparan
      const x = pos % w;
      const y = Math.floor(pos / w);
      if (x > 0 && !visited[pos - 1]) queue.push(pos - 1);
      if (x < w - 1 && !visited[pos + 1]) queue.push(pos + 1);
      if (y > 0 && !visited[pos - w]) queue.push(pos - w);
      if (y < h - 1 && !visited[pos + w]) queue.push(pos + w);
    }
  }
}

async function processCats() {
  console.log('--- Mengekstrak 16 Stiker Kucing ---');
  const catSheet = 'e68a24c273e6e86ecba5560a76b764bf.jpg';
  // Copy full sheet ke public
  fs.copyFileSync(catSheet, 'public/assets/stickers/cats-sheet.jpg');

  // Bounding box kasar untuk 16 kucing di e68a24c2 (736 x 1294)
  const catBoxes = [
    // Baris 1
    { id: 'cat-macaron', name: 'Kucing Macaron', box: { left: 25, top: 15, width: 225, height: 215 } },
    { id: 'cat-smile-bow', name: 'Kucing Senyum Pita', box: { left: 260, top: 15, width: 220, height: 200 } },
    { id: 'cat-grumpy', name: 'Kucing Kesal', box: { left: 490, top: 20, width: 225, height: 195 } },
    // Baris 2
    { id: 'cat-boba', name: 'Kucing Minum Boba', box: { left: 25, top: 220, width: 225, height: 205 } },
    { id: 'cat-waving', name: 'Kucing Melambai', box: { left: 250, top: 215, width: 230, height: 200 } },
    { id: 'cat-shy-hands', name: 'Kucing Tutup Muka', box: { left: 495, top: 225, width: 220, height: 190 } },
    // Baris 3
    { id: 'cat-paw-high', name: 'Kucing Angkat Cakar', box: { left: 25, top: 425, width: 245, height: 200 } },
    { id: 'cat-furrowed', name: 'Kucing Mengernyit', box: { left: 280, top: 425, width: 215, height: 195 } },
    { id: 'cat-smug', name: 'Kucing Bangga', box: { left: 505, top: 425, width: 210, height: 195 } },
    // Baris 4
    { id: 'cat-flower-choker', name: 'Kucing Kalung Bunga', box: { left: 25, top: 605, width: 215, height: 175 } },
    { id: 'cat-crying', name: 'Kucing Menangis Patah Hati', box: { left: 410, top: 600, width: 205, height: 155 } },
    { id: 'cat-flower-crown', name: 'Kucing Mahkota Bunga', box: { left: 535, top: 695, width: 190, height: 155 } },
    // Baris 4.5 (tengah)
    { id: 'cat-blushing-paws', name: 'Kucing Malu-Malu', box: { left: 235, top: 685, width: 200, height: 165 } },
    // Baris 5
    { id: 'cat-wink-cheek', name: 'Kucing Kedip Lucu', box: { left: 25, top: 840, width: 235, height: 205 } },
    { id: 'cat-pouting', name: 'Kucing Ngambek', box: { left: 280, top: 840, width: 215, height: 205 } },
    { id: 'cat-wave-side', name: 'Kucing Say Hello', box: { left: 505, top: 845, width: 215, height: 200 } }
  ];

  for (let i = 0; i < catBoxes.length; i++) {
    const c = catBoxes[i];
    const { data, info } = await sharp(catSheet)
      .extract(c.box)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    makeEdgeTransparent(data, info.width, info.height, (r, g, b) => r > 245 && g > 245 && b > 245);

    const outPath = `public/assets/stickers/cats/cat-${i + 1}.png`;
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(outPath);
  }
  console.log('Selesai: 16 stiker kucing diekstrak!');
}

async function processStamps() {
  console.log('--- Mengekstrak 14 Prangko Vintage Pink ---');
  const stampSheet = '55ea1a9b2c69e6a180feaacbf6393320.jpg';
  // Copy full sheet
  fs.copyFileSync(stampSheet, 'public/assets/stickers/stamps-sheet.jpg');
  fs.copyFileSync(stampSheet, 'public/assets/backgrounds/stamps-pattern.jpg');

  // 14 prangko di 55ea1a9b (735 x 1041)
  const stampBoxes = [
    // Baris 1
    { id: 'stamp-botanical-50', name: 'Prangko Bunga 50c', box: { left: 90, top: 10, width: 175, height: 235 } },
    { id: 'stamp-peony-24', name: 'Prangko Bunga Peony 24c', box: { left: 275, top: 15, width: 210, height: 215 } },
    { id: 'stamp-crown-25', name: 'Prangko Mahkota 25 Shillings', box: { left: 495, top: 10, width: 170, height: 235 } },
    // Baris 2
    { id: 'stamp-love-heart', name: 'Prangko Love Kotak-Kotak', box: { left: 90, top: 245, width: 185, height: 180 } },
    { id: 'stamp-cat-bed', name: 'Prangko Kucing La Poste', box: { left: 285, top: 235, width: 170, height: 195 } },
    { id: 'stamp-swan-10', name: 'Prangko Angsa Romantis', box: { left: 465, top: 250, width: 200, height: 180 } },
    // Baris 3
    { id: 'stamp-lady-15', name: 'Prangko Classic Lady 15c', box: { left: 90, top: 430, width: 170, height: 200 } },
    { id: 'stamp-danmark-cat', name: 'Prangko Kucing Putih Danmark', box: { left: 270, top: 435, width: 225, height: 195 } },
    { id: 'stamp-sakura-63', name: 'Prangko Sakura Nippon 63', box: { left: 505, top: 435, width: 170, height: 205 } },
    // Baris 4
    { id: 'stamp-butterfly-2r', name: 'Prangko Kupu-Kupu 2R', box: { left: 90, top: 635, width: 220, height: 175 } },
    { id: 'stamp-plum-blossom', name: 'Prangko Bunga Prem 4.00', box: { left: 320, top: 630, width: 160, height: 215 } },
    { id: 'stamp-pink-flower', name: 'Prangko Bunga Ethiopia', box: { left: 495, top: 645, width: 170, height: 215 } },
    // Baris 5
    { id: 'stamp-strawberry-50', name: 'Prangko Stroberi Manis 50', box: { left: 495, top: 860, width: 170, height: 180 } },
    { id: 'stamp-airmail', name: 'Prangko Air Mail New Zealand', box: { left: 90, top: 935, width: 225, height: 105 } }
  ];

  for (let i = 0; i < stampBoxes.length; i++) {
    const s = stampBoxes[i];
    const { data, info } = await sharp(stampSheet)
      .extract(s.box)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Hapus warna krem/putih di luar gerigi prangko
    makeEdgeTransparent(data, info.width, info.height, (r, g, b) => r > 240 && g > 235 && b > 230);

    const outPath = `public/assets/stickers/stamps/stamp-${i + 1}.png`;
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(outPath);
  }
  console.log('Selesai: 14 prangko antik diekstrak!');
}

async function copyReferenceAssets() {
  console.log('--- Menyalin Frame dan Moodboard ---');
  // Copy frames
  fs.copyFileSync('download (1).png', 'public/assets/frames/frame-gingham-teddy.png');
  fs.copyFileSync('download (2).png', 'public/assets/frames/frame-coquette-cats.png');
  fs.copyFileSync('download (4).png', 'public/assets/frames/frame-digicam-ipod.png');
  fs.copyFileSync('download (5).png', 'public/assets/frames/frame-y2k-denim.png');
  fs.copyFileSync('download (6).png', 'public/assets/frames/frame-crimson-memories.png');
  fs.copyFileSync('e5a983c4c13cb698b121999abe993e3e.jpg', 'public/assets/frames/frame-polaroid-picnic.jpg');

  // Copy moodboards
  fs.copyFileSync('42e751bb8356e3051c009fbf00356a50.jpg', 'public/assets/moodboards/sekaliarfoto-moodboard.jpg');
  fs.copyFileSync('8535305199a69a4b49ed3ce18cdb86f4.jpg', 'public/assets/moodboards/lace-wedding-moodboard.jpg');

  // Copy transparent spacers
  fs.copyFileSync('download (3).png', 'public/assets/masks/transparent-spacer-1.png');
  fs.copyFileSync('download.png', 'public/assets/masks/transparent-spacer-2.png');

  console.log('Semua file referensi berhasil disalin ke public/assets/');
}

(async () => {
  try {
    await copyReferenceAssets();
    await processCats();
    await processStamps();
    console.log('=== SEMUA ASET REFERENSI TELAH DIPROSES DENGAN SEMPURNA ===');
  } catch (err) {
    console.error('Error saat memproses aset:', err);
    process.exit(1);
  }
})();

