# 💸 Budget Tracker v5

_A privacy-first, offline-first budgeting app built with React + Electron._

![Version](https://img.shields.io/badge/version-v5.0.0-blue)
![Built With](https://img.shields.io/badge/built%20with-React%20%2B%20Electron-orange)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## 📚 Overview

Budget Tracker v5 is a local-first desktop application that helps users track monthly income, expenses, and financial surplus. Built with performance, privacy, and intuitive design in mind.

## ✨ Features

- Monthly budgeting with copy-from-previous
- Expense and income tracking with categories
- Paid/unpaid status with confirmation fields
- Local JSON import/export for backups
- Dark mode, minimal UI, and responsive layout
- Future-ready for recurring entries and cloud sync

## 🧱 Tech Stack

- [React](https://reactjs.org/)
- [Electron](https://www.electronjs.org/)
- [Vite](https://vitejs.dev/)
- [SQLite](https://www.sqlite.org/) or [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Vitest](https://vitest.dev/) for unit tests
- [Playwright](https://playwright.dev/) for E2E (planned)

# 📁 Budget Tracker Project Structure

```
budget-tracker-v5/
├── .docs/                           # ✅ Flow documentation files
│   └── FLOW01_*.md                 # ...up to FLOW27
├── public/
│   └── index.html                  # Base HTML template
├── src/
│   ├── assets/                     # Static assets (images, logos)
│   ├── components/                 # Reusable UI components
│   │   ├── common/                 # Buttons, modals, tooltips, etc.
│   │   ├── dashboard/              # Dashboard-specific components
│   │   ├── expenses/               # Expense list, form, table
│   │   ├── income/                 # Income list, form, table
│   │   ├── misc/                   # Misc transactions section
│   │   └── budget/                 # Budget page components
│   ├── pages/                      # Route pages (wrapped in layout)
│   │   ├── DashboardPage.jsx
│   │   ├── ExpensesPage.jsx
│   │   ├── IncomePage.jsx
│   │   ├── MiscPage.jsx
│   │   ├── BudgetPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── SignInPage.jsx
│   ├── context/
│   │   └── AppContext.jsx         # Global context provider
│   ├── db/
│   │   ├── schema.js              # DB schema definition
│   │   ├── dbAccess.js            # SQLite query helpers
│   │   └── database.sqlite3       # Actual database (gitignored)
│   ├── styles/
│   │   ├── globals.css            # Root-level theming
│   │   └── [component].module.css # Scoped CSS per component
│   ├── utils/
│   │   ├── dateUtils.js
│   │   ├── calcUtils.js
│   │   └── storageUtils.js
│   ├── App.jsx                    # Root app logic
│   ├── main.jsx                   # Entry point (ReactDOM)
│   └── routes.jsx                 # React Router route config
├── electron/
│   ├── electron.cjs               # Electron main process
│   └── preload.js                 # Secure preload bridge (IPC)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/budget-tracker-v5.git
cd budget-tracker-v5
npm install
npm run dev     # Start Vite dev server
npm run electron  # Launch Electron app
```

Made with 💙 by [Joesh Bautista](https://github.com/flipzoid82)
🧠 Licensed for personal use — license TBD
