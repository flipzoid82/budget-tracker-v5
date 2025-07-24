// src/components/dashboard/DashboardTrendChart.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { formatMonthId } from "../../utils/formatters";
import "./DashboardTrendChart.css";

export default function DashboardTrendChart({ data }) {
  return (
    <div className="dashboard-trend-chart">
      <h2 className="chart-title">
       Income vs. Expenses over the past 6 months
     </h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <XAxis dataKey="monthId" tickFormatter={formatMonthId} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="income"
            name="Income"
            barSize={30}
            fill="#4caf50"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#e53935"
            strokeWidth={4}
            dot={{ 
              r: 6, 
              fill: "#fff",           // white center
              stroke: "#e53935",      // red ring
              strokeWidth: 2 
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

DashboardTrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      monthId: PropTypes.string.isRequired,
      income: PropTypes.number.isRequired,
      expenses: PropTypes.number.isRequired,
    })
  ).isRequired,
};
