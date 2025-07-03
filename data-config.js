/**
 * BAPENDA Dashboard - Data Configuration
 * File konfigurasi untuk mengelola data bulanan dengan mudah
 *
 * PETUNJUK PENGGUNAAN:
 * 1. Untuk mengubah data bulan tertentu, cukup edit angka di array DATA_BULANAN
 * 2. Index array dimulai dari 0 (Januari = index 0, Februari = index 1, dst.)
 * 3. Setelah mengubah data, refresh halaman untuk melihat perubahan
 * 4. Semua chart dan statistik akan otomatis terupdate
 */

class DataConfig {
    // Data bulanan untuk PBB (Pajak Bumi & Bangunan)
    // Format: [Januari, Februari, Maret, April, Mei, Juni]
    static DATA_PBB = [
        868, // Januari
        151, // Februari
        168, // Maret
        93, // April
        213, // Mei
        1016, // Juni
    ]

    // Data bulanan untuk BPHTB (Bea Perolehan Hak atas Tanah & Bangunan)
    // Format: [Januari, Februari, Maret, April, Mei, Juni]
    static DATA_BPHTB = [
        159, // Januari
        856, // Februari
        504, // Maret
        416, // April
        480, // Mei
        511, // Juni
    ]

    // Label bulan (tidak perlu diubah)
    static BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni"]

    // Metode untuk mendapatkan data PBB
    static getDataPBB() {
        return [...this.DATA_PBB] // Return copy array
    }

    // Metode untuk mendapatkan data BPHTB
    static getDataBPHTB() {
        return [...this.DATA_BPHTB] // Return copy array
    }

    // Metode untuk mendapatkan label bulan
    static getBulan() {
        return [...this.BULAN] // Return copy array
    }

    // Metode untuk mendapatkan total PBB
    static getTotalPBB() {
        return this.DATA_PBB.reduce((total, nilai) => total + nilai, 0)
    }

    // Metode untuk mendapatkan total BPHTB
    static getTotalBPHTB() {
        return this.DATA_BPHTB.reduce((total, nilai) => total + nilai, 0)
    }

    // Metode untuk mendapatkan total keseluruhan
    static getTotalKeseluruhan() {
        return this.getTotalPBB() + this.getTotalBPHTB()
    }

    // Metode untuk format rupiah
    static formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(angka)
    }

    // Metode untuk mendapatkan data bulan tertentu
    static getDataBulan(jenisPajak, indexBulan) {
        if (jenisPajak.toLowerCase() === "pbb") {
            return this.DATA_PBB[indexBulan] || 0
        } else if (jenisPajak.toLowerCase() === "bphtb") {
            return this.DATA_BPHTB[indexBulan] || 0
        }
        return 0
    }

    // Metode untuk update data bulan tertentu (untuk penggunaan dinamis)
    static updateDataBulan(jenisPajak, indexBulan, nilaiBaru) {
        if (
            jenisPajak.toLowerCase() === "pbb" &&
            indexBulan >= 0 &&
            indexBulan < this.DATA_PBB.length
        ) {
            this.DATA_PBB[indexBulan] = nilaiBaru
            return true
        } else if (
            jenisPajak.toLowerCase() === "bphtb" &&
            indexBulan >= 0 &&
            indexBulan < this.DATA_BPHTB.length
        ) {
            this.DATA_BPHTB[indexBulan] = nilaiBaru
            return true
        }
        return false
    }
}

// Export untuk penggunaan di file lain
if (typeof module !== "undefined" && module.exports) {
    module.exports = DataConfig
}
