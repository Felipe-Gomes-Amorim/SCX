import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import Redirect from "../assents_link/Redirect.jsx";
import { buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import { buscarConsultaAtual, encerrarConsulta } from "../js/fluxoMedico/consultas.js";
import { useNavigate } from "react-router-dom";

export default function MedicoArea() {
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingConsulta, setLoadingConsulta] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarClinicaAtiva() {
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
      const response = await buscarConsultaAtual(token);
      if (response?.success) {
        setConsultaAtual(response.data);
      } else {
        setConsultaAtual(null);
      }
      setLoadingConsulta(false);
    }

    carregarClinicaAtiva();
    carregarConsultaAtual();
  }, [token]);

  async function handleEncerrarConsulta() {
    if (!consultaAtual) return;
    const confirm = window.confirm("Deseja encerrar esta consulta?");
    if (confirm) {
      const result = await encerrarConsulta(token);
      if (result.success) {
        alert("Consulta encerrada com sucesso!");
        setConsultaAtual(null);
      } else {
        alert("Erro ao encerrar consulta.");
      }
    }
  }

  return (
    <section className={Style.section}>
      <h2>Área do Médico</h2>
      <div className={Style.sectionDivider}></div>
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
      
      
      <div className={Style.containerArea}>
        <div className={Style.buttonsArea}>
          

          <Redirect
            text="Exames Devolvidos"
            place="/selectAll/examsReturn"
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


        <div className={Style.rightBox}>
          <h4>
            {consultaAtual ? "Consulta Atual" : "Nenhuma consulta em andamento"}
          </h4>

          {loadingConsulta ? (
            <p>Carregando consulta...</p>
          ) : consultaAtual ? (
            <div className={Style.consultaBox}>
              <h3>Paciente: {consultaAtual.name}</h3>
              <p>
                Horário de abertura: {consultaAtual.localTime}
              </p>
              <div className={Style.consultaButtons}>
                <button
                  className={Style.edit_btn}
                  onClick={() => navigate("/requisitarExame")}
                >
                  Pedir Exame
                </button>
                <button
                  className={Style.logout_btn}
                  onClick={handleEncerrarConsulta}
                >
                  Encerrar Consulta
                </button>
              </div>
            </div>
          ) : (
            <div className={Style.emptyBox}>
              <p>Você não possui nenhuma consulta ativa no momento.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
