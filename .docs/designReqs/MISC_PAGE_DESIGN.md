# 🧾 Misc Page – Design Spec

## 🧠 Purpose

The Miscellaneous (Misc) page handles one-off, irregular, or uncategorized transactions that don’t belong under income or expenses — such as:

- Refunds  
- Rebates  
- Windfalls  
- Transfers between accounts  
- Overdraft fees or corrections

It's a utility page that helps you balance nuance without polluting core categories.

---

## 🧱 Structure (Top to Bottom)

### ✅ 1. Section Title

```
🧾 Misc Transactions – JUN2025
```

Simple, clean heading for the active month.

---

### ✅ 2. Toolbar (Below Title)

| Element | Description |
|--------|-------------|
| `➕ Add Transaction` | Opens `PromptModal` with fields: label, amount, type (credit/debit) |
| `🔍 Search` | Filter by label |
| `↕️ Sort` | By date, amount, or label (asc/desc)

---

### ✅ 3. Transactions Table

Columns:

| Column | Description |
|--------|-------------|
| Label | What the transaction was (e.g., "Amazon refund") |
| Amount | Positive or negative value |
| Type | Credit (green) or Debit (red) |
| Date | Date of the transaction |
| Actions | ✏️ edit, 🗑️ delete

Amounts should be styled:
- Green for **credits**
- Red for **debits**

---

### ✅ 4. Row Actions

| Button | Action |
|--------|--------|
| ✏️ | Opens `PromptModal` to edit label, amount, type |
| 🗑️ | Opens `WarningModal` to confirm deletion

---

## 🧮 Summary Footer

Displayed below the table:

- **Net Total**: `credits - debits` for the month  
  Example: `Net Misc: $42.50` (in green), or `-$15.00` (in red)

---

## 🔮 Future Enhancements

| Feature | Description |
|--------|-------------|
| 📌 Tags | User-defined tags for grouping (e.g., "medical", "fees") |
| ⏳ Average impact | Average monthly net total from misc transactions |
| 🧾 Export tools | Export this data alone to CSV or PDF |
| 🧪 Seed Dev Data | Populate fake rows for testing

---

## 📐 Layout & Styling

- Uses `misc.css` or `MiscList.module.css`
- Consistent with other tables (e.g., Expenses/Income)
- Uses green/red to signal credit/debit
- Responsive and dark-mode aware

---

## 🔁 Behavior

| Trigger | Response |
|--------|----------|
| Switch month | Filters all misc data to active month |
| Add/edit/delete | Updates list and net total |
| Sort/search | Only affects visible display, not database |
| Amount signs | Automatically infer color based on type

---

## 🔒 Data Dependencies

- Query: `misc WHERE monthId = ?`
- Summary:
  - Net = `SUM(credits) - SUM(debits)`
- Optional: grouping by tags (future)

---

## ✅ Recap Summary

| Feature | Status |
|--------|--------|
| Section title & month | ✅ |
| Add/edit/delete flow | ✅ |
| Credit/Debit types | ✅ |
| Summary net balance | ✅ |
| Sort & filter | ✅ |
| Row actions | ✅ |
| Responsive UI | ✅ |
| Future: Tags, export, average tracker | ✅ |
