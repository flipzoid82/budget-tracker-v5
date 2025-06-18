// electron/electron.cjs
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("./src/db/dbAccess");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");
}

// === IPC HANDLERS ===

// Get all months from DB
ipcMain.handle("get-all-months", async () => {
  return db.getAllMonths();
});

// Create new blank month
ipcMain.handle("create-month", async (_event, id) => {
  return db.createMonth(id);
});

// Copy income/expenses to new month
ipcMain.handle("copy-month-data", async (_event, { fromId, toId, copyIncome, copyExpenses }) => {
  return db.copyMonthData(fromId, toId, { copyIncome, copyExpenses });
});

app.whenReady().then(createWindow);
