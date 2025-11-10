import React, { useEffect, useState } from "react";
import Style from "../home/selectClinics.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import { ativarClinica, buscarClinicaAtiva } from "../js/fluxoMedico/clinica_ativa.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastProvider.jsx";

export default function SelectClinics() {
  const [clinicas, setClinicas] = useState([]);
  const [clinicaAtiva, setClinicaAtiva] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarClinicas() {
      try {
        const data = await mostrar_todos("clinics", token);
        setClinicas(data || []);
      } catch (err) {
        console.error("Erro ao buscar clínicas:", err);
        setErro("Erro ao carregar clínicas");
      } finally {
        setCarregando(false);
      }
    }

    async function carregarClinicaAtiva() {
      const saved = localStorage.getItem("activeClinic");
      if (saved) setClinicaAtiva(JSON.parse(saved));

      const backendResponse = await buscarClinicaAtiva(token);
      if (backendResponse?.success && backendResponse?.clinic) {
        setClinicaAtiva(backendResponse.clinic);
        localStorage.setItem("activeClinic", JSON.stringify(backendResponse.clinic));
      }
    }

    carregarClinicas();
    carregarClinicaAtiva();
  }, [token]);

  const handleAtivarClinica = async (clinica) => {
    const response = await ativarClinica(clinica.name);
    if (response.success) {
      setClinicaAtiva(clinica);
      localStorage.setItem("activeClinic", JSON.stringify(clinica));
      navigate("/home");
    } else {
      showToast(`Erro: ${response.message}`);
    }
  };
  const { showToast } = useToast();

  return (
    <div className={Style.container}>
      <h3 className={Style.title}>Clínicas Cadastradas</h3>
      <div className={Style.divider}></div>

      {carregando ? (
        <p className={Style.infoText}>Carregando clínicas...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : clinicas.length === 0 ? (
        <p className={Style.infoText}>Nenhuma clínica encontrada.</p>
      ) : (
        <div className={Style.scrollArea}>
          {clinicas.map((clinica, i) => (
            <div key={i} className={Style.card}>
              <div>
                <strong>{clinica.name}</strong>

              </div>
              <button
                className={`${Style.button} ${clinicaAtiva?.name === clinica.name ? Style.ativo : ""
                  }`}
                onClick={() => handleAtivarClinica(clinica)}
                disabled={clinicaAtiva?.name === clinica.name}
              >
                {clinicaAtiva?.name === clinica.name ? "Ativa" : "Ativar"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
