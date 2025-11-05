import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { checarClinica } from "../js/checarClinica/check_clinicaADM.js";

export default function PacienteArea() {



  return (
    <section className={Style.section}>
      <h2>Área do Paciente</h2>

      {/* Seção de Exames Pendentes */}
      <div className={Style.subsection}>
        <h3>Seus Exames</h3>
        <div className={Style.buttons}>
          <Redirect
            text="Ver Exames Pendentes"
            place="/selectAll/pendingExams"
            color="#007bff"
            hoverColor="#ffffffff"
            background="#ffffffff"
            hoverBackground="#007bff"
          />
          <Redirect
            text="Ver Exames Devolvidos"
            place="/selectAll/examsReturnPac"
            color="#007bff"
            hoverColor="#ffffffff"
            background="#ffffffff"
            hoverBackground="#007bff"
          />
        </div>
      </div>
    </section>
  );
}
