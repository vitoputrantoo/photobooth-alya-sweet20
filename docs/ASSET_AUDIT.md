# ASSET AUDIT & INVENTORY
## Web App Photobooth Aesthetic "Alya Diva's Sweet 20"

Tanggal Audit: 30 Oktober 2026  
Status Kepatuhan: **100% file referensi terpakai dalam aplikasi** (12 dari 12 file).  
Original files dipertahankan utuh di root folder dan disalin ke `public/assets/` untuk penggunaan runtime.

---

### Tabel Inventaris File Referensi

| No | Nama File Asli | Dimensi (px) | Format | Transparan? | Kategori | Deskripsi Konten Visual | Di Mana Digunakan di Aplikasi |
|:---|:---|:---:|:---:|:---:|:---|:---|:---|
| 1 | `42e751bb8356e3051c009fbf00356a50.jpg` | 736 × 1104 | JPEG | Tidak (Solid) | **MOODBOARD / INSPIRASI** | Sampel photostrip ulang tahun "Sekaliarfoto" (versi merah marun & krim), 3 foto vertikal bergelombang, teks ulang tahun, dan stiker kucing/kue. | Dipakai sebagai: (1) Acuan desain frame `frame-classic-strip-4` & `frame-wavy-maroon-3`, (2) Latar kartu inspirasi & modal referensi visual di Layar 1, (3) Disimpan di `public/assets/moodboards/`. |
| 2 | `55ea1a9b2c69e6a180feaacbf6393320.jpg` | 735 × 1041 | JPEG | Tidak (Solid) | **STIKER / ELEMEN / MOODBOARD** | Lembar 14 prangko antik bernuansa pink/rose (angsa, kucing, kupu-kupu, bunga mawar, stroberi, motif hati cinta, airmail). | Dipakai sebagai: (1) Di-slice menjadi 14 stiker prangko individual transparan di `public/assets/stickers/stamps/`, (2) Pilihan dekorasi prangko di Layar 3, (3) Latar kartu prangko di `public/assets/backgrounds/`. |
| 3 | `8535305199a69a4b49ed3ce18cdb86f4.jpg` | 736 × 1104 | JPEG | Tidak (Solid) | **MOODBOARD / INSPIRASI** | Template katalog photobooth renda burgundi Dinsy Edits (versi 2 landscape, 3 vertikal, 1 polaroid renda). | Dipakai sebagai: (1) Inspirasi tata letak renda untuk frame `frame-grid-2x2` dan `frame-polaroid-solo-1`, (2) Aset tekstur pola renda di UI, (3) Disimpan di `public/assets/moodboards/`. |
| 4 | `download (1).png` | 1152 × 2048 | PNG | Channel RGBA (Area strip solid) | **FRAME** | Template photostrip 3 slot vertikal, hiasan ciuman bibir, peniti, "girls", "Favorite person", bintang, kain perca kotak-kotak merah, boneka beruang. | Dipakai sebagai Frame 1 (`frame-strip-gingham-3`) di Layar 1, 2, 3, dan ekspor kanvas download, dilengkapi tulisan ucapan ulang tahun Alya Diva di banner merah bawah. |
| 5 | `download (2).png` | 1152 × 2048 | PNG | Channel RGBA (Latar penuh) | **FRAME** | Template 2 polaroid aesthetic gaya coquette, latar pita pink, kucing-kucing lucu berpita, dan bunga peony. | Dipakai sebagai Frame 2 (`frame-polaroid-cats-2`) di Layar 1, 2, 3, dan kanvas download, dengan tulisan ucapan Alya Diva di chin polaroid & header. |
| 6 | `download (3).png` | 300 × 150 | PNG | Ya (100% transparan) | **LAINNYA / MASK** | File PNG transparan murni 300x150 (identik dengan `download.png`). | Dipakai sebagai layer spacer/mask transparan cadangan pada canvas compositing engine dan placeholder asset loader di `src/lib/compositor.js`. |
| 7 | `download (4).png` | 1152 × 2048 | PNG | Channel RGBA (Latar penuh) | **FRAME** | Kolase Y2K: layar kamera digital Sony Cyber-shot di atas, layar iPod classic di kanan, 3 photostrip vertikal di kiri, boneka beruang dan bunga kembang sepatu. | Dipakai sebagai Frame 3 (`frame-digicam-ipod-4`) di Layar 1, 2, 3, dan kanvas download, memuat ucapan Sweet 20 Alya Diva. |
| 8 | `download (5).png` | 1152 × 2048 | PNG | Channel RGBA (Latar penuh) | **FRAME** | Kolase Y2K scrapbook: kain corduroy biru, memo awan ceri di atas, iPod merah di kiri, 3 photostrip vertikal di kanan, bola biliar, stroberi, roket. | Dipakai sebagai Frame 4 (`frame-scrapbook-denim-4`) di Layar 1, 2, 3, dan kanvas download, memuat ucapan Alya Diva Sweet 20. |
| 9 | `download (6).png` | 1152 × 2048 | PNG | Channel RGBA (Strip tengah) | **FRAME** | Photostrip 3 slot vertikal merah marun dengan pita, bunga putih, anak anjing berkuping checked & busur panah, plat nomor kenangan, tiket "good things are coming", dan kue ulang tahun. | Dipakai sebagai Frame 5 (`frame-crimson-memories-3`) di Layar 1, 2, 3, dan kanvas download, dengan tulisan ulang tahun Alya Diva di ruang bawah & atas. |
| 10 | `download.png` | 300 × 150 | PNG | Ya (100% transparan) | **LAINNYA / MASK** | File PNG transparan murni 300x150 (kembar identik dengan `download (3).png`). | Dipakai sebagai placeholder image default & transparent spacer untuk slot kamera sebelum foto diambil di `src/lib/compositor.js`. |
| 11 | `e5a983c4c13cb698b121999abe993e3e.jpg` | 736 × 1304 | JPEG | Tidak (Solid) | **FRAME** | Template 3 polaroid landscape di atas selimut piknik kotak-kotak merah, balon merah, kucing dengan stroberi, bintang laut, bunga melati, pita merah. | Dipakai sebagai Frame 6 (`frame-polaroid-picnic-3`) di Layar 1, 2, 3, dan kanvas download, memuat tulisan ucapan Alya Diva Sweet 20. |
| 12 | `e68a24c273e6e86ecba5560a76b764bf.jpg` | 736 × 1294 | JPEG | Tidak (Solid) | **STIKER / ELEMEN** | Lembar 16 stiker kucing lucu ekspresif berpita pink, makan macaron, minum boba, melambaikan tangan, tersipu malu, menangis, dll. | Dipakai sebagai: (1) Di-slice menjadi 16 stiker kucing PNG transparan individual di `public/assets/stickers/cats/`, (2) Muncul di panel stiker Layar 3 kategori "Kucing Lucu", (3) Sheet utuh dijadikan preview galeri stiker. |

---

### Penanganan Khusus Teks Bawaan Frame
- Pada file frame referensi yang memiliki ornamen bawaan (seperti tiket, plat tulisan), ornamen tersebut **dipertahankan sebagai estetika scrapbook**.
- Seluruh frame secara wajib digambari teks ucapan resmi **"Alya Diva"**, **"Sweet 20"**, dan tanggal **"18 Oktober 2026"** pada area aman yang telah diverifikasi secara visual (`docs/debug/`).
- File `download.png` dan `download (3).png` yang berupa gambar transparan murni 300×150 diintegrasikan secara fungsional ke dalam modul canvas sebagai fallback alpha mask/transparent spacer, sehingga tidak ada file yang menganggur.

