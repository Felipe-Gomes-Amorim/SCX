import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarLaboratorio } from "../js/registros/cadastrar_laboratorio.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarAdmLaboratorio } from "../js/registros/cadastrar_adm_laboratorio.js";
import { formatCNPJ } from "../js/formatters.js";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const cnpjFromUrl = new URLSearchParams(window.location.search).get("cnpj");

  // Estado do formulário
  const [formData, setFormData] = useState({
    name: "",
    cnpj: cnpjFromUrl ? formatCNPJ(cnpjFromUrl) : "", // aplica máscara já aqui
    address: "",
    telephone: "",
    labUser: "",
    email: "",
  });

  // Campos do formulário
  const fields = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "cnpj", type: "text", placeholder: "CNPJ", required: true, defaultValue: formData.cnpj },
    { name: "address", type: "text", placeholder: "Endereço", required: true },
    { name: "telephone", type: "text", placeholder: "Telefone", required: true },
    { name: "labUser", type: "text", placeholder: "Nome do ADM do laboratório", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
  ];

  // Submissão do formulário
  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const labData = {
        name: formValues.name,
        cnpj: formValues.cnpj, // já vem formatado
        address: formValues.address,
        telephone: formValues.telephone,
      };
      const admLabData = {
        name: formValues.labUser,
        email: formValues.email,
        cnpj: formValues.cnpj,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarLaboratorio(labData, token);
      if (result.success) {
        alert("Laboratório cadastrado com sucesso!");
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
      }

      const result2 = await cadastrarAdmLaboratorio(admLabData, token);
      if (result2.success) {
        alert("Administrador do laboratório cadastrado com sucesso!");
        navigate("/home");
      } else {
        setErrorMessage(result2.message || "Erro desconhecido ao cadastrar");
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
          {/* Lado direito */}
          <motion.div className={Style.login_right} initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
            <motion.h2>Bem-vindo!</motion.h2>
            <motion.p>Registre o Laboratório no sistema.</motion.p>
          </motion.div>

          {/* Lado esquerdo */}
          <motion.div className={Style.login_left} initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
            <h2>Cadastro de Laboratório</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            <DynamicForm fields={fields} onSubmit={handleSubmit} buttonText="Cadastrar" loading={loading} errorMessage={errorMessage} />
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
