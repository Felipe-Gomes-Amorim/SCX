import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarSecretaria } from "../js/registros/cadastrar_secretaria.js"; 
import DynamicForm from "../assents_link/DynamicForm.jsx";

export default function RegisterSecretaria() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Campos do formulário (secretária)
  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "cpf", type: "text", placeholder: "CPF", required: true },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  // ✅ Envio dos dados
  const handleSubmit = async (formData) => {  // <-- agora recebe formData diretamente
    setLoading(true);
    setErrorMessage("");

    try {
      const secretariaData = {
        name: formData.name,
        cpf: formData.cpf,       // já vai vir com máscara ou limpa se usar unmask
        email: formData.email,   // digitação direta
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarSecretaria(secretariaData, token);

      if (result.success) {
      alert("Secretária cadastrada com sucesso!");
      navigate("/home");
      } else {
      setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
      }
    } catch (err) {
    setErrorMessage("Falha ao se conectar ao servidor.");
    }

  setLoading(false);
  };


  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />

        <div className={Style.login_card}>
          {/* Lado direito - boas-vindas */}
          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.h2>Bem-vinda!</motion.h2>
            <motion.p>Crie a conta da secretária da clínica.</motion.p>
          </motion.div>

          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Cadastro de Secretária</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Cadastrar"
              loading={loading}
              errorMessage={errorMessage}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
