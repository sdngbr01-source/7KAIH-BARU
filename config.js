// ============ KONFIGURASI GLOBAL ============
const CONFIG = {
    // GANTI DENGAN URL DEPLOY ANDA!
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyOzROcm6eS9J-UAXeEqKCAjmFYoYc4j3Pe5IbZUphxGudwCI0jBHDaFa-FjWeDdDpiIw/exec',
    
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
        },
        LINK_SOSMED: {
            nilai: 20,
            target_per_bulan: 1,
            target_per_semester: 2
        }
    },
    
    // Target Capaian
    TARGET: {
        hari_semester: 150,
        hari_bulan: 30
    }
};

// Konstanta untuk Link Sosmed
const LINK_SOSMED_NILAI = 20;
const TARGET_LINK_PER_BULAN = 1;
const TARGET_LINK_PER_SEMESTER = 2;
