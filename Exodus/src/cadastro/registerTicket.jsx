import Style from '../About.module.css'
import { motion } from "framer-motion";
import React, { useState } from "react";
import { cadastrarTicket } from "../js/registros/cadastrar_tickets.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer.jsx'



function RegisterTicket() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [formdata, setformdata] = useState({
    subject: "",
    message: "",
  });

  const fields = [
    { name: "subject", type: "text", placeholder: "Assunto", required: true },
    { name: "message", type: "textarea", placeholder: "Informe-nos o seu problema", required: true },
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);
    const navigate = useNavigate();

    try {
      const ticketData = {
        subject: formValues.subject,
        message: formValues.message,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarTicket(ticketData, token);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => { window.location.reload(); }, 1500);
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar ticket.");
      }
    } catch (err) {
      setErrorMessage("Falha ao se conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <>
      <section className={Style.about_ticket}>
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
            buttonSuccess={success}
          />
        </motion.div>
      </section>
    </>
  );
}

export default RegisterTicket;
