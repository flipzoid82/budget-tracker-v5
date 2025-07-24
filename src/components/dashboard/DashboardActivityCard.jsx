// src/components/dashboard/DashboardActivityCard.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatMDY } from "../../utils/formatters";
import "./DashboardActivityCard.css";

export default function DashboardActivityCard({
  title,
  icon,
  items,
  cutoff = 6,
}) {
  if (!items || !items.length) return null;

  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, cutoff);

  return (
    <div className="dashboard-activity-card">
      <h2 className="activity-title">{icon} {title}</h2>
      <ul className="activity-list">
        {visible.map(({ id, name, dueDate, paidDate, amount }) => {
          const dateLabel = paidDate
            ? `Paid ${formatMDY(paidDate)}`
            : `Due ${formatMDY(dueDate)}`;
          return (
            <li key={id} className="activity-item">
              <span className="activity-name">{name}</span>
              <span className="activity-date">— {dateLabel}</span>
              <span className="activity-amt">(${amount.toFixed(2)})</span>
            </li>
          );
        })}
      </ul>
      {items.length > cutoff && (
        <button
          className="activity-toggle"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : `Show ${items.length - cutoff} More…`}
        </button>
      )}
    </div>
  );
}

DashboardActivityCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      name: PropTypes.string.isRequired,
      dueDate: PropTypes.string,
      paidDate: PropTypes.string,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  cutoff: PropTypes.number,
};
