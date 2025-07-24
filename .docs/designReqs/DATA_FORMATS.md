# 📊 Budget Tracker – Canonical Data Formats

This document defines the **standard data structures** used throughout the app. These formats are used across:

- SQLite schema
- IPC bridge (`window.api`)
- UI components
- Import/Export routines

---

## 🔄 Global Conventions

| Field      | Format / Type    | Notes                                         |
| ---------- | ---------------- | --------------------------------------------- |
| `id`       | `uuid` (TEXT)    | Unique per row                                |
| `monthId`  | `YYYY-MM` (TEXT) | Primary key for months; e.g. `"2025-06"`      |
| Dates      | `YYYY-MM-DD`     | ISO8601 full date                             |
| Timestamps | Unix (INTEGER)   | Stored as milliseconds (e.g. `1717305600000`) |
| Booleans   | INTEGER (0/1)    | With `CHECK (IN (0,1))`                       |

---

## 📅 Month

```js
{
  id: "2025-06",               // Format: YYYY-MM
  createdAt: 1717305600000     // Unix timestamp (INTEGER)
}
```

---

## 💸 Expense

```js
{
  id: "uuid",
  monthId: "2025-06",
  name: "Rent",
  amount: 1800.00,
  dueDate: "2025-06-01",        // ISO8601
  paid: 1,                      // 0 or 1
  paidDate: "2025-06-01",       // null if unpaid
  confirmation: "ABC123",       // Optional
  url: "https://...",           // Optional
  categoryId: "housing"         // FK to categories
}
```

---

## 💰 Income

```js
{
  id: "uuid",
  monthId: "2025-06",
  source: "USPS",
  amount: 3000.00,
  dateReceived: "2025-06-05",
  notes: "Holiday bonus",
  categoryId: "salary"
}
```

---

## 🧾 Misc Transaction

```js
{
  id: "uuid",
  monthId: "2025-06",
  name: "Service fee",
  amount: 25.00,
  notes: "One-time processing",
  categoryId: "fees"
}
```

---

## 🗂️ Category

```js
{
  id: "rent",            // Machine-safe ID
  name: "Rent"           // Display name
}
```

---

## ⚙️ Settings

```js
{
  theme: "dark",                         // "light" | "dark" | "auto"
  defaultStartPage: "dashboard",
  defaultMonthMode: "recent",           // "recent" | "current" | "last"
  autosaveEnabled: true,
  notifyOverdue: true,
  notifyBudgetOver: true,
  multiUser: false
}
```

---

## 📌 Notes

- `monthId = "2025-06"` is used as the **relational anchor** for grouping entries
- UI helpers (e.g., `formatMonthId('2025-06') → "June 2025"`) will transform month strings for display
- All records are JSON-serializable

## 📊 Budget Table Format

```js
// Planned spending by category
{
  id: "uuid",               // TEXT primary key
  monthId: "YYYY-MM",       // ties entry to a specific month
  categoryId: "string",     // FK to categories.id
  plannedAmount: number       // REAL – planned spending amount
}
```

> Allows read/write of budget targets via IPC handlers (`getBudget`, `addBudget`, `updateBudget`, `deleteBudget`) and comparison of actual expenses vs. planned.
