import React, { useState, useEffect } from "react";
import Style from "./Perfil.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { checarClinica } from "../js/checarClinica/check_clinicaSecretaria.js";

export default function SuporteArea() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    let mounted = true;

    async function loadPerfil() {
      if (!token) return;
      try {
        const data = await checarClinica(token);
        if (mounted) setInstituicao(data);
      } catch (err) {
        console.error("Failed to load perfil", err);
      }
    }

    loadPerfil();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className={Style.section}>
      <h2>Área do Suporte</h2>
      

      {/* Seção de Tickets */}
      <div className={Style.subsection}>
        <h3>Seção de Cadastro</h3>
        <div className={Style.buttons}>
          <Redirect
            text="Ver Tickets"
            place="/register"
            color="#007bff"
            hoverColor="#ffffffff"
            background="#ffffffff"
            hoverBackground="#007bff"
          />

          <Redirect
            text="Abrir Consulta"
            place="/registerConsulta"
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
