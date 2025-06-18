// src/components/modals/PromptModal.jsx
import React, { useState } from "react";
import styles from "./Modal.module.css"; // Shared styling for all modals

/**
 * A reusable modal for user prompts.
 * Supports input, optional select dropdown, and flexible submit handling.
 *
 * Props:
 * - title: string – modal title
 * - label: string – label for input field
 * - initialValue: string – default value (if editing)
 * - selectOptions: array of { label, value } – optional dropdown choices
 * - submitLabel: string – text for submit button
 * - onSubmit: function(value | {input, select}) – submit callback
 * - onClose: function – cancel/close handler
 */
const PromptModal = ({
  title = "Enter Value",
  label = "Value",
  initialValue = "",
  selectOptions = null,
  submitLabel = "Submit",
  onSubmit,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [selectValue, setSelectValue] = useState(selectOptions?.[0]?.value || "");

  const handleSubmit = () => {
    if (onSubmit) {
      if (selectOptions) {
        onSubmit({ input: inputValue, select: selectValue });
      } else {
        onSubmit(inputValue);
      }
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>

        <label>{label}</label>
        <input
          type="text"
          value={inputValue}
          placeholder="Type here..."
          onChange={(e) => setInputValue(e.target.value)}
        />

        {selectOptions && (
          <>
            <label>Options</label>
            <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
              {selectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </>
        )}

        <div className={styles.actions}>
          <button onClick={handleSubmit}>✅ {submitLabel}</button>
          <button onClick={onClose}>❌ Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
