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