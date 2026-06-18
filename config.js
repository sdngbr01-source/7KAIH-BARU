// ============ KONFIGURASI GLOBAL ============
const CONFIG = {
    // GANTI DENGAN URL DEPLOY ANDA!
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyXpKPO-A5SZwfa2NA-pXQRKyKF1Q2cvGGv-fuB36MkhAK0dqsPTc80y9ImWFygqsgg/exec',
    
    // Admin Credentials
    ADMIN: {
        username: 'admin',
        password: 'admin123'
    },
    
    // Skoring System
    SCORING: {
        BANGUN_PAGI: {
            jam_3_5: 2,
            jam_5_6: 1,
            default: 0
        },
        IBADAH: {
            per_item: 1,
            max: 8
        },
        QURAN: {
            nilai: 1
        },
        OLAHRAGA: {
            nilai: 1
        },
        BELAJAR: {
            nilai: 1
        },
        MAKAN: {
            per_item: 1,
            max: 3
        },
        BANTU_ORTU: {
            nilai: 1
        },
        TIDUR: {
            jam_20_22: 2,
            default: 1
        }
    },
    
    // Target Capaian
    TARGET: {
        hari_semester: 150,
        hari_bulan: 30
    }
};
