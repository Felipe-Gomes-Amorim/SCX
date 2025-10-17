import React, { useState, useEffect, useRef } from "react";
import Style from "./GenericButton.module.css"; 
import { useNavigate } from "react-router-dom";

export default function DropdownButton({ text, place, color, glowColor, options = [] }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={Style.dropdownContainer} ref={dropdownRef}>
      <button
        className={Style.btn}
        style={{
          backgroundColor: color || "transparent",
          boxShadow: open
            ? `0 0 30px 5px ${glowColor || "rgba(255, 255, 255, 0.815)"}`
            : "none",
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {text}
      </button>

      {open && (
        <div className={Style.dropdownMenu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={Style.dropdownItem}
              onClick={() => {
                navigate(option.place);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
