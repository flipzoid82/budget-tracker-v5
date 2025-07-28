# 🧭 Layout – Universal Navigation & Header Controls Design Spec

## 🧠 Purpose

The layout defines the universal shell that wraps every page in the app (Dashboard, Expenses, Income, Budget, Misc, and Settings). It provides:

- Persistent **navigation** on the left
- A responsive **global toolbar** on the right
- A dedicated **header controls** area just below the toolbar for month-related actions

---

## 🧱 Structure

### 🧭 1. Left-Aligned Navigation Panel

| Tab           | Route         |
|---------------|---------------|
| 📊 Dashboard  | `/dashboard`  |
| 📁 Expenses   | `/expenses`   |
| 💰 Income     | `/income`     |
| 🧾 Misc       | `/misc`       |
| 📉 Budget     | `/budget`     |
| ⚙️ Settings   | `/settings`   |

- Styled as folder-like tabs, highlighted when active
- Collapsible/responsive on smaller screens

---

### 🛠️ 2. Right-Aligned Global Toolbar

| Button        | Description                     | Icon                             |
|---------------|---------------------------------|----------------------------------|
| 🖨️ Print      | Opens print dialog              | `IconPrint.jsx`                  |
| 📥 Import     | Opens import modal              | `IconImport.jsx`                 |
| 📤 Export     | Exports current view            | `IconDownload.jsx`               |
| 🌙 Theme      | Toggles dark/light mode         | `IconMoon.jsx` / `IconMoonOff.jsx` |
| 💾 Save       | Saves current state             | `IconSave.jsx`                   |
| ⬇️ / ⬆️ Nav   | Jump links dropdown             | `DownArrowIcon` / `UpArrowIcon`  |

> Tooltips describe each action on hover.

---------------|---------------------------------|----------------------------------|
| 🖨️ Print      | Opens print dialog              | `IconPrint.jsx`                  |
| 📥 Import     | Opens import modal              | `IconImport.jsx`                 |
| 📤 Export     | Exports current view            | `IconDownload.jsx`               |
| 🌙 Theme      | Toggles dark/light mode         | `IconMoon.jsx` / `IconMoonOff.jsx` |
| 💾 Save       | Saves current state             | `IconSave.jsx`                   |
| ➕ New Month  | Opens modal to create a new month | `IconPlus.jsx`                 |
| ⬇️ / ⬆️ Nav   | Jump links dropdown             | `DownArrowIcon` / `UpArrowIcon`  |

> Tooltips describe each action on hover.

---

### 📅 3. Header Controls

This sits directly below the toolbar and above page content, grouping month-related controls:

<div class="header-controls" style="display:flex;align-items:center;gap:0.5rem;">
  <span><strong>📆 Month Selector</strong> – Active month picker (YYYY‑MM)</span>
  <span><strong>➕ New Month</strong> – Opens “Create New Month” modal</span>
</div>

---

## ✨ New Month Workflow Defaults

These are the out-of-the-box cloning behaviors and UI hints for the initial release:

| Option               | Default Behavior                                                                                  |
|----------------------|---------------------------------------------------------------------------------------------------|
| **Budgets**          | Disabled (coming soon) – checkbox shows tooltip “Coming soon”                                      |
| **Misc**             | Disabled (coming soon) – checkbox shows tooltip “Coming soon”                                      |
| **Income**           | ✅ Copy all income entries. Keep the same day; update month component of dates (handles year rollover). |
| **Expenses**         | ✅ Copy all recurring expense templates (name, amount, day). Strip paid flags, dates, confirmations, URLs; update due dates to new month (preserve day, adjust for month/year). |
| **Paid Flags & Meta**| ❌ Excluded by default (no stale “paid” statuses); no checkbox exposed until power‑user feature.         |

> MonthModal will expose only Income and Expenses checkboxes initially; Budgets/Misc grayed out with tooltips.

---

## 🔄 Reusability

- Defined in a single `Layout.jsx` component
- All pages (including Settings) are wrapped by Layout
- Header controls and workflow defaults are configurable via props or context

---

## 🎨 Styling

- `.layout.css` or `Layout.module.css`
- Responsive: nav collapses on mobile, header controls wrap gracefully
- Dark mode compliant
- Sticky/fixed top bar and header-controls area

---

## 🔐 Behavior

| Trigger                  | Result                                                           |
|--------------------------|------------------------------------------------------------------|
| Click nav tab            | Route switch + active highlighting                                |
| Hover toolbar button     | Show tooltip                                                     |
| Click theme toggle       | Persist and apply theme                                          |
| Click ➕ New Month        | Open month creation modal next to MonthSelector                  |
| Resize window            | Layout adapts (nav collapse or expand, header-controls wrap)     |

---

## ✅ Recap Summary

| Feature                             | Status |
|-------------------------------------|:------:|
| Nav bar (left)                      | ✅     |
| Global toolbar (right)              | ✅     |
| Header controls (Month + New Month) | ✅     |
| Clone defaults (Income + Expenses)  | ✅     |
| Budgets/Misc placeholders           | ✅     |
| Responsive layout                   | ✅     |
| Dark mode compatibility             | ✅     |
| Contextual overrides supported      | ✅     |