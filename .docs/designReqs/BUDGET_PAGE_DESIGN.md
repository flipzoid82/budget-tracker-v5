# 📊 Budget Page – Design Spec

## 🧠 Purpose

The Budget page helps the user define planned spending goals for the current month. It provides structure to their finances and allows real-time comparison between **planned vs. actual** spending.

---

## 🧱 Structure (Top to Bottom)

### ✅ 1. Section Title

```
📊 Budget – JUN2025
```

Indicates the current working month.

---

### ✅ 2. Toolbar

| Element | Description |
|--------|-------------|
| `➕ Add Category` | Opens `PromptModal` to define a new budget item |
| `🧪 Seed Dev Data` | Test categories for dev/test environments |
| `🔄 Copy from Previous Month` | Optionally pulls budget categories forward |
| `📥 Import / 📤 Export` | Future: Sync budget templates

---

### ✅ 3. Budget Table

Columns:

| Column | Description |
|--------|-------------|
| Category | E.g., Rent, Utilities, Subscriptions |
| Planned | Budgeted amount |
| Actual | Auto-calculated from linked expenses |
| Difference | Surplus/Over by color-coded delta |
| % Used | Percentage of budget used |
| Actions | ✏️ edit, 🗑️ delete

Color rules:
- Positive difference: ✅ green
- Over budget: 🔴 red
- % Used bar fills accordingly

---

### ✅ 4. Row Actions

| Button | Action |
|--------|--------|
| ✏️ | Edit planned amount or rename category |
| 🗑️ | Confirm removal from this month's budget (WarningModal)

---

## 🧮 Summary Row

At the bottom of the table:

| Metric | Description |
|--------|-------------|
| Total Planned | Sum of planned column |
| Total Actual | Sum of actual expenses that match a category |
| Overall Difference | Total variance (green/red) |
| Budget Health | Visual status (e.g., progress bar or emoji meter) |

---

## 🔮 Future Enhancements

| Feature | Description |
|--------|-------------|
| 📈 Budget Trends | Compare to last 3 months’ budget |
| 🎯 Budget Targets | Set monthly goal like “Spend <$2,000” |
| 🧾 Print Summary | Generate PDF of plan vs. actual |
| 🏷️ Smart Tag Matching | Auto-match expense names to budget categories |
| 💡 Suggestions | “You overspent on X last month — increase?” |

---

## 📐 Layout & Styling

- `.budget.css` or `BudgetPage.module.css`
- Use progress bars in `% Used` column
- Totals row is sticky/fixed at bottom of table (optional)
- Minimal yet visual

---

## 🔁 Behavior

| Trigger | Response |
|--------|----------|
| Add/edit budget | Updates planned totals immediately |
| New expenses added | Updates actual + % Used |
| Remove category | Clears that row’s tracking |
| Switch month | Shows budget entries tied to monthId |

---

## 🔒 Data Dependencies

- Source: `budget WHERE monthId = ?`
- Actuals: Pull from `expenses` where `category = budget.category`
- Totals: SUM by column

---

## ✅ Recap Summary

| Feature | Status |
|--------|--------|
| Category + planned input | ✅ |
| Actuals auto-filled from expenses | ✅ |
| Difference + % used logic | ✅ |
| Summary totals row | ✅ |
| Add/edit/delete support | ✅ |
| Copy-from-last-month support | ✅ |
| Sorting/filter/search (future) | ✅ |
| Smart tagging / suggestion (future) | ✅ |
