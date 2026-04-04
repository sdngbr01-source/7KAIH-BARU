// ==================== APP STATE ====================
const ibadahItems = [
    "Sholat Subuh", "Sholat Dzuhur", "Sholat Ashar", "Sholat Magrib", "Sholat Isya",
    "Sholat Dhuha",
    "Sholat Sunnah Rawatib (2 rakaat sebelum Subuh)",
    "Sholat Sunnah Rawatib (4 rakaat sebelum Dzuhur)",
    "Sholat Sunnah Rawatib (4 rakaat sesudah Dzuhur)",
    "Sholat Sunnah Rawatib (2 rakaat sesudah Magrib)",
    "Sholat Sunnah Rawatib (2 rakaat sesudah Isya)",
    "Sholat Tahajud",
    "Doa & Dzikir"
];

// ==================== UTILITY ====================
function showLoading(show) {
    const el = document.getElementById('loadingOverlay');
    if (el) el.classList.toggle('hidden', !show);
}

function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = 'toast';
    t.style.background = type === 'error' ? '#ef4444' : '#10b981';
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function buildIbadahChecklist() {
    const c = document.getElementById('ibadahChecklist');
    if (!c) return;
    let html = ibadahItems.map(item => `<label class="checkbox-item"><input type="checkbox" class="ibadahCheck"><span>${item}</span></label>`).join('');
    if (new Date().getDay() === 5) html += `<label class="checkbox-item"><input type="checkbox" class="ibadahCheck"><span>Sholat Jum'at</span></label>`;
    c.innerHTML = html;
}

function getIbadahList() {
    return Array.from(document.querySelectorAll('.ibadahCheck:checked')).map(ch => ch.nextElementSibling.innerText);
}

// ==================== FUNGSI SKORING (DIPERBAIKI) ====================
function hitungSkor(data) {
    let skorBangun = 0;
    let skorIbadah = 0;
    let skorQuran = 0;
    let skorOlahraga = 0;
    let skorBelajar = 0;
    let skorMakan = 0;
    let skorBantuOrtu = 0;
    let skorTidur = 0;
    
    // 1. Bangun Pagi: jam 3-5 = 2, jam 5-6 = 1
    if (data.bangunWaktu && data.bangunWaktu !== '-' && data.bangunWaktu !== '') {
        const j = parseInt(data.bangunWaktu.split(':')[0]);
        if (j >= 3 && j < 5) skorBangun = 2;
        else if (j >= 5 && j < 6) skorBangun = 1;
    }
    
    // 2. Ibadah: setiap centang = 1
    skorIbadah = data.ibadahList.length;
    
    // 3. Baca Quran = 1 (HANYA jika diisi)
    if (data.quranSurat && data.quranSurat !== '-' && data.quranSurat !== '' && 
        data.quranAyat && data.quranAyat !== '-' && data.quranAyat !== '') {
        skorQuran = 1;
    }
    
    // 4. Olahraga = 1 (HANYA jika diisi)
    if (data.olahragaAktivitas && data.olahragaAktivitas !== '-' && data.olahragaAktivitas !== '') {
        skorOlahraga = 1;
    }
    
    // 5. Belajar = 1 (HANYA jika diisi)
    if (data.belajarMateri && data.belajarMateri !== '-' && data.belajarMateri !== '') {
        skorBelajar = 1;
    }
    
    // 6. Makan Sehat: setiap isian = 1 (HANYA jika diisi)
    if (data.makanPagi && data.makanPagi !== '-' && data.makanPagi !== '') skorMakan++;
    if (data.makanSiang && data.makanSiang !== '-' && data.makanSiang !== '') skorMakan++;
    if (data.makanMalam && data.makanMalam !== '-' && data.makanMalam !== '') skorMakan++;
    
    // 7. Bantu Orang Tua = 1 (HANYA jika diisi)
    if (data.bantuOrtu && data.bantuOrtu !== '-' && data.bantuOrtu !== '') {
        skorBantuOrtu = 1;
    }
    
    // 8. Tidur: jam 20-22 = 2, >22 = 1
    if (data.tidurWaktu && data.tidurWaktu !== '-' && data.tidurWaktu !== '') {
        const j = parseInt(data.tidurWaktu.split(':')[0]);
        if (j >= 20 && j <= 22) skorTidur = 2;
        else skorTidur = 1;
    }
    
    const total = skorBangun + skorIbadah + skorQuran + skorOlahraga + skorBelajar + skorMakan + skorBantuOrtu + skorTidur;
    
    return { 
        skorBangun, skorIbadah, skorQuran, skorOlahraga, 
        skorBelajar, skorMakan, skorBantuOrtu, skorTidur, 
        total 
    };
}

// ==================== NAVIGASI ====================
function showLandingPage() {
    window.location.href = 'index.html';
}

function showLoginPage() {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

function escapeHtml(text) {
    if (!text) return '-';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}