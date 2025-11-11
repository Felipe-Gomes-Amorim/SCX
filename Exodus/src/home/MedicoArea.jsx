import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./home.module.css";

import {
  buscarAtendimentoAtual,
  verificarConsultaAtiva,
  encerrarAtendimento,
  abrirConsulta,
  buscarDiagnostico,
} from "../js/fluxoMedico/consultas.js";
import { getAppointmentsPat } from "../js/fluxoMedico/getAppointmentsPat.js";
import {
  salvarAnamneseAPI,
  enviarCustomFieldsAPI,
} from "../js/fluxoMedico/anamnese.js";

import ConsultaMenu from "../components/AreaMedico/ConsultaMenu";
import HistoricoConsultas from "../components/AreaMedico/HistoricoConsultas.jsx";
import ConsultaDetalhesModal from "../components/AreaMedico/ConsultaDetalhesModal.jsx";
import EncerrarAtendimentoPopup from "../components/AreaMedico/EncerrarAtendimentoPopup.jsx";

import { useToast } from "../context/ToastProvider.jsx"; // 🔹 Import do toast

export default function MedicoArea() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { showToast } = useToast();

  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customFieldsList, setCustomFieldsList] = useState([]);
  const [expanded, setExpanded] = useState(0);
  const [showAnamnese, setShowAnamnese] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingHistorico, setLoadingHistorico] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [consultaAbertaPorMedico, setConsultaAbertaPorMedico] = useState(false);
  const [diagnostico, setDiagnostico] = useState("");
  const [prescricao, setPrescricao] = useState("");
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [loadingDiag, setLoadingDiag] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customValue, setCustomValue] = useState("");

  const [anamneseData, setAnamneseData] = useState({
    mainComplaint: "",
    historyOfCurrentIllness: "",
    personalMedicalHistory: "",
    familyHistory: "",
    allergies: "",
    useMedications: "",
    previousHospitalizations: "",
    previousSurgeries: "",
    diet: "",
    sleep: "",
    physicalActivity: "",
    smoking: false,
    alcoholism: false,
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",
    bmi: "",
    observations: "",
    diagnosticHypothesis: "",
    treatmentPlan: "",
  });

  // 🔹 Carrega atendimento e consulta ativa
  useEffect(() => {
    (async () => {
      try {
        const atendimentoResp = await buscarAtendimentoAtual(token);
        if (atendimentoResp?.success && atendimentoResp.data) {
          setConsultaAtual(atendimentoResp.data);
          const consultaCheck = await verificarConsultaAtiva(token);
          setConsultaAbertaPorMedico(consultaCheck.success && consultaCheck.isConsulting);
          setShowAnamnese(consultaCheck.success && consultaCheck.isConsulting);
        } else {
          setConsultaAtual(null);
          setConsultaAbertaPorMedico(false);
          setShowAnamnese(false);
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        showToast("Erro ao carregar dados da consulta.", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // ⏱️ Timer
  useEffect(() => {
    if (!consultaAbertaPorMedico) return;

    // tenta obter o horário salvo
    let startTime = localStorage.getItem("consultaStartTime");

    // se não tiver salvo ainda, cria um baseado na hora atual
    if (!startTime && consultaAtual?.localTime) {
      const hoje = new Date();
      const [h, m, s] = consultaAtual.localTime.split(":").map(Number);
      hoje.setHours(h, m, s, 0);
      startTime = hoje.toISOString();
      localStorage.setItem("consultaStartTime", startTime);
    }

    const updateTimer = () => {
      const now = new Date();
      const diffInSeconds = Math.floor((now - new Date(startTime)) / 1000);
      setTempoDecorrido(diffInSeconds > 0 ? diffInSeconds : 0);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [consultaAbertaPorMedico, consultaAtual]);



  // 🔹 Encerrar consulta
  async function confirmarEncerramento(patientShouldReturn) {
    setShowEndPopup(false);
    try {
      const result = await encerrarAtendimento(token, patientShouldReturn, diagnostico, prescricao);

      if (result.success) {
        localStorage.removeItem("consultaStartTime"); // 🧹 limpa o timer salvo
        setConsultaAtual(null);
        setConsultaAbertaPorMedico(false);
        setShowAnamnese(false);
        setShowMenu(false);
        showToast("Consulta encerrada com sucesso!", "success");
      } else {
        showToast("Erro ao encerrar consulta: " + result.message, "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Erro inesperado ao encerrar consulta.", "error");
    }
  }


  // 🔹 Abrir nova consulta
  async function iniciarNovaConsulta() {
    if (consultaAbertaPorMedico && consultaAtual) {
      showToast("Já existe uma consulta aberta.", "warning");
      localStorage.setItem("consultaStartTime", agora.toISOString());
      return;
    }

    const result = await abrirConsulta(token);
    if (result.success) {
      setConsultaAbertaPorMedico(true);
      setTempoDecorrido(0);
      setShowAnamnese(true);
      const consultaResp = await buscarAtendimentoAtual(token);
      if (consultaResp?.success) setConsultaAtual(consultaResp.data);
      showToast("Nova consulta iniciada!", "success");
      setDiagnostico("");
      setPrescricao("");
    } else {
      showToast("Erro ao abrir consulta.", "error");
    }
  }

  // 🩺 Salvar anamnese + campos extras
  async function salvarAnamnese() {
    const resultAnamnese = await salvarAnamneseAPI(token, anamneseData);
    if (!resultAnamnese.success) {
      showToast("Erro ao salvar anamnese: " + resultAnamnese.message, "error");
      return;
    }

    const camposExtras = customFieldsList.map((c) => ({
      fieldName: c.fieldName,
      fieldValue: c.fieldValue,
    }));

    if (camposExtras.length > 0) {
      const resultCampos = await enviarCustomFieldsAPI(token, camposExtras);
      if (resultCampos.success) {
        showToast("Anamnese e campos extras salvos com sucesso!", "success");
      } else {
        showToast("Anamnese salva, mas erro ao enviar campos extras: " + resultCampos.message, "warning");
      }
    } else {
      showToast("Anamnese salva com sucesso!", "success");
    }

    
    setCustomFieldsList([]);
  }

  // ➕ Adicionar campo customizado
  const handleCreateCustomField = () => {
    if (!customName || !customValue) {
      showToast("Preencha nome e valor!", "warning");
      return;
    }
    setCustomFieldsList((prev) => [
      ...prev,
      { fieldName: customName, fieldValue: customValue },
    ]);
    setCustomName("");
    setCustomValue("");
    setShowCustomPopup(false);
    showToast("Campo personalizado adicionado!", "success");
  };

  // 📋 Histórico
  async function abrirMenuDetalhes() {
    setShowMenu(true);
    if (!consultaAtual) return;
    setLoadingHistorico(true);
    const historicoResp = await getAppointmentsPat(token);
    setHistorico(Array.isArray(historicoResp) ? historicoResp : []);
    setLoadingHistorico(false);
    console.log(historicoResp);
  }

  const filteredHistorico = historico.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return ["nameM", "nameC", "specialty", "idAppointment"].some((key) =>
      item[key]?.toLowerCase().includes(termo)
    );
  });

  const formatarTempo = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const formatarDataHora = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return `${d.toLocaleDateString()} às ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const atualizarIMC = (peso, altura) => {
    const p = parseFloat(peso),
      a = parseFloat(altura);
    if (p > 0 && a > 0)
      setAnamneseData((prev) => ({
        ...prev,
        bmi: (p / (a * a)).toFixed(2),
      }));
  };

  if (loading) return <p>Carregando consulta...</p>;

  async function abrirDetalhesConsulta(item) {
    setSelectedConsulta(item);
    setLoadingDiag(true);
    setDiagnostico("");

    const result = await buscarDiagnostico(token, item.idAppointment);
    setPrescricao(result.data?.prescription);

    setDiagnostico(result.diagnostic);

    setLoadingDiag(false);
  }

  return (
    <div className={Style.container}>
      <h2>Área do Médico</h2>
      <div className={Style.subsection}>
        <section className={Style.prontuarioSection}>
          {consultaAtual && (
            <div className={Style.activeConsultBox}>
              <p>
                Atendimento ativo:{" "}
                <u className={Style.sublinhado}>{consultaAtual.name}</u>
              </p>
              <button className={Style.btn} onClick={abrirMenuDetalhes}>
                Expandir detalhes
              </button>
            </div>
          )}

          {showMenu && (
            <ConsultaMenu
              consultaAtual={consultaAtual}
              consultaAbertaPorMedico={consultaAbertaPorMedico}
              tempoDecorrido={tempoDecorrido}
              formatarTempo={formatarTempo}
              iniciarNovaConsulta={iniciarNovaConsulta}
              setShowEndPopup={setShowEndPopup}
              setShowMenu={setShowMenu}
              showAnamnese={showAnamnese}
              expanded={expanded}
              setExpanded={setExpanded}
              anamneseData={anamneseData}
              setAnamneseData={setAnamneseData}
              atualizarIMC={atualizarIMC}
              salvarAnamnese={salvarAnamnese}
              showCustomPopup={showCustomPopup}
              setShowCustomPopup={setShowCustomPopup}
              customName={customName}
              setCustomName={setCustomName}
              customValue={customValue}
              setCustomValue={setCustomValue}
              handleCreateCustomField={handleCreateCustomField}
              customFieldsList={customFieldsList}
              historico={historico}
              loadingHistorico={loadingHistorico}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              abrirDetalhesConsulta={abrirDetalhesConsulta}
              formatarDataHora={formatarDataHora}
              diagnostico={diagnostico}
              setDiagnostico={setDiagnostico}
              prescricao={prescricao}
              setPrescricao={setPrescricao}
            />
          )}

          {showEndPopup && (
            <EncerrarAtendimentoPopup
              confirmarEncerramento={confirmarEncerramento}
              setShowEndPopup={setShowEndPopup}
            />
          )}
        </section>
      </div>

      {selectedConsulta && (
        <ConsultaDetalhesModal
          selectedConsulta={selectedConsulta}
          diagnostico={diagnostico}
          prescricao={prescricao}
          loadingDiag={loadingDiag}
          token={token}
          formatarDataHora={formatarDataHora}
          setSelectedConsulta={setSelectedConsulta}
        />
      )}
    </div>
  );
}
