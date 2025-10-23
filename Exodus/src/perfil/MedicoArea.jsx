import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";

export default function MedicoArea() {
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function carregarClinicaAtiva() {
    const token = localStorage.getItem("token");
    console.log("🔑 Token carregado:", token);

    if (!token) {
      console.warn("⚠️ Nenhum token encontrado — médico não autenticado.");
      setLoading(false);
      return;
    }

    const backendResponse = await buscarClinicaAtiva(token);
    console.log("📦 Resposta do backend:", backendResponse);

    // ✅ Pega a clínica do objeto retornado
    const clinica = backendResponse?.clinic || null;

    console.log("🏥 Clínica detectada:", clinica);

    if (clinica) {
      setClinicaAtiva(clinica);
      localStorage.setItem("activeClinic", JSON.stringify(clinica));
    } else {
      console.warn("⚠️ Nenhuma clínica válida encontrada.");
      setClinicaAtiva(null);
    }

    setLoading(false);
  }

  carregarClinicaAtiva();
}, []);



  return (
    <section className={Style.section}>
      <h2>Área do Médico</h2>

      {loading ? (
        <p>Carregando informações...</p>
      ) : clinicaAtiva ? (
        <p>
           <strong>Clínica Ativa:</strong> {clinicaAtiva.name || clinicaAtiva.nome}
        </p>
      ) : (
        <p>
          <strong>Clínica Ativa:</strong> Nenhuma clínica ativa no momento.
        </p>
      )}

      <div className={Style.buttons}>
        <Redirect
          text="Ver Clínicas Cadastradas"
          place="/selectAll/clinics"
          color="#007bff"
          hoverColor="#ffffffff"
          background="#ffffffff"
          hoverBackground="#007bff"
        />
      </div>
    </section>
  );
}
