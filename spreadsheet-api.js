// ============ GOOGLE SHEETS API ============

/**
 * Ambil data user dari Google Sheets
 */
async function getUsersFromSheet() {
    try {
        const url = CONFIG.APPS_SCRIPT_URL + '?action=getUsers';
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Ambil data habits dari Google Sheets
 */
async function getHabitsFromSheet(forceRefresh = false) {
    try {
        const url = CONFIG.APPS_SCRIPT_URL + '?action=getHabits' + (forceRefresh ? '&refresh=true' : '');
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getHabits(forceRefresh = false) {
    return await getHabitsFromSheet(forceRefresh);
}

/**
 * Ambil data scores dari Google Sheets
 */
async function getScoresFromSheet(forceRefresh = false) {
    try {
        const url = CONFIG.APPS_SCRIPT_URL + '?action=getScores' + (forceRefresh ? '&refresh=true' : '');
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getScores(forceRefresh = false) {
    return await getScoresFromSheet(forceRefresh);
}

/**
 * Submit habit ke Google Sheets
 */
async function submitHabitToSheet(habitData) {
    try {
        const formData = new URLSearchParams();
        formData.append('action', 'submitHabit');
        
        // Semua field yang dikirim
        const fields = {
            'ID': habitData.ID || '',
            'Timestamp': habitData.Timestamp || '',
            'Tanggal_Kegiatan': habitData.Tanggal_Kegiatan || '',
            'Nama': habitData.Nama || '',
            'Kelas': habitData.Kelas || '',
            'Bangun_Pagi_Jam': habitData.Bangun_Pagi_Jam || '',
            'Bangun_Pagi_Skor': habitData.Bangun_Pagi_Skor || 0,
            'Ibadah_List': habitData.Ibadah_List || '',
            'Ibadah_Jumlah': habitData.Ibadah_Jumlah || 0,
            'Ibadah_Skor': habitData.Ibadah_Skor || 0,
            'Quran_Surat': habitData.Quran_Surat || '',
            'Quran_Ayat': habitData.Quran_Ayat || '',
            'Quran_Terjemah': habitData.Quran_Terjemah || '',
            'Quran_Skor': habitData.Quran_Skor || 0,
            'Olahraga_Waktu': habitData.Olahraga_Waktu || '',
            'Olahraga_Aktivitas': habitData.Olahraga_Aktivitas || '',
            'Olahraga_Skor': habitData.Olahraga_Skor || 0,
            'Belajar_Waktu': habitData.Belajar_Waktu || '',
            'Belajar_Materi': habitData.Belajar_Materi || '',
            'Belajar_Skor': habitData.Belajar_Skor || 0,
            'Makan_Pagi': habitData.Makan_Pagi || '',
            'Makan_Siang': habitData.Makan_Siang || '',
            'Makan_Malam': habitData.Makan_Malam || '',
            'Makan_Skor': habitData.Makan_Skor || 0,
            'Bantu_Ortu': habitData.Bantu_Ortu || '',
            'Bantu_Ortu_Skor': habitData.Bantu_Ortu_Skor || 0,
            'Tidur_Jam': habitData.Tidur_Jam || '',
            'Tidur_Skor': habitData.Tidur_Skor || 0,
            // === INI YANG PENTING ===
            'Link_sosmed': habitData.Link_sosmed || '',
            'Skor_Link': habitData.Skor_Link || 0,
            'TOTAL_SKOR': habitData.TOTAL_SKOR || 0
        };
        
        // Append semua field
        Object.keys(fields).forEach(key => {
            formData.append(key, String(fields[key]));
        });
        
        console.log('Sending Link_sosmed:', fields.Link_sosmed);
        console.log('Sending Skor_Link:', fields.Skor_Link);
        console.log('Sending TOTAL_SKOR:', fields.TOTAL_SKOR);
        
        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        return { success: true, message: 'Data submitted' };
    } catch (error) {
        console.error('Submit habit error:', error);
        return { success: false, error: error.message };
    }
}

async function submitHabit(habitData) {
    return await submitHabitToSheet(habitData);
}

/**
 * Tambah user baru
 */
async function addUserToSheet(userData) {
    try {
        const formData = new URLSearchParams();
        formData.append('action', 'addUser');
        formData.append('nisn', userData.nisn || '');
        formData.append('nama', userData.nama || '');
        formData.append('kelas', userData.kelas || '');
        
        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        return { success: true, message: 'User added' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Hapus user
 */
async function deleteUserFromSheet(userId) {
    try {
        const formData = new URLSearchParams();
        formData.append('action', 'deleteUser');
        formData.append('userId', userId);
        
        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        return { success: true, message: 'User deleted' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Hapus habit
 */
async function deleteHabitFromSheet(id, nama, tanggal) {
    try {
        const formData = new URLSearchParams();
        formData.append('action', 'deleteHabit');
        formData.append('id', id || '');
        formData.append('nama', nama || '');
        formData.append('tanggal', tanggal || '');
        
        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        return { success: true, message: 'Habit deleted' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deleteHabit(id, nama, tanggal) {
    return await deleteHabitFromSheet(id, nama, tanggal);
}
