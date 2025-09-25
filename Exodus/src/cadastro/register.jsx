import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarPaciente } from "../js/cadastrate.js";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const pacienteData = {
      nome,
      email,
      senha,
      cpf: parseInt(cpf),
    };

    const token = localStorage.getItem("token");

    const result = await cadastrarPaciente(pacienteData, token);

    setLoading(false);

    if (result.success) {
      navigate("/"); 
    } else {
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
              Crie uma conta para o Usuário
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            className={Style.login_left}
          >
            <h2>Cadastro de Paciente</h2>
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
                type="text"
                placeholder="Número de CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <select className={Style.select} name="role" required>
                <option value="">Selecione uma função</option>
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
                <option value="secretaria">Secretaria</option>
                <option value="laboratorio">Laboratório</option>
              </select>

              {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}
                </p>
              )}

              <button
                className={Style.btn}
                disabled={
                  nome.trim() === "" ||
                  email.trim() === "" ||
                  cpf.trim() === "" ||
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
