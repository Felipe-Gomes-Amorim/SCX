import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Style from "./Login.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { loginUsuario } from "../js/login.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("paciente");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // controla se o dropdown está aberto

  const roles = [
    { value: "paciente", label: "Paciente" },
    { value: "medico", label: "Médico" },
    { value: "adm", label: "Administrador" },
    { value: "secretaria", label: "Secretaria" },
    { value: "laboratorio", label: "Laboratório" },
  ];
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginData = { email, senha };

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
          {/* Lado branco com formulário */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            className={Style.login_left}
          >
            <h2>Fazer Login</h2>
            <p className={Style.subtitle}>Digite seu email e senha</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              {/* Dropdown customizado animado */}
              <div className={Style.dropdownWrapper}>
                <button
                  type="button"
                  className={Style.dropdownBtn}
                  onClick={() => setOpen(!open)}
                >
                  {role === "" ? "Selecione o tipo de usuário" : roles.find((r) => r.value === role)?.label}
                  <span className={open ? Style.arrowUp : Style.arrowDown}>
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.ul
                      className={Style.dropdownMenu}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {roles.map((r, i) => (
                        <motion.li
                          key={r.value}
                          onClick={() => {
                            setRole(r.value);
                            setOpen(false);
                          }}
                          className={role === r.value ? Style.activeOption : undefined}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: 0.25 + i * 0.05 }} 
                          /* delay = espera o fundo abrir antes de mostrar texto */
                        >
                          {r.label}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>


              </div>

              <button
                className={Style.btn}
                disabled={
                  email.trim() === "" || senha.trim() === "" || loading
                }
              >
                {loading ? "Carregando..." : "Entrar"}
              </button>
            </form>
          </motion.div>


          <div className={Style.login_arrow}> <span>←</span> </div>

          {/* Lado azul */}
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
