# 📊 Dashboard BAPENDA Rokan Hilir

Dashboard interaktif untuk menampilkan data penerimaan pajak Badan Pendapatan Daerah Kabupaten Rokan Hilir dengan sistem pengelolaan data yang mudah dan terpusat.

## ✨ Fitur Utama
- 🔄 Tampilan slide otomatis dengan transisi smooth
- 📈 Grafik interaktif untuk PBB dan BPHTB
- 📱 Responsive design untuk semua perangkat
- ⏯️ Kontrol play/pause dan fullscreen
- 🎯 **Sistem pengelolaan data terpusat** - Ubah data sekali, update semua tampilan!

## 🚀 Cara Menjalankan
1. Buka file `index.html` di browser
2. Dashboard akan berjalan otomatis
3. Untuk mengubah data, edit file `data-config.js`

## 📁 Struktur File

### File Utama
- `index.html` - File utama dashboard
- `dashboard.js` - Logic dan fungsi dashboard
- `data-config.js` - **File konfigurasi data bulanan** ⭐
- `styles.css` - Styling tambahan
- `tailwind-config.js` - Konfigurasi Tailwind CSS

### File Dokumentasi
- `README.md` - Dokumentasi utama (file ini)
- `PANDUAN-DATA.md` - **Panduan lengkap mengubah data** 📖
- `contoh-perubahan-data.js` - Contoh praktis perubahan data

### Folder Aset
- `Images/` - Folder berisi gambar dan logo

## 🎯 Cara Mengubah Data Bulanan

### Metode Cepat:
1. Buka file **`data-config.js`**
2. Cari bagian `DATA_PBB` atau `DATA_BPHTB`
3. Ubah angka sesuai kebutuhan
4. Simpan file
5. Refresh browser

### Contoh:
```javascript
// Mengubah data PBB Januari dari 845 menjadi 900
static DATA_PBB = [
    900,  // Januari ← Diubah dari 845
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    710   // Juni
];
```

## 📚 Dokumentasi Lengkap

Untuk panduan detail mengubah data, baca:
- **[PANDUAN-DATA.md](./PANDUAN-DATA.md)** - Panduan lengkap step-by-step
- **[contoh-perubahan-data.js](./contoh-perubahan-data.js)** - Contoh praktis

## 🛠️ Teknologi
- HTML5
- CSS3 dengan Tailwind CSS
- JavaScript (ES6+) dengan Class-based architecture
- Chart.js untuk visualisasi data
- Modular data management system

## 💡 Keunggulan Sistem Baru

### ✅ Sebelumnya:
- Data tersebar di berbagai tempat
- Harus edit multiple file untuk update data
- Risiko error tinggi
- Sulit maintenance

### 🚀 Sekarang:
- **Satu file untuk semua data** (`data-config.js`)
- **Update sekali, berubah semua**
- **Mudah dan aman**
- **Dokumentasi lengkap**

## 🎮 Kontrol Dashboard

### Navigasi Otomatis
- Dashboard berpindah slide otomatis setiap 10 detik
- Progress bar menunjukkan waktu tersisa

### Kontrol Manual
- **Play/Pause**: Tombol di kanan atas untuk menghentikan/melanjutkan
- **Fullscreen**: Tombol untuk mode layar penuh
- **Keyboard**: Gunakan panah kiri/kanan untuk navigasi
- **Touch**: Swipe kiri/kanan pada perangkat mobile

## 📊 Data yang Ditampilkan

### Slide 1: Logo BAPENDA
- Menampilkan logo resmi BAPENDA

### Slide 2: Grafik PBB
- Grafik penerimaan Pajak Bumi & Bangunan
- Data bulanan Januari - Juni 2025
- Kartu detail per bulan

### Slide 3: Grafik BPHTB
- Grafik penerimaan Bea Perolehan Hak atas Tanah & Bangunan
- Data bulanan Januari - Juni 2025
- Kartu detail per bulan

### Slide 4: Infografis
- Menampilkan infografis tambahan

## 🔧 Troubleshooting

### Dashboard tidak menampilkan data baru?
1. Pastikan file `data-config.js` sudah disimpan
2. Refresh browser dengan `Ctrl+F5` (Windows) atau `Cmd+Shift+R` (Mac)
3. Periksa console browser (F12) untuk error

### Error di console?
1. Periksa sintaks di `data-config.js`
2. Pastikan semua koma dan kurung siku benar
3. Pastikan hanya mengubah angka, bukan struktur

### Grafik tidak muncul?
1. Pastikan file `data-config.js` dimuat sebelum `dashboard.js`
2. Periksa apakah ada error JavaScript di console
3. Pastikan data dalam format array yang benar

## 📱 Kompatibilitas Browser

| Browser | Versi | Status |
|---------|-------|---------|
| Chrome  | 80+   | ✅ Didukung Penuh |
| Firefox | 75+   | ✅ Didukung Penuh |
| Safari  | 13+   | ✅ Didukung Penuh |
| Edge    | 80+   | ✅ Didukung Penuh |
| IE      | Semua | ❌ Tidak Didukung |

## 🔒 Keamanan Data

- Data disimpan lokal di file `data-config.js`
- Tidak ada koneksi ke server eksternal
- Aman untuk data sensitif pemerintahan
- Backup mudah dengan copy file

## 📞 Support

Jika mengalami kesulitan:
1. Baca [PANDUAN-DATA.md](./PANDUAN-DATA.md) terlebih dahulu
2. Lihat contoh di [contoh-perubahan-data.js](./contoh-perubahan-data.js)
3. Pastikan mengikuti format yang benar
4. Periksa console browser untuk error detail

## 📝 Changelog

### Versi Terbaru
- ✅ Sistem pengelolaan data terpusat
- ✅ File konfigurasi terpisah (`data-config.js`)
- ✅ Dokumentasi lengkap
- ✅ Contoh penggunaan praktis
- ✅ Error handling yang lebih baik

---

**🎉 Selamat! Sekarang Anda bisa mengubah data dashboard dengan mudah tanpa perlu mengedit kode yang rumit.**

**💡 Tips:** Bookmark file `data-config.js` untuk akses cepat saat update data bulanan.