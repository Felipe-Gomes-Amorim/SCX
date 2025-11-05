import React, { useEffect, useState } from "react";
import Style from "./home.module.css"; // Assumindo que você pode adicionar estilos similares aqui, ou importar do outro módulo se compatível
import { buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import {
  verificarConsultaAtiva,
  buscarAtendimentoAtual,
  encerrarAtendimento,
  abrirConsulta
} from "../js/fluxoMedico/consultas.js";

import { getAppointmentsPat } from "../js/fluxoMedico/getAppointmentsPat.js";
import { useNavigate } from "react-router-dom";
import { salvarAnamneseAPI } from "../js/fluxoMedico/anamnese.js";

import { createCustomField } from "../js/createCustomField.js";

export default function MedicoArea() {
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [addingCustom, setAddingCustom] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [loadingHistorico, setLoadingHistorico] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Novo estado para pesquisa
  const [consultaAbertaPorMedico, setConsultaAbertaPorMedico] = useState(false); // Novo estado para rastrear se a consulta foi aberta pelo médico
  const [tempoDecorrido, setTempoDecorrido] = useState(0); // Novo estado para o timer
  const [showAnamnese, setShowAnamnese] = useState(false); // Novo estado para mostrar anamnese
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
    treatmentPlan: ""
  }); // Estado para os dados da anamnese
  const navigate = useNavigate();
  const token = localStorage.getItem("token");



  useEffect(() => {
    async function carregarDados() {
      setLoading(true);

      try {
        // 1️⃣ Verifica se há um atendimento ativo
        const atendimentoResp = await buscarAtendimentoAtual(token);
        console.log("📦 Atendimento atual retornado:", atendimentoResp);

        if (atendimentoResp?.success && atendimentoResp.data) {
          setConsultaAtual(atendimentoResp.data);

          // 2️⃣ Agora verifica se há uma consulta ativa dentro do atendimento
          const consultaCheck = await verificarConsultaAtiva(token);
          console.log("🔍 Resultado verificarConsultaAtiva:", consultaCheck);

          if (consultaCheck.success && consultaCheck.isConsulting) {
            console.log("✅ Consulta ativa detectada dentro do atendimento.");
            setConsultaAbertaPorMedico(true);
            setShowAnamnese(true);
          } else {
            console.log("🟡 Nenhuma consulta ativa dentro do atendimento.");
            setConsultaAbertaPorMedico(false);
            setShowAnamnese(false);
          }
        } else {
          // Nenhum atendimento ativo
          setConsultaAtual(null);
          setConsultaAbertaPorMedico(false);
          setShowAnamnese(false);
        }
      } catch (error) {
        console.error("⚠️ Erro ao carregar dados iniciais:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [token]);




  // Timer: incrementa tempoDecorrido a cada segundo se consultaAbertaPorMedico for true
  useEffect(() => {
    let interval;
    if (consultaAbertaPorMedico && consultaAtual) {
      interval = setInterval(() => {
        setTempoDecorrido((prev) => prev + 1);
      }, 1000);
    } else {
      setTempoDecorrido(0);
    }
    return () => clearInterval(interval);
  }, [consultaAbertaPorMedico, consultaAtual]);

  async function confirmarEncerramento(patientShouldReturn) {
    setShowPopup(false);
    const result = await encerrarAtendimento(token, patientShouldReturn);
    if (result.success) {
      // alert("Consulta encerrada com sucesso!"); // Removido
      setConsultaAtual(null);
      setConsultaAbertaPorMedico(false); // Resetar flag
      setShowAnamnese(false); // Resetar anamnese
      setShowMenu(false);
    } else {
      alert("Erro ao encerrar consulta.");
    }
  }

  async function iniciarNovaConsulta() {
    if (consultaAbertaPorMedico && consultaAtual) {
      alert("Já existe uma consulta aberta.");
      return;
    }

    const result = await abrirConsulta(token);
    if (result.success) {
      setConsultaAbertaPorMedico(true);
      setTempoDecorrido(0);
      setShowAnamnese(true);
      const consultaResp = await buscarAtendimentoAtual(token);
      if (consultaResp?.success) setConsultaAtual(consultaResp.data);
    } else {
      alert("Erro ao abrir consulta.");
    }
  }


  async function salvarAnamnese() {
    console.log(anamneseData);
    const result = await salvarAnamneseAPI(token, anamneseData);

    if (result.success) {
      alert("Anamnese salva com sucesso!");

      setExpanded(null); // Fecha todas as seções

    } else {
      alert(result.message);
    }
  }



  const handleSaveAnamnese = async () => {
    const result = await salvarAnamneseAPI(anamneseData, token);
    if (result.success) {
      alert("Anamnese salva com sucesso!");
      // abre o popup de campo customizado
      setShowPopup(true);
    } else {
      alert("Erro ao salvar anamnese.");
    }
  };

  const handleCreateCustomField = async () => {
    if (!customName || !customValue) return alert("Preencha nome e valor!");
    setAddingCustom(true);
    const result = await createCustomField(customName, customValue, token);
    setAddingCustom(false);

    if (result.success) {
      alert("Campo criado com sucesso!");
      // limpa os campos
      setCustomName("");
      setCustomValue("");
      // pergunta se quer criar outro
      const outro = window.confirm("Deseja criar outro campo personalizado?");
      if (!outro) setShowPopup(false);
    } else {
      alert("Erro ao criar campo: " + result.message);
    }
  };




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

  // Função para formatar tempo decorrido (HH:MM:SS)
  function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segs).padStart(2, "0")}`;
  }

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

  function atualizarIMCSePossivel(peso, altura) {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (pesoNum > 0 && alturaNum > 0) {
      const imc = pesoNum / (alturaNum * alturaNum);
      setAnamneseData((prev) => ({ ...prev, bmi: imc.toFixed(2) }));
    }
  }


  return (
    <section className={Style.prontuarioSection}>


      {consultaAtual ? (
        <div className={Style.activeConsultBox}>
          <p>
            <strong>Atendimento ativo: {consultaAtual.name}</strong>
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
                  <p><strong>Início do atendimento:</strong> {consultaAtual?.localTime}</p>
                </div>
              </div>
              <div className={Style.menuButtons}>
                {/* Timer grande acima dos botões */}
                {consultaAbertaPorMedico && (
                  <div className={Style.timerDisplay}>
                    {formatarTempo(tempoDecorrido)}
                  </div>
                )}
                {/* Botão "Abrir Consulta" só aparece se não há consulta ativa ou se não foi aberta pelo médico */}
                {(!consultaAtual || !consultaAbertaPorMedico) && (
                  <button onClick={iniciarNovaConsulta}>Abrir Consulta</button>
                )}
                {/* Botão "Encerrar Atendimento" só aparece se a consulta foi aberta pelo médico */}
                {consultaAbertaPorMedico && (
                  <button onClick={() => setShowPopup(true)}>Encerrar Atendimento</button>
                )}
                <button className={Style.closeBtn} onClick={() => setShowMenu(false)}>
                  Voltar
                </button>
              </div>
            </div>

            {/* Condicional: Anamnese ou Prontuário */}
            {showAnamnese ? (
              <div className={Style.anamneseBox}>
                <h4>Anamnese</h4>

                {/* 🔹 Abas */}
                <div className={Style.tabHeader}>
                  {["Queixa e Doença Atual", "Hábitos e Estilo de Vida", "Exame Físico", "Observações e Tratamento"].map((tab, idx) => (
                    <button
                      key={idx}
                      className={`${Style.tabButton} ${expanded === idx ? Style.activeTab : ""}`}
                      onClick={() => setExpanded(idx)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); salvarAnamnese(); }}>
                  <div className={Style.formGrid}>
                    {/* 🩺 Seção 1: Queixa principal e doença atual */}
                    {expanded === 0 && (
                      <>
                        <label>Queixa Principal:
                          <textarea value={anamneseData.mainComplaint} onChange={(e) => setAnamneseData({ ...anamneseData, mainComplaint: e.target.value })} />
                        </label>
                        <label>História da Doença Atual:
                          <textarea value={anamneseData.historyOfCurrentIllness} onChange={(e) => setAnamneseData({ ...anamneseData, historyOfCurrentIllness: e.target.value })} />
                        </label>
                        <label>História Médica Pessoal:
                          <textarea value={anamneseData.personalMedicalHistory} onChange={(e) => setAnamneseData({ ...anamneseData, personalMedicalHistory: e.target.value })} />
                        </label>
                        <label>História Familiar:
                          <textarea value={anamneseData.familyHistory} onChange={(e) => setAnamneseData({ ...anamneseData, familyHistory: e.target.value })} />
                        </label>
                        <label>Alergias:
                          <input type="text" value={anamneseData.allergies} onChange={(e) => setAnamneseData({ ...anamneseData, allergies: e.target.value })} />
                        </label>
                        <label>Medicamentos em Uso:
                          <textarea value={anamneseData.useMedications} onChange={(e) => setAnamneseData({ ...anamneseData, useMedications: e.target.value })} />
                        </label>
                        <label>Hospitalizações Anteriores:
                          <textarea value={anamneseData.previousHospitalizations} onChange={(e) => setAnamneseData({ ...anamneseData, previousHospitalizations: e.target.value })} />
                        </label>
                        <label>Cirurgias Anteriores:
                          <textarea value={anamneseData.previousSurgeries} onChange={(e) => setAnamneseData({ ...anamneseData, previousSurgeries: e.target.value })} />
                        </label>
                      </>
                    )}

                    {/* 🍎 Seção 2: Hábitos e estilo de vida */}
                    {expanded === 1 && (
                      <>
                        <label>Dieta:
                          <input type="text" value={anamneseData.diet} onChange={(e) => setAnamneseData({ ...anamneseData, diet: e.target.value })} />
                        </label>
                        <label>Sono:
                          <input type="text" value={anamneseData.sleep} onChange={(e) => setAnamneseData({ ...anamneseData, sleep: e.target.value })} />
                        </label>
                        <label>Atividade Física:
                          <input type="text" value={anamneseData.physicalActivity} onChange={(e) => setAnamneseData({ ...anamneseData, physicalActivity: e.target.value })} />
                        </label>
                        <label>Fumante:
                          <input type="checkbox" checked={anamneseData.smoking} onChange={(e) => setAnamneseData({ ...anamneseData, smoking: e.target.checked })} />
                        </label>
                        <label>Alcoolismo:
                          <input type="checkbox" checked={anamneseData.alcoholism} onChange={(e) => setAnamneseData({ ...anamneseData, alcoholism: e.target.checked })} />
                        </label>
                      </>
                    )}

                    {/* ❤️ Seção 3: Exame físico */}
                    {expanded === 2 && (
                      <>
                        <label>Pressão Arterial:
                          <input type="text" value={anamneseData.bloodPressure} onChange={(e) => setAnamneseData({ ...anamneseData, bloodPressure: e.target.value })} />
                        </label>
                        <label>Frequência Cardíaca:
                          <input type="text" value={anamneseData.heartRate} onChange={(e) => setAnamneseData({ ...anamneseData, heartRate: e.target.value })} />
                        </label>
                        <label>Temperatura:
                          <input type="number" step="0.1" value={anamneseData.temperature} onChange={(e) => setAnamneseData({ ...anamneseData, temperature: e.target.value })} />
                        </label>
                        <label>Peso:
                          <input
                            type="number"
                            step="0.1"
                            value={anamneseData.weight}
                            onChange={(e) => {
                              const novoPeso = e.target.value;
                              setAnamneseData({ ...anamneseData, weight: novoPeso });
                              atualizarIMCSePossivel(novoPeso, anamneseData.height);
                            }}
                          />
                        </label>
                        <label>Altura:
                          <input
                            type="number"
                            step="0.01"
                            value={anamneseData.height}
                            onChange={(e) => {
                              const novaAltura = e.target.value;
                              setAnamneseData({ ...anamneseData, height: novaAltura });
                              atualizarIMCSePossivel(anamneseData.weight, novaAltura);
                            }}
                          />
                        </label>
                        <label>IMC:
                          <input type="number" step="0.1" value={anamneseData.bmi} readOnly />
                        </label>
                      </>

                    )}
                    {showPopup && (
                      <div className={Style.overlay}>
                        <div className={Style.popupCard}>
                          <h3>Criar Campo Personalizado</h3>
                          <div className={Style.formGroup}>
                            <label>Nome do campo</label>
                            <input
                              type="text"
                              value={customName}
                              onChange={(e) => setCustomName(e.target.value)}
                              placeholder="Ex: Pressão arterial"
                              className={Style.input}
                            />
                          </div>

                          <div className={Style.formGroup}>
                            <label>Valor</label>
                            <input
                              type="text"
                              value={customValue}
                              onChange={(e) => setCustomValue(e.target.value)}
                              placeholder="Ex: 12/8"
                              className={Style.input}
                            />
                          </div>

                          <div className={Style.buttonsRow}>
                            <button
                              className={Style.confirmButton}
                              onClick={handleCreateCustomField}
                              disabled={addingCustom}
                            >
                              {addingCustom ? "Salvando..." : "Salvar Campo"}
                            </button>
                            <button
                              className={Style.cancelButton}
                              onClick={() => setShowPopup(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}


                    {/* 🧾 Seção 4: Observações e tratamento */}
                    {expanded === 3 && (
                      <>
                        <label>Observações:
                          <textarea value={anamneseData.observations} onChange={(e) => setAnamneseData({ ...anamneseData, observations: e.target.value })} />
                        </label>
                        <label>Hipótese Diagnóstica:
                          <textarea value={anamneseData.diagnosticHypothesis} onChange={(e) => setAnamneseData({ ...anamneseData, diagnosticHypothesis: e.target.value })} />
                        </label>
                        <label>Plano de Tratamento:
                          <textarea value={anamneseData.treatmentPlan} onChange={(e) => setAnamneseData({ ...anamneseData, treatmentPlan: e.target.value })} />
                        </label>
                      </>
                    )}
                  </div>

                  <button type="submit" className={Style.saveBtn}>Salvar Anamnese</button>
                </form>
              </div>
            ) : (
              /* 🩺 HISTÓRICO DO PACIENTE DENTRO DO MENU */
              <div className={Style.historicoBox}>
                <h4>Prontuário do Paciente</h4>

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
                            <div className={Style.label}>Conclusão da consulta:</div>
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
            )}
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
