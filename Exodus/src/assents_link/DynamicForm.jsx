import React, { useState } from "react";
import ActionButton from "./ActionButton.jsx";
import Style from "./DynamicForm.module.css";
import { formatCNPJ, formatCPF, formatPhone, formatCRM, formatCID, unmask } from "../js/formatters.js";

export default function DynamicForm({ fields, onSubmit, buttonText, loading }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || field.value || "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplica formatações conforme o nome do campo
    if (name === "cnpj") formattedValue = formatCNPJ(value);
    if (name === "telephone") formattedValue = formatPhone(value);
    if (name === "cpf") formattedValue = formatCPF(value);
    if (name === "crm") formattedValue = formatCRM(value);
    if (name === "cid") formattedValue = formatCID(value);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Remove máscaras antes de enviar ao back-end
    const cleanedData = Object.keys(formData).reduce((acc, key) => {
      if (key === "cnpj" || key === "telephone" || key === "cpf") {
        acc[key] = unmask(formData[key]);
      } else {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className={Style.form}>
      <div className={Style.FitObj}>
        {fields.map((field, index) => {
          if (field.type === "select") {
            return (
              <select
                key={index}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              >
                <option value="" disabled>
                  {field.placeholder || "Selecione"}
                </option>
                {field.options?.map((option, i) => (
                  <option key={i} value={option.email}>
                    {option.name}
                  </option>
                ))}
              </select>
            );
          }

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
