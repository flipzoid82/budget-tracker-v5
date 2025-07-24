// ipc/dbHandlers.js
const { ipcMain } = require("electron");
const db          = require("./db");  // your shared better-sqlite3 connection
// Built-in Node API to generate RFC-4122 UUIDs
const { randomUUID } = require("crypto");

// ——————————————————————————————————————————————————————
// Months
// ——————————————————————————————————————————————————————

ipcMain.handle("get-all-months", () => {
  const rows = db
    .prepare("SELECT id FROM months ORDER BY id DESC")
    .all();
  return rows.map(r => r.id).filter(Boolean);
});

// ——————————————————————————————————————————————————————
// Expenses
// ——————————————————————————————————————————————————————

ipcMain.handle("get-expenses", (_, monthId) => {
  return db.prepare(`
    SELECT * FROM expenses 
    WHERE monthId = ? 
    ORDER BY dueDate
  `).all(monthId);
});

ipcMain.handle("add-expense", (_, exp) => {
  // If the client didn’t supply an id, make one now
  const id = exp.id || randomUUID();
    
  // defensive fallback: if paid wasn’t sent, infer from paidDate
  const paid  = typeof exp.paid === "number"
             ? exp.paid
             : exp.paidDate
               ? 1
               : 0;

  // Prepare your INSERT once per call
  const stmt = db.prepare(`
    INSERT INTO expenses (
      id, monthId, name, amount, dueDate,
      paid, paidDate, confirmation, url, categoryId
    ) VALUES (
      @id, @monthId, @name, @amount, @dueDate,
      @paid, @paidDate, @confirmation, @url, @categoryId
    )
  `);

  // Destructure all fields, giving defaults for optional ones
  const {
    monthId,
    name,
    amount,
    dueDate,
    paidDate     = null,
    confirmation = null,
    url          = null,
    categoryId   = null
  } = exp;
  const info = stmt.run({
    id,
    monthId,
    name,
    amount,
    dueDate,
    paid,
    paidDate,
    confirmation,
    url,
    categoryId
  });

  return { success: info.changes === 1 };
});

ipcMain.handle("update-expense", (_, exp) => {
  const stmt = db.prepare(`
    UPDATE expenses SET
      name         = @name,
      amount       = @amount,
      dueDate      = @dueDate,
      paid         = @paid,
      paidDate     = @paidDate,
      confirmation = @confirmation,
      url          = @url,
      categoryId   = @categoryId
    WHERE id = @id
  `);

  // Destructure with defaults and recompute paid flag
  const {
    id,
    name,
    amount,
    dueDate,
    paidDate     = null,
    confirmation = null,
    url          = null,
    categoryId   = null
  } = exp;
  const paid = typeof exp.paid === "number" ? exp.paid : exp.paidDate ? 1 : 0;
  const info = stmt.run({
    id,
    name,
    amount,
    dueDate,
    paid,
    paidDate,
    confirmation,
    url,
    categoryId
  });
  return { success: info.changes === 1 };
});

ipcMain.handle("delete-expense", (_, id) => {
  const stmt = db.prepare("DELETE FROM expenses WHERE id = ?");
  const info = stmt.run(id);
  return { success: info.changes === 1 };
});

// ——————————————————————————————————————————————————————
// Income
// ——————————————————————————————————————————————————————

ipcMain.handle("get-income", (_, monthId) => {
  return db
    .prepare(`
      SELECT *
        FROM income
       WHERE monthId = ?
    ORDER BY dateReceived
    `)
    .all(monthId);
});

ipcMain.handle("add-income", (_, inc) => {
  // Generate ID if not provided
  const {
    id       = randomUUID(),
    monthId,
    source,
    amount,
    dateReceived,
    notes     = null,
    categoryId = null
  } = inc;

  const stmt = db.prepare(`
    INSERT INTO income (
      id, monthId, source, amount, dateReceived, notes, categoryId
    ) VALUES (
      @id, @monthId, @source, @amount, @dateReceived, @notes, @categoryId
    )
  `);
  const info = stmt.run({ id, monthId, source, amount, dateReceived, notes, categoryId });
  
  return { success: info.changes === 1 };
});

ipcMain.handle("update-income", (_, inc) => {
  const {
    id,
    source,
    amount,
    dateReceived,
    notes     = null,
    categoryId = null
  } = inc;

  const stmt = db.prepare(`
    UPDATE income SET
      source       = @source,
      amount       = @amount,
      dateReceived = @dateReceived,
      notes        = @notes,
      categoryId   = @categoryId
    WHERE id = @id
  `);
  const info = stmt.run({ id, source, amount, dateReceived, notes, categoryId });
 
  return { success: info.changes === 1 };
});

ipcMain.handle("delete-income", (_, id) => {
  const stmt = db.prepare("DELETE FROM income WHERE id = ?");
  const info = stmt.run(id);
  return { success: info.changes === 1 };
});

// ——————————————————————————————————————————————————————
// Miscellaneous Transactions
// ——————————————————————————————————————————————————————

ipcMain.handle("get-misc", (_, monthId) => {
  return db
    .prepare(`
      SELECT *
        FROM misc
       WHERE monthId = ?
    ORDER BY id
    `)
    .all(monthId);
});

ipcMain.handle("add-misc", (_, m) => {
  const stmt = db.prepare(`
    INSERT INTO misc (
      id, monthId, name, amount, notes, categoryId
    ) VALUES (
      @id, @monthId, @name, @amount, @notes, @categoryId
    )
  `);

  const info = stmt.run(m);
  return { success: info.changes === 1 };
});

ipcMain.handle("update-misc", (_, m) => {
  const stmt = db.prepare(`
    UPDATE misc SET
      name       = @name,
      amount     = @amount,
      notes      = @notes,
      categoryId = @categoryId
    WHERE id = @id
  `);

  const info = stmt.run(m);
  return { success: info.changes === 1 };
});

ipcMain.handle("delete-misc", (_, id) => {
  const stmt = db.prepare("DELETE FROM misc WHERE id = ?");
  const info = stmt.run(id);
  return { success: info.changes === 1 };
});

// ——————————————————————————————————————————————————————
// Dashboard
// ——————————————————————————————————————————————————————

// — Dashboard Summary —  
ipcMain.handle("get-dashboard-summary", (_, monthId) => {
  // Total income for this month
  const { sum: totalIncome } = db
    .prepare("SELECT COALESCE(SUM(amount),0) AS sum FROM income WHERE monthId = ?")
    .get(monthId);
  // Total expenses for this month
  const { sum: totalExpenses } = db
    .prepare("SELECT COALESCE(SUM(amount),0) AS sum FROM expenses WHERE monthId = ?")
    .get(monthId);
  // Unpaid expenses for this month
  const { sum: unpaidTotal } = db
    .prepare("SELECT COALESCE(SUM(amount),0) AS sum FROM expenses WHERE monthId = ? AND paid = 0")
    .get(monthId);

  return { totalIncome, totalExpenses, unpaidTotal };
});

// — Dashboard History (last N months) —  
ipcMain.handle("get-dashboard-history", (_, { monthsCount = 6 } = {}) => {
  // Returns an array: [{ monthId, income, expenses }, …] sorted ascending by monthId
  const incomeRows = db
    .prepare(`
      SELECT monthId, COALESCE(SUM(amount),0) AS income
      FROM income
      GROUP BY monthId
      ORDER BY monthId DESC
      LIMIT ?
    `)
    .all(monthsCount);
  const expenseRows = db
    .prepare(`
      SELECT monthId, COALESCE(SUM(amount),0) AS expenses
      FROM expenses
      GROUP BY monthId
      ORDER BY monthId DESC
      LIMIT ?
    `)
    .all(monthsCount);

  // Merge by monthId
  const map = new Map();
  incomeRows.forEach(r => map.set(r.monthId, { monthId: r.monthId, income: r.income, expenses: 0 }));
  expenseRows.forEach(r => {
    const entry = map.get(r.monthId) || { monthId: r.monthId, income: 0, expenses: 0 };
    entry.expenses = r.expenses;
    map.set(r.monthId, entry);
  });

  // Return in chronological order
  return Array.from(map.values()).sort((a, b) => a.monthId.localeCompare(b.monthId));
});

// — Urgent Bills (overdue + upcoming) —  
ipcMain.handle("get-urgent-bills", (_, { monthId, windowDays = 7 } = {}) => {
  // Overdue: dueDate < today; Upcoming: dueDate between today and today + windowDays
  const today = new Date().toISOString().slice(0,10);
  return db
    .prepare(`
      SELECT *
        FROM expenses
       WHERE monthId = ?
         AND dueDate <= date(?, '+' || ? || ' days')
       ORDER BY dueDate
    `)
    .all(monthId, today, windowDays);
});

// ——————————————————————————————————————————————————————
// Categories 
// ——————————————————————————————————————————————————————
ipcMain.handle("get-categories", () =>
  db.prepare("SELECT id, name FROM categories ORDER BY name").all()
);