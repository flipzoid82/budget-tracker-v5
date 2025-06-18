// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Month Management
  getAllMonths: () => ipcRenderer.invoke("get-all-months"),
  createMonth: (id) => ipcRenderer.invoke("create-month", id),
  copyMonthData: (params) => ipcRenderer.invoke("copy-month-data", params),

  // Expenses
  getExpenses: (monthId) => ipcRenderer.invoke("get-expenses", monthId),
  addExpense: (data) => ipcRenderer.invoke("add-expense", data),
  updateExpense: ({ id, updates }) => ipcRenderer.invoke("update-expense", { id, updates }),
  deleteExpense: (id) => ipcRenderer.invoke("delete-expense", id),
  // (Future: add expenses, income, misc, etc.)
});
