// src/hooks/useExpenses.js
import { useState, useEffect } from "react";
import { useMonthContext } from "../context/MonthContext";

export function useExpenses() {
  const { monthId } = useMonthContext();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    let isActive = true;
    
    const fetchData = async () => {
      if (!monthId) {
        if (isActive) setExpenses([]);
        return;
      }

      try {
        const data = await window.api.getExpenses(monthId);
        if (isActive) setExpenses(data);
      } catch (err) {
        if (isActive) setExpenses([]);
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, [monthId]);

  return [expenses, setExpenses];
}