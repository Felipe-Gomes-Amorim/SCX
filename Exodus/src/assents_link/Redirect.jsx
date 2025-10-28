import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Redirect.module.css"; 

export default function Redirect({
  text,
  icon,
  place,
  color = "#fff",
  background = "transparent",
  hoverColor = "#007DFA",
  hoverBackground = "#fff",
  glowColor = "#fff",
}) {
  const navigate = useNavigate();

  const buttonStyle = {
    color,
    borderColor: color,
    background,
  };

  return (
    <button
      className={`${Style.btn} ${icon ? Style.iconOnly : ""}`}
      style={buttonStyle}
      type="button"
      onClick={() => navigate(place)}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = hoverColor;
        e.currentTarget.style.background = hoverBackground;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = color;
        e.currentTarget.style.background = background;
      }}
    >
      {icon && <img src={icon} alt="icon" className={Style.icon} />}
      {text && <span>{text}</span>}
    </button>
  );
}
