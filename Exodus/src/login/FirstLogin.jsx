import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import { useNavigate } from "react-router-dom";
import ResetSenha from "../assents_link/ResetSenha.jsx";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { firstLogin } from "../js/login e home/firstLogin.js";

export default function FirstLogin() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (formValues) => {
        setLoading(true);
        const  password_key  = formValues.password_key;

        const result = await firstLogin({ password_key });
        setLoading(false);
        
        if (result.success) navigate("/");
        else alert("Erro no login: " + result.message);
};



  const fields = [
    { name: "password_key", type: "password", placeholder: "Nova Senha", required: true },
  ];

  return (
    <>
      <div className={Style.login_page}>
        <Header/>

        <div className={Style.login_card}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            className={Style.login_left}
          >
            <h2>Redefinir Senha</h2>
            <p className={Style.subtitle}>Digite sua nova Senha</p>
            <DynamicForm
                          fields={fields}
                          onSubmit={handleSubmit}
                          buttonText="Entrar"
                          loading={loading}

            />
            
              
            
          </motion.div>


         

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
              Crie sua nova senha para acessar o sistema
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
