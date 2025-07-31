const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getAllMonths: () => ipcRenderer.invoke("get-all-months"),
  getCategories:    () => ipcRenderer.invoke("get-categories"),

  //Create New Month:
  createMonth: (opts) => ipcRenderer.invoke("create-month", opts),

  // Delete Month
  deleteMonth:       monthId  => ipcRenderer.invoke("delete-month", monthId),

  //Import methods:
  importJsonBackup: () => ipcRenderer.invoke("import-json-backup"),

  //Expense methods:
  getExpenses: (monthId) => ipcRenderer.invoke("get-expenses", monthId),
  addExpense: (expense) => ipcRenderer.invoke("add-expense", expense),
  deleteExpense: (id) => ipcRenderer.invoke("delete-expense", id),
  updateExpense: (expense) => ipcRenderer.invoke("update-expense", expense),

  // Income methods:
  getIncome: (monthId) => ipcRenderer.invoke("get-income", monthId),
  addIncome: (income)   => ipcRenderer.invoke("add-income", income),
  updateIncome: (income) => ipcRenderer.invoke("update-income", income),
  deleteIncome: (id)     => ipcRenderer.invoke("delete-income", id),

  // Dashboard methods:
  getDashboardSummary: (monthId) =>     ipcRenderer.invoke("get-dashboard-summary", monthId),
  getDashboardHistory: (options = { monthsCount: 6 }) => ipcRenderer.invoke("get-dashboard-history", options),
  getUrgentBills: (options = { monthId: null, windowDays: 7 }) => ipcRenderer.invoke("get-urgent-bills", options),
});