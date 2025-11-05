import React, { useEffect, useState } from "react";
import Style from "./ExamsReturn.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";
import RegisterAtendimento from "../cadastro/registerAtendimento.jsx"; // ✅ importa o container do formulário

export default function PatientDoctorList({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("pacientes");
  const [showConsultaForm, setShowConsultaForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro(null);
      try {
        const endpoint = abaAtiva === "pacientes" ? "patient" : "doctorAval";
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

  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  // 📋 Função para abrir o formulário com o médico selecionado
  const handleStartConsulta = (doctor) => {
    setSelectedDoctor(doctor);
    setShowConsultaForm(true);
  };

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

      {/* 🔍 Barra de pesquisa com botão "+" à direita */}
      <div className={Style.searchHeader}>
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
        {abaAtiva === "pacientes" && (
          <Redirect
            icon={maisIcon}
            place="/checkPatient"
            color="transparent"
            hoverColor="transparent"
            background="transparent"
          />
        )}
      </div>

      {/* Conteúdo */}
      {carregando ? (
        <p className={Style.info}>Carregando dados...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : displayedData.length === 0 ? (
        <p className={Style.info}>Nenhum resultado encontrado.</p>
      ) : (
        <div className={Style.listContainer}>
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

                  {/* ✅ Botão de iniciar atendimento */}
                  <button
                    className={Style.startButton}
                    onClick={() => handleStartConsulta(item)}
                  >
                    Iniciar atendimento
                  </button>
                </div>
              ))}
        </div>
      )}

      {/* ⚡ Modal do formulário de consulta */}
      {showConsultaForm && (
        <div className={Style.overlay}>
          <div className={Style.modal}>
            <button
              className={Style.closeButton}
              onClick={() => setShowConsultaForm(false)}
            >
              ✕
            </button>
            <RegisterAtendimento selectedDoctor={selectedDoctor} />
          </div>
        </div>
      )}
    </div>
  );
}
