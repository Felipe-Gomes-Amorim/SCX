import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Notifications.module.css"; // Você pode criar um CSS específico ou reutilizar SelectAll.module.css
import { mostrar_todos } from "../js/mostrar_todos.js"; // Reutilizando a função existente
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import { marcarComoLida } from "../js/marcarNotific.js";

export default function Notifications() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Novo estado para busca
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function carregarNotificacoes() {
      try {
        const response = await mostrar_todos("notific", token); // Usando mostrar_todos com role="notific"
        if (response && response.length > 0) {
          setNotificacoes(response);
        } else {
          setErro("Nenhuma notificação encontrada.");
        }
      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarNotificacoes();
  }, []);

  // 🔍 Filtro da busca baseado em title e message
  const filteredNotificacoes = notificacoes.filter((notificacao) => {
    const termo = searchTerm.toLowerCase();
    return (
      notificacao.title?.toLowerCase().includes(termo) ||
      notificacao.message?.toLowerCase().includes(termo)
    );
  });

  async function handleMarcarComoLida(id) {
    const token = localStorage.getItem("token");
    try {
      await marcarComoLida(id, token);

      // Atualiza o estado local (opcional, mas deixa a UI imediata)
      setNotificacoes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readFile: true } : n))
      );

      
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 500); 
    } catch (err) {
      console.error("Erro ao marcar como lida:", err);
      window.location.href = window.location.href;
    }
  }


  return (
    <>
      <ExodusTop />

      <section className={Style.container}>
        <div className={Style.header}>
          <h2>Notificações Não Lidas</h2>
        </div>

        {/* Barra de pesquisa */}
        <div className={Style.searchBox}>
          <input
            type="text"
            placeholder="Pesquisar por título ou mensagem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={Style.searchInput}
          />
        </div>

        {carregando ? (
          <p className={Style.loading}>Carregando...</p>
        ) : erro ? (
          <p className={Style.error}>{erro}</p>
        ) : filteredNotificacoes.length === 0 ? (
          <p className={Style.info}>Nenhuma notificação encontrada.</p>
        ) : (
          <div className={Style.listContainer}>
            {filteredNotificacoes.map((notificacao, index) => (
              <div key={index} className={Style.card}>
                <div className={Style.cardContent}>
                  <div className={Style.field}>
                    <span className={`${Style.data} ${Style.titleData}`}>{notificacao.title || "-"}</span>
                  </div>
                  <div className={Style.field}>
                    <label className={Style.label}>Mensagem:</label>
                    <span className={Style.data}>{notificacao.message || "-"}</span>
                  </div>
                  
                  
                  <div className={Style.field}>
                    <span className={Style.data}>
                      {notificacao.readFile ? "Lida" : "Não lida"}
                    </span>
                  </div>
                </div>


                <button
                  className={Style.markReadBtn}
                  onClick={() => handleMarcarComoLida(notificacao.id)}
                >
                  Marcar como lida
                </button>

              </div>

            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}