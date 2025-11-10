import React, { useEffect, useState } from "react";
import Style from "./ExamsReturn.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";

export default function ExamsReturnPacList({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("devolvidos"); // 👈 controla qual aba está ativa
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarExames() {
      setCarregando(true);
      setErro(null);

      try {
        const endpoint =
          abaAtiva === "devolvidos" ? "examsReturnPac" : "pendingExams";
        const data = await mostrar_todos(endpoint, token);

        console.log("📡 Endpoint chamado:", endpoint);
        console.log("🔑 Token:", token?.slice(0, 15) + "...");
        console.log("📦 Dados recebidos:", data);
        console.log(
          "📊 Tipo de data:",
          typeof data,
          "| É array?",
          Array.isArray(data),
          "| Tamanho:",
          data?.length
        );
        if (Array.isArray(data) && data.length > 0)
          console.log("🧱 Primeiro item:", data[0]);

        setDados(data || []);
        if (!data?.length) setErro("Nenhum exame encontrado.");
      } catch {
        setErro("Erro ao buscar exames.");
      } finally {
        setCarregando(false);
      }
    }

    carregarExames();
  }, [token, abaAtiva]);

  // 🔍 Filtra os exames
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();

    if (abaAtiva === "devolvidos") {
      // pesquisa pelo nome do arquivo
      return item.fileName?.toLowerCase().includes(termo);
    } else {
      // pesquisa pelos campos de exames pendentes
      return (
        item.nameD?.toLowerCase().includes(termo) ||
        item.nameC?.toLowerCase().includes(termo) ||
        item.nameL?.toLowerCase().includes(termo) ||
        item.typeEx?.toLowerCase().includes(termo) ||
        item.typeAm?.toLowerCase().includes(termo) ||
        item.complement?.toLowerCase().includes(termo)
      );
    }
  });

  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  // 🧩 Gera nomes amigáveis: "Arquivo", "Arquivo (1)", "Arquivo (2)"
  const gerarNomeAmigavel = (index) =>
    index === 0 ? "Arquivo" : `Arquivo (${index})`;

  return (
    <div className={Style.container}>
      <h2>Área do Paciente</h2>

      <div className={Style.subsection}>
        {/* 🟦 Abas */}
        <div className={Style.tabHeader}>
          <h3
            className={`${Style.title} ${
              abaAtiva === "devolvidos" ? Style.activeTab : ""
            }`}
            onClick={() => setAbaAtiva("devolvidos")}
          >
            Meus Exames Devolvidos
          </h3>
          <h3
            className={`${Style.title} ${
              abaAtiva === "pendentes" ? Style.activeTab : ""
            }`}
            onClick={() => setAbaAtiva("pendentes")}
          >
            Exames Pendentes
          </h3>
        </div>

        {/* 🔍 Busca */}
        <div className={Style.searchBox}>
          <input
            type="text"
            placeholder={
              abaAtiva === "devolvidos"
                ? "Pesquisar por nome do arquivo..."
                : "Pesquisar por tipo, amostra, paciente ou complemento..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={Style.searchInput}
          />
        </div>

        {/* Conteúdo */}
        {carregando ? (
          <p className={Style.info}>Carregando exames...</p>
        ) : erro ? (
          <p className={Style.error}>{erro}</p>
        ) : displayedData.length === 0 ? (
          <p className={Style.info}>Nenhum resultado encontrado.</p>
        ) : (
          <div
            className={Style.listContainer}
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {/* --- DEVOLVIDOS --- */}
            {abaAtiva === "devolvidos"
              ? displayedData.map((item, index) => (
                  <div key={index} className={Style.card}>
                    <div className={Style.infoArea}>
                      <p>
                        <strong>Arquivo:</strong> {gerarNomeAmigavel(index)}
                      </p>
                    </div>
                    <button
                      className={Style.startButton}
                      onClick={() => {
                        window.open(
                          `http://localhost:8080/files/preview/${item.fileName}`,
                          "_blank"
                        );
                      }}
                    >
                      Ver PDF
                    </button>
                  </div>
                ))
              : /* --- PENDENTES --- */
                displayedData.map((item, index) => (
                  <div key={index} className={Style.card}>
                    <div className={Style.infoArea}>
                      <p>
                        <strong>Clínica:</strong> {item.nameC || "-"}
                      </p>
                      <p>
                        <strong>Data:</strong> {item.dateTime || "-"}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
