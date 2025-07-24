
# 🗄️ Budget Tracker – SQLite Database Schema (Phase 3)

This document defines the normalized SQLite database schema used by the Budget Tracker v5 app during **Phase 3: Core Feature Implementation**. It supports all current feature pages and reflects design specs from the SDLC and UI documents.

---

## 🧱 Global Standards

| Field         | Format / Type      | Notes                                 |
|---------------|--------------------|---------------------------------------|
| `id`          | `uuid` (TEXT)      | Unique per record                     |
| `monthId`     | `YYYY-MM` (TEXT)   | Used for grouping and filtering       |
| `Dates`       | `YYYY-MM-DD`       | ISO8601 date format                   |
| `Timestamps`  | Unix (INTEGER)     | Stored in milliseconds                |
| `Booleans`    | INTEGER (0/1)      | With `CHECK (IN (0,1))`               |

See [`DATA_FORMATS.md`](./DATA_FORMATS.md) for JSON structure alignment.

---

## 📅 `months` Table

Tracks available month ranges.

```sql
CREATE TABLE months (
  id TEXT PRIMARY KEY,         -- Format: YYYY-MM
  createdAt INTEGER NOT NULL   -- Unix timestamp
);
```

---

## 📁 `expenses` Table

Stores all bill/expense entries.

```sql
CREATE TABLE expenses (
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
```

---

## 💰 `income` Table

Tracks income entries per month.

```sql
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
);
```

---

## 🧾 `misc` Table

Handles one-off or uncategorized transactions.

```sql
CREATE TABLE misc (
  id TEXT PRIMARY KEY,
  monthId TEXT NOT NULL,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  notes TEXT,
  categoryId TEXT,
  FOREIGN KEY (monthId) REFERENCES months(id),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);
```

---

## 📉 `budget` Table

Stores planned amounts by category and month.

```sql
CREATE TABLE budget (
  id TEXT PRIMARY KEY,
  monthId TEXT NOT NULL,
  categoryId TEXT NOT NULL,
  planned REAL NOT NULL,
  FOREIGN KEY (monthId) REFERENCES months(id),
  FOREIGN KEY (categoryId) REFERENCES categories(id),
  UNIQUE (monthId, categoryId)
);
```

---

## 🗂️ `categories` Table

Reusable tag system for grouping entries.

```sql
CREATE TABLE categories (
  id TEXT PRIMARY KEY,     -- e.g. "utilities"
  name TEXT NOT NULL       -- e.g. "Utilities"
);
```

---

## ⚙️ `settings` Table

Singleton table storing user preferences.

```sql
CREATE TABLE settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  theme TEXT NOT NULL DEFAULT 'auto', -- light | dark | auto
  defaultStartPage TEXT NOT NULL DEFAULT 'dashboard',
  defaultMonthMode TEXT NOT NULL DEFAULT 'recent',
  autosaveEnabled INTEGER NOT NULL DEFAULT 1 CHECK (autosaveEnabled IN (0, 1)),
  notifyOverdue INTEGER NOT NULL DEFAULT 1 CHECK (notifyOverdue IN (0, 1)),
  notifyBudgetOver INTEGER NOT NULL DEFAULT 1 CHECK (notifyBudgetOver IN (0, 1)),
  multiUser INTEGER NOT NULL DEFAULT 0 CHECK (multiUser IN (0, 1))
);
```

---

## 🔄 Relational Overview

```
months     ─┬─< expenses
            ├─< income
            ├─< misc
            └─< budget

categories ─┬─< expenses
            ├─< income
            ├─< misc
            └─< budget
```

---

## ✅ Schema Goals

- Follows modular SDLC and UI designs from:
  - `EXPENSES_PAGE_DESIGN.md`
  - `INCOME_PAGE_DESIGN.md`
  - `BUDGET_PAGE_DESIGN.md`
  - `MISC_PAGE_DESIGN.md`
  - `SETTINGS_PAGE_DESIGN.md`
  - `DASHBOARD_PAGE_DESIGN.md`
- Respects normalization and data portability
- Designed for SQLite + IPC via contextBridge
