import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarAdm } from "../js/cadastrate_adm.js"; // depois você pode ter um cadastrarAdm separado

export default function RegisterAdm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const admData = { nome, email, senha };

    const token = localStorage.getItem("token"); // se o cadastro de ADM exigir token

    const result = await cadastrarAdm(admData, token); 
    // 👉 depois vale a pena criar um cadastrarAdm(admData, token) no lugar de cadastrarPaciente

    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
    }
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />

        <div className={Style.login_card}>
          

          <div className={Style.login_arrow}>
            <span>→</span>
          </div>

          <motion.div className={Style.login_right}>
            <motion.h2
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            >
              Bem vindo!
            </motion.h2>
            <motion.p
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            >
              Crie sua conta de administrador para gerenciar o sistema
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            className={Style.login_left}
          >
            <h2>Cadastro de Administrador</h2>
            <p className={Style.subtitle}>Preencha seus dados</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
              )}

              <button
                className={Style.btn}
                disabled={
                  nome.trim() === "" ||
                  email.trim() === "" ||
                  senha.trim() === "" ||
                  loading
                }
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
