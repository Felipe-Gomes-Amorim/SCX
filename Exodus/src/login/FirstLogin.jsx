import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { resetPassword } from "../js/login e home/firstLogin.js";
import { useToast } from "../context/ToastProvider.jsx";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
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

    setLoading(true);
    setErrorMessage("");

    const result = await resetPassword({ password_key });
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
      maxLength: 12   
    },
    {
      name: "confirm_password",
      type: "password",
      placeholder: "Confirmar Nova Senha",
      required: true,
      minLength: 6,   
      maxLength: 12   
    },
  ];

  return (
    <>
      <div className={Style.login_page}>
        <Header />

        <div className={Style.login_card}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className={Style.login_left}
          >
            <h2>Redefinir Senha</h2>
            <p className={Style.subtitle}>
              Crie uma nova senha para acessar sua conta
            </p>

            {errorMessage && <p className={Style.formError}>{errorMessage}</p>}

            <DynamicForm
              fields={fields}
              values={formdata}
              onChangeValues={setformdata}
              onSubmit={handleSubmit}
              buttonText={success ? "Redefinida" : "Confirmar Redefinição"}
              loading={loading}
              buttonSuccess={success}
              
            />
          </motion.div>

          <motion.div className={Style.login_right}>
            <motion.h2
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              Nova Senha
            </motion.h2>
            <motion.p
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              Digite e confirme sua nova senha abaixo. 
              Após redefinir, use-a para fazer login novamente.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
