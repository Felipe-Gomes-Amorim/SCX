import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx"
import { cadastrarAdm } from "../js/registros/cadastrate_adm.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { useToast } from "../context/ToastProvider.jsx"; 

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
    const { showToast } = useToast(); 

  // Campos que o formulário vai renderizar dinamicamente
  const fields = [
    
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
    { name: "cnpj", type: "text", placeholder: "CNPJ da clínica", required: true },
  ];

  // Recebe o objeto com todos os valores do form
  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const pacienteData = {
        cnpj: formValues.cnpj,
        email: formValues.email,
        name: formValues.name

      };
      const token = localStorage.getItem("token"); 
      const result = await cadastrarAdm(pacienteData);

      if (result.success) {
        showToast("ADM cadastrado com sucesso!");
        navigate("/"); // Redireciona para login
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
        <Header />

        <div className={Style.login_card}>
          {/* Parte da direita: boas-vindas 
          
          <div className={Style.login_arrow}>
            <span>→</span>
          </div>*/
          
          }
          

          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.h2>Bem-vindo!</motion.h2>
            <motion.p>
              Crie sua conta de Administrador para acessar o sistema
            </motion.p>
          </motion.div>

          {/* Parte da esquerda: formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Cadastro de Administrador</h2>
            <p className={Style.subtitle}>Preencha seus dados</p>

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
