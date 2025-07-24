// src/components/tables/DataTable.jsx
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./DataTable.css";
import IconArrowUp   from "../../icons/IconArrowUp";
import IconArrowDown from "../../icons/IconArrowDown";

export default function DataTable({ 
    columns, 
    rows, 
    actions,
    getRowClass = () => ""
}) {
  // 1) sort state
  const [sortKey, setSortKey]   = useState("dueDate");
  const [sortDir, setSortDir]   = useState("asc");

  // 2) memoized sorted rows
  const sortedRows = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      // if both look like dates, compare as dates
      if (typeof aVal === "string" && typeof bVal === "string" &&
          !isNaN(Date.parse(aVal)) && !isNaN(Date.parse(bVal))) {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      // numeric?
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      // date?
      if (aVal instanceof Date && bVal instanceof Date) {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      // fallback to string compare
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  // 3) header click toggles sort
  const handleSort = key => {
    if (key === sortKey) {
      setSortDir(dir => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="sortable"
                onClick={() => handleSort(col.key)}
              >
                <div className="th-content">
                  {col.label}
                  {sortKey === col.key && (
                    sortDir === "asc"
                      ? <IconArrowUp className="sort-icon" />
                      : <IconArrowDown className="sort-icon" />
                  )}
                </div>
              </th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, idx) => (
            <tr key={row.id} className={getRowClass(row, idx)}>
              {columns.map(col => (
                <td key={col.key}>{col.render(row, idx)}</td>
              ))}
              {actions && (
                <td className="actions-cell">
                  {actions.map(a => (
                    <button
                      key={a.key}
                      title={a.title}
                      onClick={() => a.onClick(row)}
                    >
                      {a.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key:    PropTypes.string.isRequired,
    label:  PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  })).isRequired,
  rows:    PropTypes.array.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    key:     PropTypes.string.isRequired,
    label:   PropTypes.node.isRequired,
    title:   PropTypes.string,
    onClick: PropTypes.func.isRequired,
  })),
  getRowClass: PropTypes.func,
};
