/**
 * src/lib/stickerEditor.js
 * Editor Interaktif Stiker: Geser (Drag), Resize, Putar (Rotate), Hapus, Layer Order
 * Mendukung Mouse Desktop dan Sentuhan Multi-touch / Pinch Mobile 60 FPS
 */

import { state } from './state.js';
import { resolveAssetPath } from './compositor.js';

export class StickerEditor {
  constructor(containerElement, getCanvasRect) {
    this.container = containerElement; // DOM overlay di atas canvas
    this.getCanvasRect = getCanvasRect;
    this.selectedInstanceId = null;
    this.isDragging = false;
    this.isTransforming = false;
    this.activeHandle = null; // 'resize' | 'rotate'
    this.initialPointer = { x: 0, y: 0 };
    this.initialSticker = null;

    // Pelacakan multi-touch mobile
    this.activePointers = new Map();
    this.initialPinchDistance = 0;
    this.initialPinchAngle = 0;

    this.initEventListeners();
  }

  initEventListeners() {
    this.container.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('pointermove', this.onPointerMove.bind(this), { passive: false });
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
    window.addEventListener('pointercancel', this.onPointerUp.bind(this));

    // Handle resize window / orientation change
    window.addEventListener('resize', () => {
      this.render();
    });
  }

  setSelected(instanceId) {
    this.selectedInstanceId = instanceId;
    this.render();
  }

  deselect() {
    this.selectedInstanceId = null;
    this.render();
  }

  onPointerDown(e) {
    this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Cek apakah klik pada handle
    const handle = e.target.closest('[data-handle]');
    const stickerElem = e.target.closest('[data-instance-id]');

    if (handle) {
      e.stopPropagation();
      e.preventDefault();
      const instanceId = handle.closest('[data-instance-id]').dataset.instanceId;
      this.selectedInstanceId = instanceId;
      this.isTransforming = true;
      this.activeHandle = handle.dataset.handle;
      this.initialPointer = { x: e.clientX, y: e.clientY };
      const current = state.appliedStickers.find(s => s.instanceId === instanceId);
      this.initialSticker = current ? { ...current } : null;
      try {
        handle.setPointerCapture(e.pointerId);
      } catch (err) {}
      return;
    }

    if (stickerElem) {
      e.stopPropagation();
      const instanceId = stickerElem.dataset.instanceId;
      const current = state.appliedStickers.find(s => s.instanceId === instanceId);
      this.initialSticker = current ? { ...current } : null;

      // Jika multi-touch (2 jari) untuk pinch & rotate pada stiker terpilih
      if (this.activePointers.size === 2 && this.selectedInstanceId === instanceId) {
        const pts = Array.from(this.activePointers.values());
        this.initialPinchDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        this.initialPinchAngle = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x);
        return;
      }

      this.selectedInstanceId = instanceId;
      this.isDragging = true;
      this.initialPointer = { x: e.clientX, y: e.clientY };
      try {
        stickerElem.setPointerCapture(e.pointerId);
      } catch (err) {}
      this.render();
      return;
    }

    // Klik di area kanvas kosong membatalkan seleksi
    this.deselect();
  }

  onPointerMove(e) {
    if (this.activePointers.has(e.pointerId)) {
      this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (!this.selectedInstanceId) return;

    const canvasRect = this.getCanvasRect();
    if (!canvasRect || !canvasRect.width) return;
    const scaleRatio = state.currentFrame.lebarPx / canvasRect.width;

    const currentSticker = state.appliedStickers.find(s => s.instanceId === this.selectedInstanceId);
    if (!currentSticker) return;

    // Handle Multi-Touch (Pinch Zoom & Two-Finger Rotate)
    if (this.activePointers.size >= 2 && this.initialSticker) {
      e.preventDefault();
      const pts = Array.from(this.activePointers.values());
      const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const currentAngle = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x);

      if (this.initialPinchDistance > 10) {
        const scaleChange = currentDist / this.initialPinchDistance;
        const angleDiffDeg = ((currentAngle - this.initialPinchAngle) * 180) / Math.PI;

        currentSticker.width = Math.max(30, this.initialSticker.width * scaleChange);
        currentSticker.height = Math.max(30, this.initialSticker.height * scaleChange);
        currentSticker.rotation = Math.round((this.initialSticker.rotation || 0) + angleDiffDeg);
        this.updateDomElement(currentSticker, canvasRect);
      }
      return;
    }

    // Handle Drag Single Finger / Mouse
    if (this.isDragging && this.initialSticker) {
      e.preventDefault();
      const dx = (e.clientX - this.initialPointer.x) * scaleRatio;
      const dy = (e.clientY - this.initialPointer.y) * scaleRatio;

      currentSticker.x = this.initialSticker.x + dx;
      currentSticker.y = this.initialSticker.y + dy;
      this.updateDomElement(currentSticker, canvasRect);
    } 
    // Handle Corner Resize or Rotate
    else if (this.isTransforming && this.initialSticker) {
      e.preventDefault();
      const dx = (e.clientX - this.initialPointer.x) * scaleRatio;
      const dy = (e.clientY - this.initialPointer.y) * scaleRatio;

      if (this.activeHandle === 'resize') {
        const newWidth = Math.max(30, this.initialSticker.width + dx);
        const newHeight = Math.max(30, this.initialSticker.height + dy);
        currentSticker.width = newWidth;
        currentSticker.height = newHeight;
        this.updateDomElement(currentSticker, canvasRect);
      } else if (this.activeHandle === 'rotate') {
        const scale = canvasRect.width / state.currentFrame.lebarPx;
        const stickerScreenX = canvasRect.left + (this.initialSticker.x * scale);
        const stickerScreenY = canvasRect.top + (this.initialSticker.y * scale);
        const rad = Math.atan2(e.clientY - stickerScreenY, e.clientX - stickerScreenX);
        const deg = (rad * 180) / Math.PI;
        currentSticker.rotation = Math.round(deg);
        this.updateDomElement(currentSticker, canvasRect);
      }
    }
  }

  onPointerUp(e) {
    if (e && e.pointerId) {
      this.activePointers.delete(e.pointerId);
    } else {
      this.activePointers.clear();
    }

    if (this.isDragging || this.isTransforming) {
      state.recordStickerState();
    }
    this.isDragging = false;
    this.isTransforming = false;
    this.activeHandle = null;
    this.initialSticker = null;
    this.initialPinchDistance = 0;
  }

  /**
   * Pembaruan DOM langsung berkinerja tinggi tanpa destroy-recreate
   */
  updateDomElement(stk, canvasRect) {
    const elem = this.container.querySelector(`[data-instance-id="${stk.instanceId}"]`);
    if (!elem) return;

    const frameW = state.currentFrame.lebarPx;
    const scale = canvasRect.width / frameW;

    const screenX = stk.x * scale;
    const screenY = stk.y * scale;
    const screenW = stk.width * scale;
    const screenH = stk.height * scale;

    elem.style.left = `${screenX}px`;
    elem.style.top = `${screenY}px`;
    elem.style.width = `${screenW}px`;
    elem.style.height = `${screenH}px`;
    elem.style.transform = `translate(-50%, -50%) rotate(${stk.rotation || 0}deg)`;
  }

  /**
   * Render seluruh struktur DOM stiker di atas canvas
   */
  render() {
    const canvasRect = this.getCanvasRect();
    if (!canvasRect || !canvasRect.width) return;

    const frameW = state.currentFrame.lebarPx;
    const scale = canvasRect.width / frameW;

    this.container.innerHTML = '';

    state.appliedStickers.forEach(stk => {
      const isSelected = stk.instanceId === this.selectedInstanceId;
      const elem = document.createElement('div');
      elem.className = `sticker-dom-item ${isSelected ? 'selected' : ''}`;
      elem.dataset.instanceId = stk.instanceId;

      const screenX = stk.x * scale;
      const screenY = stk.y * scale;
      const screenW = stk.width * scale;
      const screenH = stk.height * scale;

      elem.style.cssText = `
        position: absolute;
        left: ${screenX}px;
        top: ${screenY}px;
        width: ${screenW}px;
        height: ${screenH}px;
        transform: translate(-50%, -50%) rotate(${stk.rotation || 0}deg);
        z-index: ${stk.zIndex || 1};
        pointer-events: auto;
        cursor: grab;
        touch-action: none;
      `;

      const img = document.createElement('img');
      img.src = resolveAssetPath(stk.src);
      img.style.cssText = 'width: 100%; height: 100%; object-fit: contain; pointer-events: none; user-select: none;';
      elem.appendChild(img);

      if (isSelected) {
        elem.style.cursor = 'grabbing';
        elem.style.outline = '2px dashed #ff4d6d';
        elem.style.outlineOffset = '2px';

        // 1. Handle Hapus (✕) di Sudut Kiri Atas
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '✕';
        delBtn.title = 'Hapus Stiker';
        delBtn.className = 'sticker-handle-btn btn-delete';
        delBtn.style.cssText = `
          position: absolute; top: -14px; left: -14px; width: 28px; height: 28px;
          border-radius: 50%; background: #ff4d6d; color: #fff; border: 2px solid #fff;
          font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3); z-index: 10;
        `;
        delBtn.onpointerdown = (ev) => {
          ev.stopPropagation();
          state.removeSticker(stk.instanceId);
          this.deselect();
        };
        elem.appendChild(delBtn);

        // 2. Handle Putar (🔄) di Tengah Atas
        const rotHandle = document.createElement('div');
        rotHandle.dataset.handle = 'rotate';
        rotHandle.title = 'Putar Stiker';
        rotHandle.style.cssText = `
          position: absolute; top: -24px; left: 50%; transform: translateX(-50%);
          width: 26px; height: 26px; border-radius: 50%; background: #ffd166;
          border: 2px solid #fff; cursor: grab; display: flex; align-items: center;
          justify-content: center; font-size: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          touch-action: none;
        `;
        rotHandle.innerHTML = '🔄';
        elem.appendChild(rotHandle);

        // 3. Handle Resize (⤡) di Sudut Kanan Bawah
        const resizeHandle = document.createElement('div');
        resizeHandle.dataset.handle = 'resize';
        resizeHandle.title = 'Ubah Ukuran';
        resizeHandle.style.cssText = `
          position: absolute; bottom: -12px; right: -12px; width: 26px; height: 26px;
          border-radius: 50%; background: #6b1426; border: 2px solid #fff;
          cursor: se-resize; display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          touch-action: none;
        `;
        resizeHandle.innerHTML = '⤡';
        elem.appendChild(resizeHandle);
      }

      this.container.appendChild(elem);
    });
  }
}

export default StickerEditor;
