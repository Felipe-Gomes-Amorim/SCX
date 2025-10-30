import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarConsulta, buscarMedicosDisponiveis } from "../js/registros/cadastrar_consulta.js";
import { useNavigate, useLocation } from "react-router-dom";

export default function RegisterConsulta() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ⚡ estado de erro
  const [medicos, setMedicos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarMedicos() {
      const response = await buscarMedicosDisponiveis();
      if (response.success) setMedicos(response.data);
      else setErrorMessage("Erro ao buscar médicos disponíveis");
    }
    carregarMedicos();
  }, []);

  const fields = [
    { name: "cpf", type: "text", placeholder: "CPF do paciente", required: true },
    {
      name: "email",
      type: "select",
      placeholder: "Selecione o médico",
      options: medicos, // [{ name, email }]
      required: true
    }
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage(""); // limpa erro anterior

    try {
      const consultaData = {
        cpf: formValues.cpf, // ⚡ ajustado para o que o backend espera
        email: formValues.email,
      };

      const result = await cadastrarConsulta(consultaData);
      console.log(consultaData)
      if (result.success) {
        alert("Consulta cadastrada com sucesso!");
        navigate("/home");
      } else {
        // ⚡ mensagem customizada para CPF incorreto ou outro erro
        setErrorMessage(result.message || "CPF do paciente incorreto");
      }
    } catch (err) {
      console.error(err);
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
            transition={{ duration: 0.9 }}
          >
            <h2>Cadastro de Consulta</h2>
            <p className={Style.subtitle}>Informe o paciente e o médico</p>

            {/* ⚡ Mensagem de erro */}
            {errorMessage && <p className={Style.formError}>{errorMessage}</p>}

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Cadastrar"
              loading={loading}
            />
          </motion.div>

          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2>Bem-vindo!</h2>
            <p>Cadastre consultas rapidamente usando o CPF do paciente e selecionando o médico.</p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
