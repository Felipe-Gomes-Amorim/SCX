import React, { useState } from "react";
import Style from "./ResetSenha.module.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import Header from "../Header.jsx";

export default function ResetSenha() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Campos do formulário dinâmico
  const fields = [
    { type: "email", name: "email", placeholder: "Digite seu e-mail", required: true },
    { type: "password", name: "newPassword", placeholder: "Nova senha", required: true },
    { type: "password", name: "confirmPassword", placeholder: "Confirmar nova senha", required: true },
  ];

  const handleReset = async (formData) => {
    const { email, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:3333/resetSenha", {
        email,
        novaSenha: newPassword,
      });

      if (response.status === 200) {
        setMessage("Senha redefinida com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erro ao redefinir senha. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={Style.reset_page}>
        <Header />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={Style.reset_card}
        >
          <h2>Redefinir Senha</h2>
          <p>Insira seu e-mail e a nova senha abaixo:</p>

          <DynamicForm
            fields={fields}
            onSubmit={handleReset}
            buttonText="Redefinir Senha"
            loading={loading}
          />

          {message && <p className={Style.message}>{message}</p>}

          <button className={Style.back_btn} onClick={() => navigate("/login")}>
            Voltar ao Login
          </button>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
