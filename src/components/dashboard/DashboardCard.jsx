    // src/components/dashboard/DashboardCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "./DashboardCard.css";

export default function DashboardCard({ label, value, variant = "neutral" }) {
  return (
    <div className={`dashboard-card dashboard-card--${variant}`}>
      <span className="dashboard-card__label">{label}</span>
      <span className="dashboard-card__value">{value}</span>
    </div>
  );
}

DashboardCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["positive", "negative", "neutral"]),
};
