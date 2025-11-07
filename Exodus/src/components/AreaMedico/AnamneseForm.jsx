import React from "react";
import Style from "../../home/home.module.css";
import AnamneseTabs from "./AnamneseTabs";
import AnamneseSection from "./AnamneseSection";
import CustomFieldPopup from "./CustomFieldPopup";
import CustomFieldsList from "./CustomFieldsList";

export default function AnamneseForm({
  expanded,
  setExpanded,
  anamneseData,
  setAnamneseData,
  atualizarIMC,
  salvarAnamnese,
  showCustomPopup,
  setShowCustomPopup,
  customName,
  setCustomName,
  customValue,
  setCustomValue,
  handleCreateCustomField,
  customFieldsList,
}) {
  return (
    <div className={Style.anamneseBox}>
      <h4>Anamnese</h4>

      {/* Abas */}
      <AnamneseTabs expanded={expanded} setExpanded={setExpanded} />

      <form onSubmit={(e) => { e.preventDefault(); salvarAnamnese(); }}>
        <div className={Style.formGrid}>
          <AnamneseSection
            expanded={expanded}
            anamneseData={anamneseData}
            setAnamneseData={setAnamneseData}
            atualizarIMC={atualizarIMC}
          />
        </div>

        <button
          type="button"
          onClick={() => setShowCustomPopup(true)}
          className={Style.saveBtn}
        >
          + Adicionar Campo
        </button>

        <CustomFieldsList customFieldsList={customFieldsList} />

        <button type="submit" className={Style.saveBtn}>
          Salvar Anamnese
        </button>
      </form>

      {/* Popup Campo Customizado */}
      {showCustomPopup && (
        <CustomFieldPopup
          customName={customName}
          setCustomName={setCustomName}
          customValue={customValue}
          setCustomValue={setCustomValue}
          handleCreateCustomField={handleCreateCustomField}
          setShowCustomPopup={setShowCustomPopup}
        />
      )}
    </div>
  );
}
