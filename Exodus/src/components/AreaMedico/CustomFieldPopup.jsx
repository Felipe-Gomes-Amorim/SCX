import React from "react";
import ReactDOM from "react-dom";
import Style from "../../home/home.module.css";
import { useToast } from "../../context/ToastProvider";

export default function CustomFieldPopup({
  customName,
  setCustomName,
  customValue,
  setCustomValue,
  handleCreateCustomField,
  setShowCustomPopup,
}) {
  const { showToast } = useToast();

  const handleSave = async () => {
    if (!customName.trim()) {
      showToast("O nome do campo é obrigatório.", "warning");
      return;
    }

    try {
      await handleCreateCustomField();
      showToast("Campo personalizado criado com sucesso!", "success");
      setShowCustomPopup(false);
    } catch (error) {
      console.error(error);
      showToast("Erro ao criar campo personalizado.", "error");
    }
  };

  const handleCancel = () => {
    setShowCustomPopup(false);
    showToast("Criação de campo cancelada.", "info");
  };

  return ReactDOM.createPortal(
    <div className={Style.overlay}>
      <div className={Style.customPopupCard}>
        <h3 className={Style.popupTitle}>Criar Campo Personalizado</h3>

        <label className={Style.popupLabel}>Nome do campo</label>
        <input
          className={Style.popupInput}
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Ex: Pressão arterial"
        />

        <label className={Style.popupLabel}>Valor</label>
        <input
          className={Style.popupInput}
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Ex: 12/8"
        />

        <div className={Style.popupButtonsRow}>
          <button
            className={`${Style.btn}`}
            onClick={handleSave}
          >
            Salvar Campo
          </button>
          <button
            className={`${Style.edit_btn} `}
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
