import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Style from "./SelectAll.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx"


export default function SelectAll() {
    const { role } = useParams(); // pega o parâmetro da URL
    const [dados, setDados] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await mostrar_todos(role, token);

                // Como response já é um array:
                if (response && response.length > 0) {
                    setDados(response);
                } else {
                    setErro("Nenhum registro encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setErro(error.message);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [role]);


    if (carregando) return <p>Carregando dados...</p>;
    if (erro) return <p>Erro: {erro}</p>;
    if (!dados || dados.length === 0) return <p>Nenhum registro encontrado.</p>;

    // Funções placeholders para as ações
    const handleEditar = (item) => {
        console.log("Editar:", item);
        alert(`Editar ${item.name || item.nome}`);
    };

    const handleExcluir = (item) => {
        console.log("Excluir:", item);
        alert(`Excluir ${item.name || item.nome}`);
    };

    return (
        <>
        <ExodusTop/>
        <section className={Style.section}>
            <h2>Listagem de {role}</h2>

            <table className={Style.table}>
                <thead>
                    <tr>
                        {Object.keys(dados[0]).map((coluna, i) => (
                            <th key={i}>{coluna.toUpperCase()}</th>
                        ))}
                        <th>AÇÕES</th>
                    </tr>
                </thead>

                <tbody>
                    {dados.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((valor, j) => (
                                <td key={j}>{valor || "-"}</td>
                            ))}
                            <td>
                                
                                <button
                                    className={Style.delete}
                                    onClick={() => handleExcluir(item)}
                                >
                                    desvincular
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
        <Footer/>
        </>
    );
}
