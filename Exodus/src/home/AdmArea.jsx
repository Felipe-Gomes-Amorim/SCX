import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import { checarClinica } from "../js/checarClinica/check_clinicaADM.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function AdmArea() {
  const [instituicao, setInstituicao] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let mounted = true;

    async function loadHome() {
      if (!token) return;
      try {
        const data = await checarClinica(token);
        if (mounted) setInstituicao(data);
      } catch (err) {
        console.error("Failed to load home", err);
      }
    }

    async function loadDashboard() {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

        const [labRes, cliRes, patRes] = await Promise.all([
          fetch("https://controledeexame.onrender.com/adminSystem/getCountLab", { headers }),
          fetch("https://controledeexame.onrender.com/adminSystem/getCountCli", { headers }),
          fetch("https://controledeexame.onrender.com/adminSystem/getCountPat", { headers }),
        ]);

        const lab = await labRes.json();
        const cli = await cliRes.json();
        const pat = await patRes.json();

        setDashboardData([
          { name: "Laboratórios", total: lab },
          { name: "Clínicas", total: cli },
          { name: "Pacientes", total: pat },
        ]);
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard", err);
      }
    }

    loadHome();
    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className={Style.section}>
      <h2 className={Style.sectionTitle}>Área do Administrador</h2>

    

      <div className={Style.subsection}>
        {dashboardData ? (
          <div style={{ width: "100%", maxWidth: "800px", margin: "40px auto" }}>
            <h3 className={Style.chartTitle}>Resumo do Sistema</h3>

            {/* Cards de resumo */}
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "2rem", marginLeft: "3.5rem", }}>
              {dashboardData.map((item) => (
                <div
                  key={item.name}
                  style={{
                    background: "#f9fafb",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    minWidth: "150px",
                  }}
                >
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{item.name}</h4>
                  <p style={{ fontSize: "1.6rem", color: "#2563eb" }}>{item.total}</p>
                </div>
              ))}
            </div>

            {/* Gráfico */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total">
                  {dashboardData.map((entry, index) => {
                    const colors = ["#4f46e5", "#10b981", "#f59e0b"]; // Roxo, Verde, Amarelo
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </div>
        ) : (
          <p>Carregando dados do dashboard...</p>
        )}
      </div>
    </section>
  );
}
