import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Notifications.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import { marcarComoLida } from "../js/marcarNotific.js";
import { useToast } from "../context/ToastProvider.jsx"; 

export default function Notifications() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingMarcarTodas, setLoadingMarcarTodas] = useState(false);
  const { showToast } = useToast(); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function carregarNotificacoes() {
      try {
        const response = await mostrar_todos("notific", token);
        console.table(response, ["id", "title", "readFile", "read", "isRead"]);
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

  // 🔍 Filtro da busca
  const filteredNotificacoes = notificacoes.filter((notificacao) => {
    const termo = searchTerm.toLowerCase();
    return (
      notificacao.title?.toLowerCase().includes(termo) ||
      notificacao.message?.toLowerCase().includes(termo)
    );
  });

  // 🔹 Marca uma notificação individual como lida
  async function handleMarcarComoLida(id) {
    const token = localStorage.getItem("token");
    try {
      await marcarComoLida(id, token);
      setNotificacoes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readFile: true } : n))
      );
      showToast("Notificação marcada como lida", "success");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao marcar como lida:", err);
      showToast("Erro ao marcar como lida", "error");
    }
  }

  // 🔹 Marca todas as notificações como lidas
  async function handleMarcarTodasComoLidas() {
    const token = localStorage.getItem("token");
    setLoadingMarcarTodas(true);
    window.location.reload();
    try {
      const naoLidas = notificacoes.filter(
        (n) =>
          n.readFile === false ||
          n.read === false ||
          n.isRead === false ||
          (typeof n.readFile === "string" && n.readFile.toLowerCase().includes("não"))
      );
      if (naoLidas.length === 0) {
        showToast("Todas as notificações já estão lidas ", "info");
        return;
      }

      await Promise.all(naoLidas.map((n) => marcarComoLida(n.id, token)));

      setNotificacoes((prev) => prev.map((n) => ({ ...n, readFile: true })));
      showToast("Todas as notificações foram marcadas como lidas", "success");
    } catch (err) {
      console.error("Erro ao marcar todas como lidas:", err);
      showToast("Erro ao marcar todas como lidas", "error");
    } finally {
      setLoadingMarcarTodas(false);
    }
  }

  return (
    <>
      <ExodusTop />

      <section className={Style.container}>
        <div className={Style.header}>
          <h2>Notificações</h2>

          {notificacoes.length > 0 && (
            <button
              className={Style.markReadBtn}
              onClick={handleMarcarTodasComoLidas}
              disabled={loadingMarcarTodas}
            >
              {loadingMarcarTodas
                ? "Marcando todas..."
                : "Marcar todas como lidas"}
            </button>
          )}
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
                    <span
                      className={`${Style.data} ${Style.titleData}`}
                    >
                      {notificacao.title || "-"}
                    </span>
                  </div>
                  <div className={Style.field}>
                    <label className={Style.label}>Mensagem:</label>
                    <span className={Style.data}>
                      {notificacao.message || "-"}
                    </span>
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
