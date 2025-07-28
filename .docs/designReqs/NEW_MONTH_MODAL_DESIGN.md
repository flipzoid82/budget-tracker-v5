# 🌙 Create New Month Modal – Design Spec

## 🧠 Purpose
The Create New Month modal enables users to add a new budgeting month—either blank or by cloning an existing month—while enforcing rules to prevent duplicates and out-of-range dates.

---

## 🧱 Structure (Top to Bottom)

### 1. Modal Header
```
🌙 Create New Month
```

### 2. Description
```
Select how you’d like to start your new month and which data to carry forward.
```

### 3. Date Selectors
- **Year** dropdown: range from **earliestMonth** to **today + 4 months**
- **Month** dropdown: values **01–12**
- Combined into:
```js
const monthId = `${year}-${month.toString().padStart(2, '0')}`;
```

### 4. Initial Setup Radios
| Option             | Description                             |
|--------------------|-----------------------------------------|
| **Start Blank**    | Begin with an empty slate.              |
| **Clone Previous** | Copy recurring data from another month. |

### 5. Clone Options (visible when “Clone Previous” selected)
| Option        | Enabled     | Details                                                               |
|---------------|-------------|-----------------------------------------------------------------------|
| **Income**    | ✅ Yes      | Copy all income entries (preserve day; update month/year).           |
| **Expenses**  | ✅ Yes      | Copy recurring expenses (day→new month; strip paid flags & metadata). |
| **Budgets**   | ⚪️ Disabled | Coming soon                                                          |
| **Misc**      | ⚪️ Disabled | Coming soon                                                          |
| **Clone From**| 🔽 Dropdown | List existing months; disabled if fewer than 2 months in DB.         |

### 6. Actions
| Button     | Operation                                                      |
|------------|----------------------------------------------------------------|
| **Create** | Disabled until form is valid; calls `window.api.createMonth()`; shows loading state |
| **Cancel** | Closes modal without action                                   |

---

## 📐 Layout & Styling
- **CSS Files:** `PromptModal.css`, `NewMonthModal.css`
- **Key Classes:**
  - `.modal-header`, `.modal-description`
  - `.modal-field`, `.input-error`, `.modal-error-banner`
  - `.btn-primary` (Create), `.btn-secondary` (Cancel)

---

## 🔁 Behavior
- **Validation:** Real-time on change/blur
- **Duplicate Check:** Inline banner (`.modal-error-banner`) if `monthId` exists
- **Range Guard:** Disable out-of-range year/month options
- **Clone Availability:** Disable Clone radio if fewer than 2 months in DB, with tooltip
- **Loading State:** On Create click, disable inputs & buttons and show spinner/text `Creating...`
- **Submission:** Calls:
```js
window.api.createMonth({ monthId, mode, cloneOpts });
```
- **On Success:** Close modal; switch to new month; show toast: `✅ New month ${monthId} created!`
- **On IPC Error:** Show top error banner: `Something went wrong. Please try again.` and re-enable form

---

## 🚧 Edge Cases & Notes
- If fewer than 2 months exist, hide or disable “Clone Previous” option automatically.
- For long month lists, consider adding search or limiting to the most recent 12 entries.

---

## ✅ Recap Summary
| Feature                         | Status |
|---------------------------------|:------:|
| Date selectors with range guard | ✅     |
| Blank vs. Clone modes           | ✅     |
| Contextual Clone options        | ✅     |
| Validation & inline errors      | ✅     |
| Loading state on submit         | ✅     |
| IPC integration & success toast | ✅     |
