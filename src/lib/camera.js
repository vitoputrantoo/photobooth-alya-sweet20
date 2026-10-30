/**
 * src/lib/camera.js
 * Manajemen Kamera Browser, Audio Shutter Web Audio API, & Fallback Upload Galeri
 */

class CameraManager {
  constructor() {
    this.stream = null;
    this.videoElement = null;
    this.facingMode = 'user'; // 'user' | 'environment'
    this.audioCtx = null;
    this.isMuted = false;
  }

  /**
   * Menginisialisasi Web Audio API Shutter Sound
   */
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Memainkan efek suara jepret kamera menggunakan Web Audio API murni
   */
  playShutterSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Klik mekanik 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(800, now);
      osc1.frequency.exponentialRampToValueAtTime(150, now + 0.08);

      gain1.gain.setValueAtTime(0.6, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);

      // Jepret penutup 2
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(300, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.16);

      gain2.gain.setValueAtTime(0.8, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.16);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  /**
   * Membuka aliran video kamera pengguna
   */
  async startCamera(videoElement, facingMode = 'user') {
    this.stopCamera();
    this.videoElement = videoElement;
    this.facingMode = facingMode;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('NOT_SUPPORTED');
    }

    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.stream;
      this.videoElement.setAttribute('playsinline', 'true');
      this.videoElement.muted = true;
      await this.videoElement.play();
      return true;
    } catch (err) {
      console.warn('Gagal membuka kamera:', err.name, err.message);
      // Coba fallback tanpa resolusi ideal jika gagal karena constraint
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        this.videoElement.srcObject = this.stream;
        this.videoElement.setAttribute('playsinline', 'true');
        this.videoElement.muted = true;
        await this.videoElement.play();
        return true;
      } catch (fallbackErr) {
        throw fallbackErr;
      }
    }
  }

  /**
   * Menghentikan kamera dan mematikan semua hardware stream
   */
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
      this.stream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
  }

  /**
   * Mengambil gambar snapshot resolusi penuh dari video kamera
   */
  captureSnapshot() {
    if (!this.videoElement || !this.videoElement.videoWidth) {
      throw new Error('Kamera belum siap.');
    }

    const vw = this.videoElement.videoWidth;
    const vh = this.videoElement.videoHeight;
    const canvas = document.createElement('canvas');
    canvas.width = vw;
    canvas.height = vh;
    const ctx = canvas.getContext('2d');

    // Salin frame video saat ini
    ctx.drawImage(this.videoElement, 0, 0, vw, vh);

    this.playShutterSound();

    return {
      canvas,
      width: vw,
      height: vh,
      isUpload: false
    };
  }

  /**
   * Menangani pemrosesan foto dari upload galeri pengguna (EXIF orientation safe)
   */
  async processUploadedFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Format file tidak didukung. Harap pilih gambar.');
    }

    // Gunakan createImageBitmap dengan koreksi orientasi EXIF
    if (window.createImageBitmap) {
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0);
        return {
          canvas,
          width: bitmap.width,
          height: bitmap.height,
          isUpload: true
        };
      } catch (e) {
        console.warn('Fallback createImageBitmap:', e);
      }
    }

    // Fallback FileReader Image Element
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve({
            canvas,
            width: img.width,
            height: img.height,
            isUpload: true
          });
        };
        img.onerror = () => reject(new Error('Gagal memuat gambar galeri.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Gagal membaca file galeri.'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Menerjemahkan pesan error teknis kamera ke dalam Bahasa Indonesia yang ramah
   */
  getFriendlyErrorMessage(err) {
    const name = err.name || '';
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return {
        title: 'Izin Kamera Belum Diberikan 🔒',
        message: 'Aplikasi membutuhkan izin kamera untuk mengambil foto ulang tahun Alya. Silakan klik ikon gembok/kamera di samping URL browser Anda untuk mengizinkan akses kamera, lalu klik Coba Lagi.'
      };
    }
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      return {
        title: 'Kamera Tidak Ditemukan 📷',
        message: 'Perangkat Anda tidak mendeteksi adanya kamera yang aktif. Anda tetap bisa berfoto seru dengan mengunggah foto dari galeri HP/laptop Anda!'
      };
    }
    if (name === 'NotReadableError' || name === 'TrackStartError') {
      return {
        title: 'Kamera Sedang Dipakai Aplikasi Lain ⏳',
        message: 'Kamera Anda kemungkinan sedang digunakan oleh Zoom, WhatsApp, atau tab lain. Harap tutup aplikasi tersebut lalu klik Coba Lagi.'
      };
    }
    if (name === 'NOT_SUPPORTED') {
      return {
        title: 'Browser Belum Mendukung Kamera 🌐',
        message: 'Browser Anda belum mendukung akses kamera langsung. Harap gunakan browser Chrome, Safari, atau Edge terbaru, atau gunakan opsi upload foto dari galeri.'
      };
    }
    return {
      title: 'Tidak Dapat Mengakses Kamera 💖',
      message: 'Terjadi kendala saat menghubungkan ke kamera. Jangan khawatir, Anda tetap bisa memilih foto dari galeri Anda!'
    };
  }
}

export const camera = new CameraManager();
export default camera;

