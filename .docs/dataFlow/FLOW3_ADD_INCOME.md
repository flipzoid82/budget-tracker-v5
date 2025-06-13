# 💰 Flow 3: Add New Income (Manual)

## 🧠 Goal

User manually adds a new income entry via a form → data is validated → stored in DB → UI updates to reflect new totals and breakdowns.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks “➕ Add Income” on the Income page
- Modal or form appears with fields:

  - `source` (required)
  - `amount` (required, number)
  - `dateReceived` (required, MM/DD/YYYY)
  - `notes` (optional)
  - `category` (required)

---

### 2. Validation

- All required fields must be filled
- `amount` must be a valid number > 0
- `dateReceived` must be a valid date

---

### 3. Data Construction

Build a new income object like:

```ts
{
  id: uuidv4(),
  source: "VA Disability",
  amount: 3200.00,
  dateReceived: "06/01/2025",
  notes: "",
  category: "Disability",
  monthId: "2025-06"
}
```

---

### 4. DB Write

Insert into the `Income` table for the active `monthId`:

```ts
await db.income.add(newIncome);
```

---

### 5. UI Update

- Add new entry to the visible Income list
- Update Dashboard totals: income, surplus, unpaid
- Show confirmation toast or banner

---

## 🔥 Edge Cases

| Case                   | Behavior                    |
| ---------------------- | --------------------------- |
| Invalid date or amount | Show field-level validation |
| Cancel button pressed  | Dismiss modal, no action    |
| Duplicate source name? | Allowed                     |
| DB error               | Show error modal or toast   |

---

## ✅ Output Summary

| Component                     | Behavior                            |
| ----------------------------- | ----------------------------------- |
| **Affected DB Table**         | `income`                            |
| **UI Re-render Required?**    | ✅ Yes                              |
| **User Confirmation Needed?** | ❌ No                               |
| **Recoverable?**              | ✅ Yes (user can edit/delete later) |
