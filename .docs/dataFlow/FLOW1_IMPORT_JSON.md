
# 🔁 Flow 1: Import JSON Backup (Merged)

## 🧠 Goal

Allow users to import previously saved JSON backups containing their monthly financial data (expenses, income, misc). This is used to restore from a backup or migrate between instances.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks “Import Backup” from Settings or Toolbar
- File picker opens for `.json` file
- User selects valid backup file

---

### 2. Validation

- Confirm that the uploaded file is:
  - Valid JSON format
  - Matches expected schema
  - Includes version header (optional but recommended)
- If any checks fail:
  - Show error: “Invalid backup format.”

---

### 3. Expected File Format

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

### 4. DB Write

- Replace or merge into existing DB content:
  - Insert months, expenses, income, misc
  - Overwrite currentMonth reference
- Use `bulkAdd` inside a transaction for safety

```ts
db.transaction("rw", db.expenses, db.income, db.misc, () => {
  db.expenses.bulkAdd([...]);
  db.income.bulkAdd([...]);
  db.misc.bulkAdd([...]);
});
```

---

### 5. UI Update

- Update all lists and dashboard
- Rerender charts or summaries if visible
- Show toast/banner: “Backup successfully imported.”

---

## 🔥 Edge Cases

| Case                        | Behavior                      |
|-----------------------------|-------------------------------|
| File is not JSON            | Show file format error        |
| Missing required fields     | Show “Incomplete data” error  |
| Version mismatch (future)  | Warn: "Older version detected" |
| Duplicate month ID          | Prompt to overwrite or merge |
| User cancels import         | No changes made               |

---

## ✅ Output Summary

| Component                     | Behavior                            |
|-------------------------------|-------------------------------------|
| **Affected DB Tables**        | `months`, `expenses`, `income`, `misc` |
| **UI Re-render Required?**    | ✅ Yes                              |
| **User Confirmation Needed?** | ✅ Yes (on overwrite prompts)       |
| **Recoverable?**              | ✅ Yes (user must re-import)        |
