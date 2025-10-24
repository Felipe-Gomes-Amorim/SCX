import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarRequisicaoExame, buscarLaboratorios, buscarTiposExame } from "../js/fluxoMedico/exames.js";

export default function RegisterExameRequest() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [laboratorios, setLaboratorios] = useState([]);
  const [tiposExame, setTiposExame] = useState([]);
  const navigate = useNavigate();

  // Carregar opções dinâmicas ao montar
  useEffect(() => {
    async function carregarDados() {
      try {
        const [labsRes, examsRes] = await Promise.all([
          buscarLaboratorios(), // /getLabDocCli
          buscarTiposExame(),   // /getExamsType
        ]);

        if (labsRes.success) setLaboratorios(labsRes.data);
        else setErrorMessage("Erro ao carregar laboratórios disponíveis.");

        if (examsRes.success) setTiposExame(examsRes.data);
        else setErrorMessage("Erro ao carregar tipos de exame.");
      } catch (err) {
        setErrorMessage("Erro ao carregar dados iniciais.");
      }
    }

    carregarDados();
  }, []);

  const fields = [
    {
      name: "exam_type",
      type: "select",
      placeholder: "Selecione o tipo de exame",
      options: tiposExame, // [{ name }]
      required: true,
    },
    {
      name: "sample_type",
      type: "text",
      placeholder: "Tipo de amostra",
      required: true,
    },
    {
      name: "complement",
      type: "text",
      placeholder: "Complemento",
    },
    {
      name: "name",
      type: "select",
      placeholder: "Selecione o laboratório",
      options: laboratorios, // [{ name }]
      required: true,
    },
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const exameData = {
        exam_type: formValues.exam_type,
        sample_type: formValues.sample_type,
        complement: formValues.complement,
        name: formValues.name, // laboratório
      };

      const result = await cadastrarRequisicaoExame(exameData);

      if (result.success) {
        alert("Requisição de exame cadastrada com sucesso!");
        navigate("/perfil");
      } else {
        setErrorMessage(result.message || "Erro ao cadastrar requisição de exame.");
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
          {/* Lado esquerdo - formulário */}
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2>Requisição de Exame</h2>
            <p className={Style.subtitle}>Preencha as informações abaixo</p>

            {errorMessage && <p className={Style.formError}>{errorMessage}</p>}

            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              buttonText="Cadastrar"
              loading={loading}
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
              Cadastre uma nova requisição de exame, escolhendo o tipo de exame,
              o laboratório e os detalhes da amostra.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
