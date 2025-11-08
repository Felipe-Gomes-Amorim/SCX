import React from "react";
import Style from "../../home/home.module.css";

export default function CustomFieldsList({ customFieldsList }) {
  if (!customFieldsList.length) return null;

  return (
    <div className={Style.ListCustom}>
      <h4>Campos Personalizados Criados:</h4>
      <ul>
        {customFieldsList.map((field, i) => (
          <li key={i}>
            <strong>{field.fieldName}:</strong> {field.fieldValue}
          </li>
        ))}
      </ul>
    </div>
  );
}
