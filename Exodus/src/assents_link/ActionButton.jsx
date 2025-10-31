import React from "react";
import Style from "./ActionButton.module.css"; 

export default function ActionButton({ 
  text,           
  loading,       
  disabled,       
  onClick,
  success = false,
  
}) {

  const buttonClass = success 
    ? `${Style.btnAction} ${Style.btnSuccess}` 
    : Style.btnAction
  
  return (
    <button
      className={buttonClass}
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Carregando..." : text}
    </button>
  );
}
