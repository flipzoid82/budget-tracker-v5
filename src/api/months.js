// src/api/months.js

/**
 * Wrapper for all month-related IPC calls using window.api
 * Keeps database access logic modular and out of the component layer.
 */

export async function getAllMonths() {
  return await window.api.getAllMonths();
}

export async function createMonth(monthId) {
  return await window.api.createMonth(monthId);
}

export async function copyMonthData({ fromId, toId, copyIncome, copyExpenses }) {
  return await window.api.copyMonthData({ fromId, toId, copyIncome, copyExpenses });
}
