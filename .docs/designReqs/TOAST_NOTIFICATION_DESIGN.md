# 🔔 Toast Notification – Design Spec

## 🧠 Purpose
Provide brief, unobtrusive feedback (“toast”) for user actions like deleting a month, so users aren’t left wondering whether anything happened.

## 🧱 Structure & Placement
1. **Container**
   - A single `<div class="toast-container">` appended to the app root (e.g., in `App.jsx` or `MainLayout.jsx`).
   - Positioned `fixed` in the **bottom-right** corner (or top-right, per your preference).

2. **Toast**
   - A `<div class="toast toast--success">✅ Deleted “July 2025”</div>` (or `toast--error` for failures).
   - Horizontal layout: optional icon + message text.
   - Rounded corners, subtle shadow, padding.

3. **Example CSS**
   ```css
   .toast-container {
     position: fixed;
     bottom: 1rem;
     right: 1rem;
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
     z-index: 1000;
   }

   .toast {
     display: flex;
     align-items: center;
     background: var(--bg-light);
     color: var(--text);
     padding: 0.75rem 1rem;
     border-radius: 4px;
     box-shadow: 0 2px 8px rgba(0,0,0,0.1);
     animation: fadeIn 0.2s ease-out, fadeOut 0.2s ease-in 2.8s;
     font-weight: 500;
   }
   .toast--success { border-left: 4px solid var(--green); }
   .toast--error   { border-left: 4px solid var(--red); }

   @keyframes fadeIn {
     from { opacity: 0; transform: translateY(10px); }
     to   { opacity: 1; transform: translateY(0); }
   }
   @keyframes fadeOut {
     from { opacity: 1; }
     to   { opacity: 0; }
   }
   ```

## 🔁 Behavior
- **Trigger**: call `showToast(message, { variant })` after successful delete.
- **Queue**: allow multiple toasts; stack them in the container.
- **Auto-dismiss**: each toast lives for ~3 seconds (fade in/out).
- **Manual dismiss** (optional): clicking a toast hides it immediately.

## 🗂️ Implementation Outline
1. **ToastContext / hook** (`useToast`) that provides `showToast`.
2. **ToastProvider** wraps your app (e.g., in `App.jsx`), renders `<ToastContainer />`.
3. **ToastContainer** holds an array of toasts in state; each toast has `id`, `message`, `variant`.
4. **MainLayout** or your delete handler calls `showToast("Deleted “July 2025”", { variant: "success" })`.
