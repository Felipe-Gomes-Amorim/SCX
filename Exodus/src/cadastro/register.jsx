import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarPaciente } from "../js/registros/cadastrar_paciente.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";

export default function RegisterPaciente() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Campos do formulário
  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "cpf", type: "text", placeholder: "CPF", required: true },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  // Função de envio
  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const pacienteData = {
        name: formValues.name,
        cpf: formValues.cpf,
        email: formValues.email,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarPaciente(pacienteData, token);

      if (result.success) {
        // Redireciona diretamente para /perfil sem alert
        navigate("/perfil");
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
              Digite os dados do paciente para que ele possa utilizar do Sistema
            </motion.p>
          </motion.div>

          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Cadastro de Paciente</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Cadastrar"
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
