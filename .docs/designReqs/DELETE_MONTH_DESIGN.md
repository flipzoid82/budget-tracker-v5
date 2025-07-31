# 🗑️ Delete Month – Design Spec

## 🧠 Purpose

Enable users to permanently remove an entire budgeting month and all its associated data (income, expenses, budgets, misc) in one destructive action—while preventing accidental loss via a clear confirmation flow.

## 🧱 Structure (Top to Bottom)

1. **Toolbar Button**  
   - Placed alongside “➕ New Month” in the global header toolbar.  
   - Icon: 🗑️ Delete Month  
   - Disabled if there is only one month in the list or while loading.

2. **Confirmation Modal**  
   - Reuse `WarningModal` styling and layout (icon, message, buttons).  
   - **Message**:  
     ```
     Are you sure you want to delete “July 2025”?  
     This will permanently remove all income, expenses, budgets, and misc entries for that month.
     ```  
   - **Buttons**:  
     - **Yes** (danger variant, proceeds)  
     - **No** (cancels)  

3. **Post-Delete Flow**  
   - On confirm: call `window.api.deleteMonth(monthId)`.  
   - Upon success:  
     1. Re-fetch months list (`getAllMonths`) → update dropdown.  
     2. Auto-select the next-most-recent month (or clear if none).  
     3. Close modal.  
     4. Optionally show a toast: `✅ Deleted month July 2025.`  
   - On failure: show inline error banner in modal: `Failed to delete month: <error message>`.

## 🔁 Behavior

| Trigger                     | Response                                                                                  |
|-----------------------------|-------------------------------------------------------------------------------------------|
| Click 🗑️ Delete Month       | Open `WarningModal`; disable background interactions.                                     |
| Confirm deletion            | Disable buttons + show spinner/text `Deleting…`; invoke IPC.                              |
| IPC success                 | Close modal; refresh months; select next month; show success toast.                      |
| IPC error                   | Re-enable buttons; display error banner within modal; log error to console.               |
| Cancel deletion             | Close modal; no side effects.                                                             |

## 📐 Layout & Styling

- **Button**:  
  ```css
  .delete-month-button {
    background: none;
    color: var(--danger-text);
    border: none;
    cursor: pointer;
  }
  .delete-month-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  ```
- **Modal**: reuse `.modal-content.modal-danger` from `WarningModal.css`.

## 🔒 Data Dependencies

- **IPC handler**: `delete-month` (new)  
- **Database schema**:  
  - `months` table (PK: `id`)  
  - `income`, `expenses`, `misc`, `budget` tables (FK `monthId` → `months.id`).  
- **Preload**: expose `deleteMonth = monthId => ipcRenderer.invoke("delete-month", monthId)`

## 🚧 Edge Cases & Notes

- **Last Remaining Month**: disable “Delete Month” when only one month exists to prevent an empty state.  
- **Concurrent Requests**: prevent double-click by disabling the modal’s buttons during IPC call.  
- **Orphaned Data**: ensure foreign keys with `ON DELETE CASCADE` or explicit deletes in a single transaction so no orphan rows remain.  
- **Audit Trail** (future): consider logging deletions or prompting for export before delete.

## ✅ Recap Summary

| Feature                   | Status |
|---------------------------|:------:|
| Toolbar delete button     | ☐      |
| Confirmation modal        | ☐      |
| Single-transaction delete | ☐      |
| Refresh & auto-select     | ☐      |
| Error handling & toasts   | ☐      |
