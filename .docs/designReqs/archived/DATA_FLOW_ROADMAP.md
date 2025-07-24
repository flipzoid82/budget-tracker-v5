
# 📊 Budget Tracker – Phase 3 Data Flow Architecture (v5)

This document outlines the complete **data flow roadmap** for Budget Tracker v5 as part of **Phase 3: Core Feature Implementation**. It is based on the app's architecture, design requirements, and finalized schema.

---

## 🧠 Purpose

To define the **end-to-end flow of data** across:

- SQLite storage layer
- Electron main process (IPC handlers)
- Preload bridge (contextBridge + IPC)
- React renderer (hooks + components)

This architecture ensures security, modularity, and consistency across all pages (Dashboard, Expenses, Income, Budget, Misc, Settings).

---

## 📦 Design Requirements (For Context)

- SQLite backend via `better-sqlite3`
- Secure IPC with `contextBridge`, `ipcMain`, `ipcRenderer`
- Modular, reusable, and minimalist UI
- Universal layout (left-nav + top toolbar)
- App defaults to Dashboard
- `YYYY-MM-DD` for dates; `YYYY-MM` for `monthId`
- Categorized, normalized data aligned with `DATA_FORMATS.md`
- Schema defined in `schema.js` and `DATABASE_SCHEMA.md`

---

## 🔄 End-to-End Data Flow

### 1. Renderer (React) → `window.api`

Each page uses hooks or direct calls to request/update data:

```js
const data = await window.api.getExpenses("2025-06");
```

- 🔸 Trigger: User action or page load
- 🔸 Output: Promise that resolves with queried data
- 🔸 Examples:
  - `useExpenses(monthId)`
  - `useIncome(monthId)`
  - `useSettings()`

---

### 2. Preload Bridge (`preload.js`)

Defines the **safe API** exposed to the renderer:

```js
contextBridge.exposeInMainWorld("api", {
  getExpenses: (monthId) => ipcRenderer.invoke("get-expenses", monthId),
  addExpense: (payload) => ipcRenderer.invoke("add-expense", payload),
  // etc.
});
```

- 🔐 Prevents direct Node.js access
- 🧩 Declares exact API shape
- 📎 Matches schema + data types from `DATA_FORMATS.md`

---

### 3. IPC Handlers (`main.js` or `dbHandlers.js`)

Handles all backend requests using `better-sqlite3`:

```js
ipcMain.handle("get-expenses", (event, monthId) => {
  return db.prepare("SELECT * FROM expenses WHERE monthId = ?").all(monthId);
});
```

- Executes queries
- Handles inserts, updates, deletes
- Can return raw or transformed data
- Should validate/sanitize inputs

---

### 4. SQLite Database

Stores all persistent records using the defined schema:

| Table       | Description                     |
|-------------|----------------------------------|
| `months`    | List of month IDs               |
| `expenses`  | Monthly bills (paid/unpaid)     |
| `income`    | Income sources per month        |
| `budget`    | Planned category spending       |
| `misc`      | One-off transactions            |
| `categories`| Shared tags for grouping        |
| `settings`  | Singleton row of preferences    |

---

## 🧭 Flow Summary Per Page

| Page      | Read                            | Write                            | Related API Calls               |
|-----------|----------------------------------|----------------------------------|---------------------------------|
| Dashboard | income, expenses                | —                                | `getIncome`, `getExpenses`     |
| Expenses  | expenses                        | add, update, delete              | `getExpenses`, `addExpense`, `updateExpense` |
| Income    | income                          | add, update, delete              | `getIncome`, `addIncome`, `updateIncome`     |
| Budget    | budget, expenses                | add, update, delete              | `getBudget`, `addBudget`, `updateBudget`     |
| Misc      | misc                            | add, update, delete              | `getMisc`, `addMisc`, `updateMisc`           |
| Settings  | settings                        | update                           | `getSettings`, `saveSettings`  |

---

## 🔁 Common Lifecycle Events

| Event                    | Action                                            |
|--------------------------|---------------------------------------------------|
| App boot                 | Load settings, latest month                      |
| Switch month             | Triggers re-query for all visible data           |
| Add/edit/delete          | Triggers update → re-fetch or mutate UI state    |
| Mark paid (expense)      | Updates DB, Dashboard unpaid count refreshes     |
| Theme change             | Saves to settings, updates CSS + localStorage    |

---

## 🧱 Sample Query Flow: Expenses

```text
1. ExpensesPage loads
2. useExpenses("2025-06") → window.api.getExpenses("2025-06")
3. preload.js → ipcRenderer.invoke("get-expenses")
4. main.js → db.prepare(...).all("2025-06")
5. Results returned to renderer
```

---

## ✅ Coding Guidelines for Data Flow

- ✅ Use `contextBridge` to whitelist only trusted IPC calls
- ✅ Validate inputs in main process before DB write
- ✅ Use prepared statements only
- ✅ Store all data in normalized format
- ✅ Separate data fetching logic from UI components

---

## 🔒 Security Notes

- No renderer should directly access `better-sqlite3`
- IPC is always request/response via `invoke`
- Settings cannot be overwritten by accident (guard with schema constraints)
- Input fields (e.g. URL, notes) should be sanitized

---

## 📘 See Also

- [`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md)
- [`DATA_FORMATS.md`](./DATA_FORMATS.md)
- [`LAYOUT_DESIGN.md`](./LAYOUT_DESIGN.md)
- [`EXPENSES_PAGE_DESIGN.md`](./EXPENSES_PAGE_DESIGN.md)
