import React, { useEffect, useState } from "react";
import Style from "./DoctorsList.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";

export default function DoctorsList({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarMedicos() {
      try {
        const data = await mostrar_todos("doctor", token);
        if (data && data.length > 0) setDados(data);
        else setErro("Nenhum médico encontrado.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar lista de médicos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarMedicos();
  }, [token]);

  // 🔍 Filtro da busca
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(termo) ||
      item.crm?.toLowerCase().includes(termo)
    );
  });

  // Limita quantidade se quiser
  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h3 className={Style.title}>Médicos Cadastrados</h3>
        <Redirect
          icon={maisIcon}
          place="/checkDoctor"
          color="transparent"
          hoverColor="transparent"
          background="transparent"
         
        />
      </div>

      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder="Pesquisar por nome ou CRM..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Style.searchInput}
        />
      </div>

      {carregando ? (
        <p className={Style.info}>Carregando médicos...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : displayedData.length === 0 ? (
        <p className={Style.info}>Nenhum médico encontrado.</p>
      ) : (
        <div className={Style.listContainer}>
          {displayedData.map((item) => (
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
          ))}
        </div>
      )}
    </div>
  );
}