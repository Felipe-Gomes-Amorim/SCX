import React, { useEffect, useState } from "react";
import Style from "./home.module.css"; // Assumindo que você pode adicionar estilos similares aqui, ou importar do outro módulo se compatível
import { buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import { buscarConsultaAtual, encerrarConsulta, abrirConsulta } from "../js/fluxoMedico/consultas.js";
import { getAppointmentsPat } from "../js/fluxoMedico/getAppointmentsPat.js";
import { useNavigate } from "react-router-dom";

export default function MedicoArea() {
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [loadingHistorico, setLoadingHistorico] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Novo estado para pesquisa
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarDados() {
      const clinicaResp = await buscarClinicaAtiva(token);
      setClinicaAtiva(clinicaResp?.clinic || null);

      const consultaResp = await buscarConsultaAtual(token);
      if (consultaResp?.success) setConsultaAtual(consultaResp.data);
      else setConsultaAtual(null);

      setLoading(false);
    }
    carregarDados();
  }, [token]);

  async function confirmarEncerramento(patientShouldReturn) {
    setShowPopup(false);
    const result = await encerrarConsulta(token, patientShouldReturn);
    if (result.success) {
      alert("Consulta encerrada com sucesso!");
      setConsultaAtual(null);
      setShowMenu(false);
    } else {
      alert("Erro ao encerrar consulta.");
    }
  }

  async function iniciarNovaConsulta() {
    const result = await abrirConsulta(token);
    if (result.success) {
      alert("Consulta aberta com sucesso!");
      // Recarregar a consulta atual após abrir
      const consultaResp = await buscarConsultaAtual(token);
      if (consultaResp?.success) setConsultaAtual(consultaResp.data);
      else setConsultaAtual(null);
      setShowMenu(false);
    } else {
      alert("Erro ao abrir consulta.");
    }
  }

  async function abrirMenuDetalhes() {
    setShowMenu(true);
    if (consultaAtual) {
      setLoadingHistorico(true);
      const historicoResp = await getAppointmentsPat(token);
      console.log("Resposta de getAppointmentsPat:", historicoResp);
      // Ajuste: assumindo que getAppointmentsPat retorna diretamente o array
      if (historicoResp && Array.isArray(historicoResp)) {
        setHistorico(historicoResp);
        console.log("Histórico definido:", historicoResp);
      } else {
        console.log("Erro: resposta não é um array válido");
        setHistorico([]);
      }
      setLoadingHistorico(false);
    }
  }

  // 🔍 Filtro de busca para histórico
  const filteredHistorico = historico.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.nameM?.toLowerCase().includes(termo) ||
      item.nameC?.toLowerCase().includes(termo) ||
      item.specialty?.toLowerCase().includes(termo) ||
      item.idAppointment?.toLowerCase().includes(termo)
    );
  });

  if (loading) return <p>Carregando consulta...</p>;

  function formatarDataHora(isoString) {
    if (!isoString) return "-";
    try {
      const data = new Date(isoString);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      const hora = String(data.getHours()).padStart(2, "0");
      const minutos = String(data.getMinutes()).padStart(2, "0");
      return `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
    } catch {
      return isoString;
    }
  }

  return (
    <section className={Style.prontuarioSection}>
      <h2>Atendimento Médico</h2>

      {consultaAtual ? (
        <div className={Style.activeConsultBox}>
          <p>
            <strong>Atendimento ativo:</strong> {consultaAtual.name}
          </p>
          <button className={Style.btn} onClick={abrirMenuDetalhes}>
            Expandir detalhes
          </button>
        </div>
      ) : (
        <></>
      )}

      {/* 🔵 MENU EXPANDIDO */}
      {showMenu && (
        <div className={Style.menuOverlay}>
          <div className={Style.menuBox}>
            {/* Novo header com título, infos do paciente e botões */}
            <div className={Style.menuHeader}>
              <div className={Style.titleAndInfo}>
                <h3>Paciente: {consultaAtual?.name}</h3>
                <div className={Style.patientInfo}>

                  <p><strong>Horário:</strong> {consultaAtual?.localTime}</p>
                </div>
              </div>
              <div className={Style.menuButtons}>
                {/* <button onClick={() => navigate("/requisitarExame")}>Pedir Exame</button> */} {/* Comentado */}
                <button onClick={iniciarNovaConsulta}>Abrir Consulta</button>
                <button onClick={() => setShowPopup(true)}>Encerrar Atendimento</button>
                <button className={Style.closeBtn} onClick={() => setShowMenu(false)}>
                  Fechar
                </button>
              </div>
            </div>

            {/* 🩺 HISTÓRICO DO PACIENTE DENTRO DO MENU */}
            <div className={Style.historicoBox}>
              <h4>Histórico de Atendimentos do Paciente</h4>

              {/* 🔍 Barra de pesquisa */}
              <div className={Style.searchBox}>
                <input
                  type="text"
                  placeholder="Pesquisar por médico, clínica, especialidade ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={Style.searchInput}
                />
              </div>

              {loadingHistorico ? (
                <p>Carregando histórico...</p>
              ) : filteredHistorico.length > 0 ? (
                <div
                  className={Style.listContainer}
                  style={{ maxHeight: "14rem", overflowY: "auto" }}
                >
                  {filteredHistorico.map((item, index) => (
                    <div key={index} className={Style.card}>
                      <div className={Style.infoArea}>

                        {/* Linha 1: Data de fim (coluna 1) | Médico (coluna 2) */}
                        <div className={Style.infoRow}>
                          <div className={Style.label}>Data de Fim:</div>
                          <div className={Style.value}>{formatarDataHora(item.dateEnd)}</div>
                        </div>

                        <div className={Style.infoRow}>
                          <div className={Style.label}>Médico:</div>
                          <div className={Style.value}>{item.nameM || "-"}</div>
                        </div>

                        {/* Linha 2: Clínica (coluna 1) | Especialidade (coluna 2) */}
                        <div className={Style.infoRow}>
                          <div className={Style.label}>Clínica:</div>
                          <div className={Style.value}>{item.nameC || "-"}</div>
                        </div>

                        <div className={Style.infoRow}>
                          <div className={Style.label}>Especialidade:</div>
                          <div className={Style.value}>{item.specialty || "-"}</div>
                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              ) : (
                <p>Nenhum atendimento encontrado.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🔴 POP-UP DE CONFIRMAÇÃO */}
      {showPopup && (
        <div className={Style.popupOverlay}>
          <div className={Style.popupBox}>
            <h3>Deseja que o paciente retorne?</h3>
            <p>Essa ação encerrará a consulta atual.</p>
            <div className={Style.popupButtons}>
              <button onClick={() => confirmarEncerramento(true)}>Sim, ele deve voltar</button>
              <button onClick={() => confirmarEncerramento(false)}>Não, encerrar normalmente</button>
              <button className={Style.cancelBtn} onClick={() => setShowPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}