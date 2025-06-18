// src/api/expenses.js

/**
 * Handles IPC access to expense-related database actions
 * All functions use window.api methods defined in preload.js
 */

export async function getExpenses(monthId) {
  return await window.api.getExpenses(monthId);
}

export async function addExpense(data) {
  return await window.api.addExpense(data);
}

export async function updateExpense(id, updates) {
  return await window.api.updateExpense({ id, updates });
}

export async function deleteExpense(id) {
  return await window.api.deleteExpense(id);
}
