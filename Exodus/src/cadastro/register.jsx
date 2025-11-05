import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarPaciente } from "../js/registros/cadastrar_paciente.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { formatCPF } from "../js/formatters.js";

export default function RegisterPaciente() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const cpfFromUrl = new URLSearchParams(location.search).get("cpf");
  const [formdata, setformdata]= useState({
    name: "",
    cpf: cpfFromUrl ? formatCPF(cpfFromUrl) : "",
    email: "",
  });

  // Campos do formulário
  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "cpf", type: "text", placeholder: "CPF", required: true, defaultValue: formdata.cpf },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  // 🔹 Funções utilitárias para validar CPF e e-mail
  const handleSubmit = async (formdata) => {  // <-- agora recebe formData diretamente
    setLoading(true);
    setErrorMessage("");
    setSuccess(false)

    try {
      const pacienteData = {
        name: formdata.name,
        cpf: formdata.cpf,       // já vai vir com máscara ou limpa se usar unmask
        email: formdata.email,   // digitação direta
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarPaciente(pacienteData, token);

      if (result.success) {
      setSuccess(true);
      setTimeout(() => {navigate("/home");}, 2000);
      } else {
      setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
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
            <motion.p>Digite os dados do paciente para que ele possa utilizar do Sistema.</motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
