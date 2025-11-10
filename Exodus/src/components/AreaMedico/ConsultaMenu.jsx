import React from "react";
import Style from "../../home/home.module.css";
import HistoricoConsultas from "./HistoricoConsultas.jsx";
import AnamneseForm from "./AnamneseForm.jsx"
import DiagnosticoPrescricao from "./DiagnosticoPrescricao.jsx";
import PedidoExame from "./PedidoExame.jsx";




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

  diagnostico,
  setDiagnostico,
  prescricao,
  setPrescricao
}) {

  const [abaAtiva, setAbaAtiva] = React.useState("anamnese");


  return (
    <div className={Style.menuOverlay}>
      <div className={Style.menuBox}>
        <div className={Style.menuHeaderCompact}>
          <div className={Style.pacienteInfo}>
            <h3>Paciente: {consultaAtual?.name}</h3>
            <p><strong>Início:</strong> {consultaAtual?.localTime}</p>
          </div>

          <div className={Style.menuActions}>
            {consultaAbertaPorMedico ? (
              <>
                <span className={Style.timerDisplay}>{formatarTempo(tempoDecorrido)}</span>
                <button onClick={() => setShowEndPopup(true)}>Encerrar Atendimento</button>
              </>
            ) : (
              <button onClick={iniciarNovaConsulta}>Abrir Consulta</button>
            )}

            <button className={Style.closeBtn} onClick={() => setShowMenu(false)}>Voltar</button>
          </div>

        </div>


        {showAnamnese && (
          <div className={Style.abasContainer}>
            <div className={Style.abasHeader}>
              <button
                className={abaAtiva === "anamnese" ? Style.abaAtiva : ""}
                onClick={() => setAbaAtiva("anamnese")}
              >
                Anamnese
              </button>
              <button
                className={abaAtiva === "diagnostico" ? Style.abaAtiva : ""}
                onClick={() => setAbaAtiva("diagnostico")}
              >
                Diagnóstico e Prescrição
              </button>
              <button
                className={abaAtiva === "pedidoExame" ? Style.abaAtiva : ""}
                onClick={() => setAbaAtiva("pedidoExame")}
              >
                Pedido de Exame
              </button>
            </div>


            <div className={Style.abasConteudo}>
              {abaAtiva === "anamnese" ? (
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
              ) : abaAtiva === "diagnostico" ? (
                <DiagnosticoPrescricao
                  diagnostico={diagnostico}
                  setDiagnostico={setDiagnostico}
                  prescricao={prescricao}
                  setPrescricao={setPrescricao}
                />
              ) : (
                <PedidoExame consultaAtual={consultaAtual} /> 
              )}
            </div>

          </div>
        )}
        {!showAnamnese && (
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
