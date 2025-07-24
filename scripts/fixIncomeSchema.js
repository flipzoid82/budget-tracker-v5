const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../budget.sqlite3"); // adjust if needed
const db = new Database(dbPath);

// Drop old income table if it exists
db.prepare("DROP TABLE IF EXISTS income").run();

// Recreate using Phase 3 schema
db.prepare(`
  CREATE TABLE income (
    id TEXT PRIMARY KEY,
    monthId TEXT NOT NULL,
    source TEXT NOT NULL,
    amount REAL NOT NULL,
    dateReceived TEXT NOT NULL,
    notes TEXT,
    categoryId TEXT,
    FOREIGN KEY (monthId) REFERENCES months(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  )
`).run();

console.log("✅ income table dropped and recreated successfully.");
