# 🔄 Flow 9: Edit or Delete Misc Transaction

## 🧠 Goal

Allow users to update or remove miscellaneous transactions, which may represent refunds, bonuses, adjustments, or one-off financial entries.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks the "Edit" (pencil) icon next to a misc entry
- A modal or inline form appears with pre-filled fields:

  - `description`
  - `amount`
  - `category`

- User clicks the "Delete" (trash) icon → confirmation modal appears

---

### 2. Validation (Edit)

- `amount` must be a valid number (positive or negative)
- `category` is required
- `description` cannot be empty

---

### 3. DB Write

For edits:

```ts
await db.misc.update(misc.id, {
  description,
  amount,
  category,
});
```

For deletes:

```ts
await db.misc.delete(misc.id);
```

---

### 4. UI Update

- Refresh the misc transaction list
- Recalculate dashboard metrics (e.g., adjusted surplus if applicable)
- Show toast or confirmation
- Remove deleted entry from the UI

---

## 🔥 Edge Cases

| Case                   | Behavior                          |
| ---------------------- | --------------------------------- |
| User cancels edit      | No changes made                   |
| Zero amount entered    | Disallow with validation          |
| Deleting a misc entry  | Requires confirmation             |
| Large negative amounts | Warn or flag for review if needed |

---

## ✅ Output Summary

| Component                     | Behavior        |
| ----------------------------- | --------------- |
| **Affected DB Table**         | `misc`          |
| **UI Re-render Required?**    | ✅ Yes          |
| **User Confirmation Needed?** | ✅ Yes (delete) |
| **Recoverable?**              | ❌ No           |
