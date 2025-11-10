import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarUsuarioLab } from "../js/registros/cadastrar_usuario_lab.js";
import { useToast } from "../context/ToastProvider.jsx"; 

export default function RegisterLabUserModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
  });

  const { showToast } = useToast(); // <-- inicializa o hook do Toast

  const fields = [
    { name: "name", type: "text", placeholder: "Nome completo", required: true },
    { name: "email", type: "email", placeholder: "E-mail", required: true },
  ];

  const handleSubmit = async (formdata) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const result = await cadastrarUsuarioLab(formdata, token);

      if (result.success) {
        showToast("Usuário cadastrado com sucesso!", "success");
        setTimeout(() => onClose(), 1500);
      } else {
        showToast(result.message || "Erro ao cadastrar usuário", "error");
      }
    } catch (err) {
      showToast("Falha ao se conectar ao servidor.", "error");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Fundo borrado */}
      <motion.div
        className={Style.modal_overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      ></motion.div>

      {/* Conteúdo do modal */}
      <motion.div
        className={Style.modal_content}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2>Cadastrar Usuário do Laboratório</h2>
        <p className={Style.subtitle}>Preencha com os dados</p>

        <DynamicForm
          fields={fields}
          values={formdata}
          onChangeValues={setformdata}
          onSubmit={handleSubmit}
          buttonText={loading ? "Enviando..." : "Confirmar"}
          loading={loading}
        />
      </motion.div>
    </>
  );
}
