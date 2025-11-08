// src/components/ExamsReturnList.jsx
import React, { useEffect, useState } from "react";
import Style from "./ExamsReturn.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";


export default function ExamsReturn({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token")
  useEffect(() => {
    async function carregarResultados() {
      try {
        const data = await mostrar_todos("examsReturn", token);
        if (data && data.length > 0) setDados(data);
        else setErro("Nenhum exame encontrado.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar resultados de exames.");
      } finally {
        setCarregando(false);
      }
    }

    carregarResultados();
  }, [token]);

  // 🔍 Filtro da busca
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.cid?.toLowerCase().includes(termo) ||
      item.observation?.toLowerCase().includes(termo) ||
      item.result_value?.toLowerCase().includes(termo)
    );
  });

  // Se tiver `limit`, exibe só os primeiros X resultados
  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className={Style.container}>
      <h3 className={Style.title}>Resultados de Exames</h3>

      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder="Pesquisar por CID, resultado ou observação..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Style.searchInput}
        />
      </div>

      {carregando ? (
        <p className={Style.info}>Carregando resultados...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : displayedData.length === 0 ? (
        <p className={Style.info}>Nenhum resultado encontrado.</p>
      ) : (
        <div className={Style.listContainer}>
          {displayedData.map((item) => (
            <div key={item.fileName} className={Style.card}>
              <div className={Style.infoArea}>
                <span><strong>CID:</strong> {item.fileName || "-"}</span>
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
          ))}
        </div>
      )}
    </div>
  );
}
