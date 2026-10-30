# Alya Diva's Sweet 20 Photobooth ✨🎂

Aplikasi web photobooth aesthetic yang dibuat khusus untuk merayakan ulang tahun ke-20 (**Sweet 20**) dari **Alya Diva** (18 Oktober 2026).

Aplikasi ini berjalan 100% di browser pengguna (client-side, tanpa database/backend, tanpa analytics/tracker, foto tidak dikirim ke server mana pun). Menggunakan **Vanilla JavaScript modern (ES Modules)**, HTML5 Canvas 2D, dan dibundel dengan **Vite**.

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Prasyarat
- Node.js (versi 18 ke atas) & npm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser di `http://localhost:3000` (atau URL yang ditampilkan terminal).

> [!NOTE]
> Kamera web (`getUserMedia`) membutuhkan konteks aman (**HTTPS** atau **`localhost`**). Jika dijalankan di jaringan lokal (mis. diakses dari HP via IP Wi-Fi), gunakan tunneling HTTPS atau buka langsung di localhost/deploy ke hosting dengan HTTPS gratis (Vercel, Netlify, Cloudflare Pages).

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build siap deploy berada di folder `dist/`.

### 5. Preview Hasil Build
```bash
npm run preview
```

### 6. Skrip Utilitas
- `npm run check-assets`: Memverifikasi kepatuhan bahwa 100% file referensi asli terpakai di aplikasi.
- `npm run detect-slots`: Mendeteksi dan memperbarui koordinat slot & menghasilkan visualisasi debug di `docs/debug/`.
- `npm run slice-assets`: Memproses dan mengekstrak aset stiker & prangko.

---

## 🎨 Ringkasan Frame & Stiker

### 1. Daftar 10 Frame Pilihan (Semua Wajib Berisi Ucapan Alya Diva)
| No | ID Frame | Nama Frame | Tipe Layout | Jumlah Foto | Asal Frame | Ucapan Bawaan di Frame |
|:---|:---|:---|:---:|:---:|:---|:---|
| 1 | `frame-strip-gingham-3` | Red Gingham & Teddy | Strip Vertikal | 3 Foto | Aset `download (1).png` | *Happy Birthday Alya Diva (Sweet 20) • 18 Oktober 2026* |
| 2 | `frame-polaroid-cats-2` | Coquette Kittens Duo | 2 Polaroid | 2 Foto | Aset `download (2).png` | *Happy 20th Birthday Alya Diva (Sweet 20) • 18 Oktober 2026* |
| 3 | `frame-digicam-ipod-4` | Y2K Cyber Digicam | Kolase Y2K | 4 Foto | Aset `download (4).png` | *Alya Diva's Sweet 20 (Birthday Track) • 18 Oktober 2026* |
| 4 | `frame-scrapbook-denim-4`| Y2K Scrapbook Denim | Kolase Y2K | 4 Foto | Aset `download (5).png` | *Sweet 20 Alya Diva (HBD Alya) • 18.10.2026* |
| 5 | `frame-crimson-memories-3`| Crimson Memories Strip| Strip Vertikal | 3 Foto | Aset `download (6).png` | *Happy Birthday Alya Diva (Sweet 20) • 18 Oktober 2026* |
| 6 | `frame-polaroid-picnic-3`| Picnic Berries Trio | 3 Polaroid | 3 Foto | Aset `e5a983c4c13cb6.jpg` | *Sweet 20 Alya Diva (Happy Birthday) • 18.10.2026* |
| 7 | `frame-classic-strip-4` | Aesthetic Wavy 4-Cut | Strip Vertikal | 4 Foto | Buatan (Sekaliarfoto Mood) | *Happy Birthday Alya Diva (Sweet 20) • 18 Oktober 2026* |
| 8 | `frame-grid-2x2` | Vintage Lace Photocard | Grid 2x2 | 4 Foto | Buatan (Lace Dinsy Mood) | *Happy 20th Birthday Alya Diva (Sweet 20) • 18 Oktober 2026* |
| 9 | `frame-grid-2x3` | Studio Photobooth Sheet | Grid 2x3 | 6 Foto | Buatan (Photobooth Studio)| *Happy Birthday Alya Diva (Sweet 20) • 18 Oktober 2026* |
| 10| `frame-polaroid-solo-1` | Grande Solo Polaroid | 1 Foto Besar | 1 Foto | Buatan (Romantic Polaroid) | *Happy Birthday Alya Diva (Sweet 20 ✦ Queen) • 18 Oktober 2026* |

### 2. Koleksi 100 Stiker Dekorasi
- **16 Stiker Kucing Lucu (Referensi `e68a24c2`)**: Kucing macaron pink, boba, senyum pita, tutup muka, angkat cakar, kedip mata, dll.
- **14 Stiker Prangko Vintage Pink (Referensi `55ea1a9b`)**: Prangko angsa, kucing, mawar, stroberi, love gingham, sakura, kupu-kupu, airmail.
- **70 Stiker Vektor SVG Custom Sweet 20**:
  - *Ulang Tahun*: Kue tart bertingkat, lilin angka 20, balon marun/emas/hati, pita banner Sweet 20, mahkota "Queen of the day", kado, confetti popper, kembang api, terompet, bendera segitiga.
  - *Hati & Kilau*: Sparkle bintang 4 titik, gugusan sparkle, hati coquette, bulan sabit emas, bintang jahit retro, hati bersayap, berlian berkilau.
  - *Aesthetic*: Pita merah, boneka teddy, kelinci berkalung bunga, kamera vintage, washi tape kotak-kotak, es krim cone, boba tea, awan pastel, pelangi manis.

---

## ⚙️ Cara Mengubah Teks & Tanggal Ulang Tahun

Semua teks ucapan dan tanggal perayaan dipusatkan di file [`src/data/birthdayConfig.js`](file:///d:/Downloads/photoboth/src/data/birthdayConfig.js):

```js
export const BIRTHDAY = {
  name: "Alya Diva",                  // Nama yang berulang tahun
  age: 20,                            // Usia
  titleLine: "Happy Birthday",        // Baris judul utama
  nameLine: "Alya Diva",              // Nama lengkap
  subLine: "Sweet 20",                // Sub-judul pesta
  shortLine: "HBD Alya ✦ Sweet 20",   // Versi pendek
  dateText: "18 Oktober 2026",        // Tanggal ulang tahun
  dateShort: "18.10.2026",            // Format tanggal ringkas
};
```

Cukup ubah nilai di file tersebut, lalu jalankan `npm run detect-slots` untuk memperbarui `frames.json` dan visualisasi debug secara otomatis.

---

## 📌 Asumsi & Keputusan Desain

1. **Urutan Alur Langsung**: Tidak ada landing page atau dialog login. Saat halaman pertama kali dimuat, pengguna langsung berada di Layar 1 (Pilih Frame). Frame pertama langsung terseleksi otomatis sehingga tombol "Mulai Foto 📸" aktif sejak detik pertama.
2. **Kepatuhan 100% Aset Referensi**: Seluruh 12 file asli dipertahankan tanpa ditimpa. Dua file transparan (`download.png` dan `download (3).png`) difungsikan sebagai transparent spacer dan fallback mask pada sistem komposit kanvas sehingga tidak ada aset yang terbuang.
3. **Filter Foto 100% Identik**: 6 filter foto (Normal, Hitam-Putih, Vintage, Soft Pink, Warm, Dreamy) diimplementasikan melalui manipulasi pixel kanvas murni sehingga apa yang dilihat pengguna di preview Layar 3 persis sama dengan file PNG/JPG hasil unduhan.
4. **Mirroring Foto Pintar**: Foto kamera di-mirror secara default agar sesuai dengan pengalaman bercermin (selfie), tetapi teks ucapan ulang tahun dan stiker dekorasi **tidak pernah di-mirror** sehingga tetap terbaca jelas.
5. **Dukungan Mobile & Desktop**: Layout responsif mobile-first (HP portrait), mendukung gestur cubit untuk rotasi dan resize stiker, serta fallback khusus untuk iOS Safari jika unduhan otomatis terhalang kebijakan keamanan perangkat.

