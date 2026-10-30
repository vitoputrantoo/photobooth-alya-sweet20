# DESIGN TOKENS & UI SYSTEM
## Photobooth Aesthetic "Alya Diva's Sweet 20"

Dokumen ini mendefinisikan sistem desain visual yang diturunkan langsung dari moodboard dan aset referensi (warna marun/burgundi, soft pink coquette, kertas prangko antik krem, dan aksen emas perayaan Sweet 20).

---

### 1. Palet Warna (Color Palette)

| Token Name | Hex Code | Deskripsi & Sumber Aset |
|:---|:---:|:---|
| `--color-primary-burgundy` | `#6b1426` | Merah marun anggun dari frame `download (1)`, `download (6)`, dan moodboard `42e751bb`. |
| `--color-burgundy-dark` | `#4a0918` | Marun tua untuk teks tebal dan kontras tinggi. |
| `--color-burgundy-light` | `#9c2d42` | Marun aksen lembut untuk tombol sekunder dan border. |
| `--color-rose-blush` | `#ff85a2` | Soft pink coquette dari pita `download (2)` dan stiker kucing `e68a24c2`. |
| `--color-rose-light` | `#ffd3df` | Pink pastel lembut untuk latar kartu dan hover state. |
| `--color-cream-bg` | `#fff8f2` | Latar utama aplikasi bernuansa kertas vintage hangat. |
| `--color-cream-card` | `#ffffff` | Putih bersih untuk kontainer kartu dan panel editor. |
| `--color-cream-warm` | `#fbeee2` | Aksen krem untuk latar polaroid dan slot kosong. |
| `--color-gold-accent` | `#dfa13d` | Emas pesta untuk sparkle, bintang, dan angka "Sweet 20". |
| `--color-text-main` | `#33141c` | Cokelat-marun gelap untuk keterbacaan teks maksimal (kontras WCAG AAA). |
| `--color-text-muted` | `#7a5963` | Abu-marun untuk sub-label dan teks panduan. |
| `--color-white` | `#ffffff` | Putih murni untuk teks di atas marun dan flash kamera. |

---

### 2. Tipografi (Typography)

Sistem menggunakan font lokal mandiri (offline-ready):
- **Display Script (Ucapan & Judul Manis)**: `'Caveat'`, `'Dancing Script'`, atau `'Sacramento'` (fallback `cursive`). Digunakan untuk tulisan "Alya Diva" dan "Happy Birthday" di frame & header.
- **UI & Subheading Sans (Keterbacaan & Angka)**: `'Plus Jakarta Sans'`, `'Nunito'`, atau `'Quicksand'` (fallback `sans-serif`). Digunakan untuk UI, tombol, tanggal "18 Oktober 2026", dan label slot.

```css
:root {
  --font-script: 'Dancing Script', 'Caveat', cursive, sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
  --text-4xl: 2.5rem;    /* 40px */
}
```

---

### 3. Bentuk Sudut & Radius (Border Radius)

- Kontainer & Card: `20px` (ramah, estetik, rounded)
- Tombol Utama: `9999px` (pill button ceria)
- Thumbnail & Slot Mini: `12px`
- Handle Stiker: `50%` (lingkaran presisi untuk manipulasi sentuh/mouse)

---

### 4. Bayangan (Elevation & Shadows)

- **Soft Glow**: `0 8px 24px rgba(255, 133, 162, 0.25)`
- **Card Depth**: `0 10px 30px rgba(107, 20, 38, 0.08)`
- **Button Pop**: `0 4px 14px rgba(107, 20, 38, 0.25)`
- **Modal Overlay**: `rgba(42, 9, 16, 0.65)` dengan `backdrop-filter: blur(8px)`

---

### 5. Sentuhan Mikro-Interaksi

- Hover pada tombol: scale `1.03` dengan transisi `cubic-bezier(0.34, 1.56, 0.64, 1)` (efek membal manis).
- Seleksi frame: outline marun tebal 3px + badge centang hati membal.
- Floating sparkle background: animasi melayang pelan 4–6 detik dengan variasi delay.
- Shutter camera: flash putih 150ms + bunyi pop klik Web Audio API.

