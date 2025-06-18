// src/db/schema.js

const Database = require("better-sqlite3");
const path = require("path");

// Initialize SQLite DB
const dbPath = path.join(__dirname, "../../budget.sqlite3");
const db = new Database(dbPath);

// Create tables if they don't exist
const schema = `
CREATE TABLE IF NOT EXISTS months (
  id TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS income (
  id TEXT PRIMARY KEY,
  monthId TEXT NOT NULL,
  source TEXT NOT NULL,
  amount REAL NOT NULL,
  dateReceived TEXT NOT NULL,
  notes TEXT,
  category TEXT NOT NULL,
  FOREIGN KEY (monthId) REFERENCES months(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  monthId TEXT NOT NULL,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  dueDate TEXT NOT NULL,
  paid INTEGER NOT NULL DEFAULT 0,
  paidDate TEXT,
  confirmation TEXT,
  url TEXT,
  category TEXT NOT NULL,
  FOREIGN KEY (monthId) REFERENCES months(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS misc (
  id TEXT PRIMARY KEY,
  monthId TEXT NOT NULL,
  label TEXT NOT NULL,
  amount REAL NOT NULL,
  notes TEXT,
  category TEXT NOT NULL,
  FOREIGN KEY (monthId) REFERENCES months(id) ON DELETE CASCADE
);
`;

db.exec(schema);

module.exports = db;
