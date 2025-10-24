import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Style from "./SelectAll.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import { ativarClinica, buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import { useNavigate } from "react-router-dom";

export default function SelectAll() {
  const { role } = useParams();
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const navigate = useNavigate();

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
      if (role !== "clinics") return;

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


  const handleCadastrarDevolucao = (exam) => {
    navigate(`/registerExam?id=${exam.idReq}`); 
   
  };

  return (
    <>
      <ExodusTop />
      <section className={Style.section}>
        <div className={Style.header}>
          <h2>Listagem de {role}</h2>
          {role === "clinics" && clinicaAtiva && (
            <div className={Style.activeClinic}>
              <strong>Clínica ativa:</strong> {clinicaAtiva.name}
            </div>
          )}
        </div>

        {carregando ? (
          <p className={Style.loading}>Carregando...</p>
        ) : erro ? (
          <p className={Style.error}>{erro}</p>
        ) : (
          <>
            {/* Cabeçalho para examRequests */}
            {role === "examRequests" || role === "examsPend"  && dados.length > 0 && (
              <div className={Style.tableHeader}>
                <span className={Style.headerCell}>Paciente</span>
                <span className={Style.headerCell}>Clínica</span>
                <span className={Style.headerCell}>Médico</span>
                <span className={Style.headerCell}>Status</span>
                <span className={Style.headerCell}>Complemento</span>
                <span className={Style.headerCell}>Tipo de Exame</span>
                <span className={Style.headerCell}>Amostra</span>
                <span className={Style.headerCell}>Data/Hora</span>
              </div>
            )}

            <div className={Style.listContainer}>
              {dados.map((item, index) => (
                <div key={index} className={`${Style.card} ${role === "examRequests" ? Style.examRequests : ""}`}>
                  <div className={`${Style.cardContent} ${role === "examRequests" ? Style.examRequests : ""}`}>
                    {Object.entries(item).map(([key, value], i) => {
                      if (role === "examRequests" && key === "idReq") return null;
                      return (
                        <span key={i} className={Style.data}>
                          {value || "-"}
                        </span>
                      );
                    })}
                  </div>

                  <div className={`${Style.actions} ${role === "examRequests" ? Style.examRequests : ""}`}>
                    {role === "clinics" ? (
                      <button
                        className={`${Style.button} ${clinicaAtiva?.name === item.name ? Style.active : Style.activate}`}
                        onClick={() => handleAtivarClinica(item)}
                        disabled={clinicaAtiva?.name === item.name}
                      >
                        {clinicaAtiva?.name === item.name ? "Ativa" : "Ativar clínica"}
                      </button>
                    ) : role === "examRequests" ? (
                      <button
                        className={`${Style.button} ${Style.register}`}
                        onClick={() => handleCadastrarDevolucao(item)}
                      >
                        Cadastrar Devolução
                      </button>
                    ) 
                    : role === "examsPend" ? (
                      <></>
                    ) : (
                      <button
                        className={`${Style.button} ${Style.delete}`}
                        onClick={() => handleExcluir(item)}
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </div>

              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
