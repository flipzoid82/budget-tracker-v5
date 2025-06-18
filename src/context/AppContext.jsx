// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AppContext = createContext();

/**
 * Global app state provider.
 * Currently tracks the selected month and stores it in localStorage for persistence.
 */
export const AppProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState("");

  // Load saved month from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("currentMonth");
    if (saved) setCurrentMonth(saved);
  }, []);

  // Persist current month to localStorage
  useEffect(() => {
    if (currentMonth) {
      localStorage.setItem("currentMonth", currentMonth);
    }
  }, [currentMonth]);

  return (
    <AppContext.Provider value={{ currentMonth, setCurrentMonth }}>
      {children}
    </AppContext.Provider>
  );
};
