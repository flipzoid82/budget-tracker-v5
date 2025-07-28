// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import BudgetPage from "./pages/BudgetPage";
import MiscPage from "./pages/MiscPage";
import SettingsPage from "./pages/SettingsPage";

import { MonthProvider } from "./context/MonthContext";
import { ToastProvider } from "./context/ToastContext";
import "./styles/toast.css";  

const App = () => {
  return (
    <ToastProvider> 
      <Router>
        <MonthProvider> {/* ✅ Wrap app in Month context */}
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/income" element={<IncomePage />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="/misc" element={<MiscPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </MonthProvider>
      </Router>
    </ToastProvider>
  );
};

export default App;
