# 📁 Project Structure — Budget Tracker App (React + Electron + SQLite)
```
budget-tracker-v5/
├── package.json
├── vite.config.js
├── electron.cjs                 # Main process (Electron launcher + IPC handler)
├── preload.js                   # Secure IPC bridge (contextBridge → window.api)
├── index.html
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx                 # React root entry (renders App.jsx)
│   ├── App.jsx                  # Main app wrapper / layout
│   ├── components/             # React components (UI & pages)
│   │   ├── MonthSelector.jsx   # UI to select or create new months
│   │   └── (coming soon…)      # Dashboard, ExpensesPage, IncomePage, etc.
│   ├── db/                     # SQLite integration layer
│   │   ├── schema.js           # Defines database schema (months, income, expenses, misc)
│   │   └── dbAccess.js         # Query/insert helpers (createMonth, copyMonthData, etc.)
│   ├── styles/                 # Modular CSS (optional)
│   │   └── (theme.css, etc.)
│   └── utils/                  # Utility functions (date helpers, formatting)
│       └── (future use)
├── README.md                   # Project info, setup instructions
└── PHASE2_SUMMARY.md           # SDLC Phase 2 documentation
```