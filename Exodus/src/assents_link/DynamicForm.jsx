import React from "react";
import ActionButton from "./ActionButton.jsx";
import Style from "./DynamicForm.module.css";

import {
  formatCNPJ,
  formatCPF,
  formatPhone,
  formatCRM,
  formatCID,
  formatCEP,
  unmask,
} from "../js/formatters.js";

export default function DynamicForm({
  fields,
  values,
  onChangeValues,
  onSubmit,
  buttonText,
  loading,
  buttonStyle,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cnpj") formattedValue = formatCNPJ(value);
    if (name === "telephone") formattedValue = formatPhone(value);
    if (name === "cpf") formattedValue = formatCPF(value);
    if (name === "crm") formattedValue = formatCRM(value);
    if (name === "cid") formattedValue = formatCID(value);
    if (name === "cep") formattedValue = formatCEP(value);

    onChangeValues(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = Object.keys(values).reduce((acc, key) => {
      if (["cnpj", "telephone", "cpf", "cep"].includes(key)) {
        acc[key] = unmask(values[key]);
      } else {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className={Style.form}>
      <div className={Style.FitObj}>
        {fields.map((field, index) => {
          // Campo de seleção
          if (field.type === "select") {
            return (
              <select
                key={index}
                name={field.name}
                value={values[field.name]}
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

          // Campo customizado (ex: CEP com botão)
          if (field.render) {
            return (
              <div key={index}>
                {field.render({
                  name: field.name,
                  type: field.type || "text",
                  placeholder: field.placeholder,
                  required: field.required,
                  value: values[field.name],
                  onChange: handleChange,
                  formdata: values,        // permite acessar todos os dados
                  setformdata: onChangeValues, // permite atualizar vários campos
                })}
              </div>
            );
          }

          // Campo padrão
          return (
            <input
              key={index}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.name]}
              onChange={handleChange}
            />
          );
        })}
      </div>

      <div className={Style.FitObj}>
        <ActionButton
          text={buttonText}
          loading={loading}
          success={buttonText === "Enviado" || buttonText === "Cadastrado" || buttonText === "Verificado"} // 👈 muda cor automaticamente
        />
      </div>
    </form>
  );
}
