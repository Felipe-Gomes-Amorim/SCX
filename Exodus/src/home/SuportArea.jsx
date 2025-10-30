import React, { useState, useEffect } from "react";
import Style from "./home.module.css";
import Redirect from "../assents_link/Redirect.jsx";


export default function SuporteArea() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    let mounted = true;

    


    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className={Style.section}>
      <h2>Área do Suporte</h2>
      {/* Seção de Tickets */}
      <div className={Style.subsection}> 
        <div className={Style.buttonRow}>
          <Redirect
            text="Ver Tickets"
            place="/selectAll/tickets"
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
