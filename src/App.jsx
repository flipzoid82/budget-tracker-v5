// src/App.jsx
import React from "react";
import MonthSelector from "./components/budget/MonthSelector";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📅 Budget Tracker v5</h1>
      <p>Select or create a month to begin.</p>

      <MonthSelector />
    </div>
  );
}

export default App;
