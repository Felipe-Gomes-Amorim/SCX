import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";

import axios from "axios";
import Redirect from "../assents_link/Redirect.jsx";

import { checarClinica } from "../js/check_clinica.js";


export default function MedicoArea() {
  
    

    


  return (
 
      <section className={Style.section}>
            <h2>Área do Médico</h2>
            <p>

                
            </p>
            <div className={Style.buttons}>
                <Redirect text="Cadastrar Laboratório" place="/registerLaboratory" color="#007bff" hoverColor="#ffffffff" background="#ffffffff" hoverBackground="#007bff" />

                <Redirect text="Cadastrar Médico" place="/checkDoctor" color="#007bff" hoverColor="#ffffffff" background="#ffffffff" hoverBackground="#007bff" />

                <Redirect text="Ver Médicos" place="/selectAll/doctor" color="#007bff" hoverColor="#ffffffff" background="#ffffffff" hoverBackground="#007bff" />
            </div>

        </section>

  );
}
