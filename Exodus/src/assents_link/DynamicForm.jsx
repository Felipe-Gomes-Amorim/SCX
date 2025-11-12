import React, { useState } from "react";
import ActionButton from "./ActionButton.jsx";
import Style from "./DynamicForm.module.css";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState({});

  // 🎨 Formata campos automaticamente conforme o nome
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cnpj") formattedValue = formatCNPJ(value);
    if (name === "telephone") formattedValue = formatPhone(value);
    if (name === "cpf") formattedValue = formatCPF(value);
    if (name === "crm") formattedValue = formatCRM(value);
    if (name === "cid") formattedValue = formatCID(value);
    if (name === "cep") formattedValue = formatCEP(value);

    onChangeValues((prev) => ({ ...prev, [name]: formattedValue }));
  };

  // 🚀 Limpa máscaras antes do envio
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

  const togglePassword = (name) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <form onSubmit={handleSubmit} className={Style.form}>
      <div className={Style.FitObj}>
        {fields.map((field, index) => {
          // 🟢 Campo de seleção
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

          // 🟣 Campo customizado (ex: CEP com botão extra)
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
                  formdata: values,
                  setformdata: onChangeValues,
                })}
              </div>
            );
          }

          // 🔐 Campo de senha com botão "olho"
          if (field.type === "password") {
            return (
              <div key={index} className={Style.passwordContainer}>
                <input
                  type={showPassword[field.name] ? "text" : "password"}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange}
                  maxLength={field.maxLength}
                  minLength={field.minLength}
                />
                <button
                  type="button"
                  onClick={() => togglePassword(field.name)}
                  className={Style.eyeButton}
                  title={showPassword[field.name] ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword[field.name] ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            );
          }

          // 🔤 Campo padrão
          return (
            <input
              key={index}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.name]}
              onChange={handleChange}
              maxLength={field.maxLength}
              minLength={field.minLength}
            />
          );
        })}
      </div>

      <div className={Style.FitObj}>
        <ActionButton
          text={buttonText}
          loading={loading}
          success={
            buttonText === "Enviado" ||
            buttonText === "Cadastrado" ||
            buttonText === "Verificado" ||
            buttonText === "Ativa"
          }
          style={buttonStyle}
        />
      </div>
    </form>
  );
}
