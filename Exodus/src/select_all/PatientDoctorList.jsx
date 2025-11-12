import React, { useEffect, useState } from "react";
import Style from "./ExamsReturn.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";
import RegisterAtendimento from "../cadastro/registerAtendimento.jsx";
import { checarClinica } from "../js/checarClinica/check_clinicaSecretaria.js";

export default function PatientDoctorList({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("pacientes");
  const [showConsultaForm, setShowConsultaForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const token = localStorage.getItem("token");
  const [instituicao, setInstituicao] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let mounted = true;

    async function loadhome() {
      if (!token) return;
      try {
        const data = await checarClinica(token);
        if (mounted) setInstituicao(data);
      } catch (err) {
        console.error("Failed to load home", err);
      }
    }

    loadhome();
    return () => {
      mounted = false;
    };
  }, []);

  //  Torna carregarDados reutilizável
  const carregarDados = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const endpoint = abaAtiva === "pacientes" ? "patient" : "doctorAval";
      const data = await mostrar_todos(endpoint, token);
      console.log(data);
      if (data && data.length > 0) setDados(data);
      else setErro("Nenhum registro encontrado ou disponível.");
    } catch (err) {
      console.error(err);
      setErro("Erro ao buscar dados.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [token, abaAtiva]); // chama sempre que muda a aba

  // Filtro de busca
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

  const handleStartConsulta = (doctor) => {
    setSelectedDoctor(doctor);
    setShowConsultaForm(true);
  };

  //  Nova função que fecha e atualiza a tela
  const handleCloseAndReload = async () => {
    setShowConsultaForm(false);
    await carregarDados(); // 🔄 recarrega os dados
  };

  return (
    <div className={Style.container}>
      <h2>Área da Secretária</h2>
      <p>
        <strong>Instituição:</strong> {instituicao?.data?.name || "-"}
      </p>

      <div className={Style.subsection}>
        {/*  Abas */}
        <div className={Style.tabHeader}>
          <h3
            className={`${Style.title} ${abaAtiva === "pacientes" ? Style.activeTab : ""}`}
            onClick={() => setAbaAtiva("pacientes")}
          >
            Pacientes
          </h3>
          <h3
            className={`${Style.title} ${abaAtiva === "medicos" ? Style.activeTab : ""}`}
            onClick={() => setAbaAtiva("medicos")}
          >
            Médicos Disponíveis
          </h3>
        </div>

        {/* 🔍 Busca */}
        <div className={Style.searchHeader}>
          <div className={Style.searchBox}>
            <input
              type="text"
              placeholder={
                abaAtiva === "pacientes"
                  ? "Pesquisar por nome ou telefone..."
                  : "Pesquisar por nome ou especialidade..."
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
                      <span><strong>Nome:</strong> {item.name || "-"}</span>
                      <span><strong>Telefone:</strong> {item.telephone || "-"}</span>
                      <span><strong>Status:</strong> {item.status || "-"}</span>
                    </div>
                  </div>
                ))
              : displayedData.map((item, index) => (
                  <div key={index} className={Style.card}>
                    <div className={Style.infoArea}>
                      <span><strong>Nome:</strong> {item.name || "-"}</span>
                      <span><strong>Especialidade:</strong> {item.specialty || "-"}</span>
                    </div>
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

        {/* Modal */}
        {showConsultaForm && (
          <div className={Style.overlay}>
            <div className={Style.modal}>
              
              <RegisterAtendimento
                selectedDoctor={selectedDoctor}
                onClose={handleCloseAndReload}
              />
              <button
                className={Style.closeButton}
                onClick={() => setShowConsultaForm(false)}
              >
                Retornar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
