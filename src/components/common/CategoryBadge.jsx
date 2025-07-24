// src/components/common/CategoryBadge.jsx
import React from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../utils/categoryColors";
import "./CategoryBadge.css";

export default function CategoryBadge({ category }) {
  if (!category) return null;

  // pick a color from the map, or fall back to your accent var
  const bg = categoryColors[category] || "var(--accent-bg)";

  return (
    <span
      className="category-badge"
      style={{ backgroundColor: bg }}
    >
      {category}
    </span>
  );
}

CategoryBadge.propTypes = {
  category: PropTypes.string,
};
