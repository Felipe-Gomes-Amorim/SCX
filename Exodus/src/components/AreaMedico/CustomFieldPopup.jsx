import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Style from "../../home/home.module.css";
import { buscarExamesConsulta } from "../../js/fluxoMedico/consultas.js";

export default function ConsultaDetalhesModal({
  selectedConsulta,
  diagnostico,
  loadingDiag,
  formatarDataHora,
  setSelectedConsulta,
  token,
}) {
  const [arquivos, setArquivos] = useState([]);
  const [loadingArquivos, setLoadingArquivos] = useState(false);
  const [erroArquivos, setErroArquivos] = useState("");

  useEffect(() => {
    if (!selectedConsulta) return;

    async function carregarArquivos() {
      setLoadingArquivos(true);
      setErroArquivos("");
      try {
        const result = await buscarExamesConsulta(token, selectedConsulta.idAppointment);
        if (result.success) setArquivos(result.data.ExamsResults || []);
        else setErroArquivos(result.message || "Erro ao carregar arquivos.");
      } catch {
        setErroArquivos("Erro ao carregar arquivos.");
      } finally {
        setLoadingArquivos(false);
      }
    }

    carregarArquivos();
  }, [selectedConsulta, token]);

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

            <div className={Style.infoRow}>
              <p><strong>Médico:</strong> {selectedConsulta.nameM || "-"}</p>
              <p><strong>Clínica:</strong> {selectedConsulta.nameC || "-"}</p>
              <p><strong>Especialidade:</strong> {selectedConsulta.specialty || "-"}</p>
              <p><strong>Data de Conclusão:</strong> {formatarDataHora(selectedConsulta.dateEnd)}</p>
            </div>

            <hr />

            <div className={Style.horizontalSection}>
              {/* Diagnóstico */}
              <div className={Style.leftSection}>
                <h4>Diagnóstico:</h4>
                {loadingDiag ? (
                  <p>Carregando diagnóstico...</p>
                ) : (
                  <textarea
                    readOnly
                    value={diagnostico}
                    className={Style.textAreaDiag}
                  />
                )}
              </div>

              {/* Arquivos */}
              <div className={Style.rightSection}>
                {loadingArquivos ? (
                  <p>Carregando arquivos...</p>
                ) : erroArquivos ? (
                  <p className={Style.error}>{erroArquivos}</p>
                ) : arquivos.length > 0 ? (
                  <>
                    <h4>Arquivos Devolvidos:</h4>
                    <div className={Style.listContainer}>
                      {arquivos.map((item) => (
                        <div key={item.fileName} className={Style.card}>
                          <span><strong>Arquivo:</strong> {item.fileName}</span>
                          <button
                            className={Style.downloadBtn}
                            onClick={() =>
                              window.open(
                                `${process.env.REACT_APP_API_URL}/doctor/files/preview/${item.fileName}`,
                                "_blank"
                              )
                            }
                          >
                            📄 Ver Exame
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : <p>Sem arquivos devolvidos.</p>}
              </div>
            </div>

            <div className={Style.buttonsRow}>
              <button onClick={() => setSelectedConsulta(null)}>Fechar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
