import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import { buscarConsultaAtual, encerrarConsulta } from "../js/fluxoMedico/consultas.js";
import { useNavigate } from "react-router-dom";

export default function ConsultArea() {
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [loadingConsulta, setLoadingConsulta] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  
  useEffect(() => {
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

    carregarConsultaAtual();
  }, []);

  async function handleEncerrarConsulta() {
    if (!consultaAtual) return;
      const result = await encerrarConsulta(token);
      if (result.success) {
        navigate("/perfil")
        setConsultaAtual(null);
      } else {
        alert("Erro ao encerrar consulta.");
      }
    
  }



  if (loadingConsulta) {
    return (
      <section className={Style.section}>
        <h2>Consulta Atual</h2>
        <p>Carregando consulta...</p>
      </section>
    );
  }

  if (!consultaAtual) {
    return null; // nada exibido se não há consulta ativa
  }

  return (
    <section className={Style.section}>
      <h2>Consulta Atual</h2>
      <div className={Style.consultaBox}>
        <h3>Paciente: {consultaAtual.name}</h3>
        <p><strong>Horário de abertura:</strong> {consultaAtual.localTime}</p>
        

        <div className={Style.consultaButtons}>
          <button className={Style.edit_btn} onClick={() => navigate("/requisitarExame")}>
            Requisitar Exame
          </button>
          <button className={Style.logout_btn} onClick={handleEncerrarConsulta}>
            Encerrar Consulta
          </button>
        </div>
      </div>
    </section>
  );
}
