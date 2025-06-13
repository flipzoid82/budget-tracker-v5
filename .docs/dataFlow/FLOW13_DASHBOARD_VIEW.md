# 📊 Flow 13: Dashboard View and Summary Metrics

## 🧠 Goal

Give users a clear, high-level summary of their monthly financial standing, with visual cues and metrics to guide budget decisions.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User navigates to the Dashboard page
- Automatically loads data from the currently selected month

---

### 2. Data Fetched

Pulls records from all 3 data tables for the current month:

```ts
const incomeEntries = await db.income
  .where("monthId")
  .equals(currentMonthId)
  .toArray();
const expenses = await db.expenses
  .where("monthId")
  .equals(currentMonthId)
  .toArray();
const misc = await db.misc.where("monthId").equals(currentMonthId).toArray();
```

---

### 3. Summary Calculations

| Metric         | Formula                                                 |
| -------------- | ------------------------------------------------------- |
| Total Income   | Sum of all `income.amount`                              |
| Total Expenses | Sum of all `expenses.amount`                            |
| Unpaid Bills   | Sum of unpaid expenses (where `paidDate` is null)       |
| Surplus        | `totalIncome - totalExpenses`                           |
| Overdue Bills  | Expenses where `dueDate < today` and `paidDate` is null |
| Upcoming Bills | Expenses due within the next 7 days (and unpaid)        |

---

### 4. UI Presentation

- Display metrics in color-coded boxes:
  - Green: Positive surplus, all bills paid
  - Yellow: Unpaid bills remain
  - Red: Overdue bills
- Optional: Add pie charts or bar charts showing category breakdowns
- Optional: Alert banners for overspending or missed bills

---

### 5. Updates

When data is edited or a new month is selected:

- Recalculate metrics
- Update visual components
- Keep animations smooth and performant

---

## 🔥 Edge Cases

| Case              | Behavior                            |
| ----------------- | ----------------------------------- |
| No data for month | Show "No data" placeholder          |
| Negative surplus  | Alert: “You’re over budget!”        |
| All bills unpaid  | Optional warning state              |
| No income         | Warn user or display “0” gracefully |

---

## ✅ Output Summary

| Component                     | Behavior                                 |
| ----------------------------- | ---------------------------------------- |
| **Reads From**                | `income`, `expenses`, `misc`             |
| **Writes To**                 | None                                     |
| **UI Re-render Required?**    | ✅ Yes — on month change or data updates |
| **User Confirmation Needed?** | ❌ No                                    |
| **Recoverable?**              | ✅ Always re-generates from DB           |
