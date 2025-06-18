# 📊 Dashboard Page – Design Spec

## 🧠 Purpose

The Dashboard is the user’s control center. It gives an at-a-glance view of their financial status for the currently selected month — showing key totals, warnings, and upcoming actions.

It should be:
- Informative (totals and summaries)
- Alert-driven (what needs attention)
- Visually calm and minimalist

---

## 🧱 Structure (Top to Bottom)

### ✅ 1. Page Title

```
📊 Dashboard
```

Large heading with a chart or pulse icon to set the tone.

---

### ✅ 2. Summary Cards (Grid)

A 2x2 responsive grid showing the following **summary metrics**:

| Card | Description |
|------|-------------|
| **Total Income** | Sum of all income entries for selected month |
| **Total Expenses** | Sum of all expense entries |
| **Unpaid Bills** | Sum of unpaid expenses (paid = false) |
| **Surplus** | Total Income - Total Expenses |

Each card should include:
- Bold label
- Formatted amount (e.g., `$1,553.24`)
- Minimal background with slight drop shadow
- Color indication (green for positive surplus, red if negative)

---

### ✅ 3. Urgent Alerts Section

#### 📌 “Urgent Bills” Card (optional title: 🔴 Overdue & Upcoming)

List all unpaid expenses where:
- Due date < today → marked **overdue** 🔴
- Due date within next 7 days → marked **upcoming** 🟠

Format:
```
❗ Urgent Bills

🔴 Rent — 04/01/2025 ($1800.00)
🟠 AT&T — 04/25/2025 ($80.00)
```

Use:
- Icons (`🔴`, `🟠`)
- Color-coded text (`red` for overdue, `orange` for upcoming)
- Collapse if no bills are urgent

---

### ✅ 4. Optional Future Panels

You could later add:
- Top 3 largest expenses this month
- Category-wise spending bar chart
- Budget progress by category (if budget exists)

---

## 📐 Layout & Styling

- Uses `.dashboard.css` or `Dashboard.module.css`
- Responsive grid for cards (CSS grid or flexbox)
- Font sizes should vary:
  - `h2` for headings
  - `1.25rem+` for totals
- Dark mode compatible

---

## 🔁 Behavior

| Trigger | Response |
|---------|----------|
| User switches month | All totals/cards recalculate |
| Expense marked paid | Unpaid total and alerts update |
| Expense added | Expenses/surplus update |
| Income added | Income/surplus update |

---

## 🔒 Data Dependencies

You’ll need to read from:
- `expenses WHERE monthId = ?`
- `income WHERE monthId = ?`

And compute:
- Sums
- Date comparisons (`dueDate` vs `today`)
- Count of unpaid bills

---

## ✅ Recap Summary (for build checklist)

| Section | Status |
|---------|--------|
| Page title (`📊 Dashboard`) | ✅ |
| Summary cards (income, expenses, unpaid, surplus) | ✅ |
| Urgent Bills list (overdue/upcoming) | ✅ |
| Responsive layout | ✅ |
| Recalculates on data change | ✅ |
| Uses context for currentMonth | ✅ |
| Can be built using existing `api/expenses` & `api/income` | ✅ |
