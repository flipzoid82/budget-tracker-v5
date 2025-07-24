// src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom"; 
import { useMonthContext } from "../context/MonthContext";
import useDashboardData from "../hooks/useDashboardData";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardTrendChart from "../components/dashboard/DashboardTrendChart";
import DashboardActivityCard from "../components/dashboard/DashboardActivityCard";
import { formatMonthId } from "../utils/formatters";
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  const { monthId } = useMonthContext();
  const {
    history,
    alerts: rawAlerts,
    totalIncome,
    totalExpenses,
    unpaidTotal,
    surplus,
    loading,
    error,
  } = useDashboardData(monthId);

  if (loading) return <div className="dashboard-page__status">Loading…</div>;
  if (error)
    return (
      <div className="dashboard-page__status">
        Error: {error.message}
      </div>
    );

  // Partition rawAlerts into buckets
  const today = new Date();
  const addDays = (d, n) => {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  };

  const overdue = rawAlerts.filter(a =>
    !a.paidDate && new Date(a.dueDate) < today
  );
  const upcoming = rawAlerts.filter(a => {
    const d = new Date(a.dueDate);
    return !a.paidDate && d >= today && d <= addDays(today, 7);
  });
  const recentPaid = rawAlerts.filter(a =>
    a.paidDate && new Date(a.paidDate) >= addDays(today, -7)
  );

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <span className="dashboard-page__icon"></span>
        <h1 className="dashboard-page__title">
          📊 Dashboard — {formatMonthId(monthId)}
        </h1>
      </header>

      {/* Summary Cards */}
      <div className="dashboard-page__cards">
        <Link to="/income" className="card-link">
           <DashboardCard
             label="Total Income"
             value={`$${totalIncome.toFixed(2)}`}
             variant="positive"
           />
         </Link>
         <Link to="/expenses" className="card-link">
           <DashboardCard
             label="Total Expenses"
             value={`$${totalExpenses.toFixed(2)}`}
             variant="negative"
           />
         </Link>
         <DashboardCard
           label="Unpaid Bills"
           value={`$${unpaidTotal.toFixed(2)}`}
           variant={unpaidTotal > 0 ? "negative" : "neutral"}
         />
         <DashboardCard
           label="Surplus"
           value={`$${surplus.toFixed(2)}`}
           variant={surplus >= 0 ? "positive" : "negative"}
         />
      </div>

      {/* Trend Chart */}
      <DashboardTrendChart data={history} />

      {/* Activity Cards */}
     <section className="dashboard-page__activities">
       <DashboardActivityCard title="Overdue Bills" icon="🔴" items={overdue} cutoff={6} />
       <DashboardActivityCard title="Upcoming Bills" icon="🟠" items={upcoming} cutoff={6} />
       <DashboardActivityCard title="Recently Paid" icon="✅" items={recentPaid} cutoff={6} />
     </section>
    </div>
  );
}
