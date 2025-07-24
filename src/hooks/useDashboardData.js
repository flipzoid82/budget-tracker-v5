// src/hooks/useDashboardData.js
import { useState, useEffect } from "react";

export default function useDashboardData(monthId) {
  // 1) Always call your hooks at the top
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    unpaidTotal: 0,
    surplus: 0,
    history: [],
    alerts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // 2) Guard inside the effect, not around hooks
    if (!monthId) {
      // If no monthId, reset to loading state or do nothing
      setData(d => ({ ...d, loading: true, error: null }));
      return;
    }

    let isActive = true;
    async function fetchData() {
      try {
        const summary = await window.api.getDashboardSummary(monthId);
        const history = await window.api.getDashboardHistory({ monthsCount: 6 });
        const alerts = await window.api.getUrgentBills({ monthId, windowDays: 7 });
        if (!isActive) return;

        const surplus = summary.totalIncome - summary.totalExpenses;
        setData({
          totalIncome: summary.totalIncome,
          totalExpenses: summary.totalExpenses,
          unpaidTotal: summary.unpaidTotal,
          surplus,
          history,
          alerts,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!isActive) return;
        setData(d => ({ ...d, loading: false, error }));
      }
    }

    fetchData();
    return () => {
      isActive = false;
    };
  }, [monthId]);

  // 3) Always return the state object
  return data;
}
