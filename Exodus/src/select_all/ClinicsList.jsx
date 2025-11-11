import React, { useEffect, useState } from "react";
import Style from "./DoctorsList.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import Redirect from "../assents_link/Redirect.jsx";
import maisIcon from "../assets/mais2.png";
import AdmClinicModal from "../components/AreaAdm/AdmClinicModal.jsx";

import { toggleClinicStatus } from "../js/fluxoAdmSis/clinicStatus.js";

export default function ClinicsList({ limit = null }) {
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingId, setLoadingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [hovered, setHovered] = useState("left");
    const [active, setActive] = useState("left");


    const [showDisableModal, setShowDisableModal] = useState(false);
    const [showEnableModal, setShowEnableModal] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function carregarClinicas() {
            try {
                const data = await mostrar_todos("allClinics", token);
                if (data && data.length > 0) setDados(data);
                else setErro("Nenhuma clínica encontrada.");
            } catch (err) {
                console.error(err);
                setErro("Erro ao buscar lista de clínicas.");
            } finally {
                setCarregando(false);
            }
        }

        carregarClinicas();
    }, [token]);


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
                <h3 className={Style.title}>Clínicas Cadastradas</h3>

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
            </div>

            <div className={Style.searchBox}>
                <input
                    type="text"
                    placeholder="Pesquisar por nome ou CNPJ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={Style.searchInput}
                />
            </div>

            {carregando ? (
                <p className={Style.info}>Carregando clínicas...</p>
            ) : erro ? (
                <p className={Style.error}>{erro}</p>
            ) : displayedData.length === 0 ? (
                <p className={Style.info}>Nenhuma clínica encontrada.</p>
            ) : (
                <div className={Style.listContainer}>
                    {displayedData.map((item) => (
                        <div
                            key={item.cnpj}
                            className={`${Style.card} ${item.active ? Style.activeCard : Style.inactiveCard}`}
                        >
                            {/* Badge de status */}
                            <div
                                className={`${Style.statusBadge} ${item.active ? Style.badgeActive : Style.badgeInactive}`}
                            >
                                {item.active ? "Ativa" : "Desativada"}
                            </div>

                            <div className={Style.infoArea}>
                                <span>
                                    <strong>Nome:</strong> {item.name || "-"}
                                </span>
                                <span>
                                    <strong>CNPJ:</strong> {item.cnpj || "-"}
                                </span>
                            </div>

                            <button
                                className={`${Style.toggleBtn} ${item.active ? Style.disableBtn : Style.enableBtn}`}
                                onClick={() =>
                                    toggleClinicStatus(
                                        item.cnpj,
                                        item.active ? "disable" : "enable",
                                        token,
                                        setLoadingId,
                                        setDados
                                    )
                                }

                                disabled={loadingId === item.cnpj}
                            >
                                {loadingId === item.cnpj
                                    ? "Processando..."
                                    : item.active
                                        ? "Desativar"
                                        : "Ativar"}
                            </button>
                        </div>
                    ))}
                </div>

            )}

            {/* Modal separado */}
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

        </div>
    );
}
