import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Style from "./ResetSenha.module.css";

import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import API_URL from "../js/apiConfig.js";

export default function ResetSenha() {
  const [formData, setFormData] = useState({ email: "" }); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fields = [
    {
      type: "email",
      name: "email",
      placeholder: "Digite seu e-mail",
      required: true,
    },
  ];

  const handleRequestReset = async (data) => {
    const { email } = data;

    if (!email) {
      setMessage("Por favor, insira seu e-mail.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      console.log("Solicitando redefinição de senha para:", email);
      const response = await axios.patch(`${API_URL}/resetPassword/generateToken`, { email });

      if (response.status === 200) {
        setMessage("Um e-mail com instruções para redefinir sua senha foi enviado! Ele expirará em 6 minutos.");
        setTimeout(() => navigate("/login"), 4000);
      }
    } catch (error) {
      console.error("Erro ao solicitar redefinição:", error);
      setMessage(
        error.response?.data?.message ||
          "Erro ao enviar o e-mail de redefinição. Tente novamente."
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
          <h2>Recuperar Acesso</h2>
          <p>Digite seu e-mail para receber o link de redefinição de senha:</p>

          {/* ✅ Passamos values e onChangeValues */}
          <DynamicForm
            fields={fields}
            values={formData}
            onChangeValues={setFormData}
            onSubmit={handleRequestReset}
            buttonText="Enviar E-mail"
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
