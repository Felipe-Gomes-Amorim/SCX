import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./home.module.css";

import { buscarAtendimentoAtual, verificarConsultaAtiva, encerrarAtendimento, abrirConsulta, buscarDiagnostico } from "../js/fluxoMedico/consultas.js";
import { getAppointmentsPat } from "../js/fluxoMedico/getAppointmentsPat.js";
import { salvarAnamneseAPI, enviarCustomFieldsAPI } from "../js/fluxoMedico/anamnese.js";
import ConsultaMenu from "../components/AreaMedico/ConsultaMenu";

import HistoricoConsultas from "../components/AreaMedico/HistoricoConsultas.jsx";
import ConsultaDetalhesModal from "../components/AreaMedico/ConsultaDetalhesModal.jsx";
import EncerrarAtendimentoPopup from "../components/AreaMedico/EncerrarAtendimentoPopup.jsx";

export default function MedicoArea() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customFieldsList, setCustomFieldsList] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [showAnamnese, setShowAnamnese] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCustomPopup, setShowCustomPopup] = useState(false); // popup de campo personalizado
  const [showEndPopup, setShowEndPopup] = useState(false); // popup de encerramento
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
    mainComplaint: "", historyOfCurrentIllness: "", personalMedicalHistory: "",
    familyHistory: "", allergies: "", useMedications: "", previousHospitalizations: "",
    previousSurgeries: "", diet: "", sleep: "", physicalActivity: "",
    smoking: false, alcoholism: false, bloodPressure: "", heartRate: "",
    temperature: "", weight: "", height: "", bmi: "", observations: "",
    diagnosticHypothesis: "", treatmentPlan: ""
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
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // ⏱️ Timer
  useEffect(() => {
    if (!consultaAbertaPorMedico || !consultaAtual) return;
    const interval = setInterval(() => setTempoDecorrido(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [consultaAbertaPorMedico, consultaAtual]);

  // 🔹 Encerrar consulta
  async function confirmarEncerramento(patientShouldReturn) {
    setShowEndPopup(false);

    // cria o objeto com todos os dados do encerramento



    console.log("🧠 Diagnóstico:", diagnostico);
    console.log("💊 Prescrição:", prescricao);
    // envia tudo de uma vez
    const result = await encerrarAtendimento(token, diagnostico,
      prescricao,
      patientShouldReturn);

    if (result.success) {
      setConsultaAtual(null);
      setConsultaAbertaPorMedico(false);
      setShowAnamnese(false);
      setShowMenu(false);
      
    } else {
      alert("Erro ao encerrar consulta: " + result.message);
    }
  }

  // 🔹 Abrir nova consulta
  async function iniciarNovaConsulta() {
    if (consultaAbertaPorMedico && consultaAtual)
      return alert("Já existe uma consulta aberta.");

    const result = await abrirConsulta(token);
    if (result.success) {
      setConsultaAbertaPorMedico(true);
      setTempoDecorrido(0);
      setShowAnamnese(true);
      const consultaResp = await buscarAtendimentoAtual(token);
      if (consultaResp?.success) setConsultaAtual(consultaResp.data);
    } else alert("Erro ao abrir consulta.");
  }

  // 🩺 Salvar anamnese + campos extras
  async function salvarAnamnese() {
    const resultAnamnese = await salvarAnamneseAPI(token, anamneseData);
    if (!resultAnamnese.success)
      return alert("Erro ao salvar anamnese: " + resultAnamnese.message);

    const camposExtras = customFieldsList.map(c => ({
      fieldName: c.fieldName, fieldValue: c.fieldValue
    }));

    if (camposExtras.length > 0) {
      const resultCampos = await enviarCustomFieldsAPI(token, camposExtras);
      alert(resultCampos.success
        ? "Anamnese e campos extras salvos com sucesso!"
        : "Anamnese salva, mas erro ao enviar campos extras: " + resultCampos.message
      );
    } else alert("Anamnese salva com sucesso!");

    setExpanded(null);
    setCustomFieldsList([]);
  }

  // ➕ Adicionar campo customizado
  const handleCreateCustomField = () => {
    if (!customName || !customValue) return alert("Preencha nome e valor!");
    setCustomFieldsList(prev => [...prev, { fieldName: customName, fieldValue: customValue }]);
    setCustomName(""); setCustomValue("");
    setShowCustomPopup(false);
  };

  // 📋 Histórico
  async function abrirMenuDetalhes() {
    setShowMenu(true);
    if (!consultaAtual) return;
    setLoadingHistorico(true);
    const historicoResp = await getAppointmentsPat(token);
    setHistorico(Array.isArray(historicoResp) ? historicoResp : []);
    setLoadingHistorico(false);
  }

  const filteredHistorico = historico.filter(item => {
    const termo = searchTerm.toLowerCase();
    return ["nameM", "nameC", "specialty", "idAppointment"]
      .some(key => item[key]?.toLowerCase().includes(termo));
  });

  // Helpers
  const formatarTempo = s => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const formatarDataHora = iso => {
    if (!iso) return "-";
    const d = new Date(iso);
    return `${d.toLocaleDateString()} às ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const atualizarIMC = (peso, altura) => {
    const p = parseFloat(peso), a = parseFloat(altura);
    if (p > 0 && a > 0) setAnamneseData(prev => ({ ...prev, bmi: (p / (a * a)).toFixed(2) }));
  };

  if (loading) return <p>Carregando consulta...</p>;

  async function abrirDetalhesConsulta(item) {
    setSelectedConsulta(item);
    setLoadingDiag(true);
    setDiagnostico("");

    const result = await buscarDiagnostico(token, item.idAppointment);

    if (result.success) {
      setDiagnostico(result.diagnostic);
    } else {
      setDiagnostico(result.diagnostic); // já vem com mensagem de erro
    }

    setLoadingDiag(false);
  }



  return (
    <div className={Style.container}>
      <h2>Área do Médico</h2>
      <div className={Style.subsection}>
        <section className={Style.prontuarioSection}>
          {consultaAtual && (
            <div className={Style.activeConsultBox}>
              <p>Atendimento ativo: <u className={Style.sublinhado}>{consultaAtual.name}</u></p>
              <button className={Style.btn} onClick={abrirMenuDetalhes}>Expandir detalhes</button>
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
          loadingDiag={loadingDiag}
          formatarDataHora={formatarDataHora}
          setSelectedConsulta={setSelectedConsulta}
        />
      )}

    </div>
  );
}
