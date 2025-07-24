// src/components/modals/WarningModal.jsx
import React from "react";
import PropTypes from "prop-types";
import IconWarningSolid from "../../icons/IconWarningSolid";
import "./WarningModal.css";

export default function WarningModal({ 
  message, 
  onConfirm, 
  onCancel,
  variant = "danger",      // "danger" | "warning" | "info"
}) {
  return (
    <div className="modal-overlay">
      <div className={`modal-content modal-${variant}`}>
        <div className="modal-icon">
          <IconWarningSolid />
        </div>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

WarningModal.propTypes = {
  message:   PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel:  PropTypes.func.isRequired,
  variant:   PropTypes.oneOf(["danger", "warning", "info"]),
};
