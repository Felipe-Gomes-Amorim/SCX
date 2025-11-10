import React, { useState } from "react";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarAdm } from "../js/cadastrate_adm.js";
import ActionButton from "../assents_link/ActionButton.jsx";
import { useToast } from "../context/ToastProvider.jsx";

export default function RegisterAdm() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelefone] = useState("");
  const [password_key, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const admData = { email };

    //const token = localStorage.getItem("token"); 

    const result = await cadastrarAdm(admData);


    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
    }
    else {
      showToast("Administrador cadastrado com sucesso!");
    }
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />

        <div className={Style.login_card}>




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
                value={name}
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
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Telefone"
                value={telephone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password_key}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
              )}

              <ActionButton
                text="Cadastrar"
                loading={loading}
                disabled={
                  name.trim() === "" ||
                  email.trim() === "" ||
                  cpf.trim() === "" ||
                  telephone.trim() === "" ||
                  password_key.trim() === ""
                }
              />
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
