import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarMedico } from "../js/registros/cadastrar_medico.js";
import { formatCRM } from "../js/formatters.js";
import { useToast } from "../context/ToastProvider.jsx"; 

export default function RegisterDoctor() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast(); // 👈 agora você pode chamar o toast daqui

  const crmFromUrl = new URLSearchParams(location.search).get("crm");
  const [formdata, setformdata] = useState({
    name: "",
    crm: crmFromUrl ? formatCRM(crmFromUrl) : "",
    email: "",
  });

  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "specialty", type: "text", placeholder: "Especialidade do Médico", required: true },
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
        showToast("Médico cadastrado com sucesso!", "success");

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        let message = result.message || "Erro desconhecido ao cadastrar médico.";

      
        if (message.includes("duplicar valor da chave") || message.includes("username_key")) {
          message = "Este e-mail já está cadastrado. Tente outro endereço.";
        }

        setErrorMessage(message);
        
      }
    } catch (err) {
      console.error(err);
      const message = "Falha ao se conectar ao servidor.";
      setErrorMessage(message);
      showToast(message, "error");
    }


    setLoading(false);
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />

        <div className={Style.login_card}>
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
              buttonSuccess={success}
            />
          </motion.div>

          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.h2>Bem-vindo!</motion.h2>
            <motion.p>
              Cadastre as informações do médico para integrá-lo ao sistema da
              clínica. O registro garante acesso aos módulos operacionais e
              permite o gerenciamento seguro de suas atividades.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
