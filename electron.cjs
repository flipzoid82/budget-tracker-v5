const { app, BrowserWindow } = require("electron");
const path = require("path");
const { migrate } = require("./schema"); 

// Load IPC handlers
require("./ipc/dbHandlers");
require("./ipc/importJsonBackup");

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

app.whenReady().then(() => {
  migrate();      // ✅ Initialize DB schema
  createWindow(); // ✅ Launch app window
});
