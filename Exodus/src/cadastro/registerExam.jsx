import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./registerExam.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarExame } from "../js/cadastrar_exame.js";

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

            <form onSubmit={handleSubmit}>
              <label>Tipo de Exame</label>
              <input
                type="text"
                placeholder="Ex: Hemograma"
                value={exam_type}
                onChange={(e) => setExamType(e.target.value)}
                required
              />

              <label>Tipo de Amostra</label>
              <input
                type="text"
                placeholder="Ex: Sangue, Urina..."
                value={sample_type}
                onChange={(e) => setSampleType(e.target.value)}
                required
              />

              <label>Complemento</label>
              <textarea
                placeholder="Observações adicionais..."
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />

              

              {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
              )}

              <button
                className={Style.btn}
                disabled={
                  !exam_type ||
                  !sample_type ||
                  !requestDate ||
                  !status ||
                  loading
                }
              >
                {loading ? "Enviando..." : "Enviar Exame"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
