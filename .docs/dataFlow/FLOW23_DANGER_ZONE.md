# ☠️ Flow 23: Settings - Data Wipe / Danger Zone

## 🧠 Goal

Allow users to perform destructive actions such as wiping all data or deleting specific months, with strong confirmation safeguards in place.

---

## 🔄 Flow Breakdown

### 1. Accessing the Danger Zone

- ⚙️ Located under: **Settings > Danger Zone**
- Collapsed section with red styling
- Expandable to show options

---

### 2. Available Actions

#### ✅ Delete Specific Month

- Dropdown or list to select a month
- Confirmation modal:
  > “Are you sure you want to permanently delete data for `MAR 2025`? This action cannot be undone.”

#### ✅ Wipe All Data

- Full app reset (clears all months, income, expenses, misc, user settings)
- Confirmation modal:
  > “This will erase ALL your data. Type **DELETE** to confirm.”

---

### 3. UX and Styling

- Use red buttons/icons
- Require user to re-type confirmation phrase for full wipe
- Display warnings and consequences clearly

---

## 🔥 Edge Cases

| Case                      | Behavior                                                            |
| ------------------------- | ------------------------------------------------------------------- |
| User cancels halfway      | Nothing is deleted                                                  |
| App crashes mid-delete    | Partial deletes are rollback-safe if database supports transactions |
| Wrong confirmation phrase | Prevent action                                                      |
| Deleting current month    | Load fallback or reload app with no month selected                  |

---

## ✅ Output Summary

| Component                     | Behavior                                           |
| ----------------------------- | -------------------------------------------------- |
| **Reads From**                | `months`, `income`, `expenses`, `misc`, `settings` |
| **Writes To**                 | ✅ On confirmed deletion                           |
| **UI Re-render Required?**    | ✅ After delete                                    |
| **User Confirmation Needed?** | ✅ Strong confirmation required                    |
| **Recoverable?**              | ❌ Destructive action                              |

---

## 🔮 Future Enhancements

- Soft delete with undo (30-second window)
- Archive old months instead of delete
- Create recovery snapshot before wipe
