import React, { useEffect, useState } from "react";
import Style from "./LabsList.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";

export default function LabsList({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarLabs() {
      try {
        const data = await mostrar_todos("lab", token);
        if (data && data.length > 0) setDados(data);
        else setErro("Nenhum laboratório encontrado.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar lista de laboratórios.");
      } finally {
        setCarregando(false);
      }
    }

    carregarLabs();
  }, [token]);

  // 🔍 Filtro da busca
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(termo) ||
      item.cnpj?.toLowerCase().includes(termo)
    );
  });

  // 🔹 Limita quantidade se quiser
  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h3 className={Style.title}>Laboratórios Cadastrados</h3>
        <Redirect
          icon={maisIcon}
          place="/checkLab"
          color="transparent"
          hoverColor="transparent"
          background="transparent"
        />
      </div>

      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder="Pesquisar por nome ou CNPJ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Style.searchInput}
        />
      </div>

      {carregando ? (
        <p className={Style.info}>Carregando laboratórios...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : displayedData.length === 0 ? (
        <p className={Style.info}>Nenhum laboratório encontrado.</p>
      ) : (
        <div className={Style.listContainer}>
          {displayedData.map((item) => (
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
  );
}
