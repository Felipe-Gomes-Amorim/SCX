import React from "react";
import Style from "../../home/home.module.css";

export default function CustomFieldsList({ customFieldsList }) {
  if (!customFieldsList.length) return null;

  return (
    <div className={Style.ListCustom}>
      <h4>Campos Personalizados Criados:</h4>
      <div className={Style.customCardsContainer}>
        {customFieldsList.map((field, i) => (
          <div key={i} className={Style.customCard}>
            <strong>{field.fieldName}:</strong> {field.fieldValue}
          </div>
        ))}
      </div>
    </div>
  );
}
