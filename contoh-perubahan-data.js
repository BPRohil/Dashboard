/**
 * CONTOH PERUBAHAN DATA DASHBOARD BAPENDA
 * 
 * File ini berisi contoh-contoh bagaimana mengubah data bulanan
 * dengan mudah di file data-config.js
 */

// ========================================
// CONTOH 1: MENGUBAH DATA PBB JANUARI
// ========================================

// SEBELUM (data lama):
/*
static DATA_PBB = [
    845,  // Januari ← Data lama
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    710   // Juni
];
*/

// SESUDAH (data baru):
/*
static DATA_PBB = [
    920,  // Januari ← Data baru: 845 diubah menjadi 920
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    710   // Juni
];
*/

// ========================================
// CONTOH 2: MENGUBAH BEBERAPA BULAN SEKALIGUS
// ========================================

// SEBELUM:
/*
static DATA_BPHTB = [
    159,  // Januari
    697,  // Februari
    504,  // Maret ← Akan diubah
    417,  // April ← Akan diubah
    480,  // Mei
    491   // Juni ← Akan diubah
];
*/

// SESUDAH:
/*
static DATA_BPHTB = [
    159,  // Januari
    697,  // Februari
    520,  // Maret ← Diubah dari 504 ke 520
    435,  // April ← Diubah dari 417 ke 435
    480,  // Mei
    510   // Juni ← Diubah dari 491 ke 510
];
*/

// ========================================
// CONTOH 3: UPDATE DATA BULAN TERBARU
// ========================================

// Misalnya ada data terbaru untuk bulan Juni:
// SEBELUM:
/*
static DATA_PBB = [
    845,  // Januari
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    710   // Juni ← Data sementara
];
*/

// SESUDAH (dengan data final):
/*
static DATA_PBB = [
    845,  // Januari
    149,  // Februari  
    168,  // Maret
    93,   // April
    208,  // Mei
    785   // Juni ← Data final yang sudah diverifikasi
];
*/

// ========================================
// LANGKAH-LANGKAH PRAKTIS:
// ========================================

/*
1. Buka file 'data-config.js'
2. Cari bagian DATA_PBB atau DATA_BPHTB
3. Ubah angka yang diinginkan
4. Simpan file
5. Refresh browser untuk melihat perubahan

CONTOH PRAKTIS:
- Jika ingin mengubah PBB Januari dari 845 menjadi 900:
  Ganti: 845,  // Januari
  Dengan: 900,  // Januari

- Jika ingin mengubah BPHTB Februari dari 697 menjadi 720:
  Ganti: 697,  // Februari
  Dengan: 720,  // Februari
*/

// ========================================
// TIPS PENTING:
// ========================================

/*
✅ YANG BOLEH DILAKUKAN:
- Mengubah angka dalam array
- Menambah komentar untuk kejelasan
- Menyimpan backup sebelum mengubah

❌ YANG TIDAK BOLEH DILAKUKAN:
- Menghapus koma antar angka
- Mengubah struktur array (harus tetap 6 angka)
- Menambah teks di dalam array angka
- Mengubah nama variabel (DATA_PBB, DATA_BPHTB)

🔧 JIKA TERJADI ERROR:
- Periksa apakah semua koma masih ada
- Pastikan tidak ada karakter aneh
- Pastikan array tetap memiliki 6 angka
- Refresh browser dengan Ctrl+F5
*/