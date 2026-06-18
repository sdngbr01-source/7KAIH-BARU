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

// ALIAS untuk kompatibilitas
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

// ALIAS untuk kompatibilitas
async function getScores(forceRefresh = false) {
    return await getScoresFromSheet(forceRefresh);
}

/**
 * Submit habit ke Google Sheets - Menggunakan form-urlencoded untuk menghindari CORS
 */
async function submitHabitToSheet(habitData) {
    try {
        // Convert data to URLSearchParams
        const formData = new URLSearchParams();
        formData.append('action', 'submitHabit');
        
        // Add all habit data as individual fields
        Object.keys(habitData).forEach(key => {
            const value = habitData[key];
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });
        
        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Penting untuk menghindari CORS
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        // Karena mode: 'no-cors', response tidak bisa dibaca
        // Tapi data tetap terkirim
        return { success: true, message: 'Data submitted (no-cors mode)' };
    } catch (error) {
        console.error('Submit habit error:', error);
        return { success: false, error: error.message };
    }
}

// ALIAS untuk kompatibilitas
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
        
        return { success: true, message: 'User added (no-cors mode)' };
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
        
        return { success: true, message: 'User deleted (no-cors mode)' };
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
        
        return { success: true, message: 'Habit deleted (no-cors mode)' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ALIAS untuk kompatibilitas
async function deleteHabit(id, nama, tanggal) {
    return await deleteHabitFromSheet(id, nama, tanggal);
}