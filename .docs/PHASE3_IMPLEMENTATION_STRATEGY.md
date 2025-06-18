# 🛠️ Phase 3: Core Feature Implementation Strategy

This document outlines the structured plan for implementing Budget Tracker v5's Phase 3 features using the 27 defined data flows. All development follows the SDLC approach and maintains strict alignment with the privacy-first, local-first product philosophy.

---

## ✅ STEP 0: Foundation Check (Completed)

- ✅ Phase 1 requirements and Phase 2 scaffolding complete
- ✅ All 27 data flows reviewed and indexed
- ✅ Backend scaffolding complete:
  - `schema.js`: SQLite schema
  - `dbAccess.js`: Core DB helpers
  - `electron.cjs` + `preload.js`: IPC + database bridge
- ✅ Frontend powered by React + Electron + secure IPC

---

## 🚀 STEP 1: Month Management – Create, List, Select

📌 Covers: `FLOW5`, `FLOW10`, `FLOW23`

### Objective:
Implement full support for month lifecycle:
- View all months
- Create new month (blank or copied)
- Select active month
- Delete month with confirmation

### Tasks:
1. `<MonthSelector />` dropdown with current month state
2. Modal for new month creation:
   - Input `YYYY-MM`
   - Options: blank, copy income, copy expenses, or both
3. IPC:
   - `getAllMonths()`
   - `createMonth(...)`
   - `copyMonthData(...)`
4. Persist selected month in `AppContext`
5. Handle duplicate/invalid months with modals
6. Auto-load most recent month on startup (R1.4)

---

## ⏭️ STEP 2: Income, Expense, Misc – Add/Edit/Delete

📌 Covers: `FLOW2`, `FLOW3`, `FLOW4`, `FLOW6`, `FLOW7`, `FLOW8`, `FLOW9`, `FLOW15`

### Objective:
Build interactive forms and lists for each transaction type.

### Features:
- Add, edit, delete entries
- Mark expenses as paid/unpaid
- Live filtering, sorting, search
- Category-aware rendering
- Visual indicators (e.g., overdue)

---

## 📊 STEP 3: Dashboard Summary View

📌 Covers: `FLOW13`, `FLOW20`

### Features:
- Pull metrics from DB
- Display totals: income, expenses, surplus, unpaid, overdue
- Color-coded warnings (e.g., red for overdue)
- Tooltip and alert integration

---

## 💾 STEP 4: Backup, Restore, & Danger Zone

📌 Covers: `FLOW1`, `FLOW11`, `FLOW12`, `FLOW21`, `FLOW22`, `FLOW23`

### Features:
- Manual JSON import/export
- Confirmed full wipe or month delete
- JSON versioning support
- Error modals for malformed imports

---

## ⚙️ STEP 5: Settings & Preferences

📌 Covers: `FLOW17`, `FLOW18`, `FLOW24`, `FLOW27`

### Features:
- Dark mode toggle
- Default views and month behavior
- UI theme token system
- Version tracking & changelog
- Preferences stored locally or in `settings` table

---

## 🔐 STEP 6: Authentication & Multi-User Support

📌 Covers: `FLOW16`, `FLOW26`

### Features:
- Local sign-in system (email + password)
- `users` table with hashed credentials
- Session persistence (localStorage)
- Optional future: per-user data isolation

---

## 🔁 STEP 7: Recurring & Print Support

📌 Covers: `FLOW19`, `FLOW25`

### Features:
- Create recurring income/expense rules
- Auto-generate transactions on month creation
- Print and PDF export with clean layout and summaries

---

## 🔄 Iteration Cycle

After each step:
1. Full feature is developed and integrated
2. You test and approve
3. A ZIP archive is created as a milestone backup
4. Then we move to the next step

---

All development adheres to the guiding principles of:
- 💾 Local-first persistence
- 🔐 Secure IPC data access
- 🎨 Minimal UI with consistent theming
- 📦 Modular, testable architecture

