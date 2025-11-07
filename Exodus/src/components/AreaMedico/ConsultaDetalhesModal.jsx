import React from "react";
import Style from "../../home/home.module.css";

export default function ConsultaDetalhesModal({
  selectedConsulta,
  diagnostico,
  loadingDiag,
  formatarDataHora,
  setSelectedConsulta,
}) {
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
          />
        )}

        <div className={Style.buttonsRow}>
          <button onClick={() => setSelectedConsulta(null)}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
