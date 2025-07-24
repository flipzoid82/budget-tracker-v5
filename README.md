# 💸 Budget Tracker v5

_A privacy-first, offline-first desktop budgeting app built with React + Electron._

![Version](https://img.shields.io/badge/version-v5.0.0-blue)
![Built With](https://img.shields.io/badge/built%20with-React%20%2B%20Electron-orange)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## 📚 Overview

Budget Tracker v5 is a local-first desktop application that helps users:

- Track monthly income, expenses, and miscellaneous transactions.
- Define and manage category-based budgets and compare actual spending vs. planned.
- View a dynamic dashboard with summary cards, trend charts, and activity lists.
- Perform full CRUD operations with modal dialogs and inline category badges.
- Search, sort, and filter data in real time.
- Import/export data for backup and restore via JSON.
- Enjoy dark mode and responsive design.

---

## ✨ Features

- **Dashboard**: Summary cards, 6‑month trend chart, overdue/upcoming/recently‑paid activity.
- **Expenses**: Add/Edit/Delete, mark paid/unpaid, confirmation codes, inline badges, sorting, search.
- **Income**: Add/Edit/Delete, source tracking, date received, sorting, search.
- **Budget**: Set planned spending per category, compare actual vs. planned.
- **Misc Transactions**: Log one‑off items without date requirements.
- **Settings**: Toggle preferences (theme, notifications, import/export).
- **Sign‑In Page**: Local authentication with “Remember Me” support.
- **Data Import/Export**: JSON backup & restore.
- **Dark Mode**: Theme toggle integrated across all pages.
- **Responsive UI**: Tables scroll horizontally; layout adapts to window size.
- **Testing**: Unit tests with Vitest; E2E tests planned with Playwright.

---

## 🧱 Tech Stack

- **Framework**: React (with hooks & context)  
- **Desktop Shell**: Electron (main + preload bridge)  
- **Bundler**: Vite  
- **Database**: SQLite (via better-sqlite3)  
- **Styling**: CSS Modules & global variables  
- **Testing**: Vitest for components; Playwright (planned) for E2E  

---

## 📁 Project Structure

```text
budget-tracker-v5/
│   .gitignore
│   budget.json
│   budget.sqlite3
│   electron.cjs
│   index.html
│   package.json
│   preload.js
│   README.md
│   schema.js
│   vite.config.js
│
├── .docs/                            # Flow & design documentation fileciteturn31file1
│   ├── dataFlow/                     # IPC & data flow specs
│   └── designReqs/                   # Page design requirements
│
├── ipc/                              # Main-process IPC handlers
│   ├── db.js
│   ├── dbHandlers.js
│   └── importJsonBackup.js
│
├── scripts/                          # Utility & migration scripts
│   ├── fixIncomeSchema.js
│   └── seed_categories.sql
│
└── src/                              # Renderer source files
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── common/                   # Buttons, modals, badges, menus
    │   ├── dashboard/                # Dashboard UI components
    │   ├── expenses/                 # Expense table & form
    │   ├── income/                   # Income table & form
    │   ├── misc/                     # Misc transactions
    │   ├── budget/                   # Budget planner
    │   └── modals/                   # Prompt & warning modals
    │
    ├── context/                      # React contexts (e.g., MonthContext)
    ├── hooks/                        # Data fetching hooks (useExpenses, useDashboardData, etc.)
    ├── icons/                        # SVG icon components
    ├── pages/                        # Route-level page components
    ├── styles/                       # Global and page-level CSS
    └── utils/                        # Formatters, date utils, category colors
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/flipzoid82/budget-tracker-v5.git
cd budget-tracker-v5
npm install
npm run dev       # Start Vite dev server
npm run electron  # Launch Electron application
```

---

Made with 💙 by [Joesh Bautista](https://github.com/flipzoid82)  
🧠 Licensed for personal use — license TBD
