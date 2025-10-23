import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Style from "./SelectAll.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import { ativarClinica, buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";

export default function SelectAll() {
  const { role } = useParams();
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [clinicaAtiva, setClinicaAtiva] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function carregarDados() {
      try {
        const response = await mostrar_todos(role, token);
        if (response && response.length > 0) {
          setDados(response);
        } else {
          setErro("Nenhum registro encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    async function carregarClinicaAtiva() {
      if (role !== "clinics") return; // ✅ Só busca se for role "clinics"

      const saved = localStorage.getItem("activeClinic");
      if (saved) setClinicaAtiva(JSON.parse(saved));

      const backendResponse = await buscarClinicaAtiva(token);
      if (backendResponse.success && backendResponse.clinic) {
        setClinicaAtiva(backendResponse.clinic);
        localStorage.setItem("activeClinic", JSON.stringify(backendResponse.clinic));
      }
    }

    carregarDados();
    carregarClinicaAtiva();
  }, [role]);

  const handleExcluir = (item) => {
    console.log("Excluir:", item);
    alert(`Excluir ${item.name || item.nome}`);
  };

  const handleAtivarClinica = async (clinica) => {
    const response = await ativarClinica(clinica.name);

    if (response.success) {
      setClinicaAtiva(clinica);
      localStorage.setItem("activeClinic", JSON.stringify(clinica));
      alert(`Clínica "${clinica.name}" ativada com sucesso!`);
    } else {
      alert(`Erro: ${response.message}`);
    }
  };

  

  return (
    <>
      <ExodusTop />
      <section className={Style.section}>
        <h2>Listagem de {role}</h2>

       

        {/* Clínica ativa, só se role === "clinics" */}
        {role === "clinics" && clinicaAtiva && (
          <p className={Style.activeClinic}>
            <strong>Clínica ativa:</strong> {clinicaAtiva.name}
          </p>
        )}
    
        {/* Tabela */}
        <table className={Style.table}>
          <thead>
            <tr>
              {dados.length > 0
                ? Object.keys(dados[0]).map((coluna, i) => <th key={i}>{coluna.toUpperCase()}</th>)
                : <th>Nenhum dado</th>
              }
              <th>AÇÕES</th>
            </tr>
          </thead>

          <tbody>
            {dados.length > 0 ? (
              dados.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((valor, j) => (
                    <td key={j}>{valor || "-"}</td>
                  ))}
                  <td>
                    {role === "clinics" ? (
                      <button
                        className={Style.activate}
                        onClick={() => handleAtivarClinica(item)}
                        disabled={clinicaAtiva?.name === item.name}
                      >
                        {clinicaAtiva?.name === item.name ? "Ativa" : "Ativar clínica"}
                      </button>
                    ) : (
                      <button
                        className={Style.delete}
                        onClick={() => handleExcluir(item)}
                      >
                        Excluir
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(dados[0] || { a: 1 }).length + 1} style={{ textAlign: "center" }}>
                  Nenhum registro encontrado ou disponível.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );

}
