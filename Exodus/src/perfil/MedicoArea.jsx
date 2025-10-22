import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";

import axios from "axios";
import Redirect from "../assents_link/Redirect.jsx";




export default function MedicoArea() {
  
    

    


  return (
 
      <section className={Style.section}>
            <h2>Área do Médico</h2>
            <p>

                
            </p>
            <div className={Style.buttons}>
                <Redirect text="Ver Clínicas cadastradas" place="/selectAll/clinics" color="#007bff" hoverColor="#ffffffff" background="#ffffffff" hoverBackground="#007bff" />

                
            </div>

        </section>

  );
}
