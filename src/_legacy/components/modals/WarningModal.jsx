// src/components/modals/WarningModal.jsx
import React from "react";
import styles from "./Modal.module.css";

/**
 * Generic confirmation modal for warnings or irreversible actions.
 *
 * Props:
 * - title: string – Modal title (e.g. "Delete Expense?")
 * - message: string – Body text explaining the action
 * - confirmLabel: string – Button text for confirmation
 * - onConfirm: function – Callback on confirm
 * - onCancel: function – Callback on cancel
 */
function WarningModal({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>

        <div className={styles.actions}>
          <button onClick={onConfirm}>⚠️ {confirmLabel}</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
