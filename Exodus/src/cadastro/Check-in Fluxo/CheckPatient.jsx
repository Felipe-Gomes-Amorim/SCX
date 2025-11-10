import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { verificarPaciente } from "../../js/fluxoPaciente/verificar_paciente.js";
import { transferirPaciente } from "../../js/fluxoPaciente/transferir_paciente.js";
import DynamicForm from "../../assents_link/DynamicForm.jsx";
import Style from "../register.module.css";
import ExodusTop from "../../ExodusTop.jsx";
import Footer from "../../Footer.jsx";
import { useToast } from "../../context/ToastProvider.jsx";

export default function CheckPatient() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast(); 

  const [formdata, setformdata] = useState({
    cpf: "",
  });

  const fields = [
    {
      name: "cpf",
      type: "text",
      placeholder: "Digite o CPF do paciente",
      required: true,
      defaultValue: formdata.cpf,
    },
  ];

  const handleSubmit = async (formdata) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const result = await verificarPaciente(formdata.cpf, token);
      console.log("Resultado da verificação:", result);

      if (result.status === "jaCadastrado") {
        setSuccess(true);
        showToast("Paciente já está cadastrado na clínica!", "success");
        setTimeout(() => navigate("/home"), 2000);
      } else if (result.status === "transferivel") {
        setSuccess(true);
        showToast("Paciente existente, transferindo...", "info");

        const result2 = await transferirPaciente(formdata);
        if (result2.success) {
          setSuccess(true);
          showToast("Transferido com sucesso!", "success");
          setTimeout(() => navigate("/home"), 2000);
        } else {
          const msg = result2.message || "Erro ao transferir paciente.";
          setErrorMessage(msg);
          showToast(msg, "error");
        }
      } else if (result.status === "novo") {
        setSuccess(true);
        showToast("Paciente não encontrado. Prossiga para o cadastro!", "warning");
        setTimeout(() => navigate(`/register?cpf=${formdata.cpf}`), 2000);
      } else {
        const msg = result.message || "Erro ao verificar o CPF.";
        setErrorMessage(msg);
        showToast(msg, "error");
      }
    } catch (error) {
      console.error("Erro no processo de verificação:", error);
      setErrorMessage("Ocorreu um erro ao validar o CPF. Tente novamente.");
      showToast("Erro ao validar o CPF. Tente novamente.", "error");
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
            <h2>Verificar Paciente</h2>
            <p className={Style.subtitle}>Informe o CPF para verificar o cadastro</p>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
            )}

            <DynamicForm
              fields={fields}
              values={formdata}
              onChangeValues={setformdata}
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
              Confirme se o registro do paciente já está presente no sistema antes de
              efetuar um novo cadastro. Essa verificação evita duplicidades no banco.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
