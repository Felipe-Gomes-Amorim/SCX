import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { checarClinica } from "../js/checarClinica/check_clinicaADM.js";

export default function AdmArea() {
 
  const [instituicao, setInstituicao] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let mounted = true;

    async function loadhome() {
      if (!token) return;
      try {
        const data = await checarClinica(token);
        if (mounted) setInstituicao(data);
      } catch (err) {
        console.error("Failed to load home", err);
      }
    }

    loadhome();
    return () => {
      mounted = false;
    };
  }, []);

  


  return (
    <section className={Style.section}>
      <h2 className={Style.sectionTitle}>Área do Administrador</h2>
      <p className={Style.infoText}>
        <strong>Instituição:</strong> {instituicao?.data?.name || "-"}
      </p>

      <div className={Style.subsection}>
      
        
      </div>
    </section>
  );
}

