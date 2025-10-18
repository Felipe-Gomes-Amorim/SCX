import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verificarMedico } from "../js/verificar_medico";
import Style from "./register.module.css";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import { transferirMedico } from "../js/transferir_medico";

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
      alert("✅ Médico já está cadastrado na clínica!");
      navigate("/perfil");
    } else if (result.status === "transferivel") {
      alert("🔁 Médico existe no sistema, mas não está vinculado à clínica. Cadastrando no sistema");
      const result2 = await transferirMedico(formValues);
        if (result2.success) {
        alert("Transferido com sucesso!");
        navigate("/perfil"); // Redireciona para login
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
      }
    } else if (result.status === "novo") {
      alert("🆕 Médico não encontrado. Prossiga para o cadastro completo!");
      navigate(`/registerMedico?crm=${formValues.crm}`);
    } else {
      alert("❌ Ocorreu um erro ao verificar o CRM.");
      setErrorMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />
        <div className={Style.login_card}>
          <div className={Style.login_left}>
            <h2>Verificar Médico</h2>
            <p className={Style.subtitle}>Informe o CRM para verificar o cadastro</p>

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Verificar"
              loading={loading}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
