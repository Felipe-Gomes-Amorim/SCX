import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Style from "./SelectAll.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";

export default function SelectAll() {
  const { role } = useParams();
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const roleNames = {
    history: "Histórico de Atividades",
  };

  useEffect(() => {
    if (role !== "history") return;

    const token = localStorage.getItem("token");

    async function carregarDados() {
      try {
        const response = await mostrar_todos(role, token);

        if (Array.isArray(response) && response.length > 0) {
          setDados(response);
        } else {
          setErro("Nenhum registro encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        setErro("Erro ao carregar histórico.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [role]);

  return (
    <>
      <ExodusTop />

      <section className={Style.section}>
        <div className={Style.header}>
          <h2>{roleNames[role] || "Histórico"}</h2>
        </div>

        {carregando ? (
          <p className={Style.loading}>Carregando...</p>
        ) : erro ? (
          <p className={Style.error}>{erro}</p>
        ) : (
          <div className={Style.listContainer}>
            {dados.map((item, index) => (
              <div key={index} className={Style.card}>
                <div className={Style.cardContent}>
                  {/* Exibe todos os campos do registro */}
                  {Object.entries(item).map(([key, value], i) => (
                    <span key={i} className={Style.data}>
                      <strong>{key}:</strong> {String(value)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
