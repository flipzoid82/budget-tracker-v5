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

    useEffect(() => {
      fetchMonths();
  }, []);

  const createAndSetMonth = async (opts) => {
    const res = await window.api.createMonth(opts);
    if (res.success) {
      const all = await window.api.getAllMonths();
      setAvailableMonths(all);
      setMonthId(opts.monthId);
    }
  };

  // Delete a month + reset to the next-most-recent
  const deleteAndResetMonth = async (id) => {
    const res = await window.api.deleteMonth(id);
    if (res.success) {
      const all = await window.api.getAllMonths();
      setAvailableMonths(all);
      // pick the new “first” month or null
      setMonthId(all[0] || null);
    } else {
      console.error("deleteAndResetMonth failed:", res.error);
    }
  };



  return (
    <MonthContext.Provider 
      value={{ 
        monthId, 
        setMonthId, 
        availableMonths, 
        loading,
        refreshMonths: fetchMonths,
        createAndSetMonth,
        deleteAndResetMonth,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
};
