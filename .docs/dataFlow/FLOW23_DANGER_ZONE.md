
# ☠️ Flow 23: Settings - Data Wipe / Danger Zone (Phase 3 Aligned)

## 🧠 Goal

Allow users to perform destructive actions such as wiping all data or deleting specific months, with strong confirmation safeguards in place and secure backend logic via IPC and database transactions.

---

## 🔄 Flow Breakdown

### 1. Accessing the Danger Zone

- ⚙️ Located under: **Settings > Danger Zone**
- Collapsed section with red styling
- Expandable to show options

---

### 2. Available Actions

#### ✅ Delete Specific Month

- Dropdown or list to select a month
- Confirmation modal:
  > “Are you sure you want to permanently delete data for `MAR 2025`? This action cannot be undone.”
- IPC Call: `window.api.deleteMonth("2025-03")`

#### ✅ Wipe All Data

- Full app reset (clears all months, income, expenses, misc, budget, settings)
- Confirmation modal:
  > “This will erase ALL your data. Type **DELETE** to confirm.”
- IPC Call: `window.api.wipeAllData()`

---

### 3. Security & IPC

All destructive actions must be initiated through secure, validated IPC channels.

#### Preload (`preload.js`)
```js
contextBridge.exposeInMainWorld("api", {
  deleteMonth: (monthId) => ipcRenderer.invoke("danger-delete-month", monthId),
  wipeAllData: () => ipcRenderer.invoke("danger-wipe-all"),
});
```

#### Main Process (`main.js`)
```js
ipcMain.handle("danger-delete-month", (_, monthId) => {
  const tx = db.transaction(() => {
    db.prepare("DELETE FROM budget WHERE monthId = ?").run(monthId);
    db.prepare("DELETE FROM misc WHERE monthId = ?").run(monthId);
    db.prepare("DELETE FROM expenses WHERE monthId = ?").run(monthId);
    db.prepare("DELETE FROM income WHERE monthId = ?").run(monthId);
    db.prepare("DELETE FROM months WHERE id = ?").run(monthId);
  });
  tx();
});

ipcMain.handle("danger-wipe-all", () => {
  const tx = db.transaction(() => {
    db.prepare("DELETE FROM budget").run();
    db.prepare("DELETE FROM misc").run();
    db.prepare("DELETE FROM expenses").run();
    db.prepare("DELETE FROM income").run();
    db.prepare("DELETE FROM months").run();
    db.prepare("DELETE FROM settings").run();
    db.prepare("DELETE FROM categories").run();
  });
  tx();
});
```

---

### 4. UX and Styling

- Use red buttons/icons
- Require user to re-type confirmation phrase for full wipe
- Display warnings and consequences clearly

---

### 5. Edge Cases

| Case                      | Behavior                                                            |
|---------------------------|---------------------------------------------------------------------|
| User cancels halfway      | Nothing is deleted                                                  |
| App crashes mid-delete    | Transactions prevent partial deletion                               |
| Wrong confirmation phrase | Prevent action                                                      |
| Deleting current month    | Load fallback or clear currentMonth selection                       |

---

## ✅ Output Summary

| Component                     | Behavior                                           |
|-------------------------------|----------------------------------------------------|
| **Reads From**                | `months`, `income`, `expenses`, `misc`, `budget`, `settings`, `categories` |
| **Writes To**                 | ✅ On confirmed deletion                           |
| **IPC-secured?**             | ✅ Yes                                             |
| **UI Re-render Required?**    | ✅ After delete                                    |
| **Recoverable?**              | ❌ No (irreversible, warn clearly)                |
