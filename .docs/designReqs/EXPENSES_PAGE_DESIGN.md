# 💸 Expenses Page – Design Spec

## 🧠 Purpose

The Expenses page is a dedicated workspace for tracking, managing, and reviewing all bill-related transactions for the selected month.

It is the **core utility view** for:
- Seeing what's due and what’s paid
- Taking action (mark paid, edit, delete)
- Catching overdue bills
- Managing recurring expenses

---

## 🧱 Structure (Top to Bottom)

### ✅ 1. Section Title

```
💸 Expenses – JUN2025
```

Dynamic heading with the selected month in uppercase.

---

### ✅ 2. Toolbar (Below Title)

| Element | Description |
|--------|-------------|
| `➕ Add Expense` | Opens `PromptModal` to add a new bill |
| `🧪 Seed Test Data` | (Dev-only) populates fake rows |
| `🔍 Search` | Text field to search by name or category |
| `↕️ Sort` | Dropdowns or clickable headers to sort by name, amount, or due date |

---

### ✅ 3. Expenses Table

Columns:

| Column | Description |
|--------|-------------|
| Name | Name of the expense (e.g., Rent, Netflix) |
| Amount | Dollar value |
| Due Date | When it’s due |
| Status | "✅ Paid" or "❌ Unpaid" |
| Category | E.g. Utility, Housing, Subscription |
| Actions | Buttons: 💵 mark paid/unpaid, ✏️ edit, 🗑️ delete |

---

### ✅ 4. Row Actions

| Button | Action |
|--------|--------|
| 💵 | Mark as Paid / Undo Paid (via `PromptModal` or `WarningModal`) |
| ✏️ | Edit expense name/category (via `PromptModal`) |
| 🗑️ | Delete with confirmation (`WarningModal`) |

---

## 🧮 Summary + Insights Panel

Located below the expenses table, this section provides high-level metrics and smart suggestions:

### 🔢 Initial Metrics

- **💰 Total Expenses:** Sum of all expenses for the current month  
  Example: `$2,453.23`

### 🔮 Future-Ready Enhancements

| Feature | Description |
|--------|-------------|
| 📈 **Price Change Detection** | Show ▲ increase or ▼ decrease vs. prior month for recurring expenses |
| 🔁 **Recurring Expense Tag** | Identify and optionally filter recurring bills |
| 📊 **Category Breakdown Preview** | Small horizontal bar or pie chart for category weights |
| 🧮 **Avg Spend (last 3 months)** | Running average per month |
| ⏱️ **Longest Unpaid** | Oldest unpaid bill due |
| 🧾 **Export Tools** | Export expense table to CSV or PDF |
| 🔍 **Search/Filter** | Real-time search by name/category |
| ↕️ **Sort** | Sort by due date, amount, or name (ascending/descending)

---

## 📐 Layout & Styling

- Responsive horizontal scrolling for long tables
- Actions right-aligned in each row
- Minimal borders; clean hover effect
- CSS file: `expenses.css` or `ExpenseList.module.css`
- Dark mode compatible

---

## 🔁 Behavior

| Trigger | Response |
|--------|----------|
| Switch month | Load only that month's expenses |
| Add/Delete/Edit/Mark Paid | Auto-refresh list |
| Marked as Paid | Updates dashboard and removes from unpaid pool |
| Overdue items | Tracked but displayed in Dashboard only |

---

## 🔒 Data Dependencies

- Query: `expenses WHERE monthId = ?`
- Metrics:
  - Overdue = `dueDate < today && !paid`
  - Unpaid = `paid == false`
  - Total = SUM(`amount`)

---

## ✅ Recap Summary

| Feature | Status |
|--------|--------|
| Section title | ✅ |
| Add expense modal | ✅ |
| Table with full list | ✅ |
| Row actions: edit/delete/paid | ✅ |
| Summary totals | ✅ |
| Future: price changes, recurring flag, export | ✅ |
| Sort + Filter support (post-scaffold) | ✅ |
| Responsive layout | ✅ |
| Modular modals & clean UX | ✅ |
