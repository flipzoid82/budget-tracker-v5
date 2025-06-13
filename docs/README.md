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

## 📁 Project Structure

budget-tracker-v5/
├── src/ # React components and logic
├── docs/ # SDLC documentation (like Phase1 Requirements)
├── public/ # Static assets
├── tests/ # Vitest unit/integration tests
├── main.js # Electron entry
├── preload.js # IPC bridge (secure)
├── .gitignore
├── package.json
└── README.md

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

