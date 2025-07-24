// src/components/MainLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Toolbar from "./Toolbar";
import MonthSelector from "./MonthSelector"; // ✅ Import it
import "../styles/layout.css";

const MainLayout = () => {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/expenses">Expenses</NavLink></li>
            <li><NavLink to="/income">Income</NavLink></li>
            <li><NavLink to="/budget">Budget</NavLink></li>
            <li><NavLink to="/misc">Misc</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Toolbar />
        <MonthSelector /> {/* ✅ Add this line */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
