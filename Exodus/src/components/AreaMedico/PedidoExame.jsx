import React, { useState, useEffect } from "react";
import Style from "../../home/home.module.css";
import {
    cadastrarRequisicaoExame,
    buscarTiposExame,
    criarExames,
    PDFExame,
} from "../../js/fluxoMedico/exames.js";
import { useToast } from "../../context/ToastProvider.jsx";
import { formatCID } from "../../js/formatters.js" 

export default function PedidoExame({ consultaAtual }) {
    const [exames, setExames] = useState([
        { id: Date.now(), examType: "", cid: "", justify: "" },
    ]);
    const [tiposExame, setTiposExame] = useState([]);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [loadingEnvio, setLoadingEnvio] = useState(false);
    const [loadingPDF, setLoadingPDF] = useState(false);
    const [exameIds, setExameIds] = useState([]);
    const { showToast } = useToast();

    // 🔹 Buscar tipos de exame ao montar
    useEffect(() => {
        const carregarTipos = async () => {
            try {
                const lista = await buscarTiposExame();
                setTiposExame(lista.data || []);
            } catch (err) {
                console.error("Erro ao buscar tipos de exame:", err);
                showToast("Erro ao buscar tipos de exame", "error");
            } finally {
                setLoadingTipos(false);
            }
        };
        carregarTipos();
    }, [showToast]);

    // 🔹 Atualizar um campo dentro de um exame específico
    const handleChange = (index, field, value) => {
        const novosExames = [...exames];
        novosExames[index][field] = value;
        setExames(novosExames);
    };

    // 🔹 Adicionar um novo pedido de exame vazio com ID único
    const adicionarExame = () => {
        setExames([
            ...exames,
            { id: Date.now() + Math.random(), examType: "", cid: "", justify: "" },
        ]);
    };

    // 🔹 Remover um exame da lista
    const removerExame = (index) => {
        setExames(exames.filter((_, i) => i !== index));
    };

    // 🔹 Enviar todos os exames
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingEnvio(true);

        try {
            // 1️⃣ Cria requisição vazia
            const requisicao = await cadastrarRequisicaoExame();
            if (!requisicao.success) throw new Error("Falha ao criar requisição de exame.");
            console.log("Requisição criada:", requisicao);
            setExameIds([requisicao.data.id]);

            // 2️⃣ Envia lista de exames
            const payload = exames.map((ex) => ({
                examType: ex.examType,
                justify: ex.justify,
                cid: ex.cid,
            }));

            const criacao = await criarExames(payload);
            console.log("Retorno da criação:", criacao);

            if (criacao.success) {
                showToast("Exames criados com sucesso!", "success");

                // Agora definimos o ID retornado corretamente


                // Resetar os campos
                setExames([{ id: Date.now(), examType: "", cid: "", justify: "" }]);
            } else {
                showToast("Erro ao criar exames.", "error");
            }
        } catch (error) {
            console.error("Erro ao enviar exames:", error);
            showToast("Erro ao processar exames.", "error");
        } finally {
            setLoadingEnvio(false);
        }
    };


    // 🔹 Gerar PDFs
    const handleImprimir = async () => {
        if (!exameIds.length) {
            showToast("Nenhum exame disponível para imprimir.", "warning");
            return;
        }
        setLoadingPDF(true);
        try {
            for (const id of exameIds) {
                console.log(id);
                const response = await PDFExame({ id });
                if (response.success && response.data) {
                    const blob = new Blob([response.data], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                }
            }
            showToast("PDFs gerados com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao gerar PDFs:", error);
            showToast("Erro ao gerar PDFs dos exames.", "error");
        } finally {
            setLoadingPDF(false);
        }
    };

    return (
        <div className={`${Style.section} ${Style.diagnosticoContainer}`}>
            <form onSubmit={handleSubmit} className={Style.formGrid}>
                {exames.map((exame, index) => (
                    <div key={exame.id} className={Style.exameItem}>
                        <h4>Exame {index + 1}</h4>

                        <label>
                            Tipo de Exame
                            {loadingTipos ? (
                                <p>Carregando...</p>
                            ) : (
                                <select
                                    value={exame.examType}
                                    onChange={(e) =>
                                        handleChange(index, "examType", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {tiposExame.map((tipo) => (
                                        <option key={tipo.name} value={tipo.name}>
                                            {tipo.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </label>

                        <label>
                            CID
                            <input
                                type="text"
                                value={exame.cid}
                                onChange={(e) =>
                                    handleChange(index, "cid", formatCID(e.target.value))
                                }
                                placeholder="Código CID (ex: A00)"
                                required
                            />
                        </label>


                        <label>
                            Justificativa
                            <textarea
                                value={exame.justify}
                                onChange={(e) =>
                                    handleChange(index, "justify", e.target.value)
                                }
                                placeholder="Motivo do exame..."
                                required
                            />
                        </label>

                        {exames.length > 1 && (
                            <button
                                type="button"
                                className={Style.logout_btn2}
                                onClick={() => removerExame(index)}
                            >
                                Remover
                            </button>
                        )}
                        <hr />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={adicionarExame}
                    className={Style.btn3}
                    style={{ marginBottom: "1rem" }}
                >
                    +
                </button>

                <button
                    type="submit"
                    className={Style.saveBtn}
                    disabled={loadingEnvio}
                >
                    {loadingEnvio ? "Enviando..." : "Enviar Todos os Pedidos"}
                </button>
            </form>

            {exameIds.length > 0 && (
                <button
                    onClick={handleImprimir}
                    className={Style.btn2}
                    disabled={loadingPDF}
                    style={{ marginTop: "1rem" }}
                >
                    {loadingPDF ? "Gerando PDFs..." : "Imprimir Todos os Exames"}
                </button>
            )}
        </div>
    );
}
