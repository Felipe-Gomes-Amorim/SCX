// src/components/ExamsReturnList.jsx
import React, { useEffect, useState } from "react";
import Style from "./ExamsRequests.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";


export default function ExamsRequests({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token")
  useEffect(() => {
    async function carregarResultados() {
      try {
        const data = await mostrar_todos("examsRequests", token);
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
      item.paciente?.toLowerCase().includes(termo) ||
      item.clinica?.toLowerCase().includes(termo) ||
      item.medico?.toLowerCase().includes(termo) ||
      item.status?.toLowerCase().includes(termo) ||
      item.complemento?.toLowerCase().includes(termo) ||
      item.tipoexame?.toLowerCase().includes(termo) ||
      item.amostra?.toLowerCase().includes(termo) ||
      item.datahora?.toLowerCase().includes(termo) 
    );
  });

  // Se tiver `limit`, exibe só os primeiros X resultados
  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className={Style.container}>
          <h2>Área do Laboratório</h2>
          
    
          <div className={Style.subsection}>
      <h3 className={Style.title}>Requisição de Exames</h3>

      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder="Pesquisar por paciente ou médico..."
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
            <div key={item.id} className={Style.card}>
              <div className={Style.infoArea}>
                <span><strong>Paciente:</strong> {item.paciente || "-"}</span>
                <span><strong>Clinica:</strong> {item.clinica || "-"}</span>
                <span><strong>Médico:</strong> {item.medico || "-"}</span>
                <span><strong>Status:</strong> {item.status || "-"}</span>
                <span><strong>Complemento:</strong> {item.complemento || "-"}</span>
                <span><strong>Tipo de Exame:</strong> {item.tipoexame || "-"}</span>
                <span><strong>Amostra:</strong> {item.amostra || "-"}</span>
                <span><strong>Data/hora:</strong> {item.datahora || "-"}</span>
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
    </div>
  );
}
