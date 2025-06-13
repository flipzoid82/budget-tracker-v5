# 🔍 Flow 15: Search, Sort, and Filter Lists

## 🧠 Goal

Make it easy for users to navigate their data by allowing quick **search**, **sort**, and **filter** options for **expenses**, **income**, and **misc transactions**.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User interacts with controls at the top of a list (e.g., search input, sort dropdown, filter checkboxes)

---

### 2. Search

**Input:** Search box (per list page)

**Behavior:**

- Searches across:
  - Expense: name, category, confirmation
  - Income: source, category
  - Misc: name, notes
- Filters items _live_ as user types

---

### 3. Sort

**Fields to sort by:**

| Entity   | Fields                                      |
| -------- | ------------------------------------------- |
| Expenses | Name, Amount, Due Date, Paid Date, Category |
| Income   | Source, Amount, Date Received               |
| Misc     | Name, Amount, Date                          |

**Behavior:**

- Toggle ascending/descending
- Default sort is “Due Date” for Expenses, “Date Received” for Income

---

### 4. Filter

**Optional toggles:**

- **Expenses:**

  - ✅ Paid / ❌ Unpaid
  - ⏳ Overdue / Upcoming
  - Category (multi-select)

- **Income:**

  - Category
  - Date range picker

- **Misc:**
  - Category
  - Keyword in notes

---

### 5. UI Design

- Minimal search bar at top right
- Filter controls as dropdowns or pill-style toggles
- Sort by clicking column headers or via a dropdown menu

---

## 🔥 Edge Cases

| Case                      | Behavior                                    |
| ------------------------- | ------------------------------------------- |
| No results                | Show “No matches found.”                    |
| Complex filters           | Consider showing a "Clear Filters" button   |
| Overlapping filters       | Show item only if it matches _all_ criteria |
| Sorting numeric vs string | Handle natural ordering logic properly      |

---

## ✅ Output Summary

| Component                     | Behavior                       |
| ----------------------------- | ------------------------------ |
| **Reads From**                | `expenses`, `income`, `misc`   |
| **Writes To**                 | ❌ None (read-only actions)    |
| **UI Re-render Required?**    | ✅ Yes — filtered view updates |
| **User Confirmation Needed?** | ❌ No                          |
| **Recoverable?**              | ✅ Always backed by DB         |
