import React, { useEffect, useState } from "react";
import { buscarTiposExame } from "../../js/fluxoMedico/exames.js";
import Style from "../../select_all/ExamsReturn.module.css";

export default function SelecionarTipoExameModal({ file, onConfirm, onClose }) {
  const [tiposExame, setTiposExame] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const lista = await buscarTiposExame();
        setTiposExame(lista.data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className={Style.overlay}>
      <div className={Style.modal}>
        
        <h3 className={Style.modalTitle}>Selecionar Tipo do Exame</h3>

        <p><strong>Arquivo:</strong> {file?.name}</p>

        {loading ? (
          <p>Carregando tipos...</p>
        ) : (
          <select
            className={Style.modalInput}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Selecione o tipo do exame</option>
            {tiposExame.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        )}

        <div className={Style.buttonRow}>
          <button
            className={Style.confirmButton}
            disabled={!selectedType}
            onClick={() => onConfirm(selectedType)}
          >
            Confirmar
          </button>

          <button className={Style.cancelButton} onClick={onClose}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
