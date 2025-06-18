// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Month Management
  getAllMonths: () => ipcRenderer.invoke("get-all-months"),
  createMonth: (id) => ipcRenderer.invoke("create-month", id),
  copyMonthData: (params) => ipcRenderer.invoke("copy-month-data", params),

  // (Future: add expenses, income, misc, etc.)
});
