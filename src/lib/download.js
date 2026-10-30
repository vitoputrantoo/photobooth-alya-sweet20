/**
 * src/lib/download.js
 * Manajemen Ekspor Gambar Resolusi Tinggi (PNG & JPG), Penamaan File,
 * Fallback Khusus iOS Safari, & Integrasi Web Share API.
 */

import { renderComposite } from './compositor.js';
import { state } from './state.js';

/**
 * Menghasilkan nama file otomatis sesuai aturan prompt: alya-sweet20-YYYYMMDD-HHmmss.ext
 */
export function generateFilename(extension = 'png') {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const DD = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  return `alya-sweet20-${YYYY}${MM}${DD}-${HH}${mm}${ss}.${extension}`;
}

/**
 * Mendeteksi apakah perangkat menggunakan iOS (iPhone/iPad)
 */
export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Mengunduh blob sebagai file ke penyimpanan pengguna
 */
export function triggerFileDownload(blob, filename) {
  const url = URL.createObjectURL(blob);

  // Jika di iOS Safari dan unduhan otomatis dibatasi, tampilkan modal simpan
  if (isIOS()) {
    showIosSaveModal(url, filename);
    return;
  }

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Bebaskan memori
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

/**
 * Modal bantuan simpan untuk pengguna iOS Safari
 */
export function showIosSaveModal(imageUrl, filename) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">Simpan Foto ke iPhone / iPad 💖</h3>
      <p class="modal-body">
        Tekan dan tahan (long-press) foto di bawah ini, lalu pilih <strong>"Simpan ke Foto"</strong> atau <strong>"Save to Photos"</strong>.
      </p>
      <div style="max-height: 55vh; overflow-y: auto; border-radius: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">
        <img src="${imageUrl}" alt="Alya Diva Sweet 20 Photobooth" style="width: 100%; height: auto; display: block;" />
      </div>
      <div class="modal-actions">
        <button id="close-modal-btn" class="btn btn-secondary btn-sm">Tutup</button>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');
  document.getElementById('close-modal-btn')?.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
  });
}

/**
 * Ekspor Komposisi Photobooth Resolusi Tinggi ke PNG atau JPG
 * @param {'png' | 'jpeg'} format
 * @param {number} quality
 */
export async function exportPhotoboothImage(format = 'png', quality = 0.92) {
  const frame = state.currentFrame;
  const photos = state.capturedPhotos.map(p => p ? p.canvas : null);
  const stickers = state.appliedStickers;
  const filter = state.activeFilter;
  const customCaption = state.customCaption;
  const isMirrored = state.isMirrored;

  // Render komposit resolusi penuh (sisi pendek minimal 1200 px)
  const fullCanvas = await renderComposite({
    frame,
    photos,
    stickers,
    filter,
    customCaption,
    isMirrored,
    targetWidth: null // Otomatis resolusi tinggi
  });

  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const extension = format === 'jpeg' ? 'jpg' : 'png';
  const filename = generateFilename(extension);

  return new Promise((resolve) => {
    fullCanvas.toBlob((blob) => {
      if (blob) {
        triggerFileDownload(blob, filename);
        resolve({ blob, filename, fullCanvas });
      } else {
        resolve(null);
      }
    }, mimeType, quality);
  });
}

/**
 * Berbagi langsung melalui Web Share API bila didukung oleh browser/OS
 */
export async function sharePhotoboothImage() {
  if (!navigator.share) {
    alert('Browser Anda belum mendukung fitur berbagi langsung. Silakan gunakan tombol Download.');
    return;
  }

  const frame = state.currentFrame;
  const photos = state.capturedPhotos.map(p => p ? p.canvas : null);
  const stickers = state.appliedStickers;
  const filter = state.activeFilter;
  const customCaption = state.customCaption;
  const isMirrored = state.isMirrored;

  const fullCanvas = await renderComposite({
    frame,
    photos,
    stickers,
    filter,
    customCaption,
    isMirrored
  });

  fullCanvas.toBlob(async (blob) => {
    if (!blob) return;
    const filename = generateFilename('png');
    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "Alya Diva's Sweet 20 Photobooth ✨",
          text: "Foto kenangan ulang tahun ke-20 Alya Diva! 🎂💖",
          files: [file]
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    } else {
      // Fallback text share
      try {
        await navigator.share({
          title: "Alya Diva's Sweet 20 Photobooth ✨",
          text: "Selamat ulang tahun ke-20 Alya Diva! 🎂💖"
        });
      } catch (e) {
        // ignore
      }
    }
  }, 'image/png');
}

export default { exportPhotoboothImage, sharePhotoboothImage, generateFilename };

