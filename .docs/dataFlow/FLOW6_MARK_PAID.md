# ✅ Flow 6: Mark Expense as Paid / Unpaid

## 🧠 Goal

User marks an expense as paid (or unpaid). This updates its state, adjusts totals, and optionally records confirmation details.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks the “Mark as Paid” or “Undo Paid” button/icon next to an expense
- If marking as **paid**, a modal appears to collect:

  - `paidDate` (default: today, editable via calendar picker)
  - `confirmation` (optional)

- If marking as **unpaid**, show confirmation: “Are you sure you want to mark this as unpaid?”

---

### 2. Validation

- If marking as paid:
  - `paidDate` must be valid
  - Confirmation number is optional

---

### 3. Data Update

Marking as paid:

```ts
{
  ...expense,
  paid: true,
  paidDate: "2025-06-12",
  confirmation: "USAA#1234"
}
```

Marking as unpaid:

```ts
{
  ...expense,
  paid: false,
  paidDate: "",
  confirmation: ""
}
```

Write to the DB:

```ts
await db.expenses.update(expense.id, updatedExpense);
```

---

### 4. UI Update

- Update paid/unpaid visual indicator
- Adjust dashboard totals: unpaid, surplus
- Show toast/banner confirmation
- Close modal if applicable

---

## 🔥 Edge Cases

| Case                     | Behavior                       |
| ------------------------ | ------------------------------ |
| User cancels modal       | No changes made                |
| User enters invalid date | Show validation error          |
| Paid date in the future  | Allow, but warn                |
| Paid but no confirmation | Allowed                        |
| Undo action              | Reverts fields to unpaid state |

---

## ✅ Output Summary

| Component                     | Behavior                                    |
| ----------------------------- | ------------------------------------------- |
| **Affected DB Table**         | `expenses`                                  |
| **UI Re-render Required?**    | ✅ Yes                                      |
| **User Confirmation Needed?** | ✅ Yes (modal for paid, confirm for unpaid) |
| **Recoverable?**              | ✅ Yes (can toggle back)                    |
