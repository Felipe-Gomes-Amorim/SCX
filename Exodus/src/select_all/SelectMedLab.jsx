import React, { useEffect, useState } from "react";
import Style from "./SelectMedLab.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";
import { checarClinica } from "../js/checarClinica/check_clinicaSecretaria.js";

export default function SelectMedLab({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("doctor");
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

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro(null);

      try {
        const endpoint = abaAtiva === "doctor" ? "doctor" : "lab";
        const data = await mostrar_todos(endpoint, token);
        if (data && data.length > 0) setDados(data);
        else
          setErro(
            abaAtiva === "doctor"
              ? "Nenhum médico encontrado."
              : "Nenhum laboratório encontrado."
          );
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [token, abaAtiva]);

  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    if (abaAtiva === "doctor") {
      return (
        item.name?.toLowerCase().includes(termo) ||
        item.crm?.toLowerCase().includes(termo)
      );
    } else {
      return (
        item.name?.toLowerCase().includes(termo) ||
        item.cnpj?.toLowerCase().includes(termo)
      );
    }
  });

  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  // Define o link do botão dependendo da aba
  const redirectLink = abaAtiva === "doctor" ? "/checkDoctor" : "/checkLab";

  return (
    <div className={Style.container}>
      {/* 🟦 Abas */}

      <h2 className={Style.sectionTitle}>Área do Administrador</h2>
      <p className={Style.infoText}>
        <strong>Instituição:</strong> {instituicao?.data?.name || "-"}
      </p>
      <div className={Style.subsection}>
      <div className={Style.tabHeader}>
        <h3
          className={`${Style.title} ${abaAtiva === "doctor" ? Style.activeTab : ""
            }`}
          onClick={() => setAbaAtiva("doctor")}
        >
          Médicos
        </h3>
        <h3
          className={`${Style.title} ${abaAtiva === "lab" ? Style.activeTab : ""
            }`}
          onClick={() => setAbaAtiva("lab")}
        >
          Laboratórios
        </h3>
      </div>

      {/* 🔍 Campo de pesquisa */}
      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder={
            abaAtiva === "doctor"
              ? "Pesquisar por nome ou CRM..."
              : "Pesquisar por nome ou CNPJ..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Style.searchInput}
        />

        {/* 🔘 Botão de adicionar */}
        <Redirect
          icon={maisIcon}
          place={redirectLink}
          color="transparent"
          hoverColor="transparent"
          background="transparent"
        />
      </div>

      {/* Conteúdo da lista */}
      {carregando ? (
        <p className={Style.info}>
          Carregando {abaAtiva === "doctor" ? "médicos..." : "laboratórios..."}
        </p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : displayedData.length === 0 ? (
        <p className={Style.info}>Nenhum resultado encontrado.</p>
      ) : (
        <div className={Style.listContainer}>
          {abaAtiva === "doctor"
            ? displayedData.map((item) => (
              <div key={item.id} className={Style.card}>
                <div className={Style.infoArea}>
                  <span>
                    <strong>Nome:</strong> {item.name || "-"}
                  </span>
                  <span>
                    <strong>CRM:</strong> {item.crm || "-"}
                  </span>
                </div>
              </div>
            ))
            : displayedData.map((item) => (
              <div key={item.id} className={Style.card}>
                <div className={Style.infoArea}>
                  <span>
                    <strong>Nome:</strong> {item.name || "-"}
                  </span>
                  <span>
                    <strong>CNPJ:</strong> {item.cnpj || "-"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
    </div>
  );
}
