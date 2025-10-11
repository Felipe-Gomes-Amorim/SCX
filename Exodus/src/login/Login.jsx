import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { loginUsuario } from "../js/login.js";
import { useNavigate } from "react-router-dom";
import ResetSenha from "../assents_link/ResetSenha.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";

export default function Login() {
  const [usernameKey, setUserKey] = useState("");
  const [password_key, setSenha] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); 

  const navigate = useNavigate();
  const handleSubmit = async (formValues) => {
  setLoading(true);
  const { usernameKey, password_key } = formValues;

  const result = await loginUsuario({ usernameKey, password_key }, role);
  setLoading(false);

  if (result.success) navigate("/perfil");
  else alert("Erro no login: " + result.message);
};



  const fields = [
    { name: "usernameKey", type: "text", placeholder: "Digite seu documento", required: true },
    { name: "password_key", type: "password", placeholder: "Senha", required: true },
  ];

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />

        <div className={Style.login_card}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            className={Style.login_left}
          >
            <h2>Fazer Login</h2>
            <p className={Style.subtitle}>Digite seu documento e senha</p>
            <DynamicForm
                          fields={fields}
                          onSubmit={handleSubmit}
                          buttonText="Entrar"
                          loading={loading}

            />
            
              <ResetSenha />
            
          </motion.div>


          <div className={Style.login_arrow}> <span>←</span> </div>

          <motion.div className={Style.login_right}>
            <motion.h2
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            >
              Bem-vindo!
            </motion.h2>
            <motion.p
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            >
              Selecione seu tipo de usuário e entre no sistema
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
