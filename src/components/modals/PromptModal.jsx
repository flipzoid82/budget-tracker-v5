// src/components/modals/PromptModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PromptModal.css";

export default function PromptModal({
  title,
  fields,
  initialValue = {},
  onSubmit,
  onClose
}) {
  const [values, setValues] = useState({ ...initialValue });
  const [errors, setErrors] = useState({});

  const handleChange = name => e =>
    setValues(v => ({ ...v, [name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    // 🛡 inline validation
    const newErrors = {};
    fields.forEach(f => {
      if (f.required && !values[f.name]?.toString().trim()) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return; // bail out—don’t call onSubmit yet
    }
    setErrors({});
    onSubmit(values);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map(f => {
            const value = values[f.name] || "";
            const error = errors[f.name];

            // select dropdown
            if (f.type === "select") {
              return (
                <label key={f.name} className={error ? "has-error" : ""}>
                  {f.label}
                  <select
                    name={f.name}
                    value={value}
                    onChange={handleChange(f.name)}
                  >
                    <option value="">— none —</option>
                    {f.options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {error && <div className="input-error">{error}</div>}
                </label>
              );
            }

            // regular input
            return (
              <label key={f.name} className={error ? "has-error" : ""}>
                {f.label}
                <input
                  type={f.type}
                  name={f.name}
                  value={value}
                  onChange={handleChange(f.name)}
                />
                {error && <div className="input-error">{error}</div>}
              </label>
            );
          })}

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

PromptModal.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name:     PropTypes.string.isRequired,
      label:    PropTypes.string.isRequired,
      type:     PropTypes.string.isRequired,
      options:  PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired
        })
      ),
      required: PropTypes.bool
    })
  ).isRequired,
  initialValue: PropTypes.object,
  onSubmit:     PropTypes.func.isRequired,
  onClose:      PropTypes.func.isRequired
};
