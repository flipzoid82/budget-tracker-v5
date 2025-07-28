import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, { variant = "success", duration = 3000 } = {}) => {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts, { id, message, variant }]);
    // auto-dismiss
    setTimeout(() => {
      setToasts((ts) => ts.filter((t) => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(({ id, message, variant }) => (
          <div key={id} className={`toast toast--${variant}`}>
            {/* optional icon */}
            {variant === "success" ? "✅ " : "❌ "}
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
