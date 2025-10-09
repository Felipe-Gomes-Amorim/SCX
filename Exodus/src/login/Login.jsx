import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { loginUsuario } from "../js/login.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usernameKey, setUserKey] = useState("");
  const [password_key, setSenha] = useState("");
  const [role, setRole] = useState("paciente");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); 


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginData = { usernameKey, password_key };

    const result = await loginUsuario(loginData, role);

    setLoading(false);

    if (result.success) {
      navigate("/perfil");
    } else {
      alert("Erro no login: " + result.message);
    }
  };

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

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Digite seu documento"
                value={usernameKey}
                onChange={(e) => setUserKey(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password_key}
                onChange={(e) => setSenha(e.target.value)}
                required
              />



              <button
                className={Style.btn}
                disabled={
                  usernameKey.trim() === "" || password_key.trim() === "" || loading
                }
              >
                {loading ? "Carregando..." : "Entrar"}
              </button>
            </form>
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
