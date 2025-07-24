// src/hooks/useIncome.js

import { useState, useEffect } from "react";
import { useMonthContext } from "../context/MonthContext";

export default function useIncome() {
  const { monthId } = useMonthContext();
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = async () => {
    if (!monthId) return;
    try {
      // Assume getIncome returns an array of income rows (or [] if none)
      const rows = await window.api.getIncome(monthId);
      setIncomes(Array.isArray(rows) ? rows : []);
    } catch (err) {
      console.error("Error fetching incomes:", err);
      // Optionally setIncomes([]) here as a fallback
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [monthId]);

  return [incomes, fetchIncomes];
}
