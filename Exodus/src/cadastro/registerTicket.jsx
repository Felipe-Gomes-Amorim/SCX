import Style from '../About.module.css'
import { motion } from "framer-motion"; 
import React, { useState } from "react";
import { cadastrarTicket } from "../js/registros/cadastrar_tickets.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";

function RegisterTicket() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para mensagem de sucesso

  // Campos do formulário
  const fields = [
    { name: "subject", type: "text", placeholder: "Assunto", required: true },
    { name: "message", type: "textarea", placeholder: "Informe-nos o seu problema", required: true },
  ];

  // Função de envio
  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage(""); // Limpa mensagem anterior

    try {
      const ticketData = {
        subject: formValues.subject,
        message: formValues.message,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarTicket(ticketData, token);

      if (result.success) {
        // Em vez de redirecionar, mostra mensagem de sucesso
        setSuccessMessage("Ticket cadastrado com sucesso! Nossa equipe entrará em contato em breve.");
      } else {
        // Mensagem de erro inline
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar ticket.");
      }
    } catch (err) {
      setErrorMessage("Falha ao se conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <section className={Style.about_ticket}>
   
  
        {/* Formulário de cadastro de ticket integrado */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          className={Style.ticket_form} // Adicione uma classe CSS se precisar estilizar o formulário
        >
          <h3>Cadastro de Ticket</h3>
          <p className={Style.subtitle}>Preencha com os dados do ticket</p>

          {successMessage && <p className={Style.successMessage}>{successMessage}</p>} {/* Mensagem de sucesso */}

          <DynamicForm
            fields={fields}
            onSubmit={handleSubmit}
            buttonText="Cadastrar"
            loading={loading}
            errorMessage={errorMessage} 
          />
        </motion.div>
     
    </section>
  );
}

export default RegisterTicket;