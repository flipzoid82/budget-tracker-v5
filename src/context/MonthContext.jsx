// src/context/MonthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const MonthContext = createContext();

// Export hook
export const useMonthContext = () => useContext(MonthContext);

// Provider
export const MonthProvider = ({ children }) => {
  const [monthId, setMonthId] = useState(null);       // e.g., "2025-07"
  const [availableMonths, setAvailableMonths] = useState([]); // List of months
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const monthIds = await window.api.getAllMonths(); // e.g. ["2025-06","2025-05",…]
        // SQL already orders DESC, so you can just use it:
        setAvailableMonths(monthIds);
        if (!monthId && monthIds.length) {
        setMonthId(monthIds[0]);
        }
      } catch (err) {
        console.error("Failed to load months:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonths();
  }, []);

  return (
    <MonthContext.Provider value={{ monthId, setMonthId, availableMonths, loading }}>
      {children}
    </MonthContext.Provider>
  );
};
