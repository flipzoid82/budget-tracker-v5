// src/components/MainLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Toolbar from "./Toolbar";
import MonthSelector from "./MonthSelector";
import NewMonthButton from "./NewMonthButton";
import NewMonthModal from "./modals/NewMonthModal";
import "../styles/layout.css";
import { useMonthContext } from "../context/MonthContext";
import { formatMonthId }  from "../utils/formatters.mjs"; 
import WarningModal from "./modals/WarningModal";
import { useToast } from "../context/ToastContext";

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [isDeleteOpen, setIsDeleteOpen]   = useState(false);

  const {
    availableMonths,
    monthId,
    deleteAndResetMonth,
    setMonthId,
    loading,
    refreshMonths,
  } = useMonthContext();

  const existingMonths = availableMonths;
  const earliestMonth = availableMonths.length
    ? availableMonths[availableMonths.length - 1]
    : new Date().toISOString().slice(0, 7);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const { showToast } = useToast();
  const { createAndSetMonth } = useMonthContext();

  const handleMonthCreated = async (opts) => {
    // opts is { monthId, mode, cloneOpts }
    await createAndSetMonth(opts);
    setIsModalOpen(false);
  };

  // Open/close delete confirmation
  const handleDeleteOpen  = () => setIsDeleteOpen(true);
  const handleDeleteClose = () => setIsDeleteOpen(false);

  // Confirm deletion: delete then reset to next-most-recent
  const handleDeleteConfirm = async () => {
    await deleteAndResetMonth(monthId);
    setIsDeleteOpen(false);
    showToast(`Deleted “${formatMonthId(monthId)}”`, { variant: "success" });
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <ul>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/expenses">Expenses</NavLink></li>
          <li><NavLink to="/income">Income</NavLink></li>
          <li><NavLink to="/misc">Misc</NavLink></li> 
          <li><NavLink to="/budget">Budget</NavLink></li>       
          <li><NavLink to="/settings">Settings</NavLink></li>   
        </ul>
      </aside>
      
      <main className="content">
        <Toolbar />
        <hr/>
        <div className="header-controls">
          <MonthSelector />
          <NewMonthButton onClick={handleModalOpen} disabled={loading} />
          <button
            className="new-month-button delete-month-button"
            onClick={handleDeleteOpen}
            disabled={loading || availableMonths.length <= 1}
            title="Delete current month"
          >
            🗑️ Delete Month
          </button>  {/* ← place alongside “New Month”*/}
        </div>

        <NewMonthModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onCreated={handleMonthCreated}
          existingMonths={existingMonths}
          earliestMonth={earliestMonth}
        />

        {isDeleteOpen && (
          <WarningModal
            message={`Are you sure you want to delete “${formatMonthId(monthId)}”? This will remove all its data.`}
            variant="danger"
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteClose}
          />
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
