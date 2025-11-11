import React, { useEffect, useState } from "react";
import Style from "./LabsList.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";

export default function ClinicsLabList({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarClinicas() {
      try {
        const data = await mostrar_todos("allClinicsLab", token);
        if (data && data.length > 0) setDados(data);
        else setErro("Nenhuma clínica vinculada encontrada.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar clínicas vinculadas.");
      } finally {
        setCarregando(false);
      }
    }

    carregarClinicas();
  }, [token]);

  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(termo) ||
      item.cnpj?.toLowerCase().includes(termo)
    );
  });

  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h3 className={Style.title}>Clínicas Vinculadas</h3>
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
        <p className={Style.info}>Carregando clínicas...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : displayedData.length === 0 ? (
        <p className={Style.info}>Nenhuma clínica encontrada.</p>
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
