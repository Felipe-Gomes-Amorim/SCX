import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { checarClinica } from "../js/checarClinica/check_clinicaADM.js";

export default function AdmArea() {
  const [instituicao, setInstituicao] = useState(null);

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
      <h2>Área do Administrador</h2>
      <p>
        <strong>Instituição:</strong> {instituicao?.data?.name || "-"}
      </p>

      {/* Seção de Cadastro */}
      <div className={Style.subsection}>
        <h3>Seção de Cadastro</h3>
        <div className={Style.buttons}>
          <Redirect
            text="Cadastrar Laboratório"
            place="/checkLab"
            color="#007bff"
            hoverColor="#ffffffff"
            background="#ffffffff"
            hoverBackground="#007bff"
          />

          <Redirect
            text="Cadastrar Médico"
            place="/checkDoctor"
            color="#007bff"
            hoverColor="#ffffffff"
            background="#ffffffff"
            hoverBackground="#007bff"
          />

          <Redirect
            text="Cadastrar Secretaria"
            place="/registerSecretaria"
            color="#007bff"
            hoverColor="#ffffffff"
            background="#ffffffff"
            hoverBackground="#007bff"
          />
        </div>
      </div>

      {/* Seção de Visualização */}
      <div className={Style.subsection}>
        <h3>Seção de Visualização</h3>
        <div className={Style.buttons}>
          <Redirect
            text="Ver Médicos"
            place="/selectAll/doctor"
            color="#007bff"
            hoverColor="#ffffffff"
            background="#ffffffff"
            hoverBackground="#007bff"
            
          />

          

          <Redirect
            text="Ver Laboratórios"
            place="/selectAll/lab"
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
