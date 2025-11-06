import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./home.module.css";

import { buscarAtendimentoAtual, verificarConsultaAtiva, encerrarAtendimento, abrirConsulta } from "../js/fluxoMedico/consultas.js";
import { getAppointmentsPat } from "../js/fluxoMedico/getAppointmentsPat.js";
import { salvarAnamneseAPI, enviarCustomFieldsAPI } from "../js/fluxoMedico/anamnese.js";

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
    const result = await encerrarAtendimento(token, patientShouldReturn);
    if (result.success) {
      setConsultaAtual(null);
      setConsultaAbertaPorMedico(false);
      setShowAnamnese(false);
      setShowMenu(false);
    } else alert("Erro ao encerrar consulta.");
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
    if (!window.confirm("Deseja criar outro campo personalizado?")) setShowCustomPopup(false);
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
            <div className={Style.menuOverlay}>
              <div className={Style.menuBox}>
                <div className={Style.menuHeader}>
                  <div>
                    <h3>Paciente: {consultaAtual?.name}</h3>
                    <p><strong>Início:</strong> {consultaAtual?.localTime}</p>
                  </div>

                  <div className={Style.menuButtons}>
                    {consultaAbertaPorMedico && <div className={Style.timerDisplay}>{formatarTempo(tempoDecorrido)}</div>}
                    {!consultaAbertaPorMedico && <button onClick={iniciarNovaConsulta}>Abrir Consulta</button>}
                    <button onClick={() => setShowEndPopup(true)}>Encerrar Atendimento</button>
                    <button className={Style.closeBtn} onClick={() => setShowMenu(false)}>Voltar</button>
                  </div>
                </div>

                {showAnamnese ? (
                  <div className={Style.anamneseBox}>
                    <h4>Anamnese</h4>

                    {/* Abas */}
                    <div className={Style.tabHeader}>
                      {["Queixa e Doença Atual", "Hábitos e Estilo de Vida", "Exame Físico", "Observações e Tratamento"]
                        .map((tab, idx) => (
                          <button key={idx} className={`${Style.tabButton} ${expanded === idx ? Style.activeTab : ""}`}
                            onClick={() => setExpanded(idx)}>{tab}</button>
                        ))}
                    </div>

                    <form onSubmit={e => { e.preventDefault(); salvarAnamnese(); }}>
                      <div className={Style.formGrid}>
                        {/* Seções 1–4 */}
                        {expanded === 0 && (
                          <>
                            <label>Queixa Principal:
                              <textarea value={anamneseData.mainComplaint} onChange={e => setAnamneseData({ ...anamneseData, mainComplaint: e.target.value })} />
                            </label>
                            <label>História da Doença Atual:
                              <textarea value={anamneseData.historyOfCurrentIllness} onChange={e => setAnamneseData({ ...anamneseData, historyOfCurrentIllness: e.target.value })} />
                            </label>
                            <label>História Médica Pessoal:
                              <textarea value={anamneseData.personalMedicalHistory} onChange={e => setAnamneseData({ ...anamneseData, personalMedicalHistory: e.target.value })} />
                            </label>
                            <label>História Familiar:
                              <textarea value={anamneseData.familyHistory} onChange={e => setAnamneseData({ ...anamneseData, familyHistory: e.target.value })} />
                            </label>
                            <label>Alergias:
                              <input value={anamneseData.allergies} onChange={e => setAnamneseData({ ...anamneseData, allergies: e.target.value })} />
                            </label>
                          </>
                        )}

                        {expanded === 1 && (
                          <>
                            <label>Dieta:
                              <input value={anamneseData.diet} onChange={e => setAnamneseData({ ...anamneseData, diet: e.target.value })} />
                            </label>
                            <label>Atividade Física:
                              <input value={anamneseData.physicalActivity} onChange={e => setAnamneseData({ ...anamneseData, physicalActivity: e.target.value })} />
                            </label>
                            <label>Fumante:
                              <input type="checkbox" checked={anamneseData.smoking} onChange={e => setAnamneseData({ ...anamneseData, smoking: e.target.checked })} />
                            </label>
                            <label>Alcoolismo:
                              <input type="checkbox" checked={anamneseData.alcoholism} onChange={e => setAnamneseData({ ...anamneseData, alcoholism: e.target.checked })} />
                            </label>
                          </>
                        )}

                        {expanded === 2 && (
                          <>
                            <label>Peso:
                              <input type="number" step="0.1" value={anamneseData.weight}
                                onChange={e => { const v = e.target.value; setAnamneseData({ ...anamneseData, weight: v }); atualizarIMC(v, anamneseData.height); }} />
                            </label>
                            <label>Altura:
                              <input type="number" step="0.01" value={anamneseData.height}
                                onChange={e => { const v = e.target.value; setAnamneseData({ ...anamneseData, height: v }); atualizarIMC(anamneseData.weight, v); }} />
                            </label>
                            <label>IMC:
                              <input readOnly value={anamneseData.bmi} />
                            </label>
                          </>
                        )}

                        {expanded === 3 && (
                          <>
                            <label>Observações:
                              <textarea value={anamneseData.observations} onChange={e => setAnamneseData({ ...anamneseData, observations: e.target.value })} />
                            </label>
                            <label>Hipótese Diagnóstica:
                              <textarea value={anamneseData.diagnosticHypothesis} onChange={e => setAnamneseData({ ...anamneseData, diagnosticHypothesis: e.target.value })} />
                            </label>
                            <label>Plano de Tratamento:
                              <textarea value={anamneseData.treatmentPlan} onChange={e => setAnamneseData({ ...anamneseData, treatmentPlan: e.target.value })} />
                            </label>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowCustomPopup(true)}
                        className={Style.saveBtn}
                      >
                        + Adicionar Campo Personalizado
                      </button>

                      {customFieldsList.length > 0 && (
                        <div className={Style.customFieldsList}>
                          <h5>Campos Personalizados Criados:</h5>
                          <ul>
                            {customFieldsList.map((field, i) => (
                              <li key={i}>
                                <strong>{field.fieldName}:</strong> {field.fieldValue}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}



                      <button type="submit" className={Style.saveBtn}>Salvar Anamnese</button>
                    </form>

                    {/* Popup para criar campo customizado */}
                    {showCustomPopup && (
                      <div className={Style.overlay}>
                        <div className={Style.popupCard}>
                          <h3>Criar Campo Personalizado</h3>

                          <label>Nome do campo</label>
                          <input
                            value={customName}
                            onChange={e => setCustomName(e.target.value)}
                            placeholder="Ex: Pressão arterial"
                          />

                          <label>Valor</label>
                          <input
                            value={customValue}
                            onChange={e => setCustomValue(e.target.value)}
                            placeholder="Ex: 12/8"
                          />

                          <div className={Style.buttonsRow}>
                            <button onClick={handleCreateCustomField}>Salvar Campo</button>
                            <button onClick={() => setShowCustomPopup(false)}>Cancelar</button>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  // 🧾 Histórico do paciente
                  <div className={Style.historicoBox}>
                    <h4>Prontuário do Paciente</h4>
                    <input className={Style.searchInput} placeholder="Pesquisar por médico, clínica, especialidade ou ID..."
                      value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    {loadingHistorico ? <p>Carregando histórico...</p> :
                      filteredHistorico.length > 0 ? (
                        <div className={Style.listContainer}>
                          {filteredHistorico.map((item, i) => (
                            <div key={i} className={Style.card}>
                              <p><strong>Conclusão:</strong> {formatarDataHora(item.dateEnd)}</p>
                              <p><strong>Médico:</strong> {item.nameM || "-"}</p>
                              <p><strong>Clínica:</strong> {item.nameC || "-"}</p>
                              <p><strong>Especialidade:</strong> {item.specialty || "-"}</p>
                            </div>
                          ))}
                        </div>
                      ) : <p>Nenhum atendimento encontrado.</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {showEndPopup && (
            <div className={Style.popupOverlay}>
              <div className={Style.popupBox}>
                <h3>Deseja que o paciente retorne?</h3>
                <p>Essa ação encerrará a consulta atual.</p>

                <div className={Style.popupButtons}>
                  <button onClick={() => confirmarEncerramento(true)}>Sim, ele deve voltar</button>
                  <button onClick={() => confirmarEncerramento(false)}>Não, encerrar normalmente</button>
                  <button className={Style.cancelBtn} onClick={() => setShowEndPopup(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
