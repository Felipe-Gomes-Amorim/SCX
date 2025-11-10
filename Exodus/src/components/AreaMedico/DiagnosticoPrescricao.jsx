import React from "react";
import Style from "../../home/home.module.css";

export default function DiagnosticoPrescricao({
    
    diagnostico,
    setDiagnostico,
    prescricao,
    setPrescricao,
    salvarDiagnosticoPrescricao
}) {
    return (
        <div className={`${Style.section} ${Style.diagnosticoContainer}`}>


            <div className={Style.formGrid}>
                <label>
                    Diagnóstico
                    <textarea
                        value={diagnostico}
                        onChange={(e) => setDiagnostico(e.target.value)}
                        placeholder="Descreva o diagnóstico do paciente..."
                    />
                </label>

                <label>
                    Prescrição
                    <textarea
                        value={prescricao}
                        onChange={(e) => setPrescricao(e.target.value)}
                        placeholder="Digite a prescrição médica..."
                    />
                </label>
            </div>

         
        </div>
    );
}
