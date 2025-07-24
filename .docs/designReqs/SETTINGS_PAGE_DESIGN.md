# ⚙️ Settings Page – Design Spec

## 🧠 Purpose

The Settings page provides a centralized interface for users to customize preferences, configure themes, and manage app behavior. It does **not** affect financial data directly, but controls the environment in which data is displayed and managed.

---

## 🧱 Structure (Top to Bottom)

### ✅ 1. Section Title

```
⚙️ Settings & Preferences
```

---

## ✅ 2. Preferences Form

Grouped into collapsible sections or cards:

### 🎨 Theme

| Field | Description |
|-------|-------------|
| Theme Toggle | Light / Dark / Auto |
| Accent Color | Optional color picker (future)

---

### 🧩 Data Options

| Field | Description |
|-------|-------------|
| Default Start Page | Dropdown: Dashboard, Expenses, Income, etc. |
| Default Month Behavior | Dropdown: “Open most recent”, “Open current month”, or “Remember last viewed” |
| Auto-save toggle | Enable/disable autosave on every change

---

### 🔔 Notifications

| Field | Description |
|-------|-------------|
| Overdue Bill Alerts | On/Off |
| Monthly Budget Warnings | On/Off |
| Income Received Reminders | On/Off (future)

---

### 🛡️ Security (Future)

| Field | Description |
|-------|-------------|
| Sign-In Lock | Toggle login on startup |
| Multi-user Mode | Enable user switching support |
| Password Encryption | Protect local DB (future)

---

### 🛠️ Maintenance

| Button | Description |
|--------|-------------|
| Backup Now | Creates a `.json` or `.sqlite` backup |
| Restore from File | Imports `.json` or `.sqlite` file |
| Reset App | Danger zone button, clears all local data (confirmation required)

---

## 🔒 Data Dependencies

- Stored in `settings` table or dedicated JSON file
- Accessed on app boot via preload
- Exposed to renderer via `window.api.getSettings()` and `window.api.saveSettings(changes)`

---

## ✅ Recap Summary

| Feature | Status |
|--------|--------|
| Theme toggle | ✅ |
| Start page & default month options | ✅ |
| Notifications config | ✅ |
| Backup + restore | ✅ |
| Danger zone: Reset app | ✅ |
| Modular layout (future expandable) | ✅ |
| Dark mode friendly | ✅ |
