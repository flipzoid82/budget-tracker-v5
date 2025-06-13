# 🔁 Flow 25: Recurring Transactions Engine (Future Feature)

## 🧠 Goal

Allow users to schedule recurring income and expense entries that auto-populate on a monthly basis.

---

## 🔄 Flow Breakdown

### 1. Recurring Entry Setup

| Field | Notes |
|-------|-------|
| 📌 Name | Bill or income name |
| 💵 Amount | Fixed or variable (optional) |
| 📆 Frequency | Monthly, Biweekly, Weekly |
| ⏰ Next Occurrence | When to trigger next |
| 🧩 Type | Income or Expense |
| 📂 Category | (Optional) |

---

### 2. Auto-Generation Logic

- Runs when:
  - A new month is created
  - User manually triggers “Generate Recurring Items”
- Duplicates entries into the selected month with:
  - Adjusted due/receive date
  - Marked as unpaid by default (for expenses)

---

### 3. UI Placement

- ⚙️ Settings > Recurring Transactions
- Display list of active recurring rules
- Option to:
  - Add new
  - Edit or disable
  - Delete

---

### 4. Example Entry

```json
{
  "name": "Netflix",
  "amount": 15.99,
  "type": "expense",
  "category": "Entertainment",
  "frequency": "monthly",
  "nextDate": "2025-07-01"
}
```

---

## 🔥 Edge Cases

| Case | Behavior |
|------|----------|
| Missed run | Catch-up logic can populate past missed months |
| Disabled rule | Prevents future generation |
| Editing amount mid-cycle | Only affects future months |

---

## ✅ Output Summary

| Component | Behavior |
|----------|----------|
| **Reads From** | `recurringRules`, `currentMonth` |
| **Writes To** | ✅ Adds to `expenses` / `income` |
| **UI Re-render Required?** | ✅ After generation |
| **User Confirmation Needed?** | ❌ (unless manual trigger) |
| **Recoverable?** | ✅ (edit or delete rule) |

---

## 🔮 Future Enhancements

- Rule history / audit log
- Smart recurring prediction (based on past data)
- Conditional rules (e.g. skip if surplus < $X)