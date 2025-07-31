// src/components/NewMonthButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import IconPlus from '../icons/IconPlus';

/**
 * Button to trigger the Create New Month modal.
 */
const NewMonthButton = ({ onClick }) => (
  <button
    type="button"
    className="new-month-button"
    aria-label="Create new month"
    onClick={onClick}
  >
    ✚ Add New Month
  </button>
);

NewMonthButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewMonthButton;