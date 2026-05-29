// Google Apps Script untuk Integrasi Spreadsheet Kuis ANBK Relasi & Fungsi
// Tempelkan kode skrip ini di "Ekstensi > Apps Script" pada Google Spreadsheet Anda.

function doPost(e) {
  // Ganti ID Spreadsheet di bawah jika menggunakan lembar kerja baru Anda sendiri
  var sheet = SpreadsheetApp.openById("1LF8xodJiJ3UE4eZz8Agj2Lvr0bU_dDFwanKMILn-PRk").getSheets()[0];
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Urutan Kolom: tanggal dan waktu, nama, kelas, benar, salah, terjawab, ragu ragu, belum terjawab, nilai
    sheet.appendRow([
      data.timestamp,
      data.nama,
      data.kelas,
      data.benar,
      data.salah,
      data.terjawab,
      data.ragu_ragu,
      data.belum_terjawab,
      data.nilai
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}
