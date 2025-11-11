import React from "react";
import Style from "./AnamneseTabs.module.css";

export default function AnamneseTabs({ expanded, setExpanded }) {
  const tabs = [
    "Queixa e Doença Atual",
    "Hábitos e Estilo de Vida",
    "Exame Físico",
    "Observações e Tratamento",
    "Campos Personalizados" 
  ];


  return (
    <div className={Style.toggleContainer}>
      <div
        className={`${Style.highlight}`}
        style={{
          width: `${100 / tabs.length}%`,
          transform: `translateX(${expanded * 100}%)`,
        }}
      ></div>

      {tabs.map((tab, idx) => (
        <button
          key={idx}
          className={`${Style.toggleButton} ${expanded === idx ? Style.activeBtn : ""
            }`}
          onClick={() => setExpanded(idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
