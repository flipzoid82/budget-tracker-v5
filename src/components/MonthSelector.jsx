// src/components/MonthSelector.jsx
import React from "react";
import { useMonthContext } from "../context/MonthContext";
import { formatMonthId } from "../utils/formatters"; // helper for "JUL 2025" etc.

const MonthSelector = () => {
  const { monthId, setMonthId, availableMonths, loading } = useMonthContext();

  if (loading) return null;
  if (!availableMonths.length) return <p>No months available</p>;

  return (
    <div className="month-selector">
      <label htmlFor="month-dropdown">📅 Month:</label>
      <select
        id="month-dropdown"
        value={monthId}
        onChange={(e) => setMonthId(e.target.value)}
      >
        {availableMonths.map((id) => (
          <option key={id} value={id}>
            {formatMonthId(id)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
