import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import Redirect from "../assents_link/Redirect.jsx";


export default function LabArea() {


  return (
    <section className={Style.section}>
      <h2>Área do Laboratório</h2>


  
      <div className={Style.subsection}>
        <h3>Visualizar Requisições</h3>
        <div className={Style.buttons}>
          <Redirect
            text="Ver Requisições de Exame"
            place="/selectAll/examRequests"
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
