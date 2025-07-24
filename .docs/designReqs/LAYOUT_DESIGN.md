# 🧭 Layout – Universal Navigation & Toolbar Design Spec

## 🧠 Purpose

The layout defines the universal shell that wraps every page in the app (Dashboard, Expenses, Income, Budget, Misc, and Settings). It provides:

- Persistent **navigation** on the left
- A responsive **global toolbar** on the right
- Seamless access to global actions (e.g. print, export, dark mode)

---

## 🧱 Structure

### 🧭 1. Left-Aligned Navigation Panel

| Tab | Route |
|-----|-------|
| 📊 Dashboard | `/dashboard` |
| 📁 Expenses | `/expenses` |
| 💰 Income | `/income` |
| 🧾 Misc | `/misc` |
| 📉 Budget | `/budget` |
| ⚙️ Settings | `/settings` |

- Each item styled like a file tab or folder
- Highlighted when active
- Responsive for vertical or collapsible layout

---

### 🛠️ 2. Right-Aligned Global Toolbar

| Button | Description | Icon |
|--------|-------------|------|
| 🖨️ Print | Triggers print view | `IconPrint.jsx` |
| 📥 Import | Opens import modal | `IconImport.jsx` |
| 📤 Export | Exports current view | `IconDownload.jsx` |
| 🌙 Theme | Toggles dark/light | `IconMoon.jsx` / `IconMoonOff.jsx` |
| 💾 Save | Manual save trigger | `IconSave.jsx` |
| ⬇️ / ⬆️ Nav | Dropdown-style jump links | `DownArrowIcon`, `UpArrowIcon` |

> Tooltips will appear on hover to describe actions

---

## 🔄 Reusability

- The layout will be defined in a reusable `Layout.jsx` file
- Every page (including Settings) will be wrapped with this layout
- Toolbar actions are exposed via props/context for per-page overrides

---

## 🎨 Styling

- `.layout.css` or `Layout.module.css`
- Responsive design: collapses nav bar on mobile
- Dark mode aware
- Sticky/fixed top bar for global tools
- Left nav uses compact vertical tabs or icon+label layout

---

## 🔐 Behavior

| Trigger | Result |
|--------|--------|
| Click nav tab | Switch route + highlight selected tab |
| Hover toolbar button | Show tooltip |
| Toggle theme | Switch and persist theme preference |
| Resize window | Layout adapts fluidly |

---

## ✅ Recap Summary

| Feature | Status |
|--------|--------|
| Nav bar (left) | ✅ |
| Toolbar (right) | ✅ |
| Icon integration | ✅ |
| Responsive layout | ✅ |
| Wrapped around all app pages | ✅ |
| Contextual overrides (optional) | ✅ |
