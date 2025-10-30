import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarTicket } from "../js/registros/cadastrar_tickets.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";

export default function RegisterTicket() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess]= useState(false);
  const navigate = useNavigate();
  const [formdata, setformdata]= useState({
    subject: "",
    message: "",
  });

  // Campos do formulário
  const fields = [
    { name: "subject", type: "text", placeholder: "Assunto", required: true },
    { name: "message", type: "text", placeholder: "Informe-nos o seu problema", required: true },
  ];

  // Função de envio
  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const ticketData = {
        subject: formValues.subject,
        message: formValues.message,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarTicket(ticketData, token);

      if (result.success) {
        setSuccess(true);
        navigate("/home");
      } else {
        // Mensagem de erro inline
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar paciente.");
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
            <motion.h2>Bem-vindo!</motion.h2>
            <motion.p>
              Nos informe o problema que está ocorrendo
            </motion.p>
          </motion.div>

          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Cadastro de Ticket</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            <DynamicForm
              fields={fields}
              values={formdata}
              onChangeValues={setformdata}
              onSubmit={handleSubmit}
              buttonText={success ? "Enviado" : "Enviar Ticket"}
              loading={loading}
              className={Style.ticketButton}
              buttonStyle={{
                backgroundColor: success ? "#28a745" : "#007bff",
                color: "white",
                borderColor: success ? "#28a745" : "#007bff",
                boxShadow: success ? "0 0 15px 3px #28a745" : "#007bff",
                transition: "all 0.1s ease",
              }}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
