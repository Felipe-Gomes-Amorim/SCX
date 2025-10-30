import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarExame } from "../js/registros/cadastrar_exame.js";


export default function RegisterExam() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const [success,setSuccess]= useState(false);
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    cid: "",
    result_value: "",
    result_file_url: "",
    observation: "",
    id: "",
  });

  const idFromUrl = new URLSearchParams(location.search).get("id") || "";

  const fields = [
    { name: "cid", label: "CID", type: "text", placeholder: "Digite o CID", required: true },
    { name: "result_value", label: "Valor do Resultado", type: "text", placeholder: "Resultado", required: true },
    { name: "result_file_url", label: "Arquivo do Resultado", type: "text", placeholder: "URL do arquivo", required: true },
    { name: "observation", label: "Observações", type: "textarea", placeholder: "Observações adicionais" },
    { name: "id", type: "text", defaultValue: idFromUrl, required: true },
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);
    if (!formValues.id || formValues.id.trim() === "") {
      setErrorMessage("ID do exame ausente. Acesse o cadastro através de uma requisição válida.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const result = await cadastrarExame(formValues, token); // envia todos os campos
      setLoading(false);

      if (!result.success) {

        setErrorMessage(result.message || "Erro desconhecido ao cadastrar exame");
      } else {
        setSuccess(true);
        setTimeout(() => { navigate("/home"); }, 1500);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Falha ao se conectar ao servidor.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />

        <div className={Style.login_card}>
          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2>Cadastro de Exame</h2>
            <p className={Style.subtitle}>Preencha as informações abaixo</p>

            {errorMessage && <p className={Style.formError}>{errorMessage}</p>}

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
                transition: "all 0.1s ease",
              }}
            />
          </motion.div>

          {/* Lado direito - explicação */}
          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2>Bem-vindo!</h2>
            <p>
              Cadastre os resultados de exames, preenchendo CID, valores, observações
              e o ID do exame correspondente.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
