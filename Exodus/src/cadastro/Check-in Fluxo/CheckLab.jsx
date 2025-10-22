import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { verificarLaboratorio } from "../../js/fluxoLaboratorio/verificar_laboratorio.js";
import { transferirLaboratorio } from "../../js/fluxoLaboratorio/transferir_laboratorio.js";
import DynamicForm from "../../assents_link/DynamicForm.jsx";
import Style from "../register.module.css";
import ExodusTop from "../../ExodusTop.jsx";
import Footer from "../../Footer.jsx";

export default function CheckLaboratory() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Campo para identificar o laboratório (CNPJ)
  const fields = [
    { name: "cnpj", type: "text", placeholder: "Digite o CNPJ do laboratório", required: true },
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const result = await verificarLaboratorio(formValues.cnpj, token);
    console.log("Resultado da verificação:", result);

    if (result.status === "jaCadastrado") {
      alert("✅ Laboratório já está cadastrado na clínica!");
      navigate("/perfil");
    } else if (result.status === "transferivel") {
      alert("🔁 Laboratório existe no sistema, mas não está vinculado à clínica. Cadastrando no sistema...");
      const result2 = await transferirLaboratorio(formValues);
      if (result2.success) {
        alert("Transferido com sucesso!");
        navigate("/perfil");
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar laboratório.");
      }
    } else if (result.status === "novo") {
      alert("🆕 Laboratório não encontrado. Prossiga para o cadastro completo!");
      navigate(`/registerLaboratory?cnpj=${formValues.cnpj}`);
    } else {
      alert("❌ Ocorreu um erro ao verificar o CNPJ.");
      setErrorMessage(result.message);
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
              Verifique se o laboratório já está cadastrado no sistema
            </motion.p>
          </motion.div>

          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <h2>Verificar Laboratório</h2>
            <p className={Style.subtitle}>Informe o CNPJ para verificar o cadastro</p>

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
