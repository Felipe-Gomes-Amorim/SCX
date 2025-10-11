import React, { useState } from "react";
import Style from "./ResetSenha.module.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";

export default function ResetSenha() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:3333/resetSenha", {
        email,
        novaSenha: newPassword,
      });

      if (response.status === 200) {
        setMessage("Senha redefinida com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erro ao redefinir senha. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={Style.reset_page}>
        <ExodusTop />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={Style.reset_card}
        >
          <h2>Redefinir Senha</h2>
          <p>Insira seu e-mail e a nova senha abaixo:</p>

          <form onSubmit={handleReset}>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              className={Style.btn}
              disabled={!email || !newPassword || loading}
            >
              {loading ? "Enviando..." : "Redefinir Senha"}
            </button>
          </form>

          {message && <p className={Style.message}>{message}</p>}

          <button
            className={Style.back_btn}
            onClick={() => navigate("/login")}
          >
            Voltar ao Login
          </button>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
