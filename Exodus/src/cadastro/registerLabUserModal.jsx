import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarUsuarioLab } from "../js/registros/cadastrar_usuario_lab.js";

export default function RegisterLabUserModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
  });

  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  const handleSubmit = async (formdata) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const result = await cadastrarUsuarioLab(formdata, token);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => onClose(), 1500);
      } else {
        setErrorMessage(result.message || "Erro ao cadastrar usuário");
      }
    } catch (err) {
      setErrorMessage("Falha ao se conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Fundo borrado */}
      <motion.div
        className={Style.modal_overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      ></motion.div>

      {/* Conteúdo do modal */}
      <motion.div
        className={Style.modal_content}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>Cadastrar de Usuário do Laboratório</h2>
        <p className={Style.subtitle}>Preencha com os dados</p>

        <DynamicForm
          fields={fields}
          values={formdata}
          onChangeValues={setformdata}
          onSubmit={handleSubmit}
          buttonText={success ? "Cadastrado" : "Confirmar"}
          loading={loading}
          buttonSuccess={success}
        />

        {errorMessage && <p className={Style.error}>{errorMessage}</p>}
      </motion.div>
    </>
  );
}
