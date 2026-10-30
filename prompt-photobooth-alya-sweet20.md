# PROMPT UNTUK AGENT: Web App Photobooth Aesthetic "Alya Diva's Sweet 20"

Kamu adalah senior front-end engineer sekaligus UI/visual designer. Tugasmu: membangun **web app photobooth aesthetic** untuk **perayaan ulang tahun ke-20 (Sweet 20) milik Alya Diva**. Aplikasi ini lengkap, rapi, siap dipakai, dan memakai **semua bahan referensi yang ada di folder proyek ini**. Baca seluruh prompt sampai habis sebelum menulis kode. Ikuti setiap instruksi secara harfiah. Jika ada hal ambigu, ambil keputusan yang paling masuk akal lalu catat di `README.md` bagian "Asumsi & Keputusan". Jangan berhenti untuk bertanya kecuali folder referensi benar-benar kosong.

---

## 0. RINGKASAN PRODUK

Ini adalah kado digital berupa photobooth untuk ulang tahun **Alya Diva yang ke-20 (Sweet 20)**. Tamu/teman membuka website dan **langsung** masuk ke pembuatan foto. **Tidak ada login, register, landing page, maupun splash screen yang memblokir.** Alur: (1) pilih frame, (2) ambil foto beberapa kali lewat kamera sampai semua slot frame terisi, (3) lihat hasil, tambah dekorasi bila mau, (4) download hasil akhir sebagai gambar PNG.

**Aturan tema paling penting:** **setiap frame, tanpa kecuali, harus memuat tulisan ucapan ulang tahun untuk Alya Diva** (detail di bagian 4). Seluruh nuansa web (warna, copywriting, stiker, animasi) harus terasa seperti pesta ulang tahun Sweet 20 yang aesthetic, manis, dan personal untuk Alya.

Semua proses berjalan di browser pengguna (tanpa backend, foto tidak dikirim ke server).

---

## 1. LANGKAH PERTAMA WAJIB: AUDIT FOLDER REFERENSI

Sebelum menulis kode, lakukan berurutan:

1. Lihat seluruh isi folder proyek secara **rekursif**. Tampilkan daftar lengkap semua file: nama, ekstensi, ukuran, dan dimensi (untuk gambar).
2. Buka dan lihat **setiap** file gambar satu per satu. Jangan menebak isi gambar dari nama file. Catat untuk tiap file: isi gambar, warna dominan, apakah background transparan, dan kegunaannya.
3. Klasifikasikan tiap file:
   - **FRAME**: template photostrip/kartu foto dengan area kosong/transparan untuk foto.
   - **STIKER/ELEMEN**: ilustrasi kecil (hati, bintang, pita, balon, karakter lucu, bunga, dll.).
   - **BACKGROUND/TEKSTUR**: pola, kertas, gradien, wallpaper.
   - **FONT**: file font (.ttf/.otf/.woff/.woff2).
   - **MOODBOARD/INSPIRASI**: acuan gaya visual (untuk palet warna, mood, tipografi UI).
   - **LAINNYA**: logo, ikon, suara, foto Alya (jika ada), dll.
4. Tulis hasil audit ke `docs/ASSET_AUDIT.md`: tabel berisi nama file, kategori, deskripsi singkat, dimensi, transparan atau tidak, dan **di mana file dipakai** di aplikasi.
5. **ATURAN KERAS: SEMUA file referensi harus dipakai.** Tidak boleh ada satu pun yang menganggur. Di akhir, jalankan skrip otomatis yang membandingkan daftar file referensi dengan aset yang benar-benar dipakai di kode. Jika ada file yang secara teknis tidak bisa dipakai (rusak/tidak terbaca), laporkan di `docs/ASSET_AUDIT.md` beserta alasannya.
6. **Jangan mengubah atau menimpa file asli.** Salin ke `public/assets/` dan kerjakan dari salinan. Boleh membuat versi teroptimasi, tetapi simpan file aslinya.
7. Dari file moodboard/inspirasi, turunkan desain UI: palet warna (catat hex), gaya tipografi, bentuk sudut, gaya bayangan, nuansa umum. Tulis di `docs/DESIGN_TOKENS.md`.
8. Jika ada **foto Alya** atau gambar yang jelas bertema ulang tahun/Alya di folder referensi, manfaatkan sebagai elemen dekoratif (mis. latar header, stiker foto, hiasan frame) dengan cara yang sopan dan rapi. Jangan mengubah wajah atau memberi efek yang merusak.

---

## 2. TECH STACK & ATURAN TEKNIS

- **Stack**: HTML + CSS + JavaScript modern (ES modules), Vite sebagai bundler dev. Prioritaskan **vanilla JS**, tanpa framework berat.
- **Tanpa backend, tanpa login/akun/database, tanpa analytics/tracker.** Foto tidak boleh dikirim ke mana pun.
- **Kamera**: `navigator.mediaDevices.getUserMedia`.
- **Komposisi gambar**: elemen `<canvas>` 2D. Ekspor dengan `canvas.toBlob()` lalu download lewat `<a download>`.
- **Library eksternal** hanya jika perlu dan ringan, dipasang lewat npm (bukan CDN) agar bisa jalan offline setelah build. Tidak boleh ada library yang butuh API key.
- **Font**: pakai font dari folder referensi bila ada (`@font-face`). Jika tidak ada, pilih font Google Fonts yang cocok dengan mood (satu font script/handwriting yang manis untuk tulisan ucapan, satu font sans yang bersih untuk UI), lalu **unduh dan host lokal** di proyek. Pastikan font **sudah termuat penuh** (`document.fonts.load(...)`) sebelum render canvas, supaya tulisan di hasil download tidak jatuh ke font cadangan.
- `npm install`, `npm run dev`, `npm run build` harus berjalan. Hasil build berupa folder statis siap deploy (Netlify/Vercel/GitHub Pages). Tulis di `README.md`, termasuk catatan bahwa kamera hanya jalan di HTTPS atau `localhost`.
- **Target browser**: Chrome, Edge, Firefox, Safari desktop, Chrome Android, Safari iOS (versi 2 tahun terakhir).

---

## 3. USER FLOW (IKUTI PERSIS)

Aplikasi adalah **single page** dengan 3 tahap berurutan. **Tidak ada layar lain sebelum Layar 1.**

### LAYAR 1: PILIH FRAME (halaman pertama saat URL dibuka)

- Langsung tampilkan pilihan frame. Bukan landing page.
- Header kecil bertema: tulisan manis seperti "Alya Diva's Sweet 20 ✨" dengan hiasan stiker. Sub-teks singkat: "Pilih frame favoritmu, lalu foto bareng Alya! 🎂". Header tidak boleh memakan banyak ruang; pilihan frame harus terlihat tanpa banyak scroll.
- Tampilkan semua frame dari folder referensi sebagai **kartu pilihan** dalam grid responsif (2 kolom di HP, 3 sampai 4 di desktop). Setiap kartu: preview frame **lengkap dengan tulisan ucapan ulang tahun di dalamnya**, nama frame, dan jumlah foto (mis. "4 foto").
- Jika frame dari referensi kurang dari 6, tambah frame buatan sendiri (bagian 4.5) hingga total minimal **6 frame** dengan layout berbeda: strip vertikal 4 foto, strip vertikal 3 foto, grid 2x2, grid 2x3, kartu 1 foto besar, polaroid.
- Pilih frame dengan tap/klik; kartu terpilih mendapat tanda jelas (outline tebal, ikon centang lucu, animasi kecil).
- Tombol besar **"Mulai Foto 📸"**, aktif hanya setelah frame dipilih. Tap dua kali pada kartu juga langsung lanjut.
- Pengaturan kecil: timer hitung mundur (3/5/10 detik, default 3). Tidak lebih rumit dari itu.
- Latar layar ini dihiasi elemen lucu yang melayang pelan (balon, bintang, confetti, pita, angka 20), memakai aset referensi dan stiker buatan.

### LAYAR 2: AMBIL FOTO

- Minta izin kamera. Tampilkan preview live dengan efek **mirror/selfie**.
- **Progres slot**: miniatur frame di samping/bawah preview, slot terisi satu per satu (thumbnail), teks "Foto 2 dari 4", slot berikutnya berkedip halus.
- Tombol **"Jepret"** besar. Saat ditekan: hitung mundur besar (3…2…1…), flash putih singkat, bunyi shutter pelan (dengan tombol mute; pakai suara dari referensi bila ada, kalau tidak buat dengan Web Audio API), foto tersimpan ke slot berikutnya.
- Tombol **"Auto"**: mengambil semua foto tersisa berturut-turut dengan jeda tetap dan hitung mundur tiap foto. Bisa dibatalkan kapan saja.
- Setelah tiap foto: preview singkat (±1 detik) lalu lanjut. **Retake** lewat ketuk thumbnail slot atau tombol "Ulangi foto terakhir".
- Foto **di-crop otomatis** (cover, titik tengah) sesuai rasio slot frame. Tampilkan overlay panduan tipis berasio sama dengan slot di atas preview.
- Ganti kamera depan/belakang jika perangkat punya lebih dari satu.
- **Error kamera (wajib)**: izin ditolak, kamera tidak ada, kamera dipakai aplikasi lain, browser tidak mendukung. Pesan ramah Bahasa Indonesia berisi cara memperbaiki, tombol "Coba lagi", dan **opsi cadangan "Upload foto dari galeri"** yang tetap menyelesaikan alur.
- Tombol "Kembali" untuk ganti frame (konfirmasi jika sudah ada foto).
- Setelah semua slot terisi, lanjut ke Layar 3 (otomatis atau tombol "Lihat Hasil").
- Matikan stream kamera (`track.stop()`) saat meninggalkan layar ini.

### LAYAR 3: HASIL & DOWNLOAD

- Tampilkan komposisi akhir besar dan jelas: foto dalam frame **beserta tulisan ucapan ulang tahun**.
- **Editor dekorasi ringan**:
  - **Filter foto** (ke semua foto): minimal 6 pilihan: Normal, Hitam-Putih, Vintage/Film, Soft Pink, Warm, Dreamy. Preview dan file download harus **identik**.
  - **Stiker**: panel berisi semua stiker (referensi + buatan, bagian 5), berkategori/tab. Tap untuk menaruh; bisa **geser, resize, putar, hapus, maju/mundur layer**, dengan mouse dan sentuhan (pinch-rotate di HP plus handle di sudut stiker).
  - **"Auto-hias"**: menaburkan beberapa stiker acak tapi rapi, tidak menutupi tulisan ucapan dan sebisa mungkin tidak menutupi wajah.
  - **Caption tambahan opsional**: input singkat (mis. nama pengirim ucapan, "dari: Rina") yang ditaruh di area kecil khusus, dengan 3 sampai 4 pilihan font/warna. Ini **tambahan**, tidak menggantikan tulisan ucapan utama. Tanggal ulang tahun (18 Oktober 2026) sudah menjadi bagian tetap dari frame (lihat 4.2), jadi tidak perlu toggle tanggal.
  - **Undo/Redo** untuk aksi stiker.
- Tombol utama besar **"Download 💖"**: PNG berkualitas tinggi, nama file otomatis `alya-sweet20-YYYYMMDD-HHmmss.png`.
- Tombol sekunder: **"Foto Lagi"** (reset total ke Layar 1, dengan konfirmasi), **"Ulangi Foto"** (ke Layar 2 dengan frame sama), dan **"Bagikan"** bila Web Share API tersedia.
- Opsi "JPG (lebih kecil)" sebagai pilihan sekunder (kualitas 0.92).

---

## 4. TULISAN UCAPAN ULANG TAHUN DI SETIAP FRAME (WAJIB, TANPA KECUALI)

### 4.1 Aturan inti
- **Setiap frame yang tersedia di aplikasi** (dari referensi maupun buatan) harus menampilkan tulisan ulang tahun untuk Alya Diva **di dalam gambar frame itu sendiri**, terlihat di kartu pilihan (Layar 1), di preview slot progres (Layar 2), di hasil (Layar 3), dan di file download.
- Tulisan ini **bagian dari frame**: pengguna **tidak bisa menghapus, memindahkan, atau mengedit**-nya. Stiker pengguna boleh menumpuk di dekatnya tetapi urutan layer harus menjaga tulisan tetap di atas stiker (lihat 4.4 urutan layer).
- Frame dari referensi yang **sudah punya tulisan** sendiri: jangan menimpa tulisan aslinya sampai tak terbaca. Periksa isinya. Jika tulisan aslinya sudah berupa ucapan untuk Alya Diva, cukup pastikan konsisten dan tambahkan elemen kecil seperti "Sweet 20" bila belum ada. Jika tulisan aslinya tidak relevan (teks lain), tutupi dengan rapi (patch warna senada) atau letakkan tulisan baru di area lain yang kosong, lalu catat di `docs/ASSET_AUDIT.md`.
- Frame dari referensi **tanpa tulisan**: tambahkan tulisan lewat layer teks yang digambar programatik di canvas, di area aman (biasanya margin bawah/atas strip; lihat 4.3).

### 4.2 Konfigurasi teks terpusat
Semua teks ucapan disimpan di satu file `src/data/birthdayConfig.js` (agar mudah diubah) dengan isi:

```js
export const BIRTHDAY = {
  name: "Alya Diva",
  age: 20,
  titleLine: "Happy Birthday",        // baris utama
  nameLine: "Alya Diva",              // nama
  subLine: "Sweet 20",                // sub-judul
  shortLine: "HBD Alya ✦ Sweet 20",   // versi pendek untuk ruang sempit
  dateText: "18 Oktober 2026",        // tanggal ulang tahun ke-20 Alya Diva
  dateShort: "18.10.2026",            // versi pendek untuk ruang sempit
};
```
- Ejaan nama wajib persis **"Alya Diva"** (A-l-y-a D-i-v-a) di semua tempat. Jangan ubah huruf besar/kecil sembarangan, jangan salah eja, jangan menambah/mengurangi huruf.
- **Tanggal ulang tahun Alya Diva yang ke-20 adalah 18 Oktober 2026.** Tanggal ini **wajib tampil di setiap frame** sebagai baris kecil di bawah/dekat tulisan utama, ditulis persis **"18 Oktober 2026"** (atau `dateShort` "18.10.2026" jika ruang sempit). Ambil selalu dari `BIRTHDAY.dateText`, jangan ditulis manual di banyak tempat. Jangan memakai tanggal hari ini untuk tulisan di frame, dan jangan mengubah tanggalnya. Jelaskan di README cara mengubah teks/tanggal.
- Jika ada ruang cukup, tampilkan empat baris: "Happy Birthday" / "Alya Diva" / "Sweet 20" / "18 Oktober 2026". Jika ruang sempit (mis. strip kecil, margin tipis), gunakan `shortLine` plus `dateShort`, atau dua baris. Jangan pernah memotong atau mengecilkan teks hingga tidak terbaca.
- Variasi tulisan per frame: boleh berbeda gaya dan tata letak antar frame (mis. "Happy 20th Birthday, Alya Diva!", "Sweet 20 ✦ Alya Diva", "Alya's Sweet 20"), namun **semua variasi harus mengandung nama "Alya Diva" atau "Alya" dan angka/kata 20 atau Sweet 20**, dan harus ejaan benar. Definisikan variasi ini di `frames.json` sebagai `captionStyle` per frame, bersumber dari `BIRTHDAY`.

### 4.3 Penempatan dan tampilan teks
- Untuk tiap frame, simpan di `frames.json` sebuah `textArea` (x, y, lebar, tinggi) tempat tulisan diletakkan. Tentukan area ini dengan **melihat gambar frame secara langsung** (area margin kosong, ruang di bawah slot terakhir, header). Verifikasi visual lewat gambar debug (kotak teks digambar di atas frame) dan perbaiki jika meleset.
- Tulisan harus **rapi dan terbaca**: kontras warna cukup terhadap latar (pilih warna dari palet moodboard; tambahkan outline/bayangan lembut bila perlu), center atau rata sesuai desain, tidak menabrak slot foto, tidak terpotong tepi, tidak tumpang tindih dengan dekorasi bawaan frame.
- Pakai teknik auto-fit: ukur teks dengan `ctx.measureText` dan kecilkan font secukupnya agar muat di `textArea` (dengan batas ukuran minimum agar tetap terbaca; jika masih tidak muat pakai `shortLine`).
- Tipografi: satu font script/handwriting manis untuk "Alya Diva" dan "Happy Birthday", font sans bersih untuk "Sweet 20" atau sebaliknya sesuai moodboard. Tambahkan hiasan kecil di sekitar teks (sparkle, hati, bintang, pita) secukupnya.
- Teks tampil sama persis di preview dan file download (satu fungsi render yang sama).

### 4.4 Urutan layer saat render (dari bawah ke atas)
1. Latar belakang frame
2. Foto-foto di slot (crop cover)
3. Gambar frame (untuk frame PNG berlubang transparan, foto digambar di bawah frame; untuk frame gambar penuh, foto digambar di atas area slot dengan masking/radius sesuai data slot)
4. **Tulisan ucapan ulang tahun bawaan frame**
5. Stiker pengguna (stiker boleh di atas tulisan jika pengguna sengaja menaruhnya di sana, tetapi "Auto-hias" harus menghindari area teks)
6. Caption tambahan pengguna

Jangan meregangkan (stretch) gambar apa pun dan jangan mengubah rasio frame.

### 4.5 Frame buatan tambahan
Jika frame dari referensi kurang dari 6 atau ada layout yang belum tercakup, buat frame tambahan secara programatik di canvas (warna/gradien/tekstur dari referensi, sudut membulat, border, dekorasi di pinggir) dengan **tulisan ulang tahun yang sama aturannya** (4.1 sampai 4.4) dan konsisten dengan estetika referensi. Layout yang harus ada: strip 4 foto, strip 3 foto, grid 2x2, grid 2x3, 1 foto besar, polaroid.

### 4.6 Deteksi slot frame dari referensi (BAGIAN KRITIS)
1. Deteksi otomatis posisi slot dengan menganalisis alpha channel (area transparan terhubung = satu slot) atau warna area kosong. Simpan di `src/data/frames.json`: `id`, `nama`, `file`, `lebarPx`, `tinggiPx`, `slots` (x, y, lebar, tinggi, urutan, radius), `textArea`, `captionStyle`.
2. **Verifikasi hasil deteksi secara visual** dengan gambar debug (kotak slot + kotak teks) dan perbaiki bila meleset. Jangan percaya deteksi otomatis tanpa dicek.
3. Urutan slot: atas ke bawah, lalu kiri ke kanan.

---

## 5. ELEMEN VISUAL: STIKER & DEKORASI

### 5.1 Pemakaian bahan referensi
- Semua file FRAME muncul di Layar 1.
- Semua file STIKER/ELEMEN muncul di panel stiker Layar 3 (dikelompokkan sesuai hasil audit).
- Semua file BACKGROUND/TEKSTUR dipakai sebagai latar halaman, latar kartu, tekstur kertas, dan/atau latar frame buatan.
- File FONT dipakai untuk judul UI dan tulisan ucapan.
- File MOODBOARD menentukan seluruh gaya UI.
- File yang tidak masuk kategori mana pun: tentukan penggunaan paling masuk akal dan catat.

### 5.2 Stiker buatan tambahan (WAJIB: banyak, lucu, bertema ulang tahun)
Selain stiker referensi, **buat sendiri minimal 60 elemen dekorasi** dalam bentuk SVG, gaya konsisten dengan referensi. Bagi menjadi kategori, dengan fokus tema ulang tahun Sweet 20:
- **Ulang tahun**: balon (banyak warna), kue ulang tahun, cupcake, lilin, topi pesta, kado/hadiah, confetti, bunting/bendera segitiga, terompet, pita, mahkota kecil, kembang api, tulisan "HBD", "Happy Birthday", "Sweet 20", "20" besar (beberapa gaya), "Make a wish", "Queen of the day".
- **Hati & bintang**: hati (berbagai gaya), bintang, sparkle/kilau, bulan sabit.
- **Aesthetic/lucu**: pita/bow, awan, pelangi, bunga, daun, kupu-kupu, kucing/kelinci/beruang sederhana (karakter ORIGINAL buatan sendiri), es krim, boba, kamera kecil, kaset, washi tape, kutipan lucu ("smile!", "cheese", "besties", "so cute"), doodle panah/lingkaran/zigzag.
- Beri tiap stiker `id`, `nama`, `kategori`, dan simpan di `src/data/stickers.js`.
- **Dilarang** meniru karakter berhak cipta (Hello Kitty, Sanrio, Disney, dll.) atau logo merek. Semua ilustrasi buatan sendiri atau dari referensi pengguna.
- Tulisan di stiker (mis. "Sweet 20") juga wajib ejaan benar.

### 5.3 Animasi lucu di UI (bukan di hasil download)
Tombol memantul halus, stiker melayang di latar, sparkle berkedip, confetti kecil saat foto selesai/saat masuk Layar 3. Hormati `prefers-reduced-motion`. Animasi tidak boleh mengganggu kinerja.

---

## 6. DESAIN UI/UX

- **Estetika**: aesthetic, manis, hangat, perayaan. Warna dan gaya mengikuti moodboard. Jika tidak ada moodboard, gunakan palet pastel (pink muda, krem, lavender, baby blue) plus aksen emas/rose-gold untuk kesan "Sweet 20".
- **Mobile-first** (HP portrait), tetap rapi di tablet dan desktop. Tanpa scroll horizontal. Area sentuh minimal 44x44 px.
- Gaya konsisten lewat CSS variables (`:root`) sesuai `docs/DESIGN_TOKENS.md`.
- Transisi halus antar layar. Indikator langkah: ① Pilih Frame → ② Foto → ③ Hasil.
- **Bahasa UI: Bahasa Indonesia** santai dan hangat, bernuansa ulang tahun. Contoh: "Pilih frame favoritmu ✨", "Siap-siap senyum buat Alya!", "Yey, fotomu jadi! 🎉", "Tinggal download dan simpan kenangannya 💖". Semua pesan error juga berbahasa Indonesia.
- Aksesibilitas: kontras memadai, `aria-label` pada tombol ikon, fokus keyboard terlihat, alt text bermakna, fungsi inti bisa dipakai tanpa mouse di desktop.
- Loading state yang lucu saat aset dimuat dan saat memproses hasil. Preload gambar frame, font, dan stiker kategori pertama.
- Judul tab browser: "Alya Diva's Sweet 20 Photobooth". Tambahkan favicon bertema (mis. kue/angka 20) dan meta tag dasar (title, description, theme-color).

---

## 7. KUALITAS OUTPUT GAMBAR

- Resolusi kanvas final: turunkan dari ukuran asli frame. Jika sisi pendek frame < 1200 px, skalakan seluruh komposisi (kelipatan integer jika memungkinkan, mis. 2x) hingga sisi pendek minimal **1200 px**. Jangan melewati batas aman kanvas browser (sisi maks ±8000 px dan total piksel aman untuk iOS Safari); turunkan skala otomatis bila perlu.
- `ctx.imageSmoothingEnabled = true`, `imageSmoothingQuality = 'high'`.
- Kamera: minta resolusi ideal tinggi (`width: {ideal: 1920}, height: {ideal: 1080}`) dan ambil dari video dengan `videoWidth/videoHeight` asli.
- **Mirror**: preview di-mirror; **hasil akhir juga di-mirror** secara default agar sama dengan yang dilihat pengguna (kecuali foto upload galeri). Sediakan toggle "Mirror foto" di Layar 3 (default aktif). **Tulisan dan stiker TIDAK boleh ikut ter-mirror** (hanya foto yang di-mirror, jangan flip seluruh canvas).
- Tangani orientasi EXIF untuk foto upload: `createImageBitmap(file, {imageOrientation: 'from-image'})`.
- Preview Layar 3 dan file download berasal dari **satu fungsi `renderComposite(options)`** yang sama (preview boleh skala kecil, logika sama).
- Pastikan semua aset (gambar, font, stiker) sudah selesai dimuat (`decode()`, `document.fonts.ready`) sebelum render dan ekspor. Host semua aset secara lokal agar canvas tidak "tainted".
- Format: PNG utama, JPG opsi kedua.
- Hasil harus terbuka benar di galeri HP dan komputer. Fallback iOS Safari bila `download` tidak bekerja: tampilkan gambar penuh di modal/tab baru dengan petunjuk "Tekan lama gambar lalu pilih Simpan ke Foto".

---

## 8. STRUKTUR PROYEK

```
alya-sweet20-photobooth/
├─ index.html
├─ package.json
├─ vite.config.js
├─ README.md
├─ docs/
│  ├─ ASSET_AUDIT.md
│  └─ DESIGN_TOKENS.md
├─ public/assets/
│  ├─ frames/  stickers/  backgrounds/  fonts/  sounds/
├─ scripts/
│  ├─ detect-slots.js          (deteksi slot + textArea, gambar debug)
│  └─ check-assets-used.js     (memastikan semua file referensi terpakai)
└─ src/
   ├─ main.js
   ├─ styles/ (base.css, tokens.css, screens.css, components.css)
   ├─ screens/ (frameSelect.js, camera.js, result.js)
   ├─ lib/ (camera.js, compositor.js, filters.js, stickerEditor.js, download.js, state.js)
   └─ data/ (frames.json, stickers.js, birthdayConfig.js)
```
Boleh disesuaikan, tapi pemisahan tanggung jawab harus jelas, kode bersih, dengan komentar singkat Bahasa Indonesia pada bagian rumit.

---

## 9. STATE, MEMORI, PRIVASI, PERFORMA

- State terpusat di memori (frame terpilih, foto, stiker, filter, caption). Tanpa localStorage.
- Bebaskan memori: `URL.revokeObjectURL`, tutup `ImageBitmap` yang tak terpakai. "Foto Lagi" mereset semua.
- Foto tidak disimpan atau dikirim ke mana pun.
- Performa: preload aset penting, lazy-load stiker lain, thumbnail untuk UI tetapi resolusi penuh untuk render final. Target interaktif cepat di 4G dan UI 60 fps di HP kelas menengah. Hentikan loop animasi saat layar tidak aktif.

---

## 10. CHECKLIST PENERIMAAN (WAJIB DIJALANKAN, LAPORKAN JUJUR)

1. [ ] URL root langsung menampilkan Layar 1, tanpa login/landing page.
2. [ ] Semua file FRAME referensi tampil sebagai pilihan, slot terdeteksi benar (cek gambar debug).
3. [ ] Minimal 6 pilihan frame dengan layout berbeda.
4. [ ] **Setiap frame menampilkan tulisan ulang tahun untuk Alya Diva** (di kartu pilihan, progres slot, hasil, dan file download). Periksa SATU PER SATU semua frame, tidak ada yang terlewat.
5. [ ] Ejaan "Alya Diva", "Sweet 20", "Happy Birthday" benar di seluruh frame, stiker, UI, judul tab, dan nama file. Cari seluruh kode dengan grep untuk memastikan tidak ada salah ketik.
6. [ ] Tulisan terbaca jelas, tidak terpotong, tidak menabrak slot foto, font sudah termuat (bukan font cadangan) di file download, tidak ter-mirror.
7. [ ] Tanggal "18 Oktober 2026" (atau "18.10.2026" pada frame sempit) tampil benar di setiap frame, bersumber dari `BIRTHDAY`, dan tidak ada tanggal lain yang muncul di frame.
8. [ ] Kamera: izin ditolak menampilkan pesan Indonesia + opsi upload galeri yang berfungsi.
9. [ ] Hitung mundur, flash, pengambilan foto, mode Auto (bisa dibatalkan), dan retake bekerja; slot terisi sesuai jumlah slot.
10. [ ] Layar 3: komposisi benar (urutan foto, crop pas, tidak melar, layer benar).
11. [ ] Semua filter bekerja dan preview identik dengan file download.
12. [ ] Semua stiker referensi + minimal 60 stiker buatan tampil dan bisa ditambah, digeser, di-resize, diputar, dihapus, undo/redo, dengan mouse dan sentuhan. "Auto-hias" tidak menutupi tulisan ucapan.
13. [ ] Download PNG tajam, identik dengan preview, nama file `alya-sweet20-...png`.
14. [ ] "Foto Lagi" mereset semua; "Ulangi Foto" mempertahankan frame.
15. [ ] Tampilan benar di lebar 360, 390, 768, dan 1440 px; tanpa scroll horizontal.
16. [ ] Tidak ada error console; tidak ada request jaringan ke domain luar saat runtime.
17. [ ] `scripts/check-assets-used.js` menyatakan 100% file referensi terpakai (atau menjelaskan pengecualian sah).
18. [ ] `npm run build` sukses dan hasil build berjalan lewat server statis lokal dengan alur lengkap.

---

## 11. LARANGAN

- Jangan membuat landing page, login/register, atau halaman pengantar sebelum pemilihan frame.
- Jangan membuat ada frame **tanpa** tulisan ulang tahun Alya Diva.
- Jangan menimpa/menghapus file referensi asli, dan jangan meninggalkan file referensi tidak terpakai tanpa penjelasan.
- Jangan mengarang fakta tentang Alya selain yang tertulis di prompt ini (nama: Alya Diva, ulang tahun ke-20, tanggal 18 Oktober 2026).
- Jangan memakai gambar/karakter berhak cipta dari luar folder referensi.
- Jangan mengirim foto pengguna ke server atau pihak ketiga.
- Jangan menghasilkan gambar akhir yang buram, melar, ter-mirror pada teks, atau berbeda dari preview.
- Jangan mengarang isi/nama file referensi yang belum kamu lihat sendiri.
- Jangan menyatakan "selesai" sebelum seluruh checklist dijalankan dan dilaporkan jujur, termasuk yang gagal.

---

## 12. FORMAT LAPORAN AKHIR

Setelah selesai, laporkan singkat:
1. Perintah persis untuk menjalankan.
2. Ringkasan frame (dari referensi dan buatan) beserta tulisan ucapan yang dipakai di tiap frame, serta jumlah stiker (referensi dan buatan).
3. Hasil checklist bagian 10 (centang/silang per poin, catatan untuk yang gagal).
4. Cara mengubah teks/tanggal di `birthdayConfig.js`.
5. Asumsi dan keputusan yang diambil.
6. Keterbatasan yang diketahui, jika ada.

Mulai sekarang dengan **langkah 1 (audit folder referensi)**.
