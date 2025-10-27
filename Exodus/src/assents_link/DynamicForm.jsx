import React, { useState } from "react";
import ActionButton from "./ActionButton.jsx";
import Style from "./DynamicForm.module.css";

export default function DynamicForm({ fields, onSubmit, buttonText, loading }) {
  // Inicializa o formData com os valores padrão (field.value ou defaultValue)
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || field.value || "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // envia todos os dados preenchidos
  };

  return (
    <form onSubmit={handleSubmit} className={Style.form}>
      <div className={Style.FitObj}>
      {fields.map((field, index) => {
        
        // Renderiza select caso o tipo seja "select"
        if (field.type === "select") {
          return (
            <select
              key={index}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
            >
              <option value="" disabled>{field.placeholder || "Selecione"}</option>
              {field.options?.map((option, i) => (
                <option key={i} value={option.email}>
                  {option.name}
                </option>
              ))}
            </select>
          );
        }

        // Renderiza input normal para outros tipos
        return (
          <input
            key={index}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name]}
            onChange={handleChange}
          />
        );
      })}
      </div>
      <div className={Style.FitObj}>
      <ActionButton text={buttonText} loading={loading} />
      </div>
    </form>
  );
}
