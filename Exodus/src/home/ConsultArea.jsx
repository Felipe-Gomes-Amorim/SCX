import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import { buscarAtendimentoAtual, encerrarAtendimento } from "../js/fluxoMedico/consultas.js";
import { useNavigate } from "react-router-dom";

export default function ConsultArea() {
  const [consultaAtual, setConsultaAtual] = useState(null);
  const [loadingConsulta, setLoadingConsulta] = useState(true);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { showToast } = useToast();

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
    const result = await encerrarAtendimento(token);
    if (result.success) {
      setConsultaAtual(null);
      setMostrarMenu(false);
      navigate("/home");
    } else {
      showToast("Erro ao encerrar consulta.");
    }
  }

  if (loadingConsulta || !consultaAtual) return null;

  return (
    <>
      <section className={Style.section}>
        <h2>Consulta Atual</h2>
        <div className={Style.consultaBox}>
          <h3>Paciente: {consultaAtual.name}</h3>
          <p><strong>Horário de abertura:</strong> {consultaAtual.localTime}</p>

          <div className={Style.consultaButtons}>
            <button
              className={Style.edit_btn}
              onClick={() => setMostrarMenu(true)}
            >
              Expandir
            </button>
          </div>
        </div>
      </section>

      {/* === POPUP EXPANDIDO === */}
      {mostrarMenu && (
        <div className={Style.expandedOverlay}>
          <div className={Style.expandedBox}>
            <h2>Consulta de {consultaAtual.name}</h2>
            <p><strong>Horário de abertura:</strong> {consultaAtual.localTime}</p>

            <div className={Style.popupButtons}>
              <button onClick={() => navigate("/requisitarExame")}>
                Requisitar Exame
              </button>
              <button onClick={handleEncerrarConsulta}>
                Encerrar Consulta
              </button>
              <button
                className={Style.cancelBtn}
                onClick={() => setMostrarMenu(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
