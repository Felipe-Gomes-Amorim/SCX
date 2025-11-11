import React, { useEffect, useState } from "react";
import Style from "./DoctorsList.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";
import AdmClinicModal from "../components/AreaAdm/AdmClinicModal.jsx";
import { toggleClinicStatus } from "../js/fluxoAdmSis/clinicStatus.js";

export default function ClinicsAndLabsList({ limit = null }) {
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingId, setLoadingId] = useState(null);
    const [showDisableModal, setShowDisableModal] = useState(false);
    const [showEnableModal, setShowEnableModal] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState("clinicas"); // 🔄 Alternância
    const token = localStorage.getItem("token");
    const [active, setActive] = useState("left");


    // Função de carregamento reutilizável
    const carregarDados = async () => {
        setCarregando(true);
        setErro(null);
        try {
            const endpoint =
                abaAtiva === "clinicas" ? "allClinics" : "AllLabSystem";

            const data = await mostrar_todos(endpoint, token);
            console.log("Dados recebidos:", data);

            if (data && data.length > 0) setDados(data);
            else setErro("Nenhum registro encontrado.");
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setErro("Erro ao buscar dados.");
        } finally {
            setCarregando(false);
        }
    };

    // Carrega ao iniciar e ao trocar de aba
    useEffect(() => {
        carregarDados();
    }, [token, abaAtiva]);

    // Filtro de busca
    const filteredData = dados.filter((item) => {
        const termo = searchTerm.toLowerCase();
        return (
            item.name?.toLowerCase().includes(termo) ||
            item.cnpj?.toLowerCase().includes(termo)
        );
    });

    const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

    return (
        <div className={Style.container}>
            <div className={Style.header}>


                {/* 🔄 Abas de alternância */}
                <div className={Style.tabHeader}>
                    <h3
                        className={`${Style.title} ${abaAtiva === "clinicas" ? Style.activeTab : ""
                            }`}
                        onClick={() => setAbaAtiva("clinicas")}
                    >
                        Clínicas
                    </h3>
                    <h3
                        className={`${Style.title} ${abaAtiva === "laboratorios" ? Style.activeTab : ""
                            }`}
                        onClick={() => setAbaAtiva("laboratorios")}
                    >
                        Laboratórios
                    </h3>
                </div>

                {/* Botões (somente para clínicas) */}
                {abaAtiva === "clinicas" && (
                    <div className={Style.headerButtons}>
                        <Redirect
                            icon={maisIcon}
                            place="/registerClinica"
                            color="transparent"
                            hoverColor="transparent"
                            background="transparent"
                        />

                        <div className={Style.toggleContainer}>
                            <div
                                className={`${Style.highlight} ${active === "right" ? Style.moveRight : Style.moveLeft
                                    }`}
                            ></div>

                            <button
                                className={`${Style.toggleButton} ${active === "left" ? Style.activeBtn : ""
                                    }`}
                                onClick={() => {
                                    setActive("left");
                                    setShowDisableModal(true);
                                }}
                            >
                                Desativar Adm de Clínica
                            </button>

                            <button
                                className={`${Style.toggleButton} ${active === "right" ? Style.activeBtn : ""
                                    }`}
                                onClick={() => {
                                    setActive("right");
                                    setShowEnableModal(true);
                                }}
                            >
                                Ativar Adm de Clínica
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 🔍 Busca */}
            <div className={Style.searchBox}>
                <input
                    type="text"
                    placeholder="Pesquisar por nome ou CNPJ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={Style.searchInput}
                />
            </div>

            {/* 🧭 Conteúdo */}
            {carregando ? (
                <p className={Style.info}>Carregando dados...</p>
            ) : erro ? (
                <p className={Style.error}>{erro}</p>
            ) : displayedData.length === 0 ? (
                <p className={Style.info}>Nenhum resultado encontrado.</p>
            ) : (
                <div className={Style.listContainer}>
                    {displayedData.map((item) => (
                        <div
                            key={item.cnpj}
                            className={`${Style.card} ${item.status === "Ativo"
                                    ? Style.activeCard
                                    : Style.inactiveCard
                                }`}
                        >
                            {/* Badge */}
                            <div
                                className={`${Style.statusBadge} ${item.status === "Ativo"
                                        ? Style.badgeActive
                                        : Style.badgeInactive
                                    }`}
                            >
                                {item.status === "Ativo" ? "Ativa" : "Desativada"}
                            </div>

                            <div className={Style.infoArea}>
                                <span>
                                    <strong>Nome:</strong> {item.name || "-"}
                                </span>
                                <span>
                                    <strong>CNPJ:</strong> {item.cnpj || "-"}
                                </span>
                            </div>

                            {/* Botão de ativar/desativar só em clínicas */}
                            {abaAtiva === "clinicas" && (
                                <button
                                    className={`${Style.toggleBtn} ${item.status === "Ativo"
                                            ? Style.disableBtn
                                            : Style.enableBtn
                                        }`}
                                    onClick={() =>
                                        toggleClinicStatus(
                                            item.cnpj,
                                            item.status === "Ativo" ? "disable" : "enable",
                                            token,
                                            setLoadingId,
                                            setDados
                                        )
                                    }
                                    disabled={loadingId === item.cnpj}
                                >
                                    {loadingId === item.cnpj
                                        ? "Processando..."
                                        : item.status === "Ativo"
                                            ? "Desativar"
                                            : "Ativar"}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Modais (somente para clínicas) */}
            {abaAtiva === "clinicas" && (
                <>
                    <AdmClinicModal
                        token={token}
                        show={showDisableModal}
                        onClose={() => setShowDisableModal(false)}
                        action="disable"
                    />

                    <AdmClinicModal
                        token={token}
                        show={showEnableModal}
                        onClose={() => setShowEnableModal(false)}
                        action="enable"
                    />
                </>
            )}
        </div>
    );
}
