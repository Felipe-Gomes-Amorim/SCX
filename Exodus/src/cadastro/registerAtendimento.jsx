import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarConsulta, buscarMedicosDisponiveis } from "../js/registros/cadastrar_consulta.js";
import { useNavigate } from "react-router-dom";

export default function RegisterAtendimento({ selectedDoctor = null }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [success, setSuccess] = useState(false);
  const [formdata, setformdata] = useState({
    cpf: "",
    email: selectedDoctor?.email || "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Só busca médicos se nenhum tiver sido passado
    if (!selectedDoctor) {
      async function carregarMedicos() {
        const response = await buscarMedicosDisponiveis();
        if (response.success) setMedicos(response.data);
        else setErrorMessage("Erro ao buscar médicos disponíveis");
      }
      carregarMedicos();
    }
  }, [selectedDoctor]);

  // 🧩 Campos dinâmicos — o campo de médico só aparece se não tiver um selecionado
  const fields = [
    { 
      name: "cpf", 
      type: "text", 
      placeholder: "CPF do paciente", 
      required: true, 
      defaultValue: formdata.cpf 
    },
    !selectedDoctor && {
      name: "email",
      type: "select",
      placeholder: "Selecione o médico",
      options: medicos, // [{ name, email }]
      required: true,
    },
  ].filter(Boolean);

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const consultaData = {
        cpf: formValues.cpf,
        email: selectedDoctor?.email || formValues.email, // usa o médico selecionado automaticamente
      };

      const result = await cadastrarConsulta(consultaData);
      console.log("Dados enviados:", consultaData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setErrorMessage(result.message || "CPF do paciente incorreto");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Falha ao se conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Iniciar Atendimento</h2>
      <p className={Style.subtitle}>
        {selectedDoctor
          ? `Médico selecionado: ${selectedDoctor.name}`
          : "Informe o paciente e o médico"}
      </p>

      {errorMessage && <p className={Style.formError}>{errorMessage}</p>}

      <DynamicForm
        fields={fields}
        values={formdata}
        onChangeValues={setformdata}
        onSubmit={handleSubmit}
        buttonText={success ? "Cadastrado" : "Confirmar"}
        loading={loading}
        buttonSuccess={success}
      />
    </motion.div>
  );
}
