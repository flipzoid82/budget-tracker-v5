# 💸 Budget Tracker v5

_A privacy-first, local-first budgeting app built with React, Electron, and love._

![Version](https://img.shields.io/badge/version-v5.0.0-blue)
![Built With](https://img.shields.io/badge/built%20with-React%20%2B%20Electron-orange)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## 🧭 Project Purpose

**Project Name:** Budget Tracker v5  
**Type:** Desktop-first application (Electron + React + SQLite/IndexedDB)  
**Primary User:** Joesh Bautista (for personal use); potential public release later  

**Main Goal:**  
> To help users efficiently track their monthly income, expenses, and surplus—locally, privately, and with an interface that’s intuitive, minimal, and responsive.

**Why This Exists:**  
Joesh wants to build a budget tool from the ground up—not just to manage his own finances, but to create something practical and personal. Rather than relying on Mint, YNAB, or spreadsheets, this app is an opportunity to build a reliable, user-owned solution that aligns with his design standards and development goals.

**Product Philosophy:**
- 🛡 **Privacy-first (local data only)**
- ⚡ **Performance-focused**
- 🎨 **Minimal UI, thoughtfully styled**
- 📦 **Portable & offline**
- 🔮 **Future-ready** (bank API integration later)

---

## 📆 Month Management

| ID   | Requirement |
|------|-------------|
| R1.1 | Users can create a new month manually. |
| R1.2 | Users can choose to create a blank month or copy the previous month’s data. |
| R1.3 | Users can delete any existing month. |
| R1.4 | The most recently created month is auto-loaded on startup. |
| R1.5 | Months are fixed and not renamed (e.g., “JUN2025”). |

---

## 💸 Expense Tracking

| ID   | Requirement |
|------|-------------|
| R2.1 | Users can add, edit, or delete expense items per month. |
| R2.2 | Each expense includes: `name`, `amount`, `dueDate`, `paidDate`, `confirmation`, `url`, and `category`. |
| R2.3 | Expenses can be marked as paid/unpaid with a visual indicator. |
| R2.4 | Marking as paid prompts the user to enter `confirmation` and select a `paidDate`. No fields are auto-filled. |
| R2.5 | Optional `url` field links to external bill pay sites. |
| R2.6 | Expenses are grouped by `category`. |
| R2.7 | _(Planned)_ Recurring expenses will auto-populate in future months. |

---

## 💰 Income Tracking

| ID   | Requirement |
|------|-------------|
| R3.1 | Users can add, edit, or delete income entries per month. |
| R3.2 | Each income includes: `source`, `amount`, `dateReceived`, `notes`, and `category`. |
| R3.3 | Multiple income sources can exist per month. |
| R3.4 | Income entries are fully editable and deletable. |
| R3.5 | Income categories support future filtering and reporting. |
| R3.6 | _(Planned)_ Recurring income will be supported in the future. |

---

## 📊 Dashboard Summary

| ID   | Requirement |
|------|-------------|
| R4.1 | Dashboard shows: total income, expenses, unpaid, surplus, overdue bills, upcoming bills, and optional budget summary. |
| R4.2 | Visualized using color-coded info boxes (e.g., red for warnings, green for success). |
| R4.3 | Alerts shown for: over-budget, due soon, and overdue bills. |
| R4.4 | _(Planned)_ Users will be able to customize dashboard layout and visibility. |
| R4.5 | _(TBD)_ Option to show selected insights from previous months. |

---

## 📦 Data Handling

| ID   | Requirement |
|------|-------------|
| R5.1 | Import structured JSON backups for migration or spreadsheet conversion. |
| R5.2 | Export all data as a JSON file for manual backup. |
| R5.3 | Use either **IndexedDB (Dexie.js)** or **SQLite** for local storage. |
| R5.4 | _(Future-ready)_ Support versioned data formats to ensure backward compatibility. |
| R5.5 | _(Planned)_ Cloud sync and/or encrypted backups after stable v1.0 release. |

---

## ⚙️ Non-Functional Requirements

| ID   | Requirement |
|------|-------------|
| N1   | Built with React + Electron + Vite; storage via IndexedDB or SQLite. |
| N2   | CSS follows hybrid model: `theme.css` for shared styles, **modular CSS per component**, and **no inline styles** unless necessary. |
| N3   | UI is consistently styled and minimal by default. |
| N4   | App must remain fast with 24+ months of historical data. |
| N5   | Every release is versioned (e.g. `v5.0.0`) and tied to a downloadable ZIP archive. |
| N6   | Core features tested via Vitest + React Testing Library; Playwright added post-v1. |
| N7   | Offline-first: the app works without internet access. |
| N8   | Errors are surfaced through modals or visible UI alerts. |
| N9   | Data can be restored via manual JSON import. |
| N10  | The app reflects the dev’s values: **privacy**, **clarity**, and **daily usability**. |

---

Made with 💙 by [Joesh Bautista](https://github.com/flipzoid82)  
🧠 Licensed for personal use — license TBD
