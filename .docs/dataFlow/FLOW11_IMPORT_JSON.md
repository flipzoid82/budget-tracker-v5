# 📥 Flow 11: Import JSON Backup

## 🧠 Goal

Allow users to import previously saved JSON backups containing their monthly financial data (expenses, income, misc). This is used to restore from a backup or migrate between instances.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks “Import Backup” from settings or toolbar
- File picker opens for `.json` file
- User selects valid backup file

---

### 2. Validation

- Confirm that the uploaded file is:
  - Valid JSON format
  - Matches expected schema
  - (Optional) Includes version header

If any of these fail → show error: “Invalid backup format.”

---

### 3. Preview (Optional Enhancement)

- Show a preview of what will be imported:
  - Number of months
  - Expense/income counts
  - Warning if this will overwrite existing data

---

### 4. DB Write

- Clear existing data (optional or user choice)
- Parse JSON and insert into:

```ts
await db.transaction(
  "rw",
  db.months,
  db.expenses,
  db.income,
  db.misc,
  async () => {
    await db.months.clear();
    await db.expenses.clear();
    await db.income.clear();
    await db.misc.clear();

    // Then batch insert parsed data
  }
);
```

---

### 5. UI Update

- Reload current month or set imported latest month as default
- Refresh all views (Dashboard, Income, Expenses, etc.)
- Show toast/banner “Data imported successfully”

---

## 🔥 Edge Cases

| Case                     | Behavior                |
| ------------------------ | ----------------------- |
| Corrupt JSON file        | Show validation error   |
| Incomplete structure     | Show warning and reject |
| Duplicate month names    | Overwrite or warn       |
| User cancels file picker | No changes made         |

---

## ✅ Output Summary

| Component                     | Behavior                                               |
| ----------------------------- | ------------------------------------------------------ |
| **Reads From**                | Uploaded `.json`                                       |
| **Writes To**                 | All DB tables (`months`, `expenses`, `income`, `misc`) |
| **UI Re-render Required?**    | ✅ Yes                                                 |
| **User Confirmation Needed?** | ✅ Yes, especially if wiping old data                  |
| **Recoverable?**              | ✅ Yes (if versioning is used or backup was good)      |
