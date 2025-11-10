import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarConsulta, buscarMedicosDisponiveis } from "../js/registros/cadastrar_consulta.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastProvider.jsx";

export default function RegisterAtendimento({ selectedDoctor = null, onClose }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [success, setSuccess] = useState(false);
  const [formdata, setformdata] = useState({
    cpf: "",
    email: selectedDoctor?.email || "",
  });
  const navigate = useNavigate();
  const { showToast } = useToast();
  useEffect(() => {
    // Só busca médicos se nenhum tiver sido passado
    if (!selectedDoctor) {
      async function carregarMedicos() {
        try {
          const response = await buscarMedicosDisponiveis();
          if (response.success) {
            setMedicos(response.data);
          } else {
            setErrorMessage("Erro ao buscar médicos disponíveis");
            showToast("Erro ao buscar médicos disponíveis", "error");
          }
        } catch (err) {
          console.error("Erro ao buscar médicos:", err);
          setErrorMessage("Falha na conexão ao buscar médicos.");
          showToast("Falha ao conectar ao servidor.", "error");
        }
      }
      carregarMedicos();
    }
  }, [selectedDoctor, showToast]);

  // 🧩 Campos dinâmicos — o campo de médico só aparece se não tiver um selecionado
  const fields = [
    {
      name: "cpf",
      type: "text",
      placeholder: "CPF do paciente",
      required: true,
      defaultValue: formdata.cpf,
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
        email: selectedDoctor?.email || formValues.email,
      };

      const result = await cadastrarConsulta(consultaData);
      console.log("Dados enviados:", consultaData);

      if (result.success) {
        setSuccess(true);
        showToast("Atendimento iniciado com sucesso!", "success");

        // ✅ Fecha o modal automaticamente após 2 segundos
        setTimeout(() => {
          if (onClose) onClose(); // fecha o modal no componente pai
          navigate("/home");
        }, 2000);
      } else {
        const msg = result.message || "CPF do paciente incorreto.";
        setErrorMessage(msg);
        showToast(msg, "error");
      }
    } catch (err) {
      console.error("Erro ao cadastrar consulta:", err);
      setErrorMessage("Falha ao se conectar ao servidor.");
      showToast("Falha ao se conectar ao servidor.", "error");
    } finally {
      setLoading(false);
    }
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
