/**
 * src/screens/frameSelect.js
 * Layar 1: Pemilihan Frame Photobooth (Halaman Pertama Tanpa Login/Landing Page)
 */

import FRAMES from '../data/frames.json';
import { state } from '../lib/state.js';
import { renderComposite } from '../lib/compositor.js';

export class FrameSelectScreen {
  constructor(containerElement) {
    this.container = containerElement;
    this.lastTapTime = 0;
  }

  async render() {
    this.container.innerHTML = `
      <div class="frame-select-screen">
        <p class="hero-subtext">Pilih frame favoritmu, lalu foto bareng Alya! 🎂💖</p>

        <!-- Grid Kartu Frame Responsif -->
        <div id="frames-grid" class="frames-grid" role="radiogroup" aria-label="Pilihan Frame Photobooth">
          <!-- Kartu-kartu frame akan di-generate di sini -->
        </div>

        <!-- Floating Action Bar Bawah -->
        <div class="frame-select-actions">
          <div class="timer-selector" aria-label="Timer Hitung Mundur">
            <span class="timer-label">⏱️ Timer</span>
            <div class="timer-options">
              <button class="timer-btn ${state.countdownTimer === 3 ? 'active' : ''}" data-seconds="3">3s</button>
              <button class="timer-btn ${state.countdownTimer === 5 ? 'active' : ''}" data-seconds="5">5s</button>
              <button class="timer-btn ${state.countdownTimer === 10 ? 'active' : ''}" data-seconds="10">10s</button>
            </div>
          </div>

          <button id="start-photo-btn" class="btn btn-primary">
            Mulai Foto 📸
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
    await this.renderFrameCards();
  }

  async renderFrameCards() {
    const grid = this.container.querySelector('#frames-grid');
    if (!grid) return;

    grid.innerHTML = '';

    for (const f of FRAMES) {
      const isSelected = f.id === state.selectedFrameId;
      const card = document.createElement('div');
      card.className = `frame-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      card.setAttribute('tabindex', '0');
      card.dataset.frameId = f.id;

      card.innerHTML = `
        <div class="frame-preview-box">
          <canvas id="preview-canvas-${f.id}" class="frame-preview-canvas" aria-label="Preview ${f.nama}"></canvas>
          <div class="selected-badge" aria-hidden="true">💖</div>
        </div>
        <div class="frame-info">
          <span class="frame-name" title="${f.nama}">${f.nama}</span>
          <span class="frame-slots-badge">${f.slots.length} foto</span>
        </div>
      `;

      // Event Klik & Double Tap
      card.addEventListener('click', () => this.handleCardSelect(f.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleCardSelect(f.id);
        }
      });

      grid.appendChild(card);

      // Render thumbnail canvas dengan ucapan ulang tahun bawaan frame
      const canvas = card.querySelector(`#preview-canvas-${f.id}`);
      renderComposite({
        canvas,
        frame: f,
        photos: [],
        stickers: [],
        filter: 'normal',
        targetWidth: 260
      }).catch(console.error);
    }
  }

  handleCardSelect(frameId) {
    const now = Date.now();
    const isDoubleTap = frameId === state.selectedFrameId && (now - this.lastTapTime < 350);
    this.lastTapTime = now;

    state.setSelectedFrame(frameId);

    // Update kelas seleksi di UI kartu
    this.container.querySelectorAll('.frame-card').forEach(c => {
      const isCardSelected = c.dataset.frameId === frameId;
      c.classList.toggle('selected', isCardSelected);
      c.setAttribute('aria-checked', isCardSelected ? 'true' : 'false');
    });

    // Double tap langsung lanjut ke kamera
    if (isDoubleTap) {
      this.startCameraSession();
    }
  }

  bindEvents() {
    // Tombol Mulai Foto
    const startBtn = this.container.querySelector('#start-photo-btn');
    startBtn?.addEventListener('click', () => {
      this.startCameraSession();
    });

    // Pilihan Timer (3s / 5s / 10s)
    this.container.querySelectorAll('.timer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sec = parseInt(e.target.dataset.seconds, 10);
        state.setCountdownTimer(sec);
        this.container.querySelectorAll('.timer-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  startCameraSession() {
    state.setScreen('camera');
  }
}

export default FrameSelectScreen;

