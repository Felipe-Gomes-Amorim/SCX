import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarSecretaria } from "../js/registros/cadastrar_secretaria.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";

export default function RegisterSecretaria() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false); // ✅ controle do sucesso
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: "",
    cpf: "",
    email: "",
  });

  // ✅ Campos do formulário (secretária)
  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "cpf", type: "text", placeholder: "CPF", required: true, defaultValue: formdata.cpf },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  // ✅ Envio dos dados
  const handleSubmit = async (formdata) => {  // <-- agora recebe formData diretamente
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const secretariaData = {
        name: formdata.name,
        cpf: formdata.cpf,       // já vai vir com máscara ou limpa se usar unmask
        email: formdata.email,   // digitação direta
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarSecretaria(secretariaData, token);

      if (result.success) {
        setSuccess(true); // ✅ ativa o botão verde
        setTimeout(() => {
          navigate("/home"); // redireciona após 2s
        }, 2000);
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
          {/* Lado direito - boas-vindas */}
          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.h2>Bem-vinda!</motion.h2>
            <motion.p>Crie a conta da secretária da clínica.</motion.p>
          </motion.div>

          {/* Lado esquerdo - formulário */}
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
              buttonStyle={{
                backgroundColor: success ? "#28a745" : "#007bff",
                color: "white",
                borderColor: success ? "#28a745" : "#007bff",
                boxShadow: success ? "0 0 15px 3px #28a745" : "#007bff",
                transition: "all 0.3s ease",
              }}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
