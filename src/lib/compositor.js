/**
 * src/lib/compositor.js
 * Mesin Komposisi Gambar Canvas 2D Utama (Single Source of Truth)
 * Digunakan untuk:
 * - Preview Kartu Frame di Layar 1
 * - Thumbnail Progres Slot di Layar 2
 * - Tampilan Hasil Interaktif di Layar 3
 * - Ekspor Download PNG Resolusi Tinggi (Sisi pendek >= 1200px)
 */

import { BIRTHDAY } from '../data/birthdayConfig.js';
import { applyFilterToCanvas } from './filters.js';

// Cache gambar untuk menghindari reload berulang
const imageCache = new Map();

/**
 * Menyesuaikan path aset agar kompatibel dengan GitHub Pages sub-folder (base: ./)
 */
export function resolveAssetPath(path) {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('./')) return path;
  if (path.startsWith('/')) return '.' + path;
  return './' + path;
}

export async function loadImage(src) {
  if (!src) return null;
  const resolvedSrc = resolveAssetPath(src);
  if (imageCache.has(resolvedSrc)) return imageCache.get(resolvedSrc);

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(resolvedSrc, img);
      resolve(img);
    };
    img.onerror = () => {
      console.warn('Gagal memuat gambar:', resolvedSrc);
      resolve(null);
    };
    img.src = resolvedSrc;
  });
}

/**
 * Memastikan seluruh font lokal telah selesai dimuat oleh browser
 */
export async function ensureFontsLoaded() {
  if (document.fonts) {
    try {
      await document.fonts.ready;
      await Promise.all([
        document.fonts.load('bold 32px "Dancing Script"'),
        document.fonts.load('bold 16px "Plus Jakarta Sans"'),
        document.fonts.load('400 16px "Plus Jakarta Sans"')
      ]);
    } catch (e) {
      console.warn('Font load warning:', e);
    }
  }
}

/**
 * Menggambar teks terpusat dengan auto-fit ukuran font di dalam kotak textArea
 */
function drawAutoFitBirthdayText(ctx, frame, scale = 1) {
  if (!frame.textArea) return;

  const t = frame.textArea;
  const style = frame.captionStyle || {};
  const x = t.x * scale;
  const y = t.y * scale;
  const w = t.width * scale;
  const h = t.height * scale;

  ctx.save();

  // Jika banner background aktif
  if (style.bgBanner) {
    ctx.fillStyle = 'rgba(107, 20, 38, 0.85)';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 14 * scale);
    ctx.fill();
    ctx.strokeStyle = '#ffd699';
    ctx.lineWidth = 2 * scale;
    ctx.stroke();
  }

  // Teks baris
  const line1 = style.title || BIRTHDAY.titleLine;     // "Happy Birthday"
  const line2 = style.name || BIRTHDAY.nameLine;       // "Alya Diva"
  const line3 = style.sub || BIRTHDAY.subLine;         // "Sweet 20"
  const line4 = style.date || BIRTHDAY.dateText;       // "18 Oktober 2026"

  const cx = x + w / 2;
  const textColor = style.color || '#fff8f2';
  const accentColor = style.scriptColor || '#ffd699';

  // 1. Line 1: Script Title ("Happy Birthday")
  let s1 = Math.min(36 * scale, h * 0.22);
  ctx.font = `bold ${s1}px "Dancing Script", cursive, sans-serif`;
  ctx.fillStyle = accentColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 4 * scale;
  ctx.fillText(line1, cx, y + h * 0.22);

  // 2. Line 2: Nama "Alya Diva"
  let s2 = Math.min(46 * scale, h * 0.32);
  ctx.font = `bold ${s2}px "Dancing Script", cursive, sans-serif`;
  ctx.fillStyle = textColor;
  ctx.fillText(line2, cx, y + h * 0.52);

  // 3. Line 3: "Sweet 20"
  let s3 = Math.min(22 * scale, h * 0.16);
  ctx.font = `bold ${s3}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = accentColor;
  ctx.letterSpacing = '1px';
  ctx.fillText(`✦ ${line3} ✦`, cx, y + h * 0.76);

  // 4. Line 4: Tanggal "18 Oktober 2026"
  let s4 = Math.min(16 * scale, h * 0.13);
  ctx.font = `600 ${s4}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = textColor;
  ctx.fillText(line4, cx, y + h * 0.92);

  ctx.restore();
}

/**
 * Render frame programatik (bila bukan dari file referensi)
 */
function drawProgrammaticFrame(ctx, frame, scale = 1) {
  const fw = frame.lebarPx * scale;
  const fh = frame.tinggiPx * scale;

  ctx.save();

  if (frame.id === 'frame-classic-strip-4') {
    // Photostrip Klasik 4 Foto Bergaya Sekaliarfoto (Marun & Krem)
    ctx.fillStyle = '#6b1426';
    ctx.fillRect(0, 0, fw, fh);

    // Border ornamen emas tipis
    ctx.strokeStyle = '#ffd699';
    ctx.lineWidth = 4 * scale;
    ctx.strokeRect(30 * scale, 30 * scale, fw - 60 * scale, fh - 60 * scale);

    // Header kecil di atas slot 1
    ctx.font = `bold ${28 * scale}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = '#ffd699';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SEKALIARFOTO ✦', fw / 2, 95 * scale);
  } else if (frame.id === 'frame-grid-2x2') {
    // Grid 2x2 Photocard Bernuansa Vintage Lace Pink
    ctx.fillStyle = '#fff8f2';
    ctx.fillRect(0, 0, fw, fh);

    // Border renda marun
    ctx.strokeStyle = '#6b1426';
    ctx.lineWidth = 8 * scale;
    ctx.strokeRect(40 * scale, 40 * scale, fw - 80 * scale, fh - 80 * scale);

    ctx.strokeStyle = '#ff85a2';
    ctx.lineWidth = 2 * scale;
    ctx.setLineDash([8 * scale, 6 * scale]);
    ctx.strokeRect(55 * scale, 55 * scale, fw - 110 * scale, fh - 110 * scale);
  } else if (frame.id === 'frame-grid-2x3') {
    // Studio Photobooth Sheet (Grid 2x3)
    ctx.fillStyle = '#4a0918';
    ctx.fillRect(0, 0, fw, fh);

    // Border ganda elegan
    ctx.strokeStyle = '#ffd699';
    ctx.lineWidth = 4 * scale;
    ctx.strokeRect(35 * scale, 35 * scale, fw - 70 * scale, fh - 70 * scale);

    ctx.font = `bold ${24 * scale}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = '#ffd699';
    ctx.textAlign = 'center';
    ctx.fillText('✦ MEMORIES OF SWEET 20 ✦', fw / 2, 85 * scale);
  } else if (frame.id === 'frame-polaroid-solo-1') {
    // Grande Solo Polaroid (1 Foto Besar)
    ctx.fillStyle = '#fff9f0';
    ctx.fillRect(0, 0, fw, fh);

    // Bayangan polaroid
    ctx.strokeStyle = 'rgba(107, 20, 38, 0.15)';
    ctx.lineWidth = 3 * scale;
    ctx.strokeRect(30 * scale, 30 * scale, fw - 60 * scale, fh - 60 * scale);
  }

  ctx.restore();
}

/**
 * Menggambar foto ke dalam area slot dengan cover fit (titik tengah pas, tidak melar)
 */
function drawPhotoInSlot(ctx, photo, slot, scale = 1, isMirrored = false) {
  if (!photo) {
    // Gambar slot kosong bernuansa krem dengan ikon kamera
    const sx = slot.x * scale;
    const sy = slot.y * scale;
    const sw = slot.width * scale;
    const sh = slot.height * scale;

    ctx.save();
    ctx.fillStyle = '#fbeee2';
    if (slot.radius) {
      ctx.beginPath();
      ctx.roundRect(sx, sy, sw, sh, slot.radius * scale);
      ctx.fill();
    } else {
      ctx.fillRect(sx, sy, sw, sh);
    }
    ctx.fillStyle = 'rgba(107, 20, 38, 0.35)';
    ctx.font = `bold ${24 * scale}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Foto ${slot.order}`, sx + sw / 2, sy + sh / 2);
    ctx.restore();
    return;
  }

  // Bleed 1.5px memastikan foto sedikit masuk ke bawah border frame,
  // menghilangkan celah garis putih/abu di tepi slot secara sempurna
  const bleed = 1.5 * scale;
  const sx = slot.x * scale;
  const sy = slot.y * scale;
  const sw = slot.width * scale;
  const sh = slot.height * scale;

  ctx.save();

  // Clipping path slot foto
  ctx.beginPath();
  if (slot.radius) {
    ctx.roundRect(sx - bleed, sy - bleed, sw + bleed * 2, sh + bleed * 2, (slot.radius + 1) * scale);
  } else {
    ctx.rect(sx - bleed, sy - bleed, sw + bleed * 2, sh + bleed * 2);
  }
  ctx.clip();

  // Dukung photo baik berupa HTMLCanvasElement maupun objek { canvas, isUpload }
  const imgToDraw = photo.canvas || photo;
  const pw = imgToDraw.width || photo.width || 800;
  const ph = imgToDraw.height || photo.height || 600;
  const photoAspect = pw / ph;
  const slotAspect = sw / sh;

  const targetW = sw + bleed * 2;
  const targetH = sh + bleed * 2;
  const targetX = sx - bleed;
  const targetY = sy - bleed;

  let dw, dh, dx, dy;
  if (photoAspect > slotAspect) {
    // Foto lebih lebar dari slot -> fit tinggi, pusatkan horizontal
    dh = targetH;
    dw = targetH * photoAspect;
    dx = targetX - (dw - targetW) / 2;
    dy = targetY;
  } else {
    // Foto lebih tinggi dari slot -> fit lebar, pusatkan vertikal
    dw = targetW;
    dh = targetW / photoAspect;
    dx = targetX;
    dy = targetY - (dh - targetH) / 2;
  }

  // Handle mirror selfie (Hanya foto kamera depan yang di-mirror, upload galeri tidak)
  const isUpload = Boolean(photo.isUpload || imgToDraw.isUpload);
  if (isMirrored && !isUpload) {
    ctx.translate(dx + dw, dy);
    ctx.scale(-1, 1);
    ctx.drawImage(imgToDraw, 0, 0, dw, dh);
  } else {
    ctx.drawImage(imgToDraw, dx, dy, dw, dh);
  }

  ctx.restore();
}

/**
 * FUNGSI UTAMA KOMPOSIT: renderComposite
 * @param {Object} options
 * @param {HTMLCanvasElement} [options.canvas] - Kanvas target (jika null, dibuat baru)
 * @param {Object} options.frame - Objek frame dari frames.json
 * @param {Array} options.photos - Array foto
 * @param {Array} options.stickers - Array stiker yang diterapkan
 * @param {string} options.filter - ID filter aktif ('normal', 'bw', dll.)
 * @param {string} options.customCaption - Teks ucapan tambahan pengirim
 * @param {string} options.captionFont - Font caption tambahan
 * @param {boolean} options.isMirrored - Apakah foto kamera di-mirror
 * @param {number} [options.targetWidth] - Lebar render yang diinginkan (opsional)
 * @returns {Promise<HTMLCanvasElement>}
 */
export async function renderComposite(options) {
  await ensureFontsLoaded();

  const {
    frame,
    photos = [],
    stickers = [],
    filter = 'normal',
    customCaption = '',
    captionFont = 'script',
    isMirrored = true,
    targetWidth = null
  } = options;

  let scale = 1;
  let canvasW = frame.lebarPx;
  let canvasH = frame.tinggiPx;

  // Resolusi tinggi: jika sisi pendek < 1200 px dan targetWidth belum disetel, skalakan 2x
  const minDim = Math.min(canvasW, canvasH);
  if (!targetWidth && minDim < 1200) {
    scale = Math.ceil(1200 / minDim);
    canvasW *= scale;
    canvasH *= scale;
  } else if (targetWidth) {
    scale = targetWidth / canvasW;
    canvasW = targetWidth;
    canvasH = Math.round(frame.tinggiPx * scale);
  }

  const canvas = options.canvas || document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // --- LAYER 1: Latar Belakang Frame ---
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Jika frame programatik, gambar polanya
  if (frame.isProgrammatic) {
    drawProgrammaticFrame(ctx, frame, scale);
  }

  // --- LAYER 2: Foto-foto di slot ---
  // Buat kanvas sementara khusus foto agar filter bisa diaplikasikan hanya ke foto
  const photosCanvas = document.createElement('canvas');
  photosCanvas.width = canvasW;
  photosCanvas.height = canvasH;
  const photosCtx = photosCanvas.getContext('2d');
  photosCtx.imageSmoothingEnabled = true;
  photosCtx.imageSmoothingQuality = 'high';

  frame.slots.forEach((slot, index) => {
    const photo = photos[index] || null;
    drawPhotoInSlot(photosCtx, photo, slot, scale, isMirrored);
  });

  // Terapkan filter ke kanvas foto
  if (filter && filter !== 'normal') {
    applyFilterToCanvas(photosCanvas, filter);
  }

  // Gambar kanvas foto ke kanvas utama
  ctx.drawImage(photosCanvas, 0, 0);

  // --- LAYER 3: Gambar Frame Artwork (bila ada file referensi) ---
  // Frame PNG memiliki transparansi presisi pixel pada slot foto, sehingga artwork
  // (border, ornamen, tekstur) menutupi tepi foto di Layer 2 dengan sangat rapi dan mulus.
  if (frame.file) {
    const frameImg = await loadImage(frame.file);
    if (frameImg) {
      ctx.drawImage(frameImg, 0, 0, canvasW, canvasH);
    }
  }

  // --- LAYER 4: Tulisan Ucapan Ulang Tahun Alya Diva (WAJIB di Setiap Frame) ---
  drawAutoFitBirthdayText(ctx, frame, scale);

  // --- LAYER 5: Stiker Pengguna ---
  for (const stk of stickers) {
    const stkImg = await loadImage(stk.src);
    if (!stkImg) continue;

    ctx.save();
    const sx = stk.x * scale;
    const sy = stk.y * scale;
    const sw = stk.width * scale;
    const sh = stk.height * scale;

    ctx.translate(sx, sy);
    if (stk.rotation) {
      ctx.rotate((stk.rotation * Math.PI) / 180);
    }

    ctx.drawImage(stkImg, -sw / 2, -sh / 2, sw, sh);
    ctx.restore();
  }

  // --- LAYER 6: Caption Tambahan Pengguna (Opsional) ---
  if (customCaption && customCaption.trim()) {
    ctx.save();
    const capX = canvasW / 2;
    const capY = canvasH - 40 * scale;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.beginPath();
    ctx.roundRect(capX - 220 * scale, capY - 26 * scale, 440 * scale, 44 * scale, 22 * scale);
    ctx.fill();
    ctx.strokeStyle = '#ff85a2';
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    ctx.font = captionFont === 'script' 
      ? `bold ${24 * scale}px "Dancing Script", cursive, sans-serif`
      : `bold ${16 * scale}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = '#6b1426';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(customCaption.trim(), capX, capY - 4 * scale);
    ctx.restore();
  }

  return canvas;
}

export default { renderComposite, loadImage, ensureFontsLoaded };

