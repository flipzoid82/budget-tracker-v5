# ✏️ Flow 7: Edit or Delete Expense

## 🧠 Goal

Allow users to make changes to an existing expense (edit) or remove it entirely (delete). This ensures expense data stays accurate and manageable.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks on the "Edit" (pencil) icon next to an expense
- Modal or inline editor appears with prefilled fields:

  - `name`
  - `amount`
  - `dueDate`
  - `paidDate` (if marked as paid)
  - `confirmation`
  - `url`
  - `category`

- User clicks "Delete" (trash can) icon → confirmation modal appears

---

### 2. Validation (Edit)

- `amount` must be a valid number
- `dueDate` must be a valid date
- If marked as paid, `paidDate` must also be valid
- `category` is required
- `name` cannot be empty

---

### 3. DB Write

For edits:

```ts
await db.expenses.update(expense.id, {
  name,
  amount,
  dueDate,
  paid,
  paidDate,
  confirmation,
  url,
  category,
});
```

For deletes:

```ts
await db.expenses.delete(expense.id);
```

---

### 4. UI Update

- Refresh the expense list
- Recalculate totals (paid, unpaid, surplus, etc.)
- Show toast or confirmation banner
- If deleted, remove from list entirely

---

## 🔥 Edge Cases

| Case                    | Behavior                              |
| ----------------------- | ------------------------------------- |
| User cancels edit       | No changes saved                      |
| User deletes an expense | Show “Are you sure?” confirmation     |
| Edited to zero amount   | Disallow with validation error        |
| Deleted paid expense    | Paid totals will decrease accordingly |

---

## ✅ Output Summary

| Component                     | Behavior                                                |
| ----------------------------- | ------------------------------------------------------- |
| **Affected DB Table**         | `expenses`                                              |
| **UI Re-render Required?**    | ✅ Yes                                                  |
| **User Confirmation Needed?** | ✅ Yes (especially for delete)                          |
| **Recoverable?**              | ❌ No (deleted data is lost unless undo is implemented) |
