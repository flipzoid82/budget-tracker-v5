# 💸 Expenses Page – Design Spec (Revised)

## 🧠 Purpose

The Expenses page is a dedicated workspace for tracking, managing, and reviewing all bill-related transactions for the selected month.

It is the **core utility view** for:

- Seeing what’s due and what’s paid
- Taking action (mark paid, edit, delete)
- Catching overdue bills
- Managing categories toggle

---

## 🧱 Structure (Top to Bottom)

### 1. Section Title

```
💸 Expenses – June 2025
```

## Dynamic heading displaying the selected month in "MonthName Year" format.

### 2. Toolbar (Below Title)

| Element           | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `➕ Add Expense`  | Opens `PromptModal` to add a new expense record                                             |
| `🔍 Search`       | Text input to search by **name** or **category name**                                       |
| `Show Categories` | Checkbox to toggle visibility of category badges in the table fileciteturn25file3L3-L10 |

---

### 3. Expenses Table

Rendered by **ExpenseTable.jsx**.
| Column | Description |
|----------------|--------------------------------------------------------------------------------------------------------|
| **Actions** | Dropdown (`DropdownMenu`) with options: Mark Paid (or Unpaid), Edit, Delete via hamburger icon |
| **Name** | Expense name (link if URL) with inline `<CategoryBadge>` when enabled |
| **Amount** | Dollar value formatted to two decimals (`$x.xx`) |
| **Due Date** | Date when the expense is due (MM/DD/YYYY) |
| **Paid Date** | Date when paid (`–` if unpaid) |
| **Confirmation**| Confirmation text (or `–` if none) |

- **Row Styling**: Tinted background—green for paid (`.row-paid`), red for unpaid (`.row-unpaid`)—plus zebra-striping for even/odd rows.

---

## 🔄 CRUD & Modals

- **Add/Edit**: `PromptModal` with fields: Name, Amount, Due Date, Category (select), URL, Paid Date (optional), Confirmation (optional)
- **Mark Paid**: `PromptModal` to set Paid Date and Confirmation; toggles paid flag on submit.
- **Mark Unpaid**: `WarningModal` with warning about clearing Paid Date & Confirmation.
- **Delete**: `WarningModal` to confirm deletion.

---

## 📐 Layout & Styling

- Responsive horizontal scrolling for wide tables (`.table-responsive` in `DataTable.css`)
- CSS Files:
  - `ExpensesPage.css`
  - `ExpenseTable.css`
  - `DataTable.css`
  - `CategoryBadge.css`
  - `DropdownMenu.css`
- Dark mode compatible.

---

## 🔁 Behavior

| Trigger                   | Response                              |
| ------------------------- | ------------------------------------- |
| Switch month              | Load that month’s expenses            |
| Add/Edit/Delete/Mark Paid | Auto-refresh list, update row styling |
| Search input              | Filters rows live                     |

---

## 🔒 Data Dependencies

- Query: `SELECT * FROM expenses WHERE monthId = ?`
- Data derived: paid flag (`0|1`), paidDate, confirmation, categoryId.
- Filtering: client-side search by name and category name.
