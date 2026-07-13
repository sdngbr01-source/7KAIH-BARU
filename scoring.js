// ============ SISTEM PENILAIAN OBJEKTIF ============

/**
 * Hitung skor berdasarkan data yang diisi
 * Setiap indikator dinilai secara objektif
 */
function hitungSkor(data) {
    const S = CONFIG.SCORING;
    
    // 1. Bangun Pagi
    let skorBangun = 0;
    if (data.bangunWaktu && data.bangunWaktu !== '-' && data.bangunWaktu !== '') {
        const jam = parseInt(data.bangunWaktu.split(':')[0]);
        if (jam >= 3 && jam < 5) skorBangun = S.BANGUN_PAGI.jam_3_5;
        else if (jam >= 5 && jam < 6) skorBangun = S.BANGUN_PAGI.jam_5_6;
        else if (jam >= 6) skorBangun = 0;
    }
    
    // 2. Ibadah
    const skorIbadah = Math.min(data.ibadahList.length, S.IBADAH.max);
    
    // 3. Baca Quran
    let skorQuran = 0;
    if (data.quranSurat && data.quranSurat !== '-' && data.quranSurat !== '' &&
        data.quranAyat && data.quranAyat !== '-' && data.quranAyat !== '') {
        skorQuran = S.QURAN.nilai;
    }
    
    // 4. Olahraga
    let skorOlahraga = 0;
    if (data.olahragaAktivitas && data.olahragaAktivitas !== '-' && data.olahragaAktivitas !== '') {
        skorOlahraga = S.OLAHRAGA.nilai;
    }
    
    // 5. Belajar
    let skorBelajar = 0;
    if (data.belajarMateri && data.belajarMateri !== '-' && data.belajarMateri !== '') {
        skorBelajar = S.BELAJAR.nilai;
    }
    
    // 6. Makan Sehat
    let skorMakan = 0;
    if (data.makanPagi && data.makanPagi !== '-' && data.makanPagi !== '') skorMakan++;
    if (data.makanSiang && data.makanSiang !== '-' && data.makanSiang !== '') skorMakan++;
    if (data.makanMalam && data.makanMalam !== '-' && data.makanMalam !== '') skorMakan++;
    skorMakan = Math.min(skorMakan, S.MAKAN.max);
    
    // 7. Bantu Orang Tua
    let skorBantuOrtu = 0;
    if (data.bantuOrtu && data.bantuOrtu !== '-' && data.bantuOrtu !== '') {
        skorBantuOrtu = S.BANTU_ORTU.nilai;
    }
    
    // 8. Tidur
    let skorTidur = 0;
    if (data.tidurWaktu && data.tidurWaktu !== '-' && data.tidurWaktu !== '') {
        const jam = parseInt(data.tidurWaktu.split(':')[0]);
        if (jam >= 20 && jam <= 22) skorTidur = S.TIDUR.jam_20_22;
        else if (jam > 22) skorTidur = S.TIDUR.default;
    }
    
    // 9. Link Sosmed - Dihitung terpisah di submit
    // (tidak dihitung di sini karena nilainya fixed 20)
    
    // Total skor (maksimal 20, tanpa link)
    const total = skorBangun + skorIbadah + skorQuran + skorOlahraga + 
                  skorBelajar + skorMakan + skorBantuOrtu + skorTidur;
    
    return {
        skorBangun,
        skorIbadah,
        skorQuran,
        skorOlahraga,
        skorBelajar,
        skorMakan,
        skorBantuOrtu,
        skorTidur,
        total,
        detail: {
            'Bangun Pagi': `${skorBangun}/2`,
            'Ibadah': `${skorIbadah}/${S.IBADAH.max}`,
            'Baca Quran': `${skorQuran}/1`,
            'Olahraga': `${skorOlahraga}/1`,
            'Belajar': `${skorBelajar}/1`,
            'Makan Sehat': `${skorMakan}/3`,
            'Bantu Ortu': `${skorBantuOrtu}/1`,
            'Tidur': `${skorTidur}/2`
        }
    };
}

// ... rest of functions tetap sama ...

/**
 * Dapatkan kategori berdasarkan skor
 */
function getKategori(skor) {
    if (skor >= 18) return { label: 'ISTIMEWA', icon: '🏆', color: '#8b5cf6', kelas: 'istimewa' };
    if (skor >= 14) return { label: 'SANGAT BAIK', icon: '🌟', color: '#10b981', kelas: 'sangat-baik' };
    if (skor >= 10) return { label: 'BAIK', icon: '👍', color: '#f59e0b', kelas: 'baik' };
    if (skor >= 6) return { label: 'CUKUP', icon: '📖', color: '#3b82f6', kelas: 'cukup' };
    return { label: 'PERLU DITINGKATKAN', icon: '🌱', color: '#ef4444', kelas: 'perlu' };
}

/**
 * Hitung persentase capaian
 */
function hitungPersentase(hariAktif, targetHari) {
    if (targetHari <= 0) return 0;
    return Math.min(100, Math.round((hariAktif / targetHari) * 100));
}

/**
 * Dapatkan rekomendasi berdasarkan skor
 */
function getRekomendasi(skor, detail) {
    const rekomendasi = [];
    
    if (skor < 10) {
        rekomendasi.push('📝 Fokus pada konsistensi mengisi kebiasaan setiap hari');
    }
    
    // Analisis per item
    const items = [
        { key: 'Bangun Pagi', value: parseInt(detail['Bangun Pagi']), target: 2, saran: 'Coba bangun antara jam 3-5 pagi untuk skor maksimal' },
        { key: 'Ibadah', value: parseInt(detail['Ibadah']), target: 8, saran: 'Tingkatkan ibadah wajib dan sunnah' },
        { key: 'Baca Quran', value: parseInt(detail['Baca Quran']), target: 1, saran: 'Biasakan membaca Al-Quran setiap hari' },
        { key: 'Olahraga', value: parseInt(detail['Olahraga']), target: 1, saran: 'Lakukan olahraga minimal 15 menit' },
        { key: 'Belajar', value: parseInt(detail['Belajar']), target: 1, saran: 'Luangkan waktu untuk belajar setiap hari' },
        { key: 'Makan Sehat', value: parseInt(detail['Makan Sehat']), target: 3, saran: 'Perhatikan pola makan 3 kali sehari' },
        { key: 'Bantu Ortu', value: parseInt(detail['Bantu Ortu']), target: 1, saran: 'Bantu orang tua dengan pekerjaan rumah' },
        { key: 'Tidur', value: parseInt(detail['Tidur']), target: 2, saran: 'Tidur antara jam 8-10 malam' }
    ];
    
    items.forEach(item => {
        if (item.value < item.target) {
            rekomendasi.push(`💡 ${item.saran}`);
        }
    });
    
    return rekomendasi.slice(0, 3);
}
