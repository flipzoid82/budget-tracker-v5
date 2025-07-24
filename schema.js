const db = require("./ipc/db");

function migrate() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS months (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      createdAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    );
  INSERT OR IGNORE INTO categories (id, name) VALUES
    ('benefits', 'Benefits'),
    ('debt', 'Debt'),
    ('entertainment', 'Entertainment'),
    ('fees', 'Fees'),
    ('insurance', 'Insurance'),
    ('miscellaneous', 'Miscellaneous'),
    ('mortgage', 'Mortgage'),
    ('rent', 'Rent'),
    ('salary', 'Salary'),
    ('savings', 'Savings'),
    ('uncategorized', 'Uncategorized'),
    ('utilities', 'Utilities');


    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      monthId TEXT NOT NULL,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      dueDate TEXT NOT NULL,
      paid INTEGER NOT NULL CHECK (paid IN (0, 1)),
      paidDate TEXT,
      confirmation TEXT,
      url TEXT,
      categoryId TEXT,
      FOREIGN KEY (monthId) REFERENCES months(id),
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS income (
      id TEXT PRIMARY KEY,
      monthId TEXT NOT NULL,
      source TEXT NOT NULL,
      amount REAL NOT NULL,
      dateReceived TEXT NOT NULL,
      notes TEXT,
      categoryId TEXT,
      FOREIGN KEY (monthId) REFERENCES months(id),
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS misc (
      id TEXT PRIMARY KEY,
      monthId TEXT NOT NULL,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      notes TEXT,
      categoryId TEXT,
      FOREIGN KEY (monthId) REFERENCES months(id),
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS budget (
      id TEXT PRIMARY KEY,
      monthId TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      planned REAL NOT NULL,
      FOREIGN KEY (monthId) REFERENCES months(id),
      FOREIGN KEY (categoryId) REFERENCES categories(id),
      UNIQUE (monthId, categoryId)
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      theme TEXT NOT NULL DEFAULT 'auto',
      defaultStartPage TEXT NOT NULL DEFAULT 'dashboard',
      defaultMonthMode TEXT NOT NULL DEFAULT 'recent',
      autosaveEnabled INTEGER NOT NULL DEFAULT 1 CHECK (autosaveEnabled IN (0, 1)),
      notifyOverdue INTEGER NOT NULL DEFAULT 1 CHECK (notifyOverdue IN (0, 1)),
      notifyBudgetOver INTEGER NOT NULL DEFAULT 1 CHECK (notifyBudgetOver IN (0, 1)),
      multiUser INTEGER NOT NULL DEFAULT 0 CHECK (multiUser IN (0, 1))
    );
  `);
}


module.exports = { migrate };