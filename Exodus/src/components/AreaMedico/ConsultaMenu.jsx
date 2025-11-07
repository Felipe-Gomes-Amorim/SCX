import React from "react";
import Style from "../../home/home.module.css";
import HistoricoConsultas from "./HistoricoConsultas.jsx";
import AnamneseForm from "./AnamneseForm.jsx"

export default function ConsultaMenu({
  consultaAtual,
  consultaAbertaPorMedico,
  tempoDecorrido,
  formatarTempo,
  iniciarNovaConsulta,
  setShowEndPopup,
  setShowMenu,
  showAnamnese,
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

  historico,
  loadingHistorico,
  searchTerm,
  setSearchTerm,
  abrirDetalhesConsulta,
  formatarDataHora,
}) {
  return (
    <div className={Style.menuOverlay}>
      <div className={Style.menuBox}>
        <div className={Style.menuHeader}>
          <div>
            <h3>Paciente: {consultaAtual?.name}</h3>
            <p><strong>Início:</strong> {consultaAtual?.localTime}</p>
          </div>

          <div className={Style.menuButtons}>
            {consultaAbertaPorMedico && (
              <div className={Style.timerDisplay}>{formatarTempo(tempoDecorrido)}</div>
            )}
            {!consultaAbertaPorMedico && (
              <button onClick={iniciarNovaConsulta}>Abrir Consulta</button>
            )}
            <button onClick={() => setShowEndPopup(true)}>Encerrar Atendimento</button>
            <button className={Style.closeBtn} onClick={() => setShowMenu(false)}>Voltar</button>
          </div>
        </div>

        {showAnamnese && (
          <AnamneseForm
            expanded={expanded}
            setExpanded={setExpanded}
            anamneseData={anamneseData}
            setAnamneseData={setAnamneseData}
            atualizarIMC={atualizarIMC}
            salvarAnamnese={salvarAnamnese}
            showCustomPopup={showCustomPopup}
            setShowCustomPopup={setShowCustomPopup}
            customName={customName}
            setCustomName={setCustomName}
            customValue={customValue}
            setCustomValue={setCustomValue}
            handleCreateCustomField={handleCreateCustomField}
            customFieldsList={customFieldsList}
          />
        )}{!showAnamnese && (
          <HistoricoConsultas
            historico={historico}
            loadingHistorico={loadingHistorico}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            abrirDetalhesConsulta={abrirDetalhesConsulta}
            formatarDataHora={formatarDataHora}
          />
        )}



      </div>
    </div>
  );
}
