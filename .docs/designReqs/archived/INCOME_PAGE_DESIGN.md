# 💰 Income Page – Design Spec

## 🧠 Purpose

The Income page is the centralized view for tracking all income entries for the selected month. It allows the user to record sources of income, edit or delete them, and see a clean financial intake summary at a glance.

---

## 🧱 Structure (Top to Bottom)

### ✅ 1. Section Title

```
💰 Income – JUN2025
```

Large heading that dynamically shows the active month.

---

### ✅ 2. Toolbar (Below Title)

| Element | Description |
|--------|-------------|
| `➕ Add Income` | Opens `PromptModal` with fields: source, amount |
| `🔍 Search` | Filter by source name or date |
| `↕️ Sort` | Sort by amount, date, or source name (ascending/descending) |

---

### ✅ 3. Income Table

Columns:

| Column | Description |
|--------|-------------|
| Source | Name of the income source (e.g., VA Comp, Paycheck) |
| Amount | Dollar value received |
| Date | Date the income was received |
| Actions | Buttons: ✏️ edit, 🗑️ delete |

---

### ✅ 4. Row Actions

| Button | Action |
|--------|--------|
| ✏️ | Edit income source, amount, or date via `PromptModal` |
| 🗑️ | Delete with confirmation using `WarningModal` |

---

## 🧮 Summary + Highlights Section

This section lives **below the table** and shows quick totals and useful trends.

### 🔢 Initial Metric

- **💵 Total Income:** Example: `$3,200.00`

### 🔮 Future-Ready Enhancements

| Feature | Description |
|--------|-------------|
| 📊 **Source Breakdown** | Totals per source (e.g., VA: $1500, Work: $1700) |
| ⏳ **Last Received** | Most recent income entry |
| 📅 **Recurring Income** | Tags for monthly deposits (e.g., VA, paycheck) |
| 🧮 **Average Income (last 3 months)** | Running average for comparison |
| 🔍 **Filter/Search** | By source or date |
| ↕️ **Sort** | Toggle sort by amount, date, or name |
| 🧾 **Export Tools** | Export to CSV or PDF (future)

---

## 📐 Layout & Styling

- Uses `income.css` or `IncomeList.module.css`
- Same styling scheme as Expenses for consistency
- Responsive layout
- Dark mode friendly
- Action icons spaced, aligned

---

## 🔁 Behavior

| Trigger | Response |
|--------|----------|
| Add income | Row added and summary updates |
| Edit | Row and summary update |
| Delete | Row removed and summary updates |
| Switch month | Filters data to selected month |
| Sort or filter | Re-renders visible list only |

---

## 🔒 Data Dependencies

- Query: `income WHERE monthId = ?`
- Calculations:
  - Total income = SUM(amount)
  - Filtered views = MATCH(name/date)
  - Trends over time = based on prior months (optional future feature)

---

## ✅ Recap Summary

| Feature | Status |
|--------|--------|
| Section title | ✅ |
| Add/edit/delete income | ✅ |
| Table layout | ✅ |
| Summary section with total | ✅ |
| Row actions with modals | ✅ |
| Sort & filter (post-scaffold) | ✅ |
| Future: source breakdown, recurring detection | ✅ |
| Responsive & styled UI | ✅ |
