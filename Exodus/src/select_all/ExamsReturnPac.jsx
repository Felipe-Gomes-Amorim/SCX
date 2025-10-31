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
        console.log(data)
        if (data && data.length > 0) setDados(data);
        else setErro("Nenhum exame encontrado.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar exames.");
      } finally {
        setCarregando(false);
      }
    }

    carregarExames();
  }, [token, abaAtiva]); // 👈 refaz a busca ao trocar a aba

  // 🔍 Filtra os exames
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    if (abaAtiva === "devolvidos") {
      return (
        item.cid?.toLowerCase().includes(termo) ||
        item.observation?.toLowerCase().includes(termo) ||
        item.result_value?.toLowerCase().includes(termo)
      );
    } else {
      return (
        item.exam_type?.toLowerCase().includes(termo) ||
        item.sample_type?.toLowerCase().includes(termo) ||
        item.complement?.toLowerCase().includes(termo) ||
        item.name?.toLowerCase().includes(termo)
      );
    }
  });

  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className={Style.container}>
      {/* 🟦 Títulos clicáveis */}
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

      {/* 🔍 Caixa de pesquisa */}
      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder={
            abaAtiva === "devolvidos"
              ? "Pesquisar por CID, resultado ou observação..."
              : "Pesquisar por tipo, amostra, nome ou complemento..."
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
          {abaAtiva === "devolvidos"
            ? displayedData.map((item) => (
                <div key={item.id} className={Style.card}>
                  <div className={Style.infoArea}>
                    <span>
                      <strong>CID:</strong> {item.cid || "-"}
                    </span>
                    <span>
                      <strong>Valor:</strong> {item.result_value || "-"}
                    </span>
                    <span>
                      <strong>Observação:</strong> {item.observation || "-"}
                    </span>
                  </div>
                  {item.result_file_url && (
                    <a
                      href={item.result_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={Style.downloadBtn}
                    >
                      📄 Ver Resultado
                    </a>
                  )}
                </div>
              ))
            : displayedData.map((item) => (
                <div key={item.id} className={Style.card}>
                  <div className={Style.infoArea}>
                    <span>
                      <strong>Tipo de Exame:</strong> {item.typeEx || "-"}
                    </span>
                    <span>
                      <strong>Tipo de Amostra:</strong> {item.typeAm || "-"}
                    </span>
                    <span>
                      <strong>Complemento:</strong> {item.complement || "-"}
                    </span>
                    
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
