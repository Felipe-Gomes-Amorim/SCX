import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { responderTicket } from "../js/responder_ticket.js"; 
import DynamicForm from "../assents_link/DynamicForm.jsx";

export default function ResponseTicket() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // pega o id do ticket da URL

  // Campos do formulário
  const fields = [
    { name: "response", type: "text", placeholder: "Assunto", required: true },

  ];

  // Função de envio (PATCH)
  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");

      // Formata os dados para o PATCH
      const patchData = {
        response: formValues.response,

        id: id
      };

      const result = await responderTicket(patchData, token);

      if (result.success) {
        // Redireciona para a listagem de tickets
        navigate("/selectAll/tickets");
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao responder ticket.");
      
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
          {/* Lado direito - informações */}
          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.h2>Responder Ticket</motion.h2>
            <motion.p>
              Preencha os campos abaixo para responder o ticket.
            </motion.p>
          </motion.div>

          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Resposta do Ticket</h2>
            <p className={Style.subtitle}>Preencha os dados</p>

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Enviar Resposta"
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
