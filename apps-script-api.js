// ============ APPS SCRIPT API UNTUK GOOGLE SHEETS ============
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyGrrFfw6tPQQDmlZqRwBiiH7tMj0Q8HxVZBwDB2eL8U8K152Omd1cQdIrpZAhjay9m/exec';

let clientCache = null;
let lastFetchTime = 0;
const CLIENT_CACHE_DURATION = 30000;

async function fetchDataFromSheet(sheetName, forceRefresh = false) {
    try {
        if (!forceRefresh && clientCache && (Date.now() - lastFetchTime) < CLIENT_CACHE_DURATION) {
            console.log('📦 Menggunakan client cache');
            return clientCache;
        }
        
        let url = `${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`;
        if (forceRefresh) url += '&refresh=true';
        
        console.log('🔄 Mengambil data dari server...');
        const response = await fetch(url);
        const result = await response.json();
        
        const data = result.data || [];
        
        clientCache = data;
        lastFetchTime = Date.now();
        
        console.log(`✅ Data: ${data.length} baris`);
        return data;
    } catch (error) {
        console.error('Error:', error);
        return clientCache || [];
    }
}

async function writeDataToSheet(data) {
    try {
        const formData = new URLSearchParams();
        formData.append('action', 'submit_habit');
        formData.append('data', JSON.stringify(data));
        
        await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        clientCache = null;
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============ UNTUK USER ============
async function getHabitsFromSheet(forceRefresh = false) {
    const data = await fetchDataFromSheet('Habits_Log', forceRefresh);
    return { success: true, habits: data };
}

// ============ UNTUK ADMIN - REKAP SKOR (DENGAN PERHITUNGAN YANG BENAR) ============
async function getScoresFromSheet(forceRefresh = false) {
    const data = await fetchDataFromSheet('Habits_Log', forceRefresh);
    
    // Hitung ulang dari data mentah
    // Total Skor = SUM dari kolom TOTAL_SKOR
    // Rata-rata = Total Skor / Jumlah Hari Aktif
    const userMap = new Map();
    
    if (data && data.length > 0) {
        data.forEach(row => {
            const nama = row.Nama;
            if (!nama || nama === '-') return;
            
            // Ambil skor dari kolom TOTAL_SKOR
            const skor = parseInt(row.TOTAL_SKOR) || 0;
            const kelas = row.Kelas || '-';
            
            if (!userMap.has(nama)) {
                userMap.set(nama, {
                    totalSkor: 0,      // SUM dari TOTAL_SKOR
                    hariAktif: 0,       // COUNT jumlah hari
                    kelas: kelas
                });
            }
            
            const user = userMap.get(nama);
            user.totalSkor += skor;     // Akumulasi total skor
            user.hariAktif++;            // Tambah hitung hari
            if (kelas !== '-') user.kelas = kelas;
        });
    }
    
    // Konversi ke object dengan perhitungan rata-rata
    const scores = {};
    for (const [nama, data] of userMap) {
        scores[nama] = {
            total: data.totalSkor,                                    // SUM TOTAL_SKOR
            count: data.hariAktif,                                    // Jumlah hari aktif
            kelas: data.kelas,
            rata: data.hariAktif > 0 ? data.totalSkor / data.hariAktif : 0  // Total / Hari
        };
    }
    
    console.log('📊 Hasil perhitungan scores:', scores);
    
    return { success: true, scores: scores, habits: data };
}

async function submitHabitToSheet(habitData) {
    return await writeDataToSheet(habitData);
}
// ============ FUNGSI IMPORT DATA MASSAL ============
async function importBulkData(records) {
    try {
        let successCount = 0;
        let errorCount = 0;
        
        for (const record of records) {
            // Format data sesuai dengan struktur yang diharapkan
            const formattedData = {
                ID_USER: record.ID_USER || record.id_user || '',
                Timestamp: record.Timestamp || new Date().toISOString(),
                Tanggal_Kegiatan: record.Tanggal_Kegiatan || record.tanggal || '',
                Nama: record.Nama || record.nama || '',
                Kelas: record.Kelas || record.kelas || '',
                Bangun_Pagi_Jam: record.Bangun_Pagi_Jam || record.bangun_pagi || '-',
                Bangun_Pagi_Skor: record.Bangun_Pagi_Skor || record.skor_bangun || 0,
                Ibadah_List: record.Ibadah_List || record.ibadah || '-',
                Ibadah_Jumlah: record.Ibadah_Jumlah || 0,
                Ibadah_Skor: record.Ibadah_Skor || 0,
                Quran_Surat: record.Quran_Surat || record.quran_surat || '-',
                Quran_Ayat: record.Quran_Ayat || record.quran_ayat || '-',
                Quran_Skor: record.Quran_Skor || 0,
                Olahraga_Waktu: record.Olahraga_Waktu || record.olahraga_waktu || '-',
                Olahraga_Aktivitas: record.Olahraga_Aktivitas || record.olahraga || '-',
                Olahraga_Skor: record.Olahraga_Skor || 0,
                Belajar_Waktu: record.Belajar_Waktu || record.belajar_waktu || '-',
                Belajar_Materi: record.Belajar_Materi || record.belajar || '-',
                Belajar_Skor: record.Belajar_Skor || 0,
                Makan_Pagi: record.Makan_Pagi || record.makan_pagi || '-',
                Makan_Siang: record.Makan_Siang || record.makan_siang || '-',
                Makan_Malam: record.Makan_Malam || record.makan_malam || '-',
                Makan_Skor: record.Makan_Skor || 0,
                Bantu_Ortu: record.Bantu_Ortu || record.bantu_ortu || '-',
                Bantu_Ortu_Skor: record.Bantu_Ortu_Skor || 0,
                Tidur_Jam: record.Tidur_Jam || record.tidur || '-',
                Tidur_Skor: record.Tidur_Skor || 0,
                TOTAL_SKOR: record.TOTAL_SKOR || record.total_skor || 0
            };
            
            const result = await writeDataToSheet(formattedData);
            if (result.success) {
                successCount++;
            } else {
                errorCount++;
            }
            
            // Delay agar tidak overload
            await new Promise(r => setTimeout(r, 100));
        }
        
        return { success: true, successCount, errorCount };
    } catch (error) {
        console.error('Error import bulk:', error);
        return { success: false, error: error.message };
    }
}