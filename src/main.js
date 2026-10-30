/**
 * src/main.js
 * Titik Masuk Utama Aplikasi Photobooth Alya Diva's Sweet 20
 */

import { state } from './lib/state.js';
import { ensureFontsLoaded } from './lib/compositor.js';
import { FrameSelectScreen } from './screens/frameSelect.js';
import { CameraScreen } from './screens/camera.js';
import { ResultScreen } from './screens/result.js';

// Setup dekorasi melayang di latar belakang (Sparkles, Hearts, Stars, 20)
function initFloatingBackground() {
  const bg = document.getElementById('floating-bg');
  if (!bg) return;

  const items = [
    { text: '✨', size: '20px', left: '8%', top: '15%', delay: '0s' },
    { text: '💖', size: '24px', left: '90%', top: '22%', delay: '1.2s' },
    { text: '🎂', size: '22px', left: '12%', top: '65%', delay: '2.5s' },
    { text: '🎀', size: '24px', left: '86%', top: '75%', delay: '0.8s' },
    { text: '⭐', size: '18px', left: '75%', top: '10%', delay: '1.8s' },
    { text: '20', size: '22px', left: '4%', top: '42%', delay: '3.1s', isBold: true },
    { text: '🌸', size: '20px', left: '92%', top: '50%', delay: '2.0s' }
  ];

  items.forEach(it => {
    const el = document.createElement('div');
    el.className = 'float-item';
    el.textContent = it.text;
    el.style.left = it.left;
    el.style.top = it.top;
    el.style.fontSize = it.size;
    el.style.animationDelay = it.delay;
    if (it.isBold) {
      el.style.fontWeight = '900';
      el.style.color = 'var(--color-primary-burgundy)';
    }
    bg.appendChild(el);
  });
}

// Router & State Controller
class PhotoboothApp {
  constructor() {
    this.screenFrameSelect = document.getElementById('screen-frame-select');
    this.screenCamera = document.getElementById('screen-camera');
    this.screenResult = document.getElementById('screen-result');

    this.frameSelectController = new FrameSelectScreen(this.screenFrameSelect);
    this.cameraController = new CameraScreen(this.screenCamera);
    this.resultController = new ResultScreen(this.screenResult);

    this.currentController = null;
  }

  async init() {
    initFloatingBackground();
    await ensureFontsLoaded();

    // Subscribe ke perubahan state layar
    state.subscribe((s) => {
      this.handleScreenTransition(s.currentScreen);
    });

    // Layar Pertama: Langsung tampilkan Pilih Frame (tanpa landing/login)
    this.handleScreenTransition('frame-select');
  }

  async handleScreenTransition(screenName) {
    // Sembunyikan semua layar
    this.screenFrameSelect.classList.remove('active');
    this.screenCamera.classList.remove('active');
    this.screenResult.classList.remove('active');

    // Update Navigasi Stepper
    this.updateStepper(screenName);

    // Hentikan aktivitas layar sebelumnya (mis. matikan streaming kamera)
    if (this.currentController && typeof this.currentController.cleanup === 'function') {
      this.currentController.cleanup();
    }

    if (screenName === 'frame-select') {
      this.screenFrameSelect.classList.add('active');
      this.currentController = this.frameSelectController;
      await this.frameSelectController.render();
    } else if (screenName === 'camera') {
      this.screenCamera.classList.add('active');
      this.currentController = this.cameraController;
      await this.cameraController.render();
    } else if (screenName === 'result') {
      this.screenResult.classList.add('active');
      this.currentController = this.resultController;
      await this.resultController.render();
    }

    // Scroll mulus ke atas saat ganti layar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateStepper(screenName) {
    const steps = document.querySelectorAll('.step-item');
    steps.forEach(s => s.classList.remove('active'));

    if (screenName === 'frame-select') {
      steps[0]?.classList.add('active');
    } else if (screenName === 'camera') {
      steps[0]?.classList.add('active');
      steps[1]?.classList.add('active');
    } else if (screenName === 'result') {
      steps[0]?.classList.add('active');
      steps[1]?.classList.add('active');
      steps[2]?.classList.add('active');
    }
  }
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  const app = new PhotoboothApp();
  app.init().catch(console.error);
});

