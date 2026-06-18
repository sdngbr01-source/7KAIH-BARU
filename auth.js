// ============ SISTEM AUTENTIKASI ============

// Cek session
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (isAdmin === 'true') {
        window.location.href = 'admin-dashboard.html';
        return true;
    }
    
    if (user) {
        window.location.href = 'user-dashboard.html';
        return true;
    }
    
    return false;
}

// Login User dengan NISN
async function loginUser(nisn) {
    try {
        const result = await getUsersFromSheet();
        if (!result.success) {
            return { success: false, message: 'Gagal mengambil data user!' };
        }
        
        const users = result.data || [];
        const user = users.find(u => String(u.nisn) === String(nisn));
        
        if (!user) {
            return { success: false, message: 'NISN tidak terdaftar!' };
        }
        
        const dataToStore = {
            nisn: user.nisn,
            nama: user.nama,
            kelas: user.kelas || '-'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(dataToStore));
        return { success: true, user: dataToStore };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Login Admin
function loginAdmin(username, password) {
    if (username === CONFIG.ADMIN.username && password === CONFIG.ADMIN.password) {
        localStorage.setItem('isAdmin', 'true');
        return { success: true };
    }
    return { success: false, message: 'Username atau password salah!' };
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

// Get current user
function getCurrentUser() {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
}

// Get all users from sheet
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