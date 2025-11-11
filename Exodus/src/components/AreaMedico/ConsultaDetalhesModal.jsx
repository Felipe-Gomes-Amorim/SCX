import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Style from "../../home/home.module.css";
import { buscarExamesConsulta, buscarAnamneseConsulta } from "../../js/fluxoMedico/consultas.js";

export default function ConsultaDetalhesModal({
  selectedConsulta,
  diagnostico,
  prescricao,
  loadingDiag,
  formatarDataHora,
  setSelectedConsulta,
  token,
}) {
  const [arquivos, setArquivos] = useState([]);
  const [anamnese, setAnamnese] = useState(null);
  const [loadingArquivos, setLoadingArquivos] = useState(false);
  const [loadingAnamnese, setLoadingAnamnese] = useState(false);
  const [erroArquivos, setErroArquivos] = useState("");
  const [erroAnamnese, setErroAnamnese] = useState("");

  useEffect(() => {
    if (!selectedConsulta) return;

    async function carregarArquivos() {
      setLoadingArquivos(true);
      setErroArquivos("");
      try {
        const result = await buscarExamesConsulta(token, selectedConsulta.idAppointment);
        if (result.success) setArquivos(result.data || []);
        else setErroArquivos(result.message || "Erro ao carregar arquivos.");
      } catch {
        setErroArquivos("Erro ao carregar arquivos.");
      } finally {
        setLoadingArquivos(false);
      }
    }

    async function carregarAnamnese() {
      setLoadingAnamnese(true);
      setErroAnamnese("");
      setAnamnese(null); // limpa o estado antes de carregar

      try {
        const result = await buscarAnamneseConsulta(token, selectedConsulta.idAppointment);

        // Se o back-end retornar erro ou data nula
        if (!result || !result.success || !result.data) {
          setErroAnamnese("Nenhuma anamnese registrada para esta consulta.");
          setAnamnese(null);
          return;
        }

        setAnamnese(result.data);
      } catch (err) {

        const msg = err?.message?.includes("null")
          ? "Nenhuma anamnese registrada para esta consulta."
          : "Erro ao carregar anamnese.";
        setErroAnamnese(msg);
        setAnamnese(null);
      } finally {
        setLoadingAnamnese(false);
      }
    }


    carregarArquivos();
    carregarAnamnese();
  }, [selectedConsulta, token]);

  // 🔹 Traduz rótulos
  const traducaoCampos = {
    mainComplaint: "Queixa Principal",
    historyOfCurrentIllness: "Histórico da Doença Atual",
    personalMedicalHistory: "Histórico Médico Pessoal",
    familyHistory: "Histórico Familiar",
    allergies: "Alergias",
    useMedications: "Uso de Medicamentos",
    previousHospitalizations: "Internações Anteriores",
    previousSurgeries: "Cirurgias Anteriores",
    diet: "Dieta",
    sleep: "Sono",
    physicalActivity: "Atividade Física",
    smoking: "Tabagismo",
    alcoholism: "Alcoolismo",
    bloodPressure: "Pressão Arterial",
    heartRate: "Frequência Cardíaca",
    temperature: "Temperatura",
    weight: "Peso",
    height: "Altura",
    bmi: "IMC",
    observations: "Observações",
    diagnosticHypothesis: "Hipótese Diagnóstica",
    treatmentPlan: "Plano de Tratamento",
  };

  // 🔹 Renderiza blocos organizados
  const renderAnamnese = (data) => {
    if (!data) return <p>Nenhuma anamnese registrada.</p>;

    const habitos = ["diet", "sleep", "physicalActivity", "smoking", "alcoholism"];
    const sinais = ["bloodPressure", "heartRate", "temperature", "weight", "height", "bmi"];
    const gerais = [
      "mainComplaint",
      "historyOfCurrentIllness",
      "personalMedicalHistory",
      "familyHistory",
      "allergies",
      "useMedications",
      "previousHospitalizations",
      "previousSurgeries",
      "observations",
      "diagnosticHypothesis",
      "treatmentPlan",
    ];

    const renderGrupo = (titulo, campos) => (
      <div style={{ marginBottom: "1.5rem" }}> {/* Espaço entre os grupos */}
        <h3 style={{ marginBottom: "0.5rem", marginLeft: "0.5rem" }}>{titulo}</h3>
        <div style={{ marginLeft: "1rem" }}>
          {campos.map((campo) => {
            const valor = data[campo];
            if (
              valor === "" ||
              valor === null ||
              valor === 0 ||
              (typeof valor === "boolean" && valor === false)
            )
              return null;
            return (
              <p key={campo} style={{ marginBottom: "0.3rem" }}> {/* Espaço entre cada campo */}
                <strong>{traducaoCampos[campo] || campo}:</strong>{" "}
                {typeof valor === "boolean" ? (valor ? "Sim" : "Não") : valor}
              </p>
            );
          })}
        </div>
      </div>
    );


    return (
      <div style={{ maxHeight: "350px", overflowY: "auto", scrollbarWidth: 'thin', backgroundColor: '#e7e7e7ff' }}>
        {renderGrupo("Informações Gerais", gerais)}
        {renderGrupo("Hábitos e Estilo de Vida", habitos)}
        {renderGrupo("Sinais Vitais e Medidas", sinais)}

        {data.customFields?.length > 0 && (
          <>
            <h5 style={{ marginTop: "10px" }}>Campos Personalizados</h5>
            <div style={{ marginLeft: "10px" }}>
              {data.customFields.map((field, i) => (
                <p key={i}>
                  <strong>{field.fieldName}:</strong> {field.fieldValue}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {selectedConsulta && (
        <motion.div
          className={Style.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className={Style.popupCard}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3>Detalhes da Consulta</h3>

            <div className={Style.popupContent}>
              <div className={Style.infoRow}>
                <p><strong>Médico:</strong> {selectedConsulta.nameM || "-"}</p>
                <p><strong>Clínica:</strong> {selectedConsulta.nameC || "-"}</p>
                <p><strong>Especialidade:</strong> {selectedConsulta.specialty || "-"}</p>
                <p><strong>Data de Conclusão:</strong> {formatarDataHora(selectedConsulta.dateEnd)}</p>
              </div>

              <hr />

              <div className={Style.horizontalSection}>
                {/* 🔹 Esquerda: Anamnese + Diagnóstico */}
                <div className={Style.leftSection}>
                  <h3>Anamnese:</h3>
                  {loadingAnamnese ? (
                    <p>Carregando anamnese...</p>
                  ) : erroAnamnese ? (
                    <p className={Style.error}>{erroAnamnese}</p>
                  ) : (
                    renderAnamnese(anamnese)
                  )}

                  <h4 style={{ marginTop: "15px" }}>Diagnóstico:</h4>
                  {loadingDiag ? (
                    <p>Carregando diagnóstico...</p>
                  ) : (
                    <textarea
                      readOnly
                      value={diagnostico}
                      className={Style.textAreaDiag}
                    />
                  )}

                  <h4>Prescrição:</h4>
                  {loadingDiag ? (
                    <p>Carregando prescrição...</p>
                  ) : (
                    <textarea
                      readOnly
                      value={prescricao}
                      className={Style.textAreaDiag}
                    />
                  )}
                </div>

                {/* 🔹 Direita: Arquivos */}
                <div className={Style.rightSection}>
                  {loadingArquivos ? (
                    <p>Carregando arquivos...</p>
                  ) : erroArquivos ? (
                    <p className={Style.error}>{erroArquivos}</p>
                  ) : arquivos.length > 0 ? (
                    <>
                      <h4>Arquivos Devolvidos:</h4>
                      <div className={Style.listContainer}>
                        {arquivos.map((item, index) => {
                          const nomeAmigavel = `Arquivo ${arquivos.length > 1 ? `(${index + 1})` : ""
                            }`;
                          return (
                            <div key={item.fileName} className={Style.card}>
                              <span>
                                <strong>{nomeAmigavel}:</strong>{" "}
                                {item.fileName.split("_").pop()}
                              </span>
                              <button
                                className={Style.saveBtn}
                                onClick={() =>
                                  window.open(
                                    `${import.meta.env.VITE_API_URL}/files/preview/${item.fileName}`,
                                    "_blank"
                                  )
                                }
                              >
                                Ver Exame
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p>Sem arquivos devolvidos.</p>
                  )}
                </div>
              </div>
            </div>


            <button className={Style.logout_btn} onClick={() => setSelectedConsulta(null)}>
              Fechar
            </button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
