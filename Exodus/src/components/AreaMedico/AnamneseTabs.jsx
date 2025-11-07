import React from "react";
import Style from "../../home/home.module.css";

export default function AnamneseTabs({ expanded, setExpanded }) {
  const tabs = [
    "Queixa e Doença Atual",
    "Hábitos e Estilo de Vida",
    "Exame Físico",
    "Observações e Tratamento",
  ];

  return (
    <div className={Style.tabHeader}>
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          className={`${Style.tabButton} ${expanded === idx ? Style.activeTab : ""}`}
          onClick={() => setExpanded(idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
