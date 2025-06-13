# 🧾 Flow 2: Add New Expense (Manual)

## 🧠 Goal

User manually adds a new expense via the form → data is validated → stored in DB → displayed in the UI immediately.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks “➕ Add Expense” on the Expenses page
- Modal or form pops up with fields:

  - `name` (required)
  - `amount` (required, number)
  - `dueDate` (required, MM/DD/YYYY)
  - `paidDate` (optional, MM/DD/YYYY)
  - `confirmation` (optional)
  - `url` (optional)
  - `category` (required)

---

### 2. Validation

- All required fields must be filled
- `amount` must be a valid number > 0
- `dueDate` must be a valid date
- `paidDate` is optional, but if filled, must also be valid

---

### 3. Data Construction

Once validated, build a new expense object:

```ts
{
  id: uuidv4(),
  name: "Frontier",
  amount: 79.99,
  dueDate: "06/15/2025",
  paidDate: "",               // or a date if user fills it
  confirmation: "",
  url: "https://frontier.com/login",
  category: "Utility",
  paid: false,                // default unless paidDate is present
  monthId: "2025-06"
}
```

---

### 4. DB Write

Insert into the `Expense` table, scoped to the currently selected `monthId`.

Use IndexedDB/SQLite with something like:

```ts
await db.expenses.add(newExpense);
```

---

### 5. UI Update

- Update the UI state for the current month
- Re-render the expense list and dashboard summary
- If `paid` is true, update the paid count + surplus totals

---

## 🔥 Edge Cases

| Case                     | Behavior                                          |
| ------------------------ | ------------------------------------------------- |
| User enters invalid date | Show inline validation error                      |
| User cancels form        | Close modal, no action                            |
| Network or DB error      | Show error toast                                  |
| Duplicate name?          | Allowed (some bills recur monthly with same name) |

---

## ✅ Output Summary

| Component                     | Behavior                                |
| ----------------------------- | --------------------------------------- |
| **Affected DB Table**         | `expenses`                              |
| **UI Re-render Required?**    | ✅ Yes                                  |
| **User Confirmation Needed?** | ❌ No                                   |
| **Recoverable?**              | ✅ Yes (user can edit/delete afterward) |
