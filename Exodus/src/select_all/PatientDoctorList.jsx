import React, { useEffect, useState } from "react";
import Style from "./ExamsReturn.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";

export default function PatientDoctorList({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("pacientes"); // 👈 controla qual aba está ativa
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro(null);

      try {
        const endpoint =
          abaAtiva === "pacientes" ? "patient" : "doctorAval";

        const data = await mostrar_todos(endpoint, token);
        if (data && data.length > 0) setDados(data);
        else setErro("Nenhum registro encontrado.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [token, abaAtiva]);

  // 🔍 Filtro de busca
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    if (abaAtiva === "pacientes") {
      return (
        item.name?.toLowerCase().includes(termo) ||
        item.telephone?.toLowerCase().includes(termo) ||
        item.email?.toLowerCase().includes(termo)
      );
    } else {
      return (
        item.name?.toLowerCase().includes(termo) ||
        item.email?.toLowerCase().includes(termo)
      );
    }
  });

  // Limita a quantidade de itens (se for passado um limite)
  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className={Style.container}>
      {/* 🟦 Abas clicáveis */}
      <div className={Style.tabHeader}>
        <h3
          className={`${Style.title} ${
            abaAtiva === "pacientes" ? Style.activeTab : ""
          }`}
          onClick={() => setAbaAtiva("pacientes")}
        >
          Pacientes
        </h3>
        <h3
          className={`${Style.title} ${
            abaAtiva === "medicos" ? Style.activeTab : ""
          }`}
          onClick={() => setAbaAtiva("medicos")}
        >
          Médicos Disponíveis
        </h3>
      </div>

      {/* 🔍 Barra de pesquisa */}
      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder={
            abaAtiva === "pacientes"
              ? "Pesquisar por nome, telefone ou email..."
              : "Pesquisar por nome ou email..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Style.searchInput}
        />
      </div>

      {/* Conteúdo */}
      {carregando ? (
        <p className={Style.info}>Carregando dados...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : displayedData.length === 0 ? (
        <p className={Style.info}>Nenhum resultado encontrado.</p>
      ) : (
        <div
          className={Style.listContainer}
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          {abaAtiva === "pacientes"
            ? displayedData.map((item, index) => (
                <div key={index} className={Style.card}>
                  <div className={Style.infoArea}>
                    <span>
                      <strong>Nome:</strong> {item.name || "-"}
                    </span>
                    <span>
                      <strong>Telefone:</strong> {item.telephone || "-"}
                    </span>
                    <span>
                      <strong>Email:</strong> {item.email || "-"}
                    </span>
                  </div>
                </div>
              ))
            : displayedData.map((item, index) => (
                <div key={index} className={Style.card}>
                  <div className={Style.infoArea}>
                    <span>
                      <strong>Nome:</strong> {item.name || "-"}
                    </span>
                    <span>
                      <strong>Email:</strong> {item.email || "-"}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
