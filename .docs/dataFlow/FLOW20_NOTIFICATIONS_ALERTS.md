# 🔔 Flow 20: Notifications & Alerts System

## 🧠 Goal

Provide timely, non-intrusive alerts for important financial events and statuses to help users stay on top of their budget.

---

## 🔄 Flow Breakdown

### 1. Notification Types

#### ✅ Passive (Visual Warnings)

- Overdue bills
- Unpaid bills due within 3 days
- Income not received by expected date
- Over-budget categories or surplus negative

#### ✅ Active (User Alerts - Future)

- Desktop/browser notifications
- Email reminders (long-term)

---

### 2. Where Are Alerts Displayed?

- 🏠 Dashboard
  - Warnings section
  - Color-coded tiles (e.g., red for overdue)
- 📅 Expense / Income Pages
  - Icons next to entries (⚠️ for due soon, ❌ for overdue)
- 🔔 Notification badge in top nav (optional)
- Settings: allow toggle for certain types of alerts

---

### 3. Alert Criteria (Examples)

| Type               | Trigger                                |
| ------------------ | -------------------------------------- |
| ⚠️ Overdue Expense | `dueDate < today && !paidDate`         |
| ⚠️ Upcoming Bill   | `dueDate ≤ today + 3 && !paidDate`     |
| ❗ Missed Income   | `expectedDate < today && not received` |
| 🟥 Over Budget     | `expenses > budget`                    |

---

### 4. Styling and UX

- Use iconography (⚠️ ❗ 🟢 🔴)
- Add tooltips on hover
- Color-coded rows in tables
- Alert messages in dashboard cards or toast popups

---

### 5. Future Integrations

- Push notifications via browser API
- Notification preferences per user
- Scheduled digest emails

---

## 🔥 Edge Cases

| Case                     | Behavior                                      |
| ------------------------ | --------------------------------------------- |
| Bill paid after due date | Show "Late" indicator, but still mark as paid |
| Future-dated bills       | No alert until within threshold               |
| No budget set            | Skip budget comparison alerts                 |

---

## ✅ Output Summary

| Component                     | Behavior                                   |
| ----------------------------- | ------------------------------------------ |
| **Reads From**                | `expenses`, `income`, `budget`, `settings` |
| **Writes To**                 | ❌ None (read-only logic)                  |
| **UI Re-render Required?**    | ✅ On date change or data update           |
| **User Confirmation Needed?** | ❌ (passive alerts)                        |
| **Recoverable?**              | ✅                                         |

---

## 🔮 Future Enhancements

- Snooze or dismiss alerts
- Set custom alert thresholds
- Sound notifications or animations
