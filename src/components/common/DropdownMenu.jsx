//src/components/common/DropdownMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./DropdownMenu.css";

export default function DropdownMenu({ items, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setOpen(o => !o);
  const handleItemClick = onClick => () => {
    onClick();
    setOpen(false);
  };

  return (
    <div className="dropdown-container" ref={ref}>
      <button className="dropdown-button" onClick={toggleMenu}>
        {children}
      </button>
      {open && (
        <ul className="dropdown-menu">
          {items.map(item => (
            <li
              key={item.key}
              className="dropdown-item"
              onClick={handleItemClick(item.onClick)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};
