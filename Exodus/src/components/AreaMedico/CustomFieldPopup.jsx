import React from "react";
import Style from "../../home/home.module.css";

export default function CustomFieldPopup({
  customName,
  setCustomName,
  customValue,
  setCustomValue,
  handleCreateCustomField,
  setShowCustomPopup,
}) {
  return (
    <div className={Style.overlay}>
      <div className={Style.popupCard}>
        <h3>Criar Campo Personalizado</h3>

        <label>Nome do campo</label>
        <input
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Ex: Pressão arterial"
        />

        <label>Valor</label>
        <input
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Ex: 12/8"
        />

        <div className={Style.buttonsRow}>
          <button onClick={handleCreateCustomField}>Salvar Campo</button>
          <button onClick={() => setShowCustomPopup(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
