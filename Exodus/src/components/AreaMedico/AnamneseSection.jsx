import React from "react";
import Style from "../../home/home.module.css";

export default function AnamneseSection({ expanded, anamneseData, setAnamneseData, atualizarIMC }) {
  switch (expanded) {
    case 0:
      return (
        <>
          <label>Queixa Principal:
            <textarea
              value={anamneseData.mainComplaint}
              onChange={(e) => setAnamneseData({ ...anamneseData, mainComplaint: e.target.value })}
            />
          </label>
          <label>História da Doença Atual:
            <textarea
              value={anamneseData.historyOfCurrentIllness}
              onChange={(e) => setAnamneseData({ ...anamneseData, historyOfCurrentIllness: e.target.value })}
            />
          </label>
          <label>História Médica Pessoal:
            <textarea
              value={anamneseData.personalMedicalHistory}
              onChange={(e) => setAnamneseData({ ...anamneseData, personalMedicalHistory: e.target.value })}
            />
          </label>
          <label>História Familiar:
            <textarea
              value={anamneseData.familyHistory}
              onChange={(e) => setAnamneseData({ ...anamneseData, familyHistory: e.target.value })}
            />
          </label>
          <label>Alergias:
            <input
              value={anamneseData.allergies}
              onChange={(e) => setAnamneseData({ ...anamneseData, allergies: e.target.value })}
            />
          </label>
        </>
      );

    case 1:
      return (
        <>
          <label>Dieta:
            <input
              value={anamneseData.diet}
              onChange={(e) => setAnamneseData({ ...anamneseData, diet: e.target.value })}
            />
          </label>
          <label>Atividade Física:
            <input
              value={anamneseData.physicalActivity}
              onChange={(e) => setAnamneseData({ ...anamneseData, physicalActivity: e.target.value })}
            />
          </label>
          <label>Fumante:
            <input
              type="checkbox"
              checked={anamneseData.smoking}
              onChange={(e) => setAnamneseData({ ...anamneseData, smoking: e.target.checked })}
            />
          </label>
          <label>Alcoolismo:
            <input
              type="checkbox"
              checked={anamneseData.alcoholism}
              onChange={(e) => setAnamneseData({ ...anamneseData, alcoholism: e.target.checked })}
            />
          </label>
        </>
      );

    case 2:
      return (
        <>
          <label>Peso:
            <input
              type="number"
              step="0.1"
              value={anamneseData.weight}
              onChange={(e) => {
                const v = e.target.value;
                setAnamneseData({ ...anamneseData, weight: v });
                atualizarIMC(v, anamneseData.height);
              }}
            />
          </label>
          <label>Altura:
            <input
              type="number"
              step="0.01"
              value={anamneseData.height}
              onChange={(e) => {
                const v = e.target.value;
                setAnamneseData({ ...anamneseData, height: v });
                atualizarIMC(anamneseData.weight, v);
              }}
            />
          </label>
          <label>IMC:
            <input readOnly value={anamneseData.bmi} />
          </label>
        </>
      );

    case 3:
      return (
        <>
          <label>Observações:
            <textarea
              value={anamneseData.observations}
              onChange={(e) => setAnamneseData({ ...anamneseData, observations: e.target.value })}
            />
          </label>
          <label>Hipótese Diagnóstica:
            <textarea
              value={anamneseData.diagnosticHypothesis}
              onChange={(e) => setAnamneseData({ ...anamneseData, diagnosticHypothesis: e.target.value })}
            />
          </label>
          <label>Plano de Tratamento:
            <textarea
              value={anamneseData.treatmentPlan}
              onChange={(e) => setAnamneseData({ ...anamneseData, treatmentPlan: e.target.value })}
            />
          </label>
        </>
      );

    default:
      return null;
  }
}
