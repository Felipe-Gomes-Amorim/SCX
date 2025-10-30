import React from "react";
import Style from "./ActionButton.module.css"; 

export default function ActionButton({ 
  text,           
  loading,       
  disabled,       
  onClick,
  style // ✅ adicionamos o estilo dinâmico
}) {
  return (
    <button
      className={Style.btnAction}
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      style={style} // ✅ aplica a cor dinamicamente
    >
      {loading ? "Carregando..." : text}
    </button>
  );
}
