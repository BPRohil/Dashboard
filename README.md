# Dashboard BAPENDA Kabupaten Rokan Hilir

Dashboard interaktif untuk menampilkan data pajak PBB dan BPHTB tahun 2025.

## Fitur Baru: Running Text / Marquee

Telah ditambahkan fitur running text (marquee) yang dapat dikustomisasi untuk menampilkan informasi penting di bagian atas dashboard.

### Cara Menggunakan Marquee

#### 1. Menambah Pesan Baru
```javascript
// Menambah pesan baru ke marquee
dashboard.addMarqueeMessage('fas fa-exclamation-triangle', 'Pengumuman penting!');
dashboard.addMarqueeMessage('fas fa-bell', 'Reminder: Batas pembayaran pajak');
```

#### 2. Menghapus Pesan
```javascript
// Menghapus pesan berdasarkan index (dimulai dari 0)
dashboard.removeMarqueeMessage(0); // Menghapus pesan pertama
```

#### 3. Mengatur Ulang Semua Pesan
```javascript
// Mengatur ulang semua pesan marquee
const pesanBaru = [
    {
        icon: 'fas fa-info-circle',
        text: 'Sistem maintenance pada tanggal 15 Januari 2025'
    },
    {
        icon: 'fas fa-calendar',
        text: 'Pelaporan pajak bulan Januari telah dibuka'
    }
];
dashboard.setMarqueeMessages(pesanBaru);
```

### Icon yang Tersedia

Anda dapat menggunakan icon dari Font Awesome 6.0.0:
- `fas fa-bullhorn` - Megafon
- `fas fa-info-circle` - Informasi
- `fas fa-exclamation-triangle` - Peringatan
- `fas fa-calendar-check` - Kalender
- `fas fa-phone` - Telepon
- `fas fa-bell` - Lonceng
- `fas fa-chart-line` - Grafik
- Dan masih banyak lagi...

### Kustomisasi Tampilan

Marquee menggunakan Tailwind CSS dengan kelas berikut:
- Background: `bg-gradient-to-r from-blue-600 to-blue-800`
- Teks: `text-white text-sm font-medium`
- Animasi: `animate-marquee` (30 detik per siklus)

Untuk mengubah tampilan, edit file `index.html` pada bagian:
```html
<div class="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 shadow-md">
```

### Struktur File

```
Dashboard/
├── Images/
│   ├── RokanHilir.png
│   ├── infografis1.jpg
│   └── logoBapenda.png
├── index.html          # File utama dashboard
├── dashboard.js        # JavaScript untuk fungsionalitas
└── README.md          # Dokumentasi ini
```

### Cara Menjalankan

1. Buka file `index.html` di browser
2. Dashboard akan otomatis memuat dengan marquee aktif
3. Gunakan console browser untuk menjalankan perintah marquee

### Contoh Penggunaan Lengkap

```javascript
// Akses objek dashboard (sudah tersedia secara global)
console.log(dashboard.marqueeMessages); // Lihat pesan saat ini

// Tambah pengumuman darurat
dashboard.addMarqueeMessage('fas fa-exclamation-triangle', 'DARURAT: Server maintenance 30 menit lagi');

// Ganti semua pesan dengan pengumuman khusus
const pengumumanKhusus = [
    {
        icon: 'fas fa-star',
        text: 'Selamat! Target pajak 2025 tercapai 150%'
    },
    {
        icon: 'fas fa-trophy',
        text: 'BAPENDA Rokan Hilir meraih penghargaan terbaik'
    }
];
dashboard.setMarqueeMessages(pengumumanKhusus);
```

---

**Dibuat untuk BAPENDA Kabupaten Rokan Hilir**  
*Dashboard Pajak 2025*