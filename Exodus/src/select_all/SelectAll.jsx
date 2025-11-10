import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Style from "./SelectAll.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import { ativarClinica, buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";
import testePDF from "../assets/teste.pdf";
import { useToast } from "../context/ToastProvider.jsx";

export default function SelectAll() {
  const { role } = useParams();
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const navigate = useNavigate();
  //TODAS AS OPÇÕES POSSÍVEIS
  const roleNames = {
    doctor: "Médicos",
    doctorAval: "Médicos Disponíveis",
    examsPend: "Requisições Pendentes",
    examsReturn: "Devoluções de Exames",
    examsReturnPac: "Meus Exames",
    pendingExams: "Requisições Pendentes",
    examRequests: "Requisições de Exames",
    registerTicket: "Registrar Ticket",
    myTickets: "Tickets de Suporte",
    responseTicket: "Responder Ticket",
    patient: "Pacientes",
    lab: "Laboratórios",
    labs_adm: "Administradores de Laboratório",
    clinics: "Clínicas",
    adm: "Administradores",
    history: "Histórico de Atividades",
  };
  const { showToast } = useToast();

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
    console.log(role)
    carregarDados();
    if (role === "clinics") carregarClinicaAtiva();

  }, [role]);

  const handleExcluir = (item) => {
    showToast(`Excluir ${item.name || item.nome}`);
  };

  const handleAtivarClinica = async (clinica) => {
    const response = await ativarClinica(clinica.name);
    if (response.success) {
      setClinicaAtiva(clinica);
      localStorage.setItem("activeClinic", JSON.stringify(clinica));
      showToast(`Clínica "${clinica.name}" ativada com sucesso!`);
    } else {
      showToast(`Erro: ${response.message}`);
    }
  };

  const handleCadastrarDevolucao = (exam) => {
    navigate(`/registerExam?id=${exam.idReq}`);
  };

  // 🔹 Determina se deve mostrar o botão de "Cadastrar novo"
  const getCadastroButton = () => {
    if (role === "doctor") {
      return (
        <Redirect
          text="Cadastrar Médico"
          place="/checkDoctor"
          color="#007bff"
          hoverColor="#ffffff"
          background="#ffffff"
          hoverBackground="#007bff"
        />
      );
    }
    if (role === "lab") {
      return (
        <Redirect
          text="Cadastrar Laboratório"
          place="/checkLab"
          color="#007bff"
          hoverColor="#ffffff"
          background="#ffffff"
          hoverBackground="#007bff"
        />
      );
    }
    return null;
  };

  return (
    <>
      <ExodusTop />

      <section className={Style.section}>
        <div className={Style.header}>
          <h2>Listagem de {roleNames[role] || "Itens"}</h2>

          {/* Mostra clínica ativa */}
          {role === "clinics" && clinicaAtiva && (
            <div className={Style.activeClinic}>
              <strong>Clínica ativa:</strong> {clinicaAtiva.name}
            </div>
          )}

          {/* 🔹 Botão de cadastrar novo (somente ícone “+”) */}
          {role === "doctor" && (
            <Redirect
              place="/checkDoctor"
              icon={maisIcon}
              background="transparent"
              hoverBackground="transparent"
            />
          )}

          {role === "lab" && (
            <Redirect
              place="/checkLab"
              icon={maisIcon}
              background="transparent"
              hoverBackground="transparent"
            />
          )}

        </div>

        {carregando ? (
          <p className={Style.loading}>Carregando...</p>
        ) : erro ? (
          <p className={Style.error}>{erro}</p>
        ) : (
          <>
            {/* Cabeçalho da tabela */}
            {(role === "examRequests" || role === "examsPend") && dados.length > 0 && (
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
                <div
                  key={index}
                  className={`${Style.card} ${role === "examRequests" ? Style.examRequests : ""}`}
                >
                  <div className={Style.cardContent}>
                    {role === "doctor" ? (
                      // Ordem personalizada para médico
                      <>
                        <span className={Style.data}>{item.name || "-"}</span>
                        <span className={Style.data}>{item.crm || "-"}</span>
                      </>
                    ) :
                      role === "lab" ? (
                        // Ordem personalizada para laboratorio
                        <>
                          <span className={Style.data}>{item.name || "-"}</span>
                          <span className={Style.data}>{item.cnpj || "-"}</span>
                        </>
                      ) :
                        role === "tickets" ? (
                          // Ordem personalizada para suporte
                          <>
                            <span className={Style.data}>{item.subject || "-"}</span>
                            <span className={Style.data}>{item.message || "-"}</span>
                          </>
                        ) : role === "myTickets" ? (
                          // Ordem personalizada para suporte
                          <>

                            <span className={Style.data}>{item.subject || "-"}</span>
                            <span className={Style.data}>{item.message || "-"}</span>

                            <span className={Style.data}>{item.response || "-"}</span>
                          </>
                        ) : role === "clinics" ? (
                          // Ordem personalizada para suporte
                          <>

                            <span className={Style.data}>{item.name || "-"}</span>

                          </>
                        ) : (
                          // Ordem padrão para outros roles
                          Object.entries(item).map(([key, value], i) => (
                            <span key={i} className={Style.data}>
                              {value || "-"}
                            </span>
                          ))
                        )}

                  </div>


                  <div
                    className={`${Style.actions} ${role === "examRequests" ? Style.examRequests : ""}`}
                  >
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
                    ) : role === "examsPend" ? (
                      <></>
                    ) : role === "tickets" ? (
                      // 🔹 Novo caso: suporte (tickets)
                      <button
                        className={`${Style.button} ${Style.register}`}
                        onClick={() => navigate(`/responseTicket/${item.id}`)}
                      >
                        Responder
                      </button>
                    ) : (
                      <></>
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
