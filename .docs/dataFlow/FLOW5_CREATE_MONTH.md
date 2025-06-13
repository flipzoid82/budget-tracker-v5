# 📅 Flow 5: Create New Month (Blank or Copy)

## 🧠 Goal

User creates a new budget month manually. They can either:

- Start **blank** with no data, or
- **Copy** bills and/or income from the previous month.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks “➕ New Month” on Month selector or toolbar
- A modal prompts:

  - Enter new month (e.g. `2025-07`)
  - Option to:
    - Start blank
    - Copy bills only
    - Copy income only
    - Copy both

---

### 2. Validation

- New month ID must be in `YYYY-MM` format
- It must not already exist in the database
- Prevent accidental overwrite with a warning if it somehow exists

---

### 3. Data Construction

#### Blank Month

- Create empty entries for:
  - `monthId` in metadata (optional)

#### Copy from Previous

- Clone records from previous month:
  - Expenses: Copy `name`, `amount`, `dueDate`, `url`, `category`
    - Reset: `paid`, `paidDate`, `confirmation`
  - Income: Copy `source`, `amount`, `category`
    - Reset: `dateReceived`, `notes`
  - Misc: Not copied (misc is ad hoc)

```ts
const newExpense = {
  ...oldExpense,
  id: uuidv4(),
  paid: false,
  paidDate: "",
  confirmation: "",
  monthId: "2025-07",
};
```

---

### 4. DB Write

Insert new records for `expenses`, `income`, etc., using batch insert:

```ts
await db.transaction("rw", db.expenses, db.income, () => {
  db.expenses.bulkAdd([...copiedExpenses]);
  db.income.bulkAdd([...copiedIncome]);
});
```

---

### 5. UI Update

- Month selector now includes the new month
- Automatically switch context to the new month
- Re-render Expenses, Income, Misc, and Dashboard

---

## 🔥 Edge Cases

| Case                           | Behavior                       |
| ------------------------------ | ------------------------------ |
| Duplicate month ID             | Block with error message       |
| No data in previous month      | Show “nothing to copy” warning |
| Copy but partial source exists | Only copy available tables     |
| User cancels                   | Dismiss modal, no changes      |

---

## ✅ Output Summary

| Component                     | Behavior                                         |
| ----------------------------- | ------------------------------------------------ | --- |
| **Affected DB Tables**        | `expenses`, `income`, `misc` (metadata optional) |
| **UI Re-render Required?**    | ✅ Yes                                           |
| **User Confirmation Needed?** | ✅ Yes (for copy options)                        |
| **Recoverable?**              | ✅ Yes (user can delete the month afterward)     | --- |

## 📅 Bonus: Smart Date Increment on Copy

When copying from a previous month, the app will automatically increment the **month portion** of all date fields by +1 to reflect the new month.

### 🔄 Adjusted Fields

| Table   | Field        | Example From | Example To |
| ------- | ------------ | ------------ | ---------- |
| Expense | dueDate      | 2025-06-10   | 2025-07-10 |
| Expense | paidDate     | 2025-06-12   | 2025-07-12 |
| Income  | dateReceived | 2025-06-01   | 2025-07-01 |

> If the resulting day doesn’t exist (e.g., Feb 30), it will automatically fallback to the last valid day of the month.

### 💻 Implementation Sample

```ts
import dayjs from "dayjs";

function incrementMonth(dateStr) {
  return dayjs(dateStr).add(1, "month").format("YYYY-MM-DD");
}
```

During duplication:

```ts
newExpense.dueDate = incrementMonth(oldExpense.dueDate);
// Optionally:
newExpense.paidDate = "";
newIncome.dateReceived = incrementMonth(oldIncome.dateReceived);
```

This makes the copied data feel like a natural continuation into the new month.
