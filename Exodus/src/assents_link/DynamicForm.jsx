import React, { useState } from "react";
import ActionButton from "./ActionButton.jsx";

export default function DynamicForm({ fields, onSubmit, buttonText, loading }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // envia todos os dados preenchidos
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <input
          key={index}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          onChange={handleChange}
        />
      ))}

      <ActionButton text={buttonText} loading={loading} />
    </form>
  );
}
