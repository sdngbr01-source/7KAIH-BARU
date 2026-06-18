// ============ APP STATE ============
// HAPUS deklarasi ibadahItems di sini karena akan di-declare di masing-masing file

// ============ UTILITY ============
function showLoading(show) {
    const el = document.getElementById('loadingOverlay');
    if (el) el.classList.toggle('hidden', !show);
}

function showToast(msg, type = 'success') {
    // Hapus toast yang lama jika ada
    const old = document.querySelector('.toast');
    if (old) old.remove();
    
    const t = document.createElement('div');
    t.className = 'toast';
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    t.style.background = colors[type] || colors.success;
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
}

function escapeHtml(text) {
    if (!text) return '-';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getSkorClass(skor) {
    if (skor >= 18) return 'skor-istimewa';
    if (skor >= 14) return 'skor-sangat-baik';
    if (skor >= 10) return 'skor-baik';
    if (skor >= 6) return 'skor-cukup';
    return 'skor-perlu';
}

function generateId() {
    return 'H' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
}

// ============ SCORING ============
function hitungSkor(data) {
    const S = CONFIG.SCORING;
    
    // 1. Bangun Pagi
    let skorBangun = 0;
    if (data.bangunWaktu && data.bangunWaktu !== '-' && data.bangunWaktu !== '') {
        const jam = parseInt(data.bangunWaktu.split(':')[0]);
        if (jam >= 3 && jam < 5) skorBangun = S.BANGUN_PAGI.jam_3_5;
        else if (jam >= 5 && jam < 6) skorBangun = S.BANGUN_PAGI.jam_5_6;
    }
    
    // 2. Ibadah
    const skorIbadah = Math.min(data.ibadahList.length, S.IBADAH.max);
    
    // 3. Quran
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
    
    // 6. Makan
    let skorMakan = 0;
    if (data.makanPagi && data.makanPagi !== '-' && data.makanPagi !== '') skorMakan++;
    if (data.makanSiang && data.makanSiang !== '-' && data.makanSiang !== '') skorMakan++;
    if (data.makanMalam && data.makanMalam !== '-' && data.makanMalam !== '') skorMakan++;
    skorMakan = Math.min(skorMakan, S.MAKAN.max);
    
    // 7. Bantu Ortu
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

function getKategori(skor) {
    if (skor >= 18) return { label: 'ISTIMEWA', icon: '🏆', color: '#8b5cf6' };
    if (skor >= 14) return { label: 'SANGAT BAIK', icon: '🌟', color: '#10b981' };
    if (skor >= 10) return { label: 'BAIK', icon: '👍', color: '#f59e0b' };
    if (skor >= 6) return { label: 'CUKUP', icon: '📖', color: '#3b82f6' };
    return { label: 'PERLU DITINGKATKAN', icon: '🌱', color: '#ef4444' };
}

// ============ NAVIGASI ============
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}