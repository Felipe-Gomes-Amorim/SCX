import React, { useState, useEffect } from "react";
import Style from "./home.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { checarClinica } from "../js/checarClinica/check_clinicaSecretaria.js";

export default function SecretariaArea() {
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
      <h2>Área da Secretária</h2>
      <p>
        <strong>Instituição:</strong> {instituicao?.data?.name || "-"}
      </p>

      {/* Seção de Cadastro */}
      <div className={Style.subsection}>
        <h3>Seção de Cadastro</h3>
        <div className={Style.buttons}>
          <Redirect
            text="Cadastrar Paciente"
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
