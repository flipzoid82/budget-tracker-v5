# 🧾 Flow 4: Add Misc Transaction (Manual)

## 🧠 Goal

User manually adds a miscellaneous transaction (not income or bill) → data is validated → stored in DB → UI reflects it under Misc category and updates totals.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User clicks “➕ Add Misc Transaction” on the Misc page
- Modal or form appears with fields:

  - `description` (required)
  - `amount` (required, number)
  - `category` (required)
  - `notes` (optional)

---

### 2. Validation

- All required fields must be filled
- `amount` must be a valid number (positive or negative)
- Categories are predefined or user-generated

---

### 3. Data Construction

Build a new misc object like:

```ts
{
  id: uuidv4(),
  description: "Donation",
  amount: -50.00,
  category: "Charity",
  notes: "",
  monthId: "2025-06"
}
```

> Note: Negative values reduce surplus, positive values increase it.

---

### 4. DB Write

Insert into the `Misc` table:

```ts
await db.misc.add(newMiscItem);
```

---

### 5. UI Update

- Add item to the Misc list
- Refresh dashboard surplus total
- Update category summaries if shown
- Show confirmation toast/banner

---

## 🔥 Edge Cases

| Case                  | Behavior                       |
| --------------------- | ------------------------------ |
| Amount is zero        | Disallow with validation error |
| Duplicate description | Allowed                        |
| User cancels form     | No changes, close modal        |
| Notes left blank      | OK (optional)                  |

---

## ✅ Output Summary

| Component                     | Behavior                            |
| ----------------------------- | ----------------------------------- |
| **Affected DB Table**         | `misc`                              |
| **UI Re-render Required?**    | ✅ Yes                              |
| **User Confirmation Needed?** | ❌ No                               |
| **Recoverable?**              | ✅ Yes (user can edit/delete later) |
