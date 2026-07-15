// ============ FUNGSI UTILITY ============

/**
 * Tampilkan loading
 */
function showLoading(show) {
    const el = document.getElementById('loadingOverlay');
    if (el) el.classList.toggle('hidden', !show);
}

/**
 * Tampilkan toast notification
 */
function showToast(msg, type = 'success') {
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

/**
 * Format tanggal ke Indonesia
 */
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

/**
 * Escape HTML
 */
function escapeHtml(text) {
    if (!text) return '-';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Get class skor
 */
function getSkorClass(skor) {
    if (skor >= 18) return 'skor-istimewa';
    if (skor >= 14) return 'skor-sangat-baik';
    if (skor >= 10) return 'skor-baik';
    if (skor >= 6) return 'skor-cukup';
    return 'skor-perlu';
}

/**
 * Generate ID unik
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * Validasi NISN (10 digit numeric)
 */
function isValidNISN(nisn) {
    return /^\d{10}$/.test(nisn);
}

/**
 * Sleep/delay
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Group by key
 */
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const groupKey = item[key] || 'unknown';
        if (!result[groupKey]) result[groupKey] = [];
        result[groupKey].push(item);
        return result;
    }, {});
}

/**
 * Format waktu
 */
function formatWaktu(jam) {
    if (!jam || jam === '-') return '-';
    const parts = jam.split(':');
    if (parts.length === 2) {
        const h = parseInt(parts[0]);
        const m = parts[1];
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m} ${ampm}`;
    }
    return jam;
}



// ============ FORMAT WAKTU KHUSUS UNTUK SPREADSHEET ============

/**
 * Format waktu dari berbagai format ke HH:mm
 * KHUSUS untuk menangani format dari Google Sheets
 */
function formatTimeDisplay(timeValue) {
    // Jika null/undefined/kosong
    if (!timeValue || timeValue === '-' || timeValue === '' || timeValue === 'undefined' || timeValue === 'null') {
        return '-';
    }
    
    // Jika sudah dalam format HH:mm
    if (/^\d{2}:\d{2}$/.test(timeValue)) {
        return timeValue;
    }
    
    // Jika angka (misal dari spreadsheet: 0.2 = 04:48)
    if (typeof timeValue === 'number') {
        try {
            const totalMinutes = Math.round(timeValue * 24 * 60);
            const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
            const minutes = String(totalMinutes % 60).padStart(2, '0');
            return hours + ':' + minutes;
        } catch (e) {
            // ignore
        }
    }
    
    // Jika string dengan format ISO (1899-12-30T13:52:48.000Z)
    if (typeof timeValue === 'string' && timeValue.includes('T')) {
        try {
            const date = new Date(timeValue);
            if (!isNaN(date.getTime())) {
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return hours + ':' + minutes;
            }
        } catch (e) {
            // ignore
        }
    }
    
    // Jika string waktu lainnya (contoh: "4:30")
    if (typeof timeValue === 'string' && /^\d{1,2}:\d{2}$/.test(timeValue)) {
        const parts = timeValue.split(':');
        const hours = String(parseInt(parts[0])).padStart(2, '0');
        const minutes = String(parseInt(parts[1])).padStart(2, '0');
        return hours + ':' + minutes;
    }
    
    // Jika dalam format datetime lain
    try {
        const date = new Date(timeValue);
        if (!isNaN(date.getTime())) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return hours + ':' + minutes;
        }
    } catch (e) {
        // ignore
    }
    
    return String(timeValue);
}

/**
 * Format waktu untuk disimpan ke spreadsheet (HH:mm)
 */
function formatTimeForSheet(timeValue) {
    if (!timeValue || timeValue === '-' || timeValue === '' || timeValue === 'undefined') {
        return '';
    }
    
    // Jika sudah dalam format HH:mm
    if (/^\d{2}:\d{2}$/.test(timeValue)) {
        return timeValue;
    }
    
    // Jika dalam format "4:30" (tanpa leading zero)
    if (typeof timeValue === 'string' && /^\d{1,2}:\d{2}$/.test(timeValue)) {
        const parts = timeValue.split(':');
        const hours = String(parseInt(parts[0])).padStart(2, '0');
        const minutes = String(parseInt(parts[1])).padStart(2, '0');
        return hours + ':' + minutes;
    }
    
    // Jika dalam format ISO, ekstrak jam:menit
    if (typeof timeValue === 'string' && timeValue.includes('T')) {
        const parts = timeValue.split('T');
        if (parts.length > 1) {
            const timePart = parts[1].substring(0, 5);
            if (/^\d{2}:\d{2}$/.test(timePart)) {
                return timePart;
            }
        }
    }
    
    // Jika angka (nilai desimal dari spreadsheet)
    if (typeof timeValue === 'number') {
        try {
            const totalMinutes = Math.round(timeValue * 24 * 60);
            const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
            const minutes = String(totalMinutes % 60).padStart(2, '0');
            return hours + ':' + minutes;
        } catch (e) {
            // ignore
        }
    }
    
    // Jika dalam format datetime lain
    try {
        const date = new Date(timeValue);
        if (!isNaN(date.getTime())) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return hours + ':' + minutes;
        }
    } catch (e) {
        // ignore
    }
    
    return String(timeValue);
}
