import React, { useEffect, useState } from "react";
import Style from "../../home/home.module.css";
import { buscarExamesConsulta } from "../../js/fluxoMedico/consultas.js";

import API_URL from "../../js/apiConfig.js";



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
        console.log(result)
        if (result.success) setArquivos(result.data);
        else setErroArquivos(result.message || "Erro ao carregar arquivos.");
      } catch {
        setErroArquivos("Erro ao carregar arquivos.");
      } finally {
        setLoadingArquivos(false);
      }
    }

    carregarArquivos();
  }, [selectedConsulta, token]);

  if (!selectedConsulta) return null;

  return (
    <div className={Style.overlay}>
      <div className={Style.popupCard}>
        <h3>Detalhes da Consulta</h3>

        <p>
          <strong>Médico:</strong> {selectedConsulta.nameM || "-"}
        </p>
        <p>
          <strong>Clínica:</strong> {selectedConsulta.nameC || "-"}
        </p>
        <p>
          <strong>Especialidade:</strong> {selectedConsulta.specialty || "-"}
        </p>
        <p>
          <strong>Data de Conclusão:</strong>{" "}
          {formatarDataHora(selectedConsulta.dateEnd)}
        </p>

        <hr />
        <h4>Diagnóstico:</h4>

        {loadingDiag ? (
          <p>Carregando diagnóstico...</p>
        ) : (
          <textarea
            readOnly
            value={diagnostico}
            className={Style.textAreaDiag}
            rows={1}
          />
        )}

        {/* 🔹 Lista de arquivos carregados do back-end */}
        {loadingArquivos ? (
          <p>Carregando arquivos...</p>
        ) : erroArquivos ? (
          <p className={Style.error}>{erroArquivos}</p>
        ) : arquivos.length > 0 ? (
          <>
            <hr />
            <h4>Arquivos Devolvidos:</h4>
            <div className={Style.listContainer}>
              {arquivos.map((item) => (
                <div key={item.fileName} className={Style.card}>
                  <span>
                    <strong>Arquivo:</strong> {item.fileName}
                  </span>
                  <button
                    className={Style.exam_btn}
                    onClick={() =>
                      window.open(
                        `${API_URL}/files/preview/${item.fileName}`,
                        "_blank"
                      )
                    }
                  >
                   Ver Exame
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : null}

        <div className={Style.buttonsRow}>
          <button className={Style.logout_btn}onClick={() => setSelectedConsulta(null)}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
