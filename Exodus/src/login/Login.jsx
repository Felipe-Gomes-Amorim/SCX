import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import { loginUsuario } from "../js/login e home/login.js";
import { useNavigate } from "react-router-dom";
import ResetSenha from "../assents_link/ResetSenha.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import Header from "../Header.jsx";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [formdata, setformdata] = useState({
    usernameKey: "",
    password_key: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setLoginError("");
    const { usernameKey, password_key } = formValues;

    const result = await loginUsuario({ usernameKey, password_key });
    setLoading(false);

    if (result.success) {

      window.open("/home", "_blank");
      window.close();
    } else {
      // ⚡ seta mensagem de erro
      setLoginError("E-mail ou senha incorretos");
    }
  };

  const fields = [
    { name: "usernameKey", type: "text", placeholder: "Email", required: true },
    {
      name: "password_key", type: "password", placeholder: "Senha", required: true,
      minLength: 6,   
      maxLength: 12   
    },
  ];

  return (
    <>
      <Header />
      <div className={Style.login_page}>
        <div className={Style.login_card}>
          {/* Coluna esquerda - formulário */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            className={Style.login_left}
          >
            <h2>Fazer Login</h2>
            <p className={Style.subtitle}>Digite seu email e senha</p>

            {/* ⚡ Mensagem de erro */}
            {loginError && <p className={Style.formError}>{loginError}</p>}

            <DynamicForm
              fields={fields}
              values={formdata}
              onChangeValues={setformdata}
              onSubmit={handleSubmit}
              buttonText="Entrar"
              loading={loading}
            />


            <ResetSenha />
            <p className={Style.subtitle2}>Ao entrar, você concorda com nosso Acordo de usuário e Políticas de Privacidade</p>
          </motion.div>

          {/* Coluna direita - info */}
          <motion.div className={Style.login_right}>
            <motion.h2
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            >
              Sua jornada de saúde mais simples começa aqui.
            </motion.h2>
            <motion.p
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            >
              O Projeto SCX é a ferramenta que unifica e transforma o gerenciamento de exames. Para pacientes, profissionais e clínicas: mais transparência, menos complicação. Faça login e acesse seus dados e processos.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
