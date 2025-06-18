// src/db/dbAccess.js

const db = require("./schema");
const { v4: uuidv4 } = require("uuid");

// Create new month
function createMonth(id) {
  const createdAt = new Date().toISOString();
  db.prepare("INSERT INTO months (id, createdAt) VALUES (?, ?)").run(id, createdAt);
}

// Get all months
function getAllMonths() {
  return db.prepare("SELECT * FROM months ORDER BY id DESC").all();
}

// Copy expenses and income to a new month
function copyMonthData(fromId, toId) {
  const insertIncome = db.prepare(`INSERT INTO income (id, monthId, source, amount, dateReceived, notes, category)
    SELECT ?, ?, source, amount, dateReceived, notes, category FROM income WHERE monthId = ?`);
  const insertExpenses = db.prepare(`INSERT INTO expenses (id, monthId, name, amount, dueDate, paid, paidDate, confirmation, url, category)
    SELECT ?, ?, name, amount, dueDate, paid, paidDate, confirmation, url, category FROM expenses WHERE monthId = ?`);
  const insertMisc = db.prepare(`INSERT INTO misc (id, monthId, label, amount, notes, category)
    SELECT ?, ?, label, amount, notes, category FROM misc WHERE monthId = ?`);

  const incomes = db.prepare("SELECT * FROM income WHERE monthId = ?").all(fromId);
  const expenses = db.prepare("SELECT * FROM expenses WHERE monthId = ?").all(fromId);
  const misc = db.prepare("SELECT * FROM misc WHERE monthId = ?").all(fromId);

  const tx = db.transaction(() => {
    for (const item of incomes) insertIncome.run(uuidv4(), toId, fromId);
    for (const item of expenses) insertExpenses.run(uuidv4(), toId, fromId);
    for (const item of misc) insertMisc.run(uuidv4(), toId, fromId);
  });

  tx();
}

// Get all expenses for a month
function getExpenses(monthId) {
  return db.prepare("SELECT * FROM expenses WHERE monthId = ? ORDER BY dueDate").all(monthId);
}

// Add new expense
function addExpense(data) {
  const {
    name,
    amount,
    dueDate,
    paid,
    paidDate,
    confirmation,
    url,
    category,
    monthId
  } = data;

  db.prepare(`
    INSERT INTO expenses (
      id, monthId, name, amount, dueDate,
      paid, paidDate, confirmation, url, category
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    uuidv4(),
    monthId,
    name,
    amount,
    dueDate,
    paid ? 1 : 0,
    paidDate || null,
    confirmation || "",
    url || "",
    category
  );
}

// Update an existing expense
function updateExpense(id, updates) {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = fields.map(field => `${field} = ?`).join(", ");
  const stmt = db.prepare(`UPDATE expenses SET ${setClause} WHERE id = ?`);

  stmt.run(...values, id);
}

// Delete an expense
function deleteExpense(id) {
  db.prepare("DELETE FROM expenses WHERE id = ?").run(id);
}


module.exports = {
  createMonth,
  getAllMonths,
  copyMonthData,
  // Expenses
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
