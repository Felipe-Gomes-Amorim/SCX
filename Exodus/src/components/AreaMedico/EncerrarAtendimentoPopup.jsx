import React from "react";
import Style from "../../home/home.module.css";

export default function EncerrarAtendimentoPopup({
  confirmarEncerramento,
  setShowEndPopup,
}) {
  return (
    <div className={Style.popupOverlay}>
      <div className={Style.popupBox}>
        <h3>Deseja que o paciente retorne?</h3>
        <p>Essa ação encerrará a consulta atual.</p>

        <div className={Style.popupButtons}>
          <button onClick={() => confirmarEncerramento(true)}>
            Sim, ele deve voltar
          </button>
          <button onClick={() => confirmarEncerramento(false)}>
            Não, encerrar normalmente
          </button>
          <button
            className={Style.cancelBtn}
            onClick={() => setShowEndPopup(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
