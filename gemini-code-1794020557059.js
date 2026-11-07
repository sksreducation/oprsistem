// Gantikan dengan ID Google Sheet anda jika perlu
const SPREADSHEET_ID = "1RFwSlJqKpscz1u8G3zCyN3Re93qxLJgOM_TOsFZHc7E";

function doGet(e) {
  return ContentService.createTextOutput("Google Apps Script OPR Backend Active")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName("Laporan_OPR");
    
    // Jika sheet belum ada, cipta header baharu
    if (!sheet) {
      sheet = ss.insertSheet("Laporan_OPR");
      sheet.appendRow([
        "Timestamp", "Tajuk Program", "Unit Anjuran", "Tarikh", "Masa", 
        "Tempat", "Sasaran", "Jemputan", "Objektif", "Impak", "Jumlah Gambar"
      ]);
    }
    
    // Simpan rekod ke dalam Google Sheet
    sheet.appendRow([
      new Date(),
      data.tajuk || "",
      data.unit || "",
      data.tarikh || "",
      data.masa || "",
      data.tempat || "",
      data.sasaran || "",
      data.jemputan || "",
      data.objektif || "",
      data.impak || "",
      (data.gambar ? data.gambar.length : 0)
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Data berjaya disimpan!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}