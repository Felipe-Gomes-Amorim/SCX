import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./GenericButton.module.css"; 
let homeWindow = null; 

export default function ActionButton({
  text,
  color = "#fff",       // cor padrão do texto e borda
  background = "transparent", // cor de fundo padrão
  hoverColor = "#007DFA",     // cor do texto no hover
  hoverBackground = "#fff",   // cor do fundo no hover
  glowColor = "#fff", 
  //padding = "10px 215px"       permite ajustar o tamanho também
}) {
  const navigate = useNavigate();

  const handleEntrar = () => {
  const token = localStorage.getItem("token");

  if (token) {
    // verifica se a aba ainda existe e não foi fechada
    if (!homeWindow || homeWindow.closed) {
      homeWindow = window.open("/home", "home");
    } else {
      homeWindow.focus();
    }
  } else {
    navigate("/login");
  }
};


  const buttonStyle = {
    color: color,
    borderColor: color,
    background: background,
    //padding: padding,
  };

  return (
    <button
      className={Style.btn}
      style={buttonStyle}
      type="button"
      onClick={() => handleEntrar()}
      onMouseEnter={(e) => {
        e.target.style.color = hoverColor;
        e.target.style.background = hoverBackground;
      }}
      onMouseLeave={(e) => {
        e.target.style.color = color;
        e.target.style.background = background;
      }}
    >
      {text}
    </button>
  );
}
