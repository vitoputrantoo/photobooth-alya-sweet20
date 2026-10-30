/**
 * src/lib/state.js
 * Centralized in-memory state store (tanpa localStorage, privasi penuh).
 */

import { FRAMES } from '../data/frames.js';
import ALL_STICKERS from '../data/stickers.js';

class AppState {
  constructor() {
    this.listeners = new Set();
    this.resetAll();
  }

  resetAll() {
    this.currentScreen = 'frame-select'; // 'frame-select' | 'camera' | 'result'
    this.selectedFrameId = FRAMES[0].id;
    this.countdownTimer = 3; // 3, 5, 10
    this.capturedPhotos = new Array(FRAMES[0].slots.length).fill(null); // array of ImageBitmap or HTMLImageElement
    this.currentSlotIndex = 0;
    this.activeFilter = 'normal'; // 'normal' | 'bw' | 'vintage' | 'soft-pink' | 'warm' | 'dreamy'
    this.appliedStickers = [];
    this.stickerHistory = [];
    this.stickerRedoStack = [];
    this.customCaption = '';
    this.captionFont = 'script';
    this.isMirrored = true;
    this.facingMode = 'user'; // 'user' | 'environment'
    this.isAutoModeActive = false;
    this.notify();
  }

  // Subscribe to state changes
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  get currentFrame() {
    return FRAMES.find(f => f.id === this.selectedFrameId) || FRAMES[0];
  }

  setScreen(screen) {
    this.currentScreen = screen;
    this.notify();
  }

  setSelectedFrame(frameId) {
    this.selectedFrameId = frameId;
    // Inisialisasi slot foto kosong
    const frame = this.currentFrame;
    this.capturedPhotos = new Array(frame.slots.length).fill(null);
    this.currentSlotIndex = 0;
    this.notify();
  }

  setCountdownTimer(seconds) {
    this.countdownTimer = seconds;
    this.notify();
  }

  setPhotoForSlot(slotIndex, photoData) {
    if (this.capturedPhotos.length !== this.currentFrame.slots.length) {
      this.capturedPhotos = new Array(this.currentFrame.slots.length).fill(null);
    }
    this.capturedPhotos[slotIndex] = photoData;
    this.notify();
  }

  isAllSlotsFilled() {
    if (!this.capturedPhotos || this.capturedPhotos.length === 0) return false;
    return this.capturedPhotos.length === this.currentFrame.slots.length &&
           this.capturedPhotos.every(p => p !== null);
  }

  setFilter(filterId) {
    this.activeFilter = filterId;
    this.notify();
  }

  setCustomCaption(text) {
    this.customCaption = text;
    this.notify();
  }

  setMirrored(bool) {
    this.isMirrored = bool;
    this.notify();
  }

  // --- Manajemen Stiker dengan Undo / Redo ---
  recordStickerState() {
    this.stickerHistory.push(JSON.stringify(this.appliedStickers));
    if (this.stickerHistory.length > 20) this.stickerHistory.shift();
    this.stickerRedoStack = [];
  }

  addSticker(stickerObj) {
    this.recordStickerState();
    const newSticker = {
      instanceId: 'stk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      ...stickerObj,
      rotation: stickerObj.rotation || 0,
      scale: stickerObj.scale || 1,
      zIndex: this.appliedStickers.length + 1
    };
    this.appliedStickers.push(newSticker);
    this.notify();
    return newSticker;
  }

  updateSticker(instanceId, updates) {
    const stk = this.appliedStickers.find(s => s.instanceId === instanceId);
    if (!stk) return;
    Object.assign(stk, updates);
    this.notify();
  }

  removeSticker(instanceId) {
    this.recordStickerState();
    this.appliedStickers = this.appliedStickers.filter(s => s.instanceId !== instanceId);
    this.notify();
  }

  moveStickerLayer(instanceId, direction) {
    // direction: 'forward' or 'backward'
    const idx = this.appliedStickers.findIndex(s => s.instanceId === instanceId);
    if (idx === -1) return;
    this.recordStickerState();
    if (direction === 'forward' && idx < this.appliedStickers.length - 1) {
      const temp = this.appliedStickers[idx];
      this.appliedStickers[idx] = this.appliedStickers[idx + 1];
      this.appliedStickers[idx + 1] = temp;
    } else if (direction === 'backward' && idx > 0) {
      const temp = this.appliedStickers[idx];
      this.appliedStickers[idx] = this.appliedStickers[idx - 1];
      this.appliedStickers[idx - 1] = temp;
    }
    this.notify();
  }

  undoSticker() {
    if (this.stickerHistory.length === 0) return;
    this.stickerRedoStack.push(JSON.stringify(this.appliedStickers));
    const previous = this.stickerHistory.pop();
    this.appliedStickers = JSON.parse(previous);
    this.notify();
  }

  redoSticker() {
    if (this.stickerRedoStack.length === 0) return;
    this.stickerHistory.push(JSON.stringify(this.appliedStickers));
    const next = this.stickerRedoStack.pop();
    this.appliedStickers = JSON.parse(next);
    this.notify();
  }

  // Auto Hias: Menaburkan stiker acak tapi rapi tanpa menutupi textArea & wajah
  autoDecorate() {
    this.recordStickerState();
    const frame = this.currentFrame;
    const fw = frame.lebarPx;
    const fh = frame.tinggiPx;

    // Pilih 4 sampai 6 stiker manis (kucing, pita, bunga, lilin, sparkle)
    const candidates = ALL_STICKERS.filter(s => 
      ['ultah', 'hati-kilau', 'aesthetic', 'kucing'].includes(s.kategori)
    );
    const chosenCount = 5;
    const newStickers = [];

    // Tentukan zona aman di sekitar sudut & tepi luar yang tidak menabrak textArea
    const safeZones = [
      { x: fw * 0.08, y: fh * 0.08, rot: -10, size: fw * 0.14 },
      { x: fw * 0.88, y: fh * 0.08, rot: 15, size: fw * 0.14 },
      { x: fw * 0.10, y: fh * 0.48, rot: -8, size: fw * 0.12 },
      { x: fw * 0.88, y: fh * 0.52, rot: 12, size: fw * 0.13 },
      { x: fw * 0.84, y: fh * 0.88, rot: -12, size: fw * 0.15 }
    ];

    safeZones.forEach(zone => {
      // Hindari jika dekat dengan textArea
      if (frame.textArea) {
        const tx = frame.textArea.x;
        const ty = frame.textArea.y;
        const tw = frame.textArea.width;
        const th = frame.textArea.height;
        if (zone.x >= tx && zone.x <= tx + tw && zone.y >= ty && zone.y <= ty + th) {
          return;
        }
      }
      const randomSticker = candidates[Math.floor(Math.random() * candidates.length)];
      newStickers.push({
        instanceId: 'stk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        stickerId: randomSticker.id,
        src: randomSticker.src,
        x: zone.x,
        y: zone.y,
        width: zone.size,
        height: zone.size,
        rotation: zone.rot,
        zIndex: this.appliedStickers.length + newStickers.length + 1
      });
    });

    this.appliedStickers.push(...newStickers);
    this.notify();
  }

  // Reset alur
  retakeSameFrame() {
    this.capturedPhotos = new Array(this.currentFrame.slots.length).fill(null);
    this.currentSlotIndex = 0;
    this.setScreen('camera');
  }

  resetTotal() {
    this.resetAll();
  }
}

export const state = new AppState();
export default state;

