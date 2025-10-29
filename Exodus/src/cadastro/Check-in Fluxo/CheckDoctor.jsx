import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { verificarMedico } from "../../js/fluxoMedico/verificar_medico.js";
import { transferirMedico } from "../../js/fluxoMedico/transferir_medico.js";
import DynamicForm from "../../assents_link/DynamicForm.jsx";
import Style from "../register.module.css";
import ExodusTop from "../../ExodusTop.jsx";
import Footer from "../../Footer.jsx";

export default function CheckDoctor() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fields = [{ name: "crm", type: "text", placeholder: "Digite o CRM do médico", required: true }];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const result = await verificarMedico(formValues.crm, token);
    console.log("Resultado da verificação:", result);

    if (result.status === "jaCadastrado") {
      alert("Médico já está cadastrado na clínica.");
      navigate("/perfil");
    } else if (result.status === "transferivel") {
      alert("Médico existe no sistema mas não está vinculado à clínica. Cadastrando no sistema");
      const result2 = await transferirMedico(formValues);
      if (result2.success) {
        alert("Transferido com sucesso!");
        navigate("/perfil");
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
      }
    } else if (result.status === "novo") {
      alert("Médico não encontrado. Prossiga para o cadastro completo!");
      navigate(`/registerMedico?crm=${formValues.crm}`);
    } else {
      alert("Ocorreu um erro ao verificar o CRM.");
      setErrorMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />

        <div className={Style.login_card}>
          {/* Barra lateral / mensagem de boas-vindas */}
          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.h2>Bem-vindo!</motion.h2>
            <motion.p>
              Verifique se o médico já está cadastrado no sistema
            </motion.p>
          </motion.div>

          {/* Formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Verificar Médico</h2>
            <p className={Style.subtitle}>Informe o CRM para verificar o cadastro</p>

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Verificar"
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
