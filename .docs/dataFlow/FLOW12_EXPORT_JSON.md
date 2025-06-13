# 📤 Flow 12: Export JSON Backup

## 🧠 Goal

Allow users to export their financial data (months, expenses, income, misc) into a JSON file for backup, migration, or syncing purposes.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks “Export Backup” button from settings or toolbar
- App prepares a `.json` file containing all current financial data

---

### 2. Data Format

```json
{
  "version": "1.0",
  "exportedAt": "2025-06-13T12:00:00Z",
  "months": [ ... ],
  "expenses": [ ... ],
  "income": [ ... ],
  "misc": [ ... ]
}
```

Each item includes:

- `monthId`
- Proper formatting of dates as ISO strings
- All standard fields required to recreate DB records

---

### 3. DB Read

Query all four tables:

```ts
const months = await db.months.toArray();
const expenses = await db.expenses.toArray();
const income = await db.income.toArray();
const misc = await db.misc.toArray();
```

Then serialize into a single object and stringify for download.

---

### 4. Save / Download

- Generate a download with a filename like:  
  `budget-backup-2025-06-13.json`
- Automatically prompt download via a link or Blob API
- Optional: show “Backup saved!” confirmation

---

## 🔥 Edge Cases

| Case                  | Behavior                           |
| --------------------- | ---------------------------------- |
| No data exists        | Show message: “Nothing to export.” |
| Export interrupted    | Allow retry                        |
| User cancels download | No-op                              |
| Large dataset         | Consider showing loading spinner   |

---

## ✅ Output Summary

| Component                     | Behavior                                  |
| ----------------------------- | ----------------------------------------- |
| **Reads From**                | `months`, `expenses`, `income`, `misc`    |
| **Writes To**                 | Downloaded `.json` file                   |
| **UI Re-render Required?**    | ❌ No                                     |
| **User Confirmation Needed?** | ❌ No (unless showing preview)            |
| **Recoverable?**              | ✅ Yes — file can be imported via Flow 11 |
