import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { firstLogin } from "../js/login e home/firstLogin.js";

export default function FirstLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false); // ✅ controle do sucesso
  const navigate = useNavigate();
  const [formdata,setformdata] = useState({
    password_key: "",
    confirm_password:"",
  });

  const handleSubmit = async (formValues) => {
    const { password_key, confirm_password } = formValues;

    // 🔒 Validação: senhas precisam coincidir
    if (password_key !== confirm_password) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const result = await firstLogin({ password_key });
    setLoading(false);

    if (result.success) {
      setSuccess(true); // ✅ ativa estado de sucesso

      // ⏳ Espera 3 segundos e redireciona
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setErrorMessage("Erro no login: " + result.message);
    }
  };

  // 🔧 Campos do formulário
  const fields = [
    { name: "password_key", type: "password", placeholder: "Nova Senha", required: true },
    { name: "confirm_password", type: "password", placeholder: "Confirmar Senha", required: true },
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
            <h2>Ative sua conta</h2>
            <p className={Style.subtitle}>Digite e confirme sua nova senha</p>

            {/* Mensagem de erro */}
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

          <motion.div className={Style.login_right}>
            <motion.h2
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              Bem-vindo!
            </motion.h2>
            <motion.p
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              Para completar seu login você precisa definir uma senha para sua conta. 
              Lembre-se de escolher uma senha segura
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
