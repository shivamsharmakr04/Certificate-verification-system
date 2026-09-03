const XLSX = require("xlsx");

module.exports = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: "yyyy-mm-dd" });

  const normalizedRows = rawRows.map((row) => {
    // Helper to find a value by flexible key aliases
    const getVal = (keys) => {
      for (const k of keys) {
        const foundKey = Object.keys(row).find(
          (rk) => rk.trim().toLowerCase().replace(/[^a-z0-9]/g, "") === k.toLowerCase().replace(/[^a-z0-9]/g, "")
        );
        if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) {
          return String(row[foundKey]).trim();
        }
      }
      return null;
    };

    const certId = getVal(["certificateId", "certificate_id", "certificate id", "cert id", "id"]);
    const name = getVal(["studentName", "student_name", "student name", "name", "student"]);
    const domain = getVal(["domain", "internship_domain", "internship domain", "field"]);
    const rawStart = getVal(["startDate", "start_date", "start date", "internship start date"]);
    const rawEnd = getVal(["endDate", "end_date", "end date", "internship end date"]);
    const rawIssue = getVal(["issueDate", "issue_date", "issue date", "date of issue"]);

    const parseDate = (val) => {
      if (!val) return new Date();
      const d = new Date(val);
      return isNaN(d.getTime()) ? new Date() : d;
    };

    return {
      certificateId: certId || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      studentName: name || "Unknown Student",
      domain: domain || "General Internship",
      startDate: parseDate(rawStart),
      endDate: parseDate(rawEnd),
      issueDate: parseDate(rawIssue)
    };
  });

  // Filter out completely empty invalid rows
  return normalizedRows.filter(r => r.certificateId && r.studentName);
};
