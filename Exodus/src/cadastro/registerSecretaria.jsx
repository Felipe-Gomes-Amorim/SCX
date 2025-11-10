import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarSecretaria } from "../js/registros/cadastrar_secretaria.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { useToast } from "../context/ToastProvider.jsx"; 

export default function RegisterSecretaria() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast(); // ✅ hook para exibir os toasts

  const [formdata, setformdata] = useState({
    name: "",
    cpf: "",
    email: "",
  });

  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "cpf", type: "text", placeholder: "CPF", required: true },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  const handleSubmit = async (formdata) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const secretariaData = {
        name: formdata.name,
        cpf: formdata.cpf,
        email: formdata.email,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarSecretaria(secretariaData, token);

      if (result.success) {
        setSuccess(true);
        showToast("Secretária cadastrada com sucesso!", "success");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        const message = result.message || "Erro desconhecido ao cadastrar.";
        setErrorMessage(message);
        showToast(message, "error");
      }
    } catch (err) {
      const msg = "Falha ao se conectar ao servidor.";
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
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
            <h2>Cadastro de Secretária</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            <DynamicForm
              fields={fields}
              values={formdata}
              onChangeValues={setformdata}
              onSubmit={handleSubmit}
              buttonText={success ? "Cadastrado" : "Confirmar"}
              loading={loading}
              buttonSuccess={success}
              errorMessage={errorMessage}
            />
          </motion.div>

          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.h2>Nova Secretária</motion.h2>
            <motion.p>
              Preencha os dados necessários para cadastrar a secretária no sistema e habilitar o acesso às funções operacionais da clínica.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
