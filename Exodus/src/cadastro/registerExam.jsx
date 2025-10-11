import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./registerExam.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarExame } from "../js/cadastrar_exame.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";

export default function RegisterExam() {
  const [exam_type, setExamType] = useState("");
  const [sample_type, setSampleType] = useState("");
  const [complement, setComplement] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [executedDate, setExecutedDate] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const examData = {
      exam_type,
      sample_type,
      complement,
      requestDate,
      executedDate,
      status,
    };

    const result = await cadastrarExame(examData);
    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.message || "Erro desconhecido ao cadastrar exame");
    } else {
      alert("Exame cadastrado com sucesso!");
      // limpa os campos
      setExamType("");
      setSampleType("");
      setComplement("");
      setRequestDate("");
      setExecutedDate("");
      setStatus("");
    }
  };

  const fields = [
    { name: "exam_type", label: "Tipo de Exame", type: "text", placeholder: "Ex: Hemograma", required: true },
    { name: "sample_type", label: "Tipo de Amostra", type: "text", placeholder: "Ex: Sangue, Urina...", required: true },
    { name: "complement", label: "Complemento", type: "textarea", placeholder: "Observações adicionais..." },
  ];

  return (
    <>
      <div className={Style.page}>
        <ExodusTop />

        <div className={Style.card}>
          <motion.div
            className={Style.left}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Cadastro de Exame</h2>
            <p>Preencha as informações do exame</p>
             <DynamicForm
                fields={fields}
                onSubmit={handleSubmit}
                buttonText="Enviar Exame"
                loadingText="Enviando..."
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
