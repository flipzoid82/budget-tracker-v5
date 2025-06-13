# 🗑️ Flow 10: Delete Month

## 🧠 Goal

Allow users to permanently delete an entire month of financial data (expenses, income, misc transactions) if it was created in error or is no longer needed.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User selects a month from a dropdown or calendar
- Clicks “Delete Month” button/icon
- A confirmation modal appears with warning text:

> “This will permanently delete **all data** for [Month Name]. This cannot be undone.”

---

### 2. Validation

- User must confirm the action (e.g., click “Yes, Delete” or type the month name)
- App checks that the month exists

---

### 3. DB Write

Delete from all affected tables using the `monthId`:

```ts
await db.expenses.where("monthId").equals(monthId).delete();
await db.income.where("monthId").equals(monthId).delete();
await db.misc.where("monthId").equals(monthId).delete();
await db.months.delete(monthId);
```

---

### 4. UI Update

- Remove deleted month from month selector
- Redirect to another available month (preferably most recent)
- Refresh dashboard and all affected lists
- Show a toast confirming deletion

---

## 🔥 Edge Cases

| Case                      | Behavior                               |
| ------------------------- | -------------------------------------- |
| User cancels confirmation | No action taken                        |
| Deleting current month    | Redirect to most recent existing month |
| Deleting only month       | Show “No data yet” state               |
| Month already deleted     | No-op, or show error                   |

---

## ✅ Output Summary

| Component                     | Behavior                               |
| ----------------------------- | -------------------------------------- |
| **Affected DB Tables**        | `months`, `expenses`, `income`, `misc` |
| **UI Re-render Required?**    | ✅ Yes                                 |
| **User Confirmation Needed?** | ✅ Yes                                 |
| **Recoverable?**              | ❌ No                                  |
