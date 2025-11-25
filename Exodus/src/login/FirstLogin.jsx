import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { resetPassword } from "../js/login e home/firstLogin.js";
import { useToast } from "../context/ToastProvider.jsx";

import TermsModal from "../components/TermsModal.jsx";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // <--- controla modal
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    password_key: "",
    confirm_password: "",
  });

  const { showToast } = useToast();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])(?=.{8,})/;

  const handleSubmit = async (formValues) => {
    const { password_key, confirm_password } = formValues;

    if (!passwordPattern.test(password_key)) {
      setErrorMessage(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
      );
      showToast("Senha inválida: não atende aos requisitos.", "error");
      return;
    }

    if (password_key !== confirm_password) {
      setErrorMessage("As senhas não coincidem.");
      showToast("As senhas não coincidem.", "error");
      return;
    }

    // Antes de enviar → abrir modal de termos
    setShowTerms(true);
  };

  // Quando o usuário aceita os termos
  const confirmTerms = async () => {
    setShowTerms(false);
    setLoading(true);
    setErrorMessage("");

    const result = await resetPassword({
      password_key: formdata.password_key,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      showToast("Senha redefinida com sucesso!", "success");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setErrorMessage("Erro ao redefinir senha: " + result.message);
      showToast("Erro ao redefinir senha: " + result.message, "error");
    }
  };

  const fields = [
    {
      name: "password_key",
      type: "password",
      placeholder: "Nova Senha",
      required: true,
      minLength: 6,
      maxLength: 12,
    },
    {
      name: "confirm_password",
      type: "password",
      placeholder: "Confirmar Nova Senha",
      required: true,
      minLength: 6,
      maxLength: 12,
    },
  ];

  return (
    <>
      <Header />

      <div className={Style.containerLogin}>
        <motion.div
          className={Style.box}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Redefinir Senha</h2>

          {errorMessage && (
            <p className={Style.errorMessage}>{errorMessage}</p>
          )}

          <DynamicForm
            fields={fields}
            buttonText={loading ? "Processando..." : "Redefinir Senha"}
            onSubmit={(values) => {
              setformdata(values);
              handleSubmit(values);
            }}
            disabled={loading}
          />
        </motion.div>
      </div>

      <Footer />

      {/* Modal de Termos */}
      <AnimatePresence>
        {showTerms && (
          <TermsModal
            onConfirm={confirmTerms}
            onCancel={() => setShowTerms(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
