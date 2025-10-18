import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cadastrarMedico } from "../js/cadastrar_medico";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import Style from "./register.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";

export default function RegisterDoctor() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const crmFromUrl = new URLSearchParams(location.search).get("crm");

  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "crm", type: "text", placeholder: "CRM", required: true, defaultValue: crmFromUrl },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const result = await cadastrarMedico(formValues, token);
    alert(result.message);
    navigate("/perfil");
    setLoading(false);
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />
        <div className={Style.login_card}>
          <div className={Style.login_left}>
            <h2>Cadastro de Médico</h2>
            <p className={Style.subtitle}>Preencha os dados para cadastrar o médico</p>

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Cadastrar"
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
