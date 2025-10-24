import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import { buscarConsultaAtual, encerrarConsulta } from "../js/fluxoMedico/consultas.js";
import { requisitarExame } from "../js/fluxoMedico/exames.js";

export default function MedicoArea() {
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingConsulta, setLoadingConsulta] = useState(true);

  useEffect(() => {
    async function carregarClinicaAtiva() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const backendResponse = await buscarClinicaAtiva(token);
      const clinica = backendResponse?.clinic || null;
      setClinicaAtiva(clinica);
      if (clinica) {
        localStorage.setItem("activeClinic", JSON.stringify(clinica));
      }
      setLoading(false);
    }

    async function carregarConsultaAtual() {
      setLoadingConsulta(true);
      const response = await buscarConsultaAtual();
      if (response?.success) {
        setConsultaAtual(response.data);
      } else {
        setConsultaAtual(null);
      }
      setLoadingConsulta(false);
    }

    carregarClinicaAtiva();
    carregarConsultaAtual();
  }, []);

  async function handleEncerrarConsulta() {
    if (!consultaAtual) return;
    const confirm = window.confirm("Deseja encerrar esta consulta?");
    if (confirm) {
      const result = await encerrarConsulta(consultaAtual.id);
      if (result.success) {
        alert("Consulta encerrada com sucesso!");
        setConsultaAtual(null);
      } else {
        alert("Erro ao encerrar consulta.");
      }
    }
  }

  async function handleRequisitarExame() {
    if (!consultaAtual) {
      alert("Nenhuma consulta ativa para requisitar exame.");
      return;
    }
    const result = await requisitarExame({ paciente: consultaAtual.paciente });
    if (result.success) {
      alert("Exame requisitado com sucesso!");
    } else {
      alert("Erro ao requisitar exame.");
    }
  }

  return (
    <section className={Style.section}>
      <h2>Área do Médico</h2>

      {loading ? (
        <p>Carregando informações...</p>
      ) : clinicaAtiva ? (
        <p>
          <strong>Clínica Ativa:</strong>{" "}
          {clinicaAtiva.name || clinicaAtiva.nome}
        </p>
      ) : (
        <p>
          <strong>Clínica Ativa:</strong> Nenhuma clínica ativa no momento.
        </p>
      )}

      <div className={Style.containerArea}>
        {/* Lado esquerdo - botões */}
        <div className={Style.leftButtons}>
          

          <Redirect
            text="Exames Devolvidos"
            place="/examesDevolvidos"
            color="#007bff"
            hoverColor="#fff"
            background="#fff"
            hoverBackground="#007bff"
          />

           <Redirect
                  text="Ver Clínicas Cadastradas"
                  place="/selectAll/clinics"
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
