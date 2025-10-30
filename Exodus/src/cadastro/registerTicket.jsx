import Style from '../About.module.css'
import { motion } from "framer-motion"; 
import React, { useState } from "react";
import { cadastrarTicket } from "../js/registros/cadastrar_tickets.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";

function RegisterTicket() {
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
    { name: "message", type: "textarea", placeholder: "Informe-nos o seu problema", required: true },
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

export default RegisterTicket;