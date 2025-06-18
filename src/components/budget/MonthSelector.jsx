// src/components/budget/MonthSelector.jsx
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PromptModal from "../modals/PromptModal";
import styles from "./MonthSelector.module.css";

/**
 * Dropdown selector and creator for budget months.
 * Fetches months via IPC and allows user to create new ones with optional data copy.
 */
const MonthSelector = () => {
  const { currentMonth, setCurrentMonth } = useContext(AppContext);
  const [months, setMonths] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState("");

  // Load month list from DB on mount
  useEffect(() => {
    loadMonths();
  }, []);

  const loadMonths = async () => {
    try {
      const result = await window.api.getAllMonths();
      const sorted = result.map((m) => m.id).sort().reverse(); // Most recent first
      setMonths(sorted);
      if (!currentMonth && sorted.length > 0) {
        setCurrentMonth(sorted[0]);
      }
    } catch (err) {
      console.error("Failed to load months:", err);
    }
  };

  const handleSelect = (e) => {
    setCurrentMonth(e.target.value);
  };

  // Create new month based on user input
  const handleCreateMonth = async ({ input, select }) => {
    const monthId = input.trim();
    const copyOption = select;

    // Validate month ID format
    if (!/^\d{4}-\d{2}$/.test(monthId)) {
      return setError("Invalid format. Use YYYY-MM.");
    }

    if (months.includes(monthId)) {
      return setError("This month already exists.");
    }

    try {
      await window.api.createMonth(monthId);

      const lastMonth = months[0];
      const shouldCopy = copyOption !== "none";

      if (shouldCopy && lastMonth) {
        await window.api.copyMonthData({
          fromId: lastMonth,
          toId: monthId,
          copyIncome: copyOption === "both" || copyOption === "income",
          copyExpenses: copyOption === "both" || copyOption === "expenses",
        });
      }

      await loadMonths();
      setCurrentMonth(monthId);
      setError("");
    } catch (err) {
      console.error("Month creation failed:", err);
      setError("Failed to create month. See console.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>📆 Select Month:</label>
      <select className={styles.dropdown} value={currentMonth || ""} onChange={handleSelect}>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button className={styles.newButton} onClick={() => setShowPrompt(true)}>
        ➕ New Month
      </button>

      {showPrompt && (
        <PromptModal
          title="Create New Month"
          label="Enter Month ID (YYYY-MM)"
          initialValue=""
          selectOptions={[
            { label: "Start Blank", value: "none" },
            { label: "Copy Income Only", value: "income" },
            { label: "Copy Expenses Only", value: "expenses" },
            { label: "Copy Income + Expenses", value: "both" },
          ]}
          submitLabel="Create"
          onSubmit={handleCreateMonth}
          onClose={() => setShowPrompt(false)}
        />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MonthSelector;
