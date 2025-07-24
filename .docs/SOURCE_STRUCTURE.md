# 📁 Source Code Structure – Budget Tracker v5 (Phase 3)

This document outlines the proposed `/src/` and project-level file structure for the Budget Tracker v5 app, based on all finalized requirements, schema, and flows.

---

## 🧠 Core Principles

- **Modular**: Components are decoupled and reusable
- **Minimalist**: Clean and focused files with clear responsibilities
- **Secure**: Renderer accesses backend only through `window.api` via preload
- **Structured**: Follows SDLC and documentation-driven development

---

## 🗂️ `/src/` Directory Structure

```
/src/
├── App.jsx                        # Root component with layout + routing
├── main.jsx                       # React DOM mount point
├── preload.js                     # contextBridge APIs → exposes window.api
├── electron.cjs                   # Main Electron process, schema + IPC boot

├── components/
│   ├── pages/
│   │   ├── DashboardPage.jsx           # Future (not yet implemented)
│   │   ├── ExpensesPage.jsx
│   │   ├── IncomePage.jsx
│   │   ├── [MiscPage.jsx]              # Future (not yet implemented)
│   │   ├── [BudgetPage.jsx]            # Future (not yet implemented)
│   │   └── [SettingsPage.jsx]          # Future (not yet implemented)
│   ├── common/
│   │   ├── MonthSelector.jsx
│   │   ├── DropdownMenu.jsx
│   │   ├── CategoryBadge.jsx
│   │   └── [Toolbar.jsx]               # Global toolbar (Future; per-page toolbars in use)
│   ├── tables/
│   │   ├── DataTable.jsx
│   │   ├── ExpenseTable.jsx
│   │   ├── IncomeTable.jsx
│   │   ├── [MiscTable.jsx]             # Future
│   │   └── [BudgetTable.jsx]           # Future
│   └── icons/
│       ├── IconArrowUp.jsx
│       ├── IconArrowDown.jsx
│       ├── IconHamburgerMenu.jsx
│       └── IconWarningSolid.jsx
├── pages/                              # Entry-point pages (used by router)
│   ├── DashboardPage.jsx              # Future
│   ├── ExpensesPage.jsx
│   ├── IncomePage.jsx
│   └── [MiscPage.jsx]                  # Future
├── context/
│   └── MonthContext.jsx
├── hooks/
│   ├── useExpenses.js
│   ├── useIncome.js
│   ├── [useMisc.js]                    # Future
│   └── useCategories.js
├── modals/
│   ├── PromptModal.jsx
│   ├── WarningModal.jsx
│   └── [ErrorModal.jsx]                # Future
├── styles/
│   ├── DataTable.css
│   ├── ExpensesPage.css
│   ├── IncomePage.css
│   └── [layout.css]                    # Global layout styles (Future)
├── utils/
│   ├── formatters.js
│   ├── dates.js
│   ├── categoryColors.js
│   └── [validators.js]                 # Future
├── /assets/                       # Icons, fonts, logos
│   ├── logo.svg
│   ├── icons/
│   ├── fonts/

├── /tests/                        # Vitest unit and integration tests
│   ├── Dashboard.test.jsx
│   ├── ExpensesFlow.integration.test.jsx
│   ├── IncomeFlow.integration.test.jsx

├── index.css                      # Global CSS reset and themes
├── vite.config.js
├── package.json
```

---

## 🧱 Electron Root-Level Files

```
/electron.cjs              # Main process bootstrap
/preload.js                # Secure bridge: exposes API to renderer
/schema.js                 # Loaded at runtime to set up DB schema
/budget.sqlite3            # Local SQLite database (not tracked in git)
```

---

## 🔒 Optional Future Directories

- `/migrations/` → SQLite schema migration files
- `/config/` → Environment flags or global constants
- `/data/` → Seeded sample JSON for import/export

---

## 📌 Notes

This structure is SDLC-aligned and extensible for future enhancements like multi-user, recurring logic, and versioning support.
