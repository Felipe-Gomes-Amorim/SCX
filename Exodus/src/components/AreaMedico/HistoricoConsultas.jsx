import React from "react";
import Style from "../../home/home.module.css";

export default function HistoricoConsultas({
  historico,
  loadingHistorico,
  searchTerm,
  setSearchTerm,
  abrirDetalhesConsulta,
  formatarDataHora,
}) {
  const filteredHistorico = (historico || []).filter((item) => {
    const termo = searchTerm?.toLowerCase() || "";
    return ["nameM", "nameC", "specialty", "idAppointment"].some((key) =>
      item[key]?.toLowerCase().includes(termo)
    );
  });


  return (
    <div className={Style.historicoBox}>
      <h4>Prontuário do Paciente</h4>

      <input
        className={Style.searchInput}
        placeholder="Pesquisar por médico, clínica, especialidade ou ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loadingHistorico ? (
        <p>Carregando histórico...</p>
      ) : filteredHistorico.length > 0 ? (
        <div className={Style.listContainer}>
          {filteredHistorico
            .slice() // cria uma cópia
            .reverse() // inverte a ordem
            .map((item, i) => (
              <div key={i} className={Style.card}>
                <p>
                  <strong>Conclusão:</strong> {formatarDataHora(item.dateEnd)}
                </p>
                <p>
                  <strong>Médico:</strong> {item.nameM || "-"}
                </p>
                <p>
                  <strong>Clínica:</strong> {item.nameC || "-"}
                </p>
                <p>
                  <strong>Especialidade:</strong> {item.specialty || "-"}
                </p>
                <button
                  className={Style.btn}
                  onClick={() => abrirDetalhesConsulta(item)}
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
        </div>
      ) : (
        <p>Nenhum atendimento encontrado.</p>
      )}

    </div>
  );
}
