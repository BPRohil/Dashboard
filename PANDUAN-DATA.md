# 📊 Panduan Pengelolaan Data Dashboard BAPENDA

## 🎯 Tujuan
File ini menjelaskan cara mudah mengubah data bulanan pada Dashboard BAPENDA tanpa perlu mengedit kode yang rumit.

## 📁 File yang Terlibat
- **`data-config.js`** - File utama untuk mengubah data bulanan
- **`dashboard.js`** - File dashboard utama (tidak perlu diubah)
- **`index.html`** - File tampilan dashboard (tidak perlu diubah)

## 🚀 Cara Mengubah Data Bulanan

### Langkah 1: Buka File Konfigurasi
Buka file **`data-config.js`** dengan text editor (Notepad, VS Code, dll.)

### Langkah 2: Temukan Data yang Ingin Diubah

#### Untuk Data PBB (Pajak Bumi & Bangunan):
```javascript
static DATA_PBB = [
    845,  // Januari
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    710   // Juni
];
```

#### Untuk Data BPHTB (Bea Perolehan Hak atas Tanah & Bangunan):
```javascript
static DATA_BPHTB = [
    159,  // Januari
    697,  // Februari
    504,  // Maret
    417,  // April
    480,  // Mei
    491   // Juni
];
```

### Langkah 3: Ubah Angka Sesuai Kebutuhan

**Contoh:** Jika ingin mengubah data PBB bulan Januari dari 845 menjadi 900:

**Sebelum:**
```javascript
static DATA_PBB = [
    845,  // Januari ← Angka lama
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    710   // Juni
];
```

**Sesudah:**
```javascript
static DATA_PBB = [
    900,  // Januari ← Angka baru
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    710   // Juni
];
```

### Langkah 4: Simpan File
Simpan file `data-config.js` setelah melakukan perubahan.

### Langkah 5: Refresh Dashboard
Buka atau refresh halaman `index.html` di browser untuk melihat perubahan.

## 📋 Contoh Perubahan Data

### Skenario 1: Update Data Bulan Terbaru
Jika ada data baru untuk bulan Juni:
```javascript
// Ubah dari:
710   // Juni

// Menjadi:
850   // Juni (data terbaru)
```

### Skenario 2: Koreksi Data Bulan Sebelumnya
Jika ada koreksi data untuk bulan Maret:
```javascript
// PBB - Ubah dari:
168,  // Maret

// Menjadi:
175,  // Maret (data terkoreksi)
```

## ⚠️ Hal Penting yang Perlu Diperhatikan

1. **Jangan Ubah Struktur Array**: Pastikan tetap ada 6 angka (Januari-Juni)
2. **Gunakan Koma**: Setiap angka harus dipisah dengan koma, kecuali angka terakhir
3. **Hanya Angka**: Jangan tambahkan teks atau simbol lain
4. **Backup Data**: Simpan salinan file asli sebelum melakukan perubahan

## 🔧 Fitur Tambahan

File `data-config.js` juga menyediakan fungsi-fungsi berguna:

- `DataConfig.getTotalPBB()` - Menghitung total PBB
- `DataConfig.getTotalBPHTB()` - Menghitung total BPHTB  
- `DataConfig.getTotalKeseluruhan()` - Menghitung total semua pajak
- `DataConfig.formatRupiah(angka)` - Format angka ke mata uang Rupiah

## 🆘 Troubleshooting

### Dashboard Tidak Menampilkan Data Baru
1. Pastikan file `data-config.js` sudah disimpan
2. Refresh halaman browser (Ctrl+F5 atau Cmd+Shift+R)
3. Periksa console browser untuk error (F12 → Console)

### Error di Console Browser
1. Periksa sintaks di `data-config.js`
2. Pastikan semua koma dan kurung siku benar
3. Pastikan tidak ada karakter aneh atau spasi berlebih

### Data Tidak Berubah
1. Pastikan mengubah file `data-config.js`, bukan file lain
2. Pastikan browser tidak menggunakan cache lama
3. Coba buka dashboard di tab browser baru

## 📞 Bantuan
Jika mengalami kesulitan, pastikan:
1. File `data-config.js` berada di folder yang sama dengan `index.html`
2. Struktur data array tetap utuh
3. Tidak ada error sintaks JavaScript

---

**💡 Tips:** Untuk perubahan data yang sering, Anda bisa membuat bookmark ke file `data-config.js` agar mudah diakses kapan saja.