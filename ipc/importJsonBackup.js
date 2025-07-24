// ipc/importJsonBackup.js
const { ipcMain } = require("electron");
const fs         = require("fs");
const path       = require("path");
const db         = require("./db");  // ← pull in the same DB connection

ipcMain.handle("import-json-backup", () => {
  const raw  = fs.readFileSync(path.join(__dirname, "../budget.json"), "utf-8");
  const data = JSON.parse(raw);

  const insertMonth = db.prepare(`
    INSERT OR IGNORE INTO months (id, label, createdAt)
    VALUES (?, ?, ?)
  `);

  const insertExpense = db.prepare(`
    INSERT OR REPLACE INTO expenses (
      id, monthId, name, amount, dueDate,
      paid, paidDate, confirmation, url, categoryId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertIncome = db.prepare(`
    INSERT OR REPLACE INTO income (
      id, monthId, source, amount, dateReceived, notes, categoryId
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMisc = db.prepare(`
    INSERT OR REPLACE INTO misc (
      id, monthId, name, amount, notes, categoryId
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const importTxn = db.transaction(() => {
    for (const monthId in data) {
      const { expenses = [], income = [], misc = [] } = data[monthId];

      // ← build the 1st of the month in local time
      const [year, month] = monthId.split("-").map(Number);
      const labelDate     = new Date(year, month - 1, 1);
      const label         = labelDate.toLocaleString("default", {
        month: "long",
        year:  "numeric",
      });
      const createdAt     = labelDate.getTime();

      insertMonth.run(monthId, label, createdAt);

      for (const e of expenses) {
        const id = `${monthId}-${e.name}-${e.dueDate || ""}`
          .replace(/\s+/g, "_")
          .toLowerCase();

        insertExpense.run(
          id,
          e.monthId,
          e.name || "",
          Number(e.amount) || 0,
          e.dueDate || null,
          e.paid ? 1 : 0,
          e.paidDate || null,
          e.confirmation || null,
          e.url || null,
          e.categoryId || null
        );
      }

      for (const i of income) {
        const id = `${monthId}-${i.source}-${i.dateReceived || ""}`
          .replace(/\s+/g, "_")
          .toLowerCase();

        insertIncome.run(
          id,
          i.monthId,
          i.source || "",
          Number(i.amount) || 0,
          i.dateReceived || null,
          i.notes || null,
          i.categoryId || null
        );
      }

      for (const m of misc) {
        const id = `${monthId}-${m.name}-${m.date || ""}`
          .replace(/\s+/g, "_")
          .toLowerCase();

        insertMisc.run(
          id,
          m.monthId,
          m.name || "",
          Number(m.amount) || 0,
          m.notes || null,
          m.categoryId || null
        );
      }
    }
  });

  importTxn();
  return { success: true, message: "✅ JSON backup import complete." };
});
