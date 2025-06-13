# 🔁 Flow 1: Import JSON Backup

## 🧠 Goal

User imports a backup file (`.json`) → data is parsed → stored in DB → rendered in the UI.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User selects and uploads a `.json` file via the "Import Backup" modal or settings menu.

---

### 2. Expected File Format

```json
{
  "currentMonth": "2025-03",
  "months": {
    "2025-03": {
      "income": [...],
      "expenses": [...],
      "misc": [...]
    },
    "2025-04": {
      ...
    }
  }
}
```

---

### 3. Parsing Logic

For each `monthId` in `months`:

- ✅ Check if month already exists in DB
  - If yes: prompt user to **overwrite, merge, or skip**
  - If no: create a new `Month` entry

Then:

- Parse `income[]` → insert into `Income` table
- Parse `expenses[]` → insert into `Expense` table
- Parse `misc[]` → insert into `Misc` table

Assign `monthId` from the parent key (e.g. `"2025-03"`)

---

### 4. Database Writes

Use a transaction:

```ts
db.transaction("rw", db.months, db.income, db.expenses, db.misc, async () => {
  // Clear or merge depending on user action
  // Insert records
});
```

---

### 5. UI Update

After DB write:

- Set app state to `currentMonth` from the file
- Re-render: Income, Expenses, Misc, and Dashboard
- Show success toast/banner (e.g. “4 months imported successfully”)

---

## 🔥 Edge Cases

| Case                | Behavior                                        |
| ------------------- | ----------------------------------------------- |
| File missing fields | Show error modal                                |
| Invalid month keys  | Skip and show warning                           |
| Duplicate records   | Ask user: overwrite, skip, or merge             |
| Malformed JSON      | Show error: “Invalid format. Could not import.” |

---

## ✅ Output Summary

| Component                     | Behavior                                            |
| ----------------------------- | --------------------------------------------------- |
| **Affected DB Tables**        | `months`, `expenses`, `income`, `misc`              |
| **UI Re-render Required?**    | ✅ Yes                                              |
| **User Confirmation Needed?** | ✅ Yes (if overwrite or merge risk)                 |
| **Recoverable?**              | ✅ Yes (user can re-import or export current state) |
