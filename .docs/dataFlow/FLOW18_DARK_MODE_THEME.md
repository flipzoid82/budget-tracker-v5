# 🌓 Flow 18: Dark Mode & Theming System

## 🧠 Goal

Provide a seamless toggle between light and dark themes with a consistent, reusable styling system — improving visual comfort and aesthetics.

---

## 🎨 Design Philosophy

- All colors and UI states are **defined in a central theme config**
- Avoid inline styles in components
- Theme is persistent across sessions
- Theme toggle is available in Settings or toolbar

---

## 🔄 Flow Breakdown

### 1. Trigger

- User toggles “Dark Mode” switch
  - From Settings
  - Or from header icon (e.g., 🌙 / ☀️)

---

### 2. Persistence

- Store theme preference in `localStorage` or `settings` table
- On app load:
  - Read stored preference and apply theme immediately
  - Fallback to OS preference using `window.matchMedia`

---

### 3. Implementation

#### Option A: CSS Classes (Preferred)

- Add `.dark-mode` class to `<body>` or root `<div>`
- All styles scoped under:

```css
body.dark-mode {
  --bg-color: #1e1e1e;
  --text-color: #f5f5f5;
  --card-bg: #2a2a2a;
  ...;
}
```

- Reuse variables across all components

#### Option B: CSS-in-JS (Less preferred for this app)

- Theme context provider (e.g., styled-components or Tailwind toggle)
- Inject classes dynamically

---

### 4. Reusable Theme Tokens

```css
:root {
  --bg-color: #fff;
  --text-color: #111;
  --accent: #5c9ed8;
  ...;
}
```

Use these variables across:

- Buttons
- Modals
- Tables
- Sidebar
- Typography

---

### 5. UI Behavior

- Theme toggle is instant
- No flicker or flash on load
- Matches OS theme on first load if no user preference set

---

## 🔥 Edge Cases

| Case                 | Behavior                                           |
| -------------------- | -------------------------------------------------- |
| No preference stored | Use system preference                              |
| Switching themes     | Retain current scroll/view state                   |
| Component override   | All should inherit from global CSS vars            |
| Printing             | Always use light mode by default unless overridden |

---

## ✅ Output Summary

| Component                     | Behavior                              |
| ----------------------------- | ------------------------------------- |
| **Reads From**                | `localStorage`, `settings`            |
| **Writes To**                 | `localStorage`, `settings`            |
| **UI Re-render Required?**    | ✅ On toggle                          |
| **User Confirmation Needed?** | ❌                                    |
| **Recoverable?**              | ✅ Always fallbacks to system/default |

---

## 🔮 Future Enhancements

- User-selectable color themes
- Auto-switch based on time of day
- Accessibility enhancements (contrast / font-size presets)
