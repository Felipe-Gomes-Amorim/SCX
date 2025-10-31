import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { verificarLaboratorio } from "../../js/fluxoLaboratorio/verificar_laboratorio.js";
import { transferirLaboratorio } from "../../js/fluxoLaboratorio/transferir_laboratorio.js";
import DynamicForm from "../../assents_link/DynamicForm.jsx";
import Style from "../register.module.css";
import ExodusTop from "../../ExodusTop.jsx";
import Footer from "../../Footer.jsx";
import { validarCnpj } from "../../js/validarCNPJ/validarCnpj.js";

export default function CheckLaboratory() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ cnpj: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const fields = [
    {
      name: "cnpj",
      type: "text",
      placeholder: "Digite o CNPJ do laboratório",
      required: true,
    },
  ];

  const handleSubmit = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const cnpjLimpo = formData.cnpj.replace(/\D/g, "");
      const cnpjValido = await validarCnpj(cnpjLimpo);

      if (!cnpjValido || !cnpjValido.valido) {
        setErrorMessage("CNPJ inválido ou inexistente.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      const result = await verificarLaboratorio(cnpjLimpo, token);
      

      if (result.status === "jaCadastrado") {
        setSuccess(true);
        alert("Laboratório já está cadastrado na clínica!");

        setTimeout(()=>{navigate("/home");},1500);
      } else if (result.status === "transferivel") {
        setSuccess(true);
        alert("Laboratório existe, mas não está vinculado à clínica. Transferindo...");
        const result2 = await transferirLaboratorio(formData);
        if (result2.success) {
          setSuccess(true);
          alert("Transferido com sucesso!");
          setTimeout(()=>{navigate("/home");},1500)
        } else {
          setErrorMessage(result.message || "Erro ao cadastrar laboratório.");
        }
      } else if (result.status === "novo") {
        setSuccess(true);
        alert("Laboratório não encontrado. Prossiga para o cadastro completo!");
        setTimeout(()=>{navigate(`/registerLaboratory?cnpj=${formData.cnpj}`);},1500);
      } else {
        setErrorMessage(result.message || "Erro ao verificar o CNPJ.");
      }
    } catch (error) {
      console.error("Erro no processo de verificação:", error);
      setErrorMessage("Ocorreu um erro ao validar o CNPJ. Tente novamente.");
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
            <h2>Verificar Laboratório</h2>
            <p className={Style.subtitle}>Informe o CNPJ para verificar o cadastro</p>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}

            <DynamicForm
              fields={fields}
              values={formData}
              onChangeValues={setFormData}
              onSubmit={handleSubmit}
              buttonText={success ? "Verificado" : "Verificar"}
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
              Confirme se o registro do laboratório já está presente no sistema antes de efetuar um novo cadastro. 
              Essa verificação garante integridade nas informações e evita duplicidades no banco de dados.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
