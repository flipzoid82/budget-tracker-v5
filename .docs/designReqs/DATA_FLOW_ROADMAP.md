# 📊 Budget Tracker – Phase 3 Data Flow Architecture (v5)

This document outlines the complete **Phase 3: Core Feature Implementation** data flow roadmap, covering end-to-end interactions from the React renderer through IPC to the SQLite database.

---

## 🧠 Purpose

Define the **end-to-end flow of data** across:

- **SQLite** storage layer
- **Electron main process** (IPC handlers)
- **Preload bridge** (`contextBridge` + IPC)
- **React renderer** (hooks + components)

Ensures security, modularity, and consistency across all pages (Dashboard, Expenses, Income, Budget, Misc, Settings).

---

## 🔄 End-to-End Data Flow

### 1. Renderer (React) → `window.api`

Each page or hook invokes methods on the safe API:

```js
// Example for Expenses
const expenses = await window.api.getExpenses("2025-06");

// Example for Dashboard summary
const summary = await window.api.getDashboardSummary("2025-06");
const history = await window.api.getDashboardHistory({ monthsCount: 6 });
const alerts = await window.api.getUrgentBills({
  monthId: "2025-06",
  windowDays: 7,
});
```

---

### 2. Preload Bridge (`preload.js`)

Defines the API surface exposed to the renderer:

```js
contextBridge.exposeInMainWorld("api", {
  // Existing handlers...
  getExpenses: (m) => ipcRenderer.invoke("get-expenses", m),
  addExpense: (p) => ipcRenderer.invoke("add-expense", p),
  // New Dashboard handlers
  getDashboardSummary: (m) => ipcRenderer.invoke("get-dashboard-summary", m),
  getDashboardHistory: (opts) =>
    ipcRenderer.invoke("get-dashboard-history", opts),
  getUrgentBills: (opts) => ipcRenderer.invoke("get-urgent-bills", opts),
  // Other handlers...
});
```

---

### 3. IPC Handlers (`dbHandlers.js`)

Handles all main-process requests with `better-sqlite3`:

```js
ipcMain.handle("get-expenses", (_, monthId) =>
  db.prepare("SELECT * FROM expenses WHERE monthId = ?").all(monthId)
);
ipcMain.handle("get-dashboard-summary", (_, monthId) => {
  /* SUMMARY query sums */
});
ipcMain.handle("get-dashboard-history", (_, opts) => {
  /* HISTORY merge logic */
});
ipcMain.handle("get-urgent-bills", (_, opts) => {
  /* UPCOMING/OVERDUE query */
});
```

---

### 4. SQLite Database

Stores all persistent records using the defined schema:

| Table        | Description                       |
| ------------ | --------------------------------- |
| `months`     | List of month IDs                 |
| `expenses`   | Monthly bills (paid/unpaid)       |
| `income`     | Income sources per month          |
| `budget`     | Planned spending by category      |
| `misc`       | One-off or irregular transactions |
| `categories` | Shared tags for grouping          |
| `settings`   | User preferences singleton        |

---

## 🧭 Flow Summary Per Page

| Page          | Read                                                                 | Write               | Related API Calls                                              |
| ------------- | -------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------- |
| **Dashboard** | `get-dashboard-summary`, `get-dashboard-history`, `get-urgent-bills` | —                   | `getDashboardSummary`, `getDashboardHistory`, `getUrgentBills` |
| Expenses      | `expenses`                                                           | add, update, delete | `getExpenses`, `addExpense`, `updateExpense`, `deleteExpense`  |
| Income        | `income`                                                             | add, update, delete | `getIncome`, `addIncome`, `updateIncome`, `deleteIncome`       |
| Budget        | `budget`, `expenses`                                                 | add, update, delete | `getBudget`, `addBudget`, `updateBudget`, `deleteBudget`       |
| Misc          | `misc`                                                               | add, update, delete | `getMisc`, `addMisc`, `updateMisc`, `deleteMisc`               |
| Settings      | `settings`                                                           | update              | `getSettings`, `saveSettings`                                  |

---

## 🔁 Common Lifecycle Events

| Event               | Action                                      |
| ------------------- | ------------------------------------------- |
| App boot            | Load settings, latest month                 |
| Switch month        | Re-query all visible data                   |
| Add/Edit/Delete     | Update DB, re-fetch or mutate UI state      |
| Mark paid (expense) | Update DB, Dashboard unpaid count refreshes |
| Theme change        | Save to settings, update CSS + localStorage |

---

## 🧱 Sample Query Flows

### Expenses Page Flow

```text
1. ExpensesPage loads
2. useExpenses("2025-06") → window.api.getExpenses("2025-06")
3. preload.js → ipcRenderer.invoke("get-expenses")
4. main.js → SELECT * FROM expenses WHERE monthId = ?
5. Data returned → UI renders table
```

### Dashboard Page Flow

```text
1. DashboardPage loads
2. useDashboardData("2025-06") calls:
     • window.api.getDashboardSummary("2025-06")
     • window.api.getDashboardHistory({ monthsCount: 6 })
     • window.api.getUrgentBills({ monthId: "2025-06", windowDays: 7 })
3. preload.js → three ipcRenderer.invoke calls
4. main.js → run aggregate and select queries
5. Results returned → hook merges and UI renders cards, chart, and activity lists
```

---

## ✅ Coding Guidelines

- ✅ Use `contextBridge` to whitelist only trusted IPC calls
- ✅ Validate inputs in main process before DB write
- ✅ Use prepared statements consistently
- ✅ Normalize data formats per `DATA_FORMATS.md`
- ✅ Separate data fetching logic from UI components

---

## 🔒 Security Notes

- Renderer never directly imports `better-sqlite3`
- IPC always uses `invoke`/`handle` pattern
- Settings writes guarded by schema constraints
- Sanitize all user inputs (URLs, notes)

---

## 📘 See Also

- [`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md)
- [`DATA_FORMATS.md`](./DATA_FORMATS.md)
- [`EXPENSES_PAGE_DESIGN.md`](./EXPENSES_PAGE_DESIGN.md)
- [`INCOME_PAGE_DESIGN_REVISED.md`](./INCOME_PAGE_DESIGN.md)
- [`DASHBOARD_PAGE_DESIGN_REVISED.md`](./DASHBOARD_PAGE_DESIGN.md)
