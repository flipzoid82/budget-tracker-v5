# 💰 Flow 8: Edit or Delete Income

## 🧠 Goal

Enable users to update existing income records or delete them if they were entered in error or no longer apply.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks on the "Edit" (pencil) icon next to an income entry
- A modal or inline form appears with pre-filled fields:

  - `source`
  - `amount`
  - `dateReceived`
  - `notes`
  - `category`

- User clicks "Delete" (trash can) icon → confirmation modal appears

---

### 2. Validation (Edit)

- `amount` must be a valid number
- `dateReceived` must be a valid date
- `category` is required
- `source` cannot be empty

---

### 3. DB Write

For edits:

```ts
await db.income.update(income.id, {
  source,
  amount,
  dateReceived,
  notes,
  category
});
```

For deletes:

```ts
await db.income.delete(income.id);
```

---

### 4. UI Update

- Refresh the income list
- Recalculate totals (total income, surplus)
- Show toast or confirmation banner
- If deleted, remove from list entirely

---

## 🔥 Edge Cases

| Case | Behavior |
|------|----------|
| User cancels edit | No changes saved |
| User deletes income | Show “Are you sure?” confirmation |
| Edited to zero amount | Disallow with validation error |
| Deleted income affects budget surplus | Update dashboard accordingly |

---

## ✅ Output Summary

| Component | Behavior |
|----------|----------|
| **Affected DB Table** | `income` |
| **UI Re-render Required?** | ✅ Yes |
| **User Confirmation Needed?** | ✅ Yes (especially for delete) |
| **Recoverable?** | ❌ No (deleted income is gone unless undo is implemented) |