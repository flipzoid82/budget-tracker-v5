# 💰 Income Page – Design Spec (Revised)

## 🧠 Purpose
The Income page is the centralized view for adding, editing, deleting, and reviewing all income entries for the selected month.  
It should be:
- **Actionable**: Quick add/edit/delete workflows.
- **Informative**: Clear display of sources, amounts, and dates.
- **Responsive**: Sorting, searching, and horizontal scrolling.

---

## 🧱 Structure (Top to Bottom)

### 1. Section Title
```
💰 Income — JUN 2025
```
Dynamic heading showing the selected month via `formatMonthId(monthId)`

### 2. Toolbar
- **➕ Add Income**: Opens `PromptModal` for a new income entry (source, amount, date, category, notes) 
- **🔍 Search**: Text input filters by **source** or **dateReceived** client-side
- **[ ] Show Categories**: Checkbox toggles inline `<CategoryBadge>` display in the table fileciteturn26file0

### 3. Income Table
Provided by `IncomeTable.jsx` via `DataTable` component 

| Column    | Description                                                              |
|-----------|--------------------------------------------------------------------------|
| **Actions** | Dropdown menu (`DropdownMenu`) with **Edit** and **Delete** on each row |
| **Source**  | Inline `<CategoryBadge>` (when toggled) followed by the source name     |
| **Amount**  | Formatted as `$${amount.toFixed(2)}`                                   |
| **Date**    | `dateReceived`, formatted `MM/DD/YYYY` via `formatMDY`                |

- **Default sort**: by **Date** ascending on initial render fileciteturn26file3
- **Row Styling**: zebra stripes using `.row-even` / `.row-odd` classes fileciteturn26file3
- **Responsive**: horizontal scroll with `.table-responsive` wrapper fileciteturn26file4

---

## 🔄 CRUD & Modals
- **Add / Edit**: Uses `PromptModal` with fields `source`, `amount`, `dateReceived`, `categoryId`, and `notes`; on submit calls `window.api.addIncome` or `window.api.updateIncome` and refreshes list fileciteturn26file0
- **Delete**: Confirmation via `WarningModal`, calls `window.api.deleteIncome`, then refreshes fileciteturn26file0

---

## 📐 Layout & Styling
- **Page CSS**: `src/styles/IncomePage.css`
- **Table CSS**: `DataTable.css` (table layout, header sticky, row hover, zebra stripes) 
- **Component CSS**: `CategoryBadge.css`, `DropdownMenu.css`

---

## 🔁 Behavior
| Trigger              | Response                                 |
|----------------------|------------------------------------------|
| Month switch         | `useIncome` hook fetches new data       |
| Add / Edit / Delete  | IPC call → list auto-refresh             |
| Search input         | Filters displayed rows in-place          |
| Header click         | Toggles column sort direction            |

---

## 🔒 Data Dependencies
- **IPC handler**: `window.api.getIncome(monthId)` returns an array of income entries
- **Database** query:
```sql
SELECT * FROM income WHERE monthId = ? ORDER BY dateReceived
```

---

## ✅ Recap
| Feature                   | Status |
|---------------------------|:------:|
| Dynamic Title             | ✅     |
| Add / Search / Toggle     | ✅     |
| Actions Dropdown          | ✅     |
| Sortable Columns          | ✅     |
| Zebra Striping            | ✅     |
| Responsive Table Scroll   | ✅     |
| CRUD via IPC (hook)       | ✅     |

