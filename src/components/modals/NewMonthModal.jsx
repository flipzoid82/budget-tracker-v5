// src/components/modals/NewMonthModal.jsx

import React, { useState, useEffect } from "react";
import WarningModal from "./WarningModal";
import PropTypes from "prop-types";
import "./NewMonthModal.css";

const NewMonthModal = ({
  isOpen,
  onClose,
  onCreated,
  existingMonths,
  earliestMonth,
}) => {
  /// state for showing the “Discard changes?” warning
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [mode, setMode] = useState("clone");
  const [cloneFrom, setCloneFrom] = useState("");
  const [copyIncome, setCopyIncome] = useState(true);
  const [copyExpenses, setCopyExpenses] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // options state
  const [yearOptions, setYearOptions] = useState([]);

  // compute date boundaries
  const minDate = earliestMonth ? new Date(`${earliestMonth}-01`) : null;
  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 4, 1);

  // populate year dropdown when earliestMonth changes
  useEffect(() => {
    if (!earliestMonth) return;
    const startYear = parseInt(earliestMonth.split("-")[0], 10);
    const endYear = maxDate.getFullYear();
    const years = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(y.toString());
    }
    setYearOptions(years);
  }, [earliestMonth]);

  // month options with per-year disabling
  const monthNames = [
    "01","02","03","04","05","06","07","08","09","10","11","12"
  ];
  const monthOptions = monthNames.map((m) => {
    const mNum = parseInt(m, 10);
    let disabled = false;
    if (year) {
      const yNum = parseInt(year, 10);
      if (minDate && yNum === minDate.getFullYear() && mNum < minDate.getMonth() + 1) {
        disabled = true;
      }
      if (yNum === maxDate.getFullYear() && mNum > maxDate.getMonth() + 1) {
        disabled = true;
      }
    }
    return { value: m, disabled };
  });

  // clear related errors on input change
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setErrors((prev) => ({ ...prev, date: null, duplicate: null }));
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setErrors((prev) => ({ ...prev, date: null, duplicate: null }));
  };

  // form validation
  const validate = () => {
    const errs = {};
    if (!year || !month) {
      errs.date = "Please select both year and month.";
    } else {
      const selected = new Date(`${year}-${month}-01`);
      if (selected < minDate || selected > maxDate) {
        const maxMonthStr = `${maxDate.getFullYear()}-${String(
          maxDate.getMonth() + 1
        ).padStart(2, "0")}`;
        errs.date = `Month must be between ${earliestMonth} and ${maxMonthStr}.`;
      }
    }
    const monthId = `${year}-${month}`;
    if (existingMonths.includes(monthId)) {
      errs.duplicate = `A month for “${monthId}” already exists.`;
    }
    if (mode === "clone") {
      if (!cloneFrom || cloneFrom === monthId) {
        errs.cloneFrom = "Please select a different month to clone from.";
      }
      if (!copyIncome && !copyExpenses) {
        errs.copy = "Select at least one data type to copy.";
      }
    }
    return errs;
  };

  // submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }
  setIsSubmitting(true);
  try {
    await onCreated({
      monthId: `${year}-${month}`,
      mode,
      cloneOpts: { 
        from: cloneFrom, 
        income: copyIncome, 
        expenses: copyExpenses 
      },
    });
  } catch (err) {
    setErrors({ submit: err.message || "Something went wrong. Please try again." });
    setIsSubmitting(false);
  }
};

  // don't render if closed
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modal-header">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h2 id="modal-header" className="modal-header">
          🌙 Create New Month
        </h2>
        <p className="modal-description">
          Select how you’d like to start your new month and which data to carry forward.
        </p>

        {errors.duplicate && (
          <div className="modal-error-banner">{errors.duplicate}</div>
        )}

        {/* Year selector */}
        <div className="modal-field">
          <label htmlFor="year">Year</label>
          <select
            id="year"
            value={year}
            onChange={handleYearChange}
            disabled={isSubmitting}
          >
            <option value="">— Select year —</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.date && <div className="input-error">{errors.date}</div>}
        </div>

        {/* Month selector */}
        <div className="modal-field">
          <label htmlFor="month">Month</label>
          <select
            id="month"
            value={month}
            onChange={handleMonthChange}
            disabled={isSubmitting || !year}
          >
            <option value="">— Select month —</option>
            {monthOptions.map(({ value, disabled }) => (
              <option key={value} value={value} disabled={disabled}>
                {value}
              </option>
            ))}
          </select>
          {!errors.duplicate && errors.date && (
            <div className="input-error">{errors.date}</div>
          )}
        </div>

        {/* Initial setup radios */}
        <fieldset className="modal-field">
          <legend>Initial Setup</legend>
          <label>
            <input
              type="radio"
              name="mode"
              value="blank"
              checked={mode === "blank"}
              onChange={() => { setMode("blank"); setErrors({}); }}
              disabled={isSubmitting}
            />
            Start Blank
            <small>Begin with an empty slate.</small>
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="clone"
              checked={mode === "clone"}
              onChange={() => setMode("clone")}
              disabled={isSubmitting || existingMonths.length < 2}
              title={
                existingMonths.length < 2
                  ? "Clone not available until you have 2+ months."
                  : undefined
              }
            />
            Clone Previous
            <small>Copy recurring data from another month.</small>
          </label>
        </fieldset>

        {/* Clone details */}
        {mode === "clone" && (
          <div className="clone-options">
            <label>
              From
              <select
                value={cloneFrom}
                onChange={(e) => {
                  setCloneFrom(e.target.value);
                  setErrors((p) => ({ ...p, cloneFrom: null }));
                }}
                disabled={isSubmitting}
              >
                <option value="">— Select month —</option>
                {existingMonths.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
            {errors.cloneFrom && (
              <div className="input-error">{errors.cloneFrom}</div>
            )}

            <label>
              <input
                type="checkbox"
                checked={copyIncome}
                onChange={() => {
                  setCopyIncome((v) => !v);
                  setErrors((p) => ({ ...p, copy: null }));
                }}
                disabled={isSubmitting}
              />
              Income
              <small>Copy all income entries (preserve day; update month/year).</small>
            </label>
            <label>
              <input
                type="checkbox"
                checked={copyExpenses}
                onChange={() => {
                  setCopyExpenses((v) => !v);
                  setErrors((p) => ({ ...p, copy: null }));
                }}
                disabled={isSubmitting}
              />
              Expenses
              <small>
                Copy recurring expenses (day → new month; strip paid flags & metadata).
              </small>
            </label>
            {errors.copy && (
              <div className="input-error">{errors.copy}</div>
            )}

            <label className="disabled" title="Coming soon">
              <input type="checkbox" disabled />
              Budgets
              <small>Coming soon</small>
            </label>
            <label className="disabled" title="Coming soon">
              <input type="checkbox" disabled />
              Misc
              <small>Coming soon</small>
            </label>
          </div>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowConfirmCancel(true)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>

        {errors.submit && (
          <div className="input-error">{errors.submit}</div>
        )}
      </form>
      {/* Confirm discard warning */}
      {showConfirmCancel && (
        <WarningModal
          message="Discard your changes and close?"
          variant="warning"
          onConfirm={() => {
            setShowConfirmCancel(false);
            onClose();
          }}
          onCancel={() => setShowConfirmCancel(false)}
        />
      )}
    </div>
  );
};

NewMonthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
  existingMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  earliestMonth: PropTypes.string.isRequired,
};

export default NewMonthModal;
