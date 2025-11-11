import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Style from "../../home/home.module.css";
import CustomFieldsList from "./CustomFieldsList.jsx";

export default function AnamneseSection({
  expanded,
  anamneseData,
  setAnamneseData,
  atualizarIMC,
  showCustomPopup,
  setShowCustomPopup,
  customFieldsList

}) {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: "easeIn" } },
  };

  return (
    <div className={Style.anamneseContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={expanded} // muda o conteúdo da animação conforme a aba muda
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={Style.anamneseContent}
        >
          {expanded === 0 && (
            <>
              <label>Queixa Principal:
                <textarea
                  value={anamneseData.mainComplaint}
                  onChange={(e) => setAnamneseData({ ...anamneseData, mainComplaint: e.target.value })}
                />
              </label>
              <label>Histórico da Doença Atual:
                <textarea
                  value={anamneseData.historyOfCurrentIllness}
                  onChange={(e) => setAnamneseData({ ...anamneseData, historyOfCurrentIllness: e.target.value })}
                />
              </label>
              <label>Histórico Médico Pessoal:
                <textarea
                  value={anamneseData.personalMedicalHistory}
                  onChange={(e) => setAnamneseData({ ...anamneseData, personalMedicalHistory: e.target.value })}
                />
              </label>
              <label>Histórico Familiar:
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
          )}

          {expanded === 1 && (
            <>
              <label>Dieta:
                <input
                  value={anamneseData.diet}
                  onChange={(e) => setAnamneseData({ ...anamneseData, diet: e.target.value })}
                />
              </label>
              <label>Nível de Atividade Física:
                <input
                  value={anamneseData.physicalActivity}
                  onChange={(e) => setAnamneseData({ ...anamneseData, physicalActivity: e.target.value })}
                />
              </label>
              <label>
                Fumante:
                <input
                  type="checkbox"
                  style={{ marginLeft: "8px", verticalAlign: "middle", transform: "translateY(1px)" }}
                  checked={anamneseData.smoking}
                  onChange={(e) => setAnamneseData({ ...anamneseData, smoking: e.target.checked })}
                />
              </label>
              <label>Alcoolismo:
                <input
                  type="checkbox"
                  style={{ marginLeft: "8px", verticalAlign: "middle", transform: "translateY(1px)" }}
                  checked={anamneseData.alcoholism}
                  onChange={(e) => setAnamneseData({ ...anamneseData, alcoholism: e.target.checked })}
                />
              </label>
            </>
          )}

          {expanded === 2 && (
            <>
              <label>Peso (em quilos):
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
              <label>Altura (em metros):
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
          )}

          {expanded === 3 && (
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
          )}
          {expanded === 4 && (
            <div className={Style.customFieldsSection}>
              

              <CustomFieldsList customFieldsList={customFieldsList} />
               <button
                type="button"
                onClick={() => setShowCustomPopup(true)}
                className={Style.btn3}
              >
                + 
              </button>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
