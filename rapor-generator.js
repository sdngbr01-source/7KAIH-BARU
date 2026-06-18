// ============ RAPOR GENERATOR ============

/**
 * Generate HTML Rapor
 */
function generateRaporHTML(data) {
    const {
        nama,
        kelas,
        periode,
        totalSkor,
        hariAktif,
        rataRata,
        persentase,
        kategori,
        saran,
        iconKategori,
        warnaKategori,
        color,
        sekolahNama,
        sekolahAlamat,
        sekolahMotto,
        sekolahKontak,
        kepsekNama,
        kepsekNIP,
        targetHari,
        tanggalCetak
    } = data;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Rapor - ${nama}</title>
        <style>
            @page { size: A4; margin: 0.5cm; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Times New Roman', Arial, sans-serif; background: white; }
            @media print {
                body { background: white; }
                .rapor-container { box-shadow: none; margin: 0 auto; width: 100%; }
                .kop-sekolah { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
            .rapor-container { max-width: 1000px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
            .kop-sekolah { background: ${color.gradient}; color: white; text-align: center; padding: 25px 20px; position: relative; min-height: 120px; }
            .kop-sekolah .logo-kiri { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); width: 70px; height: 70px; }
            .kop-sekolah .logo-kanan { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); width: 70px; height: 70px; }
            .kop-sekolah .logo-kiri img, .kop-sekolah .logo-kanan img { width: 100%; height: 100%; object-fit: contain; }
            .kop-sekolah .kop-teks { font-size: 22px; font-weight: bold; letter-spacing: 1px; margin: 5px 0; white-space: pre-line; line-height: 1.3; }
            .kop-sekolah .motto { font-size: 11px; margin-top: 5px; }
            .kop-sekolah .alamat { font-size: 10px; margin-top: 5px; }
            .judul-rapor { text-align: center; padding: 20px; background: ${color.light}; border-bottom: 2px solid ${color.primary}; }
            .judul-rapor h3 { color: #1e293b; font-size: 18px; font-weight: bold; }
            .info-siswa { background: ${color.light}; margin: 20px; padding: 15px; border-radius: 12px; }
            .info-siswa table { width: 100%; }
            .info-siswa td { padding: 6px 10px; font-size: 13px; }
            .info-siswa td:first-child { font-weight: bold; width: 140px; }
            .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin: 20px; }
            .stat-card { background: linear-gradient(135deg, white, ${color.light}); border-radius: 12px; padding: 15px; text-align: center; border: 1px solid ${color.primary}30; }
            .stat-value { font-size: 28px; font-weight: 800; color: ${color.primary}; }
            .stat-label { font-size: 11px; color: #64748b; margin-top: 5px; }
            .progress-section { margin: 20px; }
            .progress-label { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px; }
            .progress-bar-container { background: #e2e8f0; border-radius: 30px; height: 12px; overflow: hidden; }
            .progress-bar { background: ${color.gradient}; border-radius: 30px; height: 100%; width: ${persentase}%; }
            .kartu-penghargaan { background: linear-gradient(135deg, ${color.light}, #ffffff); border-radius: 16px; padding: 25px; text-align: center; margin: 20px; border: 2px solid ${color.primary}; }
            .kartu-penghargaan .medali { font-size: 48px; }
            .kartu-penghargaan h2 { font-size: 22px; color: #1e293b; margin: 10px 0; }
            .kategori { display: inline-block; background: ${warnaKategori}; color: white; padding: 6px 25px; border-radius: 40px; font-weight: bold; margin: 12px 0; font-size: 14px; }
            .ttd { margin-top: 20px; padding-top: 12px; border-top: 1px dashed ${color.primary}; font-size: 12px; }
            .footer { background: #1e293b; color: #94a3b8; text-align: center; padding: 15px; font-size: 10px; margin-top: 20px; }
            .footer a { color: ${color.primary}; text-decoration: none; }
        </style>
    </head>
    <body>
    <div class="rapor-container">
        <div class="kop-sekolah">
            <div class="logo-kiri"><img src="logokiri.jpg" alt="Logo"></div>
            <div class="logo-kanan"><img src="logokanan.jpg" alt="Logo"></div>
            <div class="kop-teks">${escapeHtml(sekolahNama)}</div>
            <div class="motto">✨ ${escapeHtml(sekolahMotto)} ✨</div>
            <div class="alamat">${escapeHtml(sekolahAlamat)}</div>
            <div class="alamat">${escapeHtml(sekolahKontak)}</div>
        </div>
        <div class="judul-rapor">
            <h3>📊 LAPORAN CAPAIAN 7 KEBIASAAN ANAK INDONESIA HEBAT 📊</h3>
        </div>
        <div class="info-siswa">
            <table>
                <tr><td>👤 Nama Siswa</td><td>: <strong>${escapeHtml(nama)}</strong></td></tr>
                <tr><td>📚 Kelas</td><td>: ${escapeHtml(kelas)}</td></tr>
                <tr><td>📅 Periode</td><td>: ${periode}</td></tr>
                <tr><td>🎯 Target Hari</td><td>: ${targetHari} hari</td></tr>
                <tr><td>✅ Hari Aktif</td><td>: ${hariAktif} hari (${persentase}%)</td></tr>
                <tr><td>🖨️ Cetak</td><td>: ${tanggalCetak}</td></tr>
            </table>
        </div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-value">${totalSkor}</div><div class="stat-label">🏆 TOTAL SKOR</div></div>
            <div class="stat-card"><div class="stat-value">${hariAktif}</div><div class="stat-label">📅 HARI AKTIF</div></div>
            <div class="stat-card"><div class="stat-value">${rataRata.toFixed(1)}</div><div class="stat-label">⭐ RATA-RATA</div></div>
            <div class="stat-card"><div class="stat-value">${persentase}%</div><div class="stat-label">📈 CAPAIAN</div></div>
        </div>
        <div class="progress-section">
            <div class="progress-label"><span>🎯 Progress Capaian</span><span>${persentase}%</span></div>
            <div class="progress-bar-container"><div class="progress-bar"></div></div>
        </div>
        <div class="kartu-penghargaan">
            <div class="medali">🏅🎖️🏅</div>
            <h2>KARTU PENGHARGAAN</h2>
            <p>Diberikan kepada:</p>
            <h3 style="font-size:20px; color:${color.primary};">${escapeHtml(nama)}</h3>
            <div class="kategori">${iconKategori} ${kategori} ${iconKategori}</div>
            <p style="font-size: 13px; margin-top: 10px;">${saran}</p>
            <div class="ttd">
                <p>Mengetahui,</p>
                <p>Kepala Sekolah</p>
                <p><strong>${escapeHtml(kepsekNama)}</strong></p>
                <p>NIP. ${escapeHtml(kepsekNIP)}</p>
            </div>
        </div>
        <div class="footer">
            <p>Dicetak dari <strong>Sistem 7 Kebiasaan Anak Indonesia Hebat</strong></p>
            <p>© 2026 | SDN Gambirono 01</p>
        </div>
    </div>
    </body>
    </html>
    `;
}

/**
 * Print Rapor
 */
function printRapor(html) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        showToast('⚠️ Mohon izinkan popup untuk mencetak', 'warning');
        return;
    }
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}