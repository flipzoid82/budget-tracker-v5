# 🔐 Flow 16: Authentication & Sign-In Logic

## 🧠 Goal

Allow users to securely access their budget data with a simple sign-in system that persists across sessions and sets the stage for future multi-user or cloud sync support.

---

## 🔄 Flow Breakdown

### 1. Trigger

- User opens the app
- If user is not authenticated, redirect to Sign-In screen

---

### 2. Sign-In Screen

**Fields:**

- Email (or username)
- Password
- "Remember Me" checkbox

**Features:**

- Toggle password visibility
- Form validation
- Inline error feedback

---

### 3. Credential Handling

- Passwords should be securely hashed before storing (e.g. using `bcryptjs`)
- Store user record in `users` table:

```ts
{
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}
```

- Upon sign-in:
  - Validate entered credentials against stored hash
  - On success: mark user as logged in
  - If “Remember Me” is checked, store session token in `localStorage`

---

### 4. Session Persistence

- On app load:
  - If session token exists, auto-login user
  - Otherwise, show sign-in screen

---

### 5. Logout Flow

- Click “Log Out” button
- Clears session and returns to Sign-In screen

---

## 🔒 Security Notes

- No plain-text password storage
- No passwords or tokens in query strings
- Rate limit login attempts (if online later)
- All sensitive operations happen in `preload.js` or server (not client-side JS)

---

## ✅ Output Summary

| Component                     | Behavior                                 |
| ----------------------------- | ---------------------------------------- |
| **Reads From**                | `users` table                            |
| **Writes To**                 | `users`, `localStorage` (for session)    |
| **UI Re-render Required?**    | ✅ Yes — app reloads on sign-in/sign-out |
| **User Confirmation Needed?** | ✅ On sign-out                           |
| **Recoverable?**              | ✅ As long as user knows their password  |

---

## 🔮 Future Enhancements

- Password reset flow
- Multi-user support
- Cloud-based authentication (e.g. OAuth)
- Encrypted local data storage
