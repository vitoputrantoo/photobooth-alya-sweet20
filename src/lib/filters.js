/**
 * src/lib/filters.js
 * 6 Filter Foto Aesthetic Berbasis Pixel Manipulation Canvas 2D
 * Preview dan Hasil Download 100% Identik (Aturan Bagian 3 & 7)
 */

export const FILTERS = [
  { id: 'normal', name: 'Normal', swatch: '#e9ecef', desc: 'Warna asli kamera' },
  { id: 'bw', name: 'Hitam-Putih', swatch: '#495057', desc: 'Monokrom klasik elegan' },
  { id: 'vintage', name: 'Vintage / Film', swatch: '#d4a373', desc: 'Tone film analog 70s hangat' },
  { id: 'soft-pink', name: 'Soft Pink', swatch: '#ffccd5', desc: 'Nuansa coquette manis merona' },
  { id: 'warm', name: 'Warm Sunset', swatch: '#faedcd', desc: 'Kehangatan golden hour' },
  { id: 'dreamy', name: 'Dreamy Glow', swatch: '#e0c3fc', desc: 'Kilau lembut pastel dreamy' }
];

/**
 * Menerapkan filter foto langsung ke elemen Canvas 2D
 * @param {HTMLCanvasElement} canvas
 * @param {string} filterId
 */
export function applyFilterToCanvas(canvas, filterId) {
  if (filterId === 'normal') return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;
  const len = data.length;

  for (let i = 0; i < len; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    switch (filterId) {
      case 'bw': {
        // Hitam putih berbasis luminansi standar ITU-R BT.601
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        // Peningkatan kontras halus
        const contrast = (gray - 128) * 1.15 + 128;
        const finalVal = Math.min(255, Math.max(0, contrast));
        data[i] = finalVal;
        data[i + 1] = finalVal;
        data[i + 2] = finalVal;
        break;
      }

      case 'vintage': {
        // Nada film analog: bayangan terangkat (lifted blacks), rona sepia/emas
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        let vr = gray + 30;
        let vg = gray + 10;
        let vb = gray - 15;
        // Penyesuaian saturasi dan pencampuran
        data[i] = Math.min(255, Math.max(20, r * 0.7 + vr * 0.35));
        data[i + 1] = Math.min(255, Math.max(15, g * 0.75 + vg * 0.3));
        data[i + 2] = Math.min(255, Math.max(10, b * 0.6 + vb * 0.3));
        break;
      }

      case 'soft-pink': {
        // Nuansa manis soft pink khas Sweet 20
        let pr = r * 1.08 + 15;
        let pg = g * 0.95 + 8;
        let pb = b * 1.02 + 18;
        data[i] = Math.min(255, pr);
        data[i + 1] = Math.min(255, pg);
        data[i + 2] = Math.min(255, pb);
        break;
      }

      case 'warm': {
        // Golden hour tone
        let wr = r * 1.12 + 10;
        let wg = g * 1.04 + 6;
        let wb = b * 0.90 - 4;
        data[i] = Math.min(255, wr);
        data[i + 1] = Math.min(255, wg);
        data[i + 2] = Math.min(255, Math.max(0, wb));
        break;
      }

      case 'dreamy': {
        // Lembut, luminous pastel dengan highlight airy
        const lum = (r + g + b) / 3;
        const lift = (255 - lum) * 0.12;
        data[i] = Math.min(255, r * 0.95 + lift + 15);
        data[i + 1] = Math.min(255, g * 0.92 + lift + 10);
        data[i + 2] = Math.min(255, b * 1.05 + lift + 20);
        break;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

export default { FILTERS, applyFilterToCanvas };

