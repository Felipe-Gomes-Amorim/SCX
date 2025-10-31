import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./home.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";

export default function HistoricoAtividade() {
    const navigate = useNavigate();
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function carregarHistorico() {
            try {
                const dados = await mostrar_todos("history", token);

                const dadosOrdenados = dados
                    .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate)) // b - a
                    .reverse();
                setAtividades(dadosOrdenados.slice(0, 2));

            } catch (error) {
                console.error("Erro ao carregar histórico:", error);
            } finally {
                setLoading(false);
            }
        }

        carregarHistorico();
    }, []);

    const handleVerMais = () => {
        navigate("/SelectAll/history");
    };

    if (loading) {
        return <p>Carregando histórico...</p>;
    }

    return (
        <section className={Style.section}>
            <h3 className={Style.title}>Histórico de Atividade</h3>
            <div className={Style.sectionDivider}></div>

            {atividades.length === 0 ? (
                <p>Nenhuma atividade encontrada.</p>
            ) : (
                atividades.map((item, index) => (
                    <div key={index} className={Style.activity}>
                        <p>
                            <strong>{item.dateTime}</strong>
                            <br />
                            {item.userACT}
                        </p>
                    </div>
                ))
            )}

            <button className={Style.btn} onClick={handleVerMais}>
                Ver mais
            </button>
        </section>
    );
}
