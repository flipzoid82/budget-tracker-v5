// db.js
const path = require("path");
const { app }  = require("electron");
const Database = require("better-sqlite3");

// Point to the SQLite database file
const dbPath = path.join(__dirname, "..", "budget.sqlite3");
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

module.exports = db;
