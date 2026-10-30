/**
 * src/screens/result.js
 * Layar 3: Pratinjau Komposisi Akhir, Filter Foto, Panel Stiker,
 * Auto Hias, Caption Tambahan, Undo/Redo, dan Unduh PNG/JPG Resolusi Tinggi.
 */

import { state } from '../lib/state.js';
import { renderComposite, resolveAssetPath } from '../lib/compositor.js';
import { FILTERS } from '../lib/filters.js';
import { ALL_STICKERS, STICKER_CATEGORIES } from '../data/stickers.js';
import { StickerEditor } from '../lib/stickerEditor.js';
import { exportPhotoboothImage, sharePhotoboothImage } from '../lib/download.js';

export class ResultScreen {
  constructor(containerElement) {
    this.container = containerElement;
    this.canvasElem = null;
    this.stickerEditor = null;
    this.activeStickerCategory = 'all';
    this.isDownloading = false;
  }

  async render() {
    this.container.innerHTML = `
      <div class="result-screen">
        <!-- Kanvas Pratinjau Komposisi & DOM Overlay Stiker -->
        <div class="result-canvas-container" id="result-canvas-container">
          <canvas id="result-canvas" class="result-canvas"></canvas>
          <div id="sticker-overlay" class="sticker-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></div>
        </div>

        <!-- Toolbar Filter Foto -->
        <div class="filter-toolbar" role="radiogroup" aria-label="Filter Foto">
          ${FILTERS.map(f => `
            <button class="filter-btn ${state.activeFilter === f.id ? 'active' : ''}" data-filter="${f.id}" title="${f.desc}">
              <div class="filter-swatch" style="background: ${f.swatch};"></div>
              <span>${f.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Toolbar Aksi Editor: Auto Hias, Undo, Redo, Mirror Toggle -->
        <div class="editor-toolbar">
          <button id="btn-auto-decorate" class="btn btn-secondary btn-sm" title="Taburkan stiker manis secara rapi">
            ✨ Auto Hias
          </button>
          <button id="btn-undo-sticker" class="btn btn-secondary btn-sm" title="Undo aksi stiker">
            ↩ Undo
          </button>
          <button id="btn-redo-sticker" class="btn btn-secondary btn-sm" title="Redo aksi stiker">
            ↪ Redo
          </button>
          <button id="btn-toggle-mirror" class="btn btn-secondary btn-sm" title="Toggle Mirror Foto">
            🪞 Mirror: ${state.isMirrored ? 'On' : 'Off'}
          </button>
        </div>

        <!-- Input Caption Tambahan (Opsional) -->
        <div class="caption-input-box">
          <span style="font-size: 14px;">✍️</span>
          <input type="text" id="custom-caption-input" class="caption-input" 
                 placeholder="Tulis pesan/namamu (mis. dari: Rina)" 
                 value="${state.customCaption || ''}" maxlength="35" />
          <button id="btn-toggle-caption-font" class="btn btn-secondary btn-sm" style="padding: 4px 8px; font-size: 11px;">
            Font: ${state.captionFont === 'script' ? 'Cursive' : 'Sans'}
          </button>
        </div>

        <!-- Panel Drawer Stiker dengan Kategori -->
        <div class="sticker-drawer">
          <div class="sticker-category-tabs">
            ${STICKER_CATEGORIES.map(cat => `
              <button class="tab-btn ${this.activeStickerCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.nama}
              </button>
            `).join('')}
          </div>

          <div id="stickers-grid" class="stickers-grid">
            <!-- Thumbnail stiker akan dimuat di sini -->
          </div>
        </div>

        <!-- Tombol Download & Berbagi -->
        <div class="download-actions-card">
          <div class="download-primary-row">
            <button id="btn-download-png" class="btn btn-primary" style="font-size: 18px; padding: 14px 32px;">
              Download 💖 (PNG)
            </button>
            <button id="btn-download-jpg" class="btn btn-secondary" title="Download versi JPG lebih ringan">
              JPG (Kecil)
            </button>
          </div>

          <div class="download-secondary-row">
            <button id="btn-share" class="btn btn-secondary btn-sm">
              📤 Bagikan
            </button>
            <button id="btn-retake-same" class="btn btn-secondary btn-sm">
              ↺ Ulangi Foto
            </button>
            <button id="btn-restart-all" class="btn btn-secondary btn-sm" style="color: #c92a2a;">
              🏠 Foto Lagi (Awal)
            </button>
          </div>
        </div>
      </div>
    `;

    this.canvasElem = this.container.querySelector('#result-canvas');
    const overlayElem = this.container.querySelector('#sticker-overlay');

    // Inisialisasi Sticker Editor
    this.stickerEditor = new StickerEditor(overlayElem, () => {
      return this.canvasElem ? this.canvasElem.getBoundingClientRect() : null;
    });

    this.bindEvents();
    this.renderStickerGrid();
    await this.updateCanvasPreview();
  }

  async updateCanvasPreview() {
    if (!this.canvasElem) return;

    const frame = state.currentFrame;
    const photos = state.capturedPhotos.map(p => p ? p.canvas : null);
    const filter = state.activeFilter;
    const customCaption = state.customCaption;
    const captionFont = state.captionFont;
    const isMirrored = state.isMirrored;

    // Untuk preview layar interaktif, jangan gambar stiker di canvas, melainkan biarkan DOM overlay menanganinya
    // sehingga stiker bisa digeser-geser secara real-time!
    await renderComposite({
      canvas: this.canvasElem,
      frame,
      photos,
      stickers: [], // Stiker dirender via DOM overlay di Layar 3
      filter,
      customCaption,
      captionFont,
      isMirrored,
      targetWidth: 460
    });

    this.stickerEditor.render();
  }

  renderStickerGrid() {
    const grid = this.container.querySelector('#stickers-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = this.activeStickerCategory === 'all'
      ? ALL_STICKERS
      : ALL_STICKERS.filter(s => s.kategori === this.activeStickerCategory);

    filtered.forEach(stk => {
      const btn = document.createElement('button');
      btn.className = 'sticker-thumb-btn';
      btn.title = `Tambah stiker: ${stk.nama}`;
      const resolvedSrc = resolveAssetPath(stk.src);
      btn.innerHTML = `<img src="${resolvedSrc}" alt="${stk.nama}" loading="lazy" />`;

      btn.addEventListener('click', () => {
        // Taruh stiker di tengah kanvas
        const frame = state.currentFrame;
        const newStk = state.addSticker({
          stickerId: stk.id,
          src: resolvedSrc,
          x: frame.lebarPx / 2,
          y: frame.tinggiPx / 2,
          width: frame.lebarPx * 0.18,
          height: frame.lebarPx * 0.18,
          rotation: Math.round((Math.random() - 0.5) * 20)
        });
        this.stickerEditor.setSelected(newStk.instanceId);
      });

      grid.appendChild(btn);
    });
  }

  bindEvents() {
    // 1. Filter Switcher
    this.container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const targetBtn = e.target.closest('.filter-btn');
        const filterId = targetBtn.dataset.filter;
        state.setFilter(filterId);
        this.container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        await this.updateCanvasPreview();
      });
    });

    // 2. Tab Kategori Stiker
    this.container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.target.dataset.cat;
        this.activeStickerCategory = cat;
        this.container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.renderStickerGrid();
      });
    });

    // 3. Tombol Auto Hias
    const autoHiasBtn = this.container.querySelector('#btn-auto-decorate');
    autoHiasBtn?.addEventListener('click', () => {
      state.autoDecorate();
      this.stickerEditor.render();
    });

    // 4. Undo & Redo Stiker
    this.container.querySelector('#btn-undo-sticker')?.addEventListener('click', () => {
      state.undoSticker();
      this.stickerEditor.render();
    });
    this.container.querySelector('#btn-redo-sticker')?.addEventListener('click', () => {
      state.redoSticker();
      this.stickerEditor.render();
    });

    // 5. Toggle Mirror Foto
    const mirrorBtn = this.container.querySelector('#btn-toggle-mirror');
    mirrorBtn?.addEventListener('click', async () => {
      state.setMirrored(!state.isMirrored);
      mirrorBtn.textContent = `🪞 Mirror: ${state.isMirrored ? 'On' : 'Off'}`;
      await this.updateCanvasPreview();
    });

    // 6. Custom Caption Input
    const captionInput = this.container.querySelector('#custom-caption-input');
    captionInput?.addEventListener('input', async (e) => {
      state.setCustomCaption(e.target.value);
      await this.updateCanvasPreview();
    });

    // Toggle Font Caption
    const fontBtn = this.container.querySelector('#btn-toggle-caption-font');
    fontBtn?.addEventListener('click', async () => {
      state.captionFont = state.captionFont === 'script' ? 'sans' : 'script';
      fontBtn.textContent = `Font: ${state.captionFont === 'script' ? 'Cursive' : 'Sans'}`;
      await this.updateCanvasPreview();
    });

    // 7. Download PNG (Utama)
    const dlPngBtn = this.container.querySelector('#btn-download-png');
    dlPngBtn?.addEventListener('click', async () => {
      if (this.isDownloading) return;
      this.isDownloading = true;
      dlPngBtn.textContent = 'Menyiapkan Foto ⏳...';
      try {
        await exportPhotoboothImage('png');
      } catch (err) {
        alert('Gagal mendownload gambar.');
      } finally {
        dlPngBtn.textContent = 'Download 💖 (PNG)';
        this.isDownloading = false;
      }
    });

    // 8. Download JPG (Sekunder)
    const dlJpgBtn = this.container.querySelector('#btn-download-jpg');
    dlJpgBtn?.addEventListener('click', async () => {
      if (this.isDownloading) return;
      this.isDownloading = true;
      dlJpgBtn.textContent = '⏳...';
      try {
        await exportPhotoboothImage('jpeg', 0.92);
      } catch (err) {
        alert('Gagal mendownload gambar JPG.');
      } finally {
        dlJpgBtn.textContent = 'JPG (Kecil)';
        this.isDownloading = false;
      }
    });

    // 9. Tombol Berbagi (Web Share API)
    this.container.querySelector('#btn-share')?.addEventListener('click', () => {
      sharePhotoboothImage();
    });

    // 10. Ulangi Foto (Frame Sama)
    this.container.querySelector('#btn-retake-same')?.addEventListener('click', () => {
      if (confirm('Ulangi sesi foto dengan frame yang sama? Foto saat ini akan diganti.')) {
        state.retakeSameFrame();
      }
    });

    // 11. Foto Lagi (Reset Total ke Layar 1)
    this.container.querySelector('#btn-restart-all')?.addEventListener('click', () => {
      if (confirm('Mulai sesi foto baru dari awal? Semua foto dan hiasan akan direset.')) {
        state.resetTotal();
      }
    });
  }
}

export default ResultScreen;

