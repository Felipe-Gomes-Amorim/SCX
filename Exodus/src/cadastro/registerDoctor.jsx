import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarMedico } from "../js/registros/cadastrar_medico.js";
import { formatCRM } from "../js/formatters.js";

export default function RegisterDoctor() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false); // ✅ controle do sucesso
  const navigate = useNavigate();
  const location = useLocation();
  const crmFromUrl = new URLSearchParams(location.search).get("crm");
  const [formdata, setformdata] = useState({
      name: "",
      crm:  crmFromUrl ? formatCRM(crmFromUrl) : "",
      email: "",
  });

  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "crm", type: "text", placeholder: "CRM", required: true, defaultValue: crmFromUrl },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const result = await cadastrarMedico(formValues, token);

      if (result.success) {
        setSuccess(true); 
        setTimeout(() => {
          navigate("/home"); 
        }, 1500);
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar médico.");
      }
    } catch (err) {
      console.error(err);
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
              Digite os dados do médico para que ele possa utilizar do Sistema.
            </motion.p>
          </motion.div>

          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Cadastro de Médico</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            {errorMessage && <p className={Style.formError}>{errorMessage}</p>}

            <DynamicForm
              fields={fields}
              values={formdata}                    
              onChangeValues={setformdata} 
              onSubmit={handleSubmit}
              buttonText={success ? "Cadastrado" : "Confirmar"}
              loading={loading}
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
