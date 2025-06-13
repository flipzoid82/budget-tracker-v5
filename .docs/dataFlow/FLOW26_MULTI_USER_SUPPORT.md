# 👥 Flow 26: Multi-User Support (Future Feature)

## 🧠 Goal

Allow more than one user to securely use the app on the same device or deployment, each with isolated data, settings, and login credentials.

---

## 🔄 Flow Breakdown

### 1. User Account Creation

| Field | Notes |
|-------|-------|
| 👤 Username or Email | Unique |
| 🔐 Password | Hashed and stored securely |
| 📝 Optional Fields | Full name, profile pic, etc. (future) |

---

### 2. Login & Isolation

- Login screen allows switching between user accounts
- All budget data (months, income, expenses, misc, settings) scoped to user
- SQLite database uses `user_id` as FK in all core tables

---

### 3. Account Management

- Admin tab (if permissions introduced)
- Ability to:
  - Create new user
  - Delete user (with confirmation)
  - Reset password (local-only for now)

---

### 4. Future Cloud Sync Consideration

- User account becomes key for cloud sync
- Tokens can be used for device-level access
- OAuth possible down the road

---

## 🔥 Edge Cases

| Case | Behavior |
|------|----------|
| Shared device | Keep sessions isolated via localStorage or session tokens |
| Forgotten password | Local recovery system only (no email reset for now) |
| Logged-in user tries to access another user's data | Strict row-level scoping in DB ensures isolation |

---

## ✅ Output Summary

| Component | Behavior |
|----------|----------|
| **Reads From** | `users`, `session` |
| **Writes To** | ✅ On login/register/delete |
| **UI Re-render Required?** | ✅ On user switch |
| **User Confirmation Needed?** | ✅ For delete |
| **Recoverable?** | ✅ With admin account (future) |

---

## 🔮 Future Enhancements

- Permissions & roles (admin, read-only)
- Device trust system
- Two-factor authentication