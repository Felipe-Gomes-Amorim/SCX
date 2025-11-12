import React, { useEffect, useState } from "react";
import Style from "./SelectMedLab.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";
import { checarClinica } from "../js/checarClinica/check_clinicaADM.js";
import { toggleStatus } from "../js/ativar_desativar.js";
import axios from "axios";
import API_URL from "../js/apiConfig.js";
import { useToast } from "../context/ToastProvider.jsx";

export default function SelectMedLab({ limit = null }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("doctor");
  const [instituicao, setInstituicao] = useState(null);
  const token = localStorage.getItem("token");

  const { showToast } = useToast();

  // 🔍 Busca dados da instituição
  useEffect(() => {
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
  }, [token]);

  function anonimizarEmail(email) {
    if (!email || email.length < 7) return "******"; // segurança para e-mails muito curtos
    return "******" + email.slice(6);
  }

  // 🔁 Busca médicos, labs ou secretárias
  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro(null);

      try {
        const endpoint =
          abaAtiva === "doctor" ? "doctor" : abaAtiva === "lab" ? "lab" : "secretary";

        const data = await mostrar_todos(endpoint, token);

        if (data && data.length > 0) setDados(data);
        else {
          const msg =
            abaAtiva === "doctor"
              ? "Nenhum médico encontrado."
              : abaAtiva === "lab"
                ? "Nenhum laboratório encontrado."
                : "Nenhuma secretária encontrada.";
          setErro(msg);
        }
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [token, abaAtiva]);

  // 🔎 Filtro
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    if (abaAtiva === "doctor") {
      return (
        item.name?.toLowerCase().includes(termo) ||
        item.crm?.toLowerCase().includes(termo)
      );
    } else if (abaAtiva === "lab") {
      return (
        item.name?.toLowerCase().includes(termo) ||
        item.cnpj?.toLowerCase().includes(termo)
      );
    } else {
      return (
        item.name?.toLowerCase().includes(termo) ||
        item.email?.toLowerCase().includes(termo)
      );
    }
  });

  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  const redirectLink =
    abaAtiva === "doctor"
      ? "/checkDoctor"
      : abaAtiva === "lab"
        ? "/checkLab"
        : "/registerSecretaria";

  // 🧩 Desativar secretária
  async function handleToggleStatus(email, status) {
    try {
      await toggleStatus("secretary", email, status, token);

      setDados((prev) =>
        prev.map((item) =>
          item.email === email
            ? { ...item, status: status === "Ativo" ? "Inativo" : "Ativo" }
            : item
        )
      );

      showToast(
        `Secretária ${status === "Ativo" ? "desativada" : "ativada"} com sucesso.`,
        "success"
      );
    } catch (error) {
      console.error("Falha ao alterar status:", error);
      showToast("Não foi possível alterar o status. Tente novamente.", "error");
    }
  }

  // 🧪 Desvincular laboratório
  async function handleDisableLab(cnpj) {
    try {

      const response = await axios.patch(
        `${API_URL}/admin/disableLaboratory`,
        { cnpj },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza o estado local removendo o laboratório
      setDados((prev) => prev.filter((lab) => lab.cnpj !== cnpj));

      showToast("Laboratório desvinculado com sucesso!", "success");
      console.log("✅ Laboratório desvinculado:", response.data);
    } catch (error) {
      console.error("❌ Erro ao desvincular laboratório:", error.response?.data || error.message);
      showToast("Erro ao desvincular laboratório. Tente novamente.", "error");
    }
  }

  return (
    <div className={Style.container}>
      <h2>Área do Administrador</h2>
      <p>
        <strong>Instituição:</strong> {instituicao?.data?.name || "-"}
      </p>

      <div className={Style.subsection}>
        <div className={Style.tabHeader}>
          <h3
            className={`${Style.title} ${abaAtiva === "doctor" ? Style.activeTab : ""}`}
            onClick={() => setAbaAtiva("doctor")}
          >
            Médicos
          </h3>
          <h3
            className={`${Style.title} ${abaAtiva === "lab" ? Style.activeTab : ""}`}
            onClick={() => setAbaAtiva("lab")}
          >
            Laboratórios
          </h3>
          <h3
            className={`${Style.title} ${abaAtiva === "secretary" ? Style.activeTab : ""}`}
            onClick={() => setAbaAtiva("secretary")}
          >
            Secretárias
          </h3>
        </div>

        <div className={Style.searchBox}>
          <input
            type="text"
            placeholder={
              abaAtiva === "doctor"
                ? "Pesquisar por nome ou CRM..."
                : abaAtiva === "lab"
                  ? "Pesquisar por nome ou CNPJ..."
                  : "Pesquisar por nome ou e-mail..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={Style.searchInput}
          />

          <Redirect
            icon={maisIcon}
            place={redirectLink}
            color="transparent"
            hoverColor="transparent"
            background="transparent"
          />
        </div>

        {carregando ? (
          <p className={Style.info}>
            Carregando{" "}
            {abaAtiva === "doctor"
              ? "médicos..."
              : abaAtiva === "lab"
                ? "laboratórios..."
                : "secretárias..."}
          </p>
        ) : erro ? (
          <p className={Style.error}>{erro}</p>
        ) : displayedData.length === 0 ? (
          <p className={Style.info}>Nenhum resultado encontrado.</p>
        ) : (
          <div className={Style.listContainer}>
            {displayedData.map((item) => (
              <div key={item.id} className={Style.card}>
                <div className={Style.infoArea}>
                  <span>
                    <strong>Nome:</strong> {item.name || "-"}
                  </span>

                  {abaAtiva === "doctor" ? (
                    <span>
                      <strong>CRM:</strong> {item.crm || "-"}
                    </span>
                  ) : abaAtiva === "lab" ? (
                    <>
                      <span>
                        <strong>CNPJ:</strong> {item.cnpj || "-"}
                      </span>
                      <span>
                        <strong>Estado:</strong> {item.status || "-"}
                      </span>

                      {/* 🔘 Novo botão de desvincular laboratório */}
                      <button
                        className={`${Style.statusButton} ${Style.disable}`}
                        onClick={() => handleDisableLab(item.cnpj)}
                      >
                        Desvincular laboratório
                      </button>
                    </>
                  ) : (
                    <>
                      <span>
                        <strong>E-mail:</strong> {anonimizarEmail(item.email) || "-"}
                      </span>
                      <span>
                        <strong>Estado:</strong> {item.status || "-"}
                      </span>

                      <button
                        className={`${Style.statusButton} ${item.status === "Ativo" ? Style.disable : Style.enable
                          }`}
                        onClick={() => handleToggleStatus(item.email, item.status)}
                      >
                        {item.status === "Ativo" ? "Desativar" : "Ativar"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
