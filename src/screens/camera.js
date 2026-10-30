/**
 * src/screens/camera.js
 * Layar 2: Pengambilan Foto Kamera Langsung, Hitung Mundur, Flash,
 * Mode Auto, Retake, Crop Guide Overlay, dan Fallback Upload Galeri.
 */

import { state } from '../lib/state.js';
import { camera } from '../lib/camera.js';

export class CameraScreen {
  constructor(containerElement) {
    this.container = containerElement;
    this.videoElem = null;
    this.isCountingDown = false;
    this.countdownTimerId = null;
    this.autoModeTimerId = null;
  }

  async render() {
    const frame = state.currentFrame;
    const totalSlots = frame.slots.length;
    const currentSlot = state.currentSlotIndex + 1;

    this.container.innerHTML = `
      <div class="camera-screen">
        <!-- Navigasi Atas Kamera -->
        <div class="camera-header-nav">
          <button id="cam-back-btn" class="btn btn-secondary btn-sm" aria-label="Ganti Frame">
            ← Ganti Frame
          </button>
          <div style="font-size: var(--text-sm); font-weight: 700; color: var(--color-primary-burgundy);">
            Foto <span id="slot-num-text">${currentSlot}</span> dari ${totalSlots}
          </div>
          <button id="cam-switch-btn" class="btn btn-secondary btn-icon" title="Putar Kamera" aria-label="Ganti Kamera Depan/Belakang">
            🔄
          </button>
        </div>

        <!-- Viewport Kamera & Overlays -->
        <div class="camera-viewport-card" id="cam-viewport-card">
          <video id="camera-video" class="camera-video" autoplay playsinline muted></video>

          <!-- Overlay Panduan Crop Rasio Slot -->
          <div id="slot-guide-overlay" class="slot-guide-overlay">
            <span class="slot-guide-label" id="guide-slot-name">Slot ${currentSlot}</span>
          </div>

          <!-- Flash Overlay -->
          <div id="camera-flash" class="camera-flash-overlay"></div>

          <!-- Countdown Besar Overlay -->
          <div id="countdown-overlay" class="countdown-overlay hidden">
            <span id="countdown-number" class="countdown-number">3</span>
          </div>
        </div>

        <!-- Bar Progres Slot Miniatur -->
        <div class="slot-progress-container" id="slot-progress-container">
          <!-- Item thumbnail slot -->
        </div>

        <!-- Tombol Aksi Jepret & Auto -->
        <div class="camera-controls-bar">
          <button id="cam-auto-btn" class="btn btn-secondary btn-sm" title="Jepret Otomatis Semua Slot">
            ⚡ Auto
          </button>

          <button id="cam-shutter-btn" class="shutter-btn" title="Ambil Foto Sekarang" aria-label="Jepret Foto">
            <div class="shutter-btn-inner"></div>
          </button>

          <button id="cam-retake-btn" class="btn btn-secondary btn-sm" title="Ulangi Foto Terakhir">
            ↺ Ulang
          </button>
        </div>

        <!-- Tombol Bantuan Upload Galeri Cadangan -->
        <div style="margin-top: 4px;">
          <button id="trigger-gallery-btn" class="btn btn-secondary btn-sm" style="font-size: 12px; opacity: 0.85;">
            📁 Upload dari Galeri
          </button>
        </div>
      </div>
    `;

    this.videoElem = this.container.querySelector('#camera-video');
    this.updateSlotProgressUI();
    this.updateGuideOverlay();
    this.bindEvents();

    // Jalankan stream kamera
    await this.initCameraStream();
  }

  async initCameraStream() {
    try {
      await camera.startCamera(this.videoElem, state.facingMode);
      this.updateGuideOverlay();
    } catch (err) {
      this.showCameraError(err);
    }
  }

  showCameraError(err) {
    const errorInfo = camera.getFriendlyErrorMessage(err);
    const viewport = this.container.querySelector('#cam-viewport-card');
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="camera-error-box">
        <h3 style="color: var(--color-primary-burgundy); font-size: 16px; font-weight: bold;">
          ${errorInfo.title}
        </h3>
        <p style="font-size: 13px; color: var(--color-text-main); line-height: 1.5;">
          ${errorInfo.message}
        </p>
        <div style="display: flex; gap: 8px; justify-content: center; margin-top: 6px;">
          <button id="retry-camera-btn" class="btn btn-primary btn-sm">Coba Lagi 🔄</button>
          <button id="error-upload-btn" class="btn btn-secondary btn-sm">Upload Foto 📁</button>
        </div>
      </div>
    `;

    this.container.querySelector('#retry-camera-btn')?.addEventListener('click', () => {
      this.render();
    });
    this.container.querySelector('#error-upload-btn')?.addEventListener('click', () => {
      document.getElementById('gallery-file-input')?.click();
    });
  }

  updateGuideOverlay() {
    const overlay = this.container.querySelector('#slot-guide-overlay');
    const label = this.container.querySelector('#guide-slot-name');
    if (!overlay || !label) return;

    const frame = state.currentFrame;
    const slot = frame.slots[state.currentSlotIndex];
    if (!slot) return;

    const card = this.container.querySelector('#cam-viewport-card');
    const rect = card ? card.getBoundingClientRect() : null;
    const viewportW = rect?.width || 340;
    const viewportH = rect?.height || 440;

    const slotAspect = slot.width / slot.height;

    let guideW, guideH;
    if (slotAspect > (viewportW / viewportH)) {
      guideW = Math.min(viewportW * 0.86, 340);
      guideH = guideW / slotAspect;
    } else {
      guideH = Math.min(viewportH * 0.78, 380);
      guideW = guideH * slotAspect;
    }

    overlay.style.width = `${Math.round(guideW)}px`;
    overlay.style.height = `${Math.round(guideH)}px`;
    label.textContent = `Slot ${slot.order} (${slot.width}x${slot.height})`;
  }

  updateSlotProgressUI() {
    const container = this.container.querySelector('#slot-progress-container');
    if (!container) return;

    const frame = state.currentFrame;
    container.innerHTML = '';

    frame.slots.forEach((slot, index) => {
      const photo = state.capturedPhotos[index];
      const item = document.createElement('div');
      item.className = `slot-progress-item ${photo ? 'filled' : 'empty'} ${index === state.currentSlotIndex ? 'active' : ''}`;
      item.title = `Slot ${slot.order}: ${photo ? 'Terisi (Klik untuk Retake)' : 'Menunggu foto'}`;

      if (photo && photo.canvas) {
        const thumb = document.createElement('img');
        thumb.src = photo.canvas.toDataURL('image/jpeg', 0.6);
        thumb.alt = `Slot ${slot.order}`;
        item.appendChild(thumb);
      } else {
        item.textContent = `${slot.order}`;
      }

      item.addEventListener('click', () => {
        state.currentSlotIndex = index;
        this.updateSlotProgressUI();
        this.updateGuideOverlay();
        const numText = this.container.querySelector('#slot-num-text');
        if (numText) numText.textContent = `${index + 1}`;
      });

      container.appendChild(item);
    });
  }

  computeCropForCurrentSlot() {
    if (!this.videoElem || !this.videoElem.videoWidth) return null;

    const card = this.container.querySelector('#cam-viewport-card');
    const overlay = this.container.querySelector('#slot-guide-overlay');
    if (!card || !overlay) return null;

    const cardRect = card.getBoundingClientRect();
    const guideRect = overlay.getBoundingClientRect();

    const V_w = cardRect.width;
    const V_h = cardRect.height;
    const W_vid = this.videoElem.videoWidth;
    const H_vid = this.videoElem.videoHeight;

    // object-fit: cover scaling
    const scale = Math.max(V_w / W_vid, V_h / H_vid);
    const W_rend = W_vid * scale;
    const H_rend = H_vid * scale;

    const offsetX = (V_w - W_rend) / 2;
    const offsetY = (V_h - H_rend) / 2;

    const guideLeft = guideRect.left - cardRect.left;
    const guideTop = guideRect.top - cardRect.top;
    const guideW = guideRect.width;
    const guideH = guideRect.height;

    const relLeft = guideLeft - offsetX;
    const relTop = guideTop - offsetY;

    let srcX = relLeft / scale;
    const srcY = Math.max(0, relTop / scale);
    const srcW = Math.min(W_vid, guideW / scale);
    const srcH = Math.min(H_vid, guideH / scale);

    // If facingMode is user (mirrored horizontally):
    if (state.facingMode === 'user') {
      srcX = W_vid - (srcX + srcW);
    }

    srcX = Math.max(0, Math.min(W_vid - srcW, srcX));

    return {
      x: srcX,
      y: srcY,
      width: srcW,
      height: srcH
    };
  }

  async triggerShutter() {
    if (this.isCountingDown) return;
    this.isCountingDown = true;

    const seconds = state.countdownTimer || 3;
    await this.runCountdown(seconds);

    // Flash putih
    this.flashEffect();

    // Ambil gambar dengan crop presisi sesuai panduan slot di layar
    try {
      const cropRect = this.computeCropForCurrentSlot();
      const snapshot = camera.captureSnapshot(cropRect);
      state.setPhotoForSlot(state.currentSlotIndex, snapshot);

      // Cari slot berikutnya yang masih kosong
      const nextEmptySlot = state.capturedPhotos.findIndex(p => p === null);
      if (nextEmptySlot !== -1) {
        state.currentSlotIndex = nextEmptySlot;
        this.updateSlotProgressUI();
        this.updateGuideOverlay();
        const numText = this.container.querySelector('#slot-num-text');
        if (numText) numText.textContent = `${state.currentSlotIndex + 1}`;

        // Jika mode auto masih aktif, lanjut ke jepretan berikutnya
        if (state.isAutoModeActive) {
          setTimeout(() => {
            if (state.isAutoModeActive && state.currentScreen === 'camera') {
              this.triggerShutter();
            }
          }, 1200);
        }
      } else {
        // Semua slot sudah terisi! Lanjut ke Layar 3
        state.isAutoModeActive = false;
        this.cleanup();
        state.setScreen('result');
      }
    } catch (e) {
      console.warn('Gagal jepret:', e);
    } finally {
      this.isCountingDown = false;
    }
  }

  runCountdown(seconds) {
    const overlay = this.container.querySelector('#countdown-overlay');
    const numberElem = this.container.querySelector('#countdown-number');
    if (!overlay || !numberElem) return Promise.resolve();

    overlay.classList.remove('hidden');

    return new Promise(resolve => {
      let remaining = seconds;
      numberElem.textContent = `${remaining}`;

      this.countdownTimerId = setInterval(() => {
        remaining--;
        if (remaining > 0) {
          numberElem.textContent = `${remaining}`;
        } else {
          clearInterval(this.countdownTimerId);
          this.countdownTimerId = null;
          numberElem.textContent = '📸';
          setTimeout(() => {
            overlay.classList.add('hidden');
            resolve();
          }, 400);
        }
      }, 1000);
    });
  }

  flashEffect() {
    const flash = this.container.querySelector('#camera-flash');
    if (!flash) return;
    flash.classList.remove('flashing');
    void flash.offsetWidth; // trigger reflow
    flash.classList.add('flashing');
  }

  bindEvents() {
    // Tombol Shutter Jepret
    const shutterBtn = this.container.querySelector('#cam-shutter-btn');
    shutterBtn?.addEventListener('click', () => {
      this.triggerShutter();
    });

    // Tombol Mode Auto
    const autoBtn = this.container.querySelector('#cam-auto-btn');
    autoBtn?.addEventListener('click', () => {
      if (state.isAutoModeActive) {
        state.isAutoModeActive = false;
        autoBtn.textContent = '⚡ Auto';
        autoBtn.classList.remove('btn-primary');
        autoBtn.classList.add('btn-secondary');
      } else {
        state.isAutoModeActive = true;
        autoBtn.textContent = '⏹ Batal Auto';
        autoBtn.classList.remove('btn-secondary');
        autoBtn.classList.add('btn-primary');
        this.triggerShutter();
      }
    });

    // Tombol Putar Kamera Depan/Belakang
    const switchBtn = this.container.querySelector('#cam-switch-btn');
    switchBtn?.addEventListener('click', async () => {
      state.facingMode = state.facingMode === 'user' ? 'environment' : 'user';
      if (this.videoElem) {
        this.videoElem.style.transform = state.facingMode === 'user' ? 'scaleX(-1)' : 'none';
      }
      await this.initCameraStream();
    });

    // Tombol Retake Foto Terakhir
    const retakeBtn = this.container.querySelector('#cam-retake-btn');
    retakeBtn?.addEventListener('click', () => {
      let targetSlot = state.currentSlotIndex;
      if (state.capturedPhotos[targetSlot] === null && targetSlot > 0) {
        targetSlot--;
      }
      state.capturedPhotos[targetSlot] = null;
      state.currentSlotIndex = targetSlot;
      this.updateSlotProgressUI();
      this.updateGuideOverlay();
      const numText = this.container.querySelector('#slot-num-text');
      if (numText) numText.textContent = `${targetSlot + 1}`;
    });

    // Tombol Kembali ke Pilih Frame
    const backBtn = this.container.querySelector('#cam-back-btn');
    backBtn?.addEventListener('click', () => {
      const hasPhotos = state.capturedPhotos.some(p => p !== null);
      if (hasPhotos) {
        if (!confirm('Foto yang sudah diambil di frame ini akan direset. Yakin ingin ganti frame?')) {
          return;
        }
      }
      this.cleanup();
      state.setScreen('frame-select');
    });

    // Tombol Upload dari Galeri
    const galleryBtn = this.container.querySelector('#trigger-gallery-btn');
    const fileInput = document.getElementById('gallery-file-input');

    galleryBtn?.addEventListener('click', () => {
      fileInput?.click();
    });

    if (fileInput) {
      fileInput.onchange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
          const photoObj = await camera.processUploadedFile(file);
          state.setPhotoForSlot(state.currentSlotIndex, photoObj);

          const nextEmpty = state.capturedPhotos.findIndex(p => p === null);
          if (nextEmpty !== -1) {
            state.currentSlotIndex = nextEmpty;
            this.updateSlotProgressUI();
            this.updateGuideOverlay();
          } else {
            this.cleanup();
            state.setScreen('result');
          }
        } catch (err) {
          alert(err.message || 'Gagal mengunggah foto.');
        } finally {
          fileInput.value = ''; // Reset input file
        }
      };
    }
  }

  cleanup() {
    if (this.countdownTimerId) {
      clearInterval(this.countdownTimerId);
      this.countdownTimerId = null;
    }
    camera.stopCamera();
  }
}

export default CameraScreen;

