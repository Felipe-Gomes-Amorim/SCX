import React, { useState, useEffect } from "react";
import Style from "../../home/home.module.css";
import {
    cadastrarRequisicaoExame,
    buscarTiposExame,
    PDFExame,
} from "../../js/fluxoMedico/exames.js";

export default function PedidoExame({ consultaAtual }) {
    const [exam_type, setExamType] = useState("");
    const [sample_type, setSampleType] = useState("");
    const [complement, setComplement] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tiposExame, setTiposExame] = useState([]);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [exameId, setExameId] = useState(null); // novo estado para guardar o ID do exame
    const [loadingPDF, setLoadingPDF] = useState(false);

    useEffect(() => {
        const carregarTipos = async () => {
            try {
                const token = localStorage.getItem("token");
                const lista = await buscarTiposExame(token);
                setTiposExame(lista.data || []);
            } catch (err) {
                console.error("Erro ao buscar tipos de exame:", err);
                setMensagem("❌ Não foi possível carregar os tipos de exame.");
            } finally {
                setLoadingTipos(false);
            }
        };

        carregarTipos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensagem("");
        setExameId(null);

        try {
            const response = await cadastrarRequisicaoExame({
                exam_type,
                sample_type,
                complement,
                name,
                patient_id: consultaAtual?.patient_id,
            });

            console.log("Resposta do cadastro:", response);

            if (response.success && response.data?.id) {
                setExameId(response.data.id); // salva o ID do exame recém-criado
                setMensagem("Pedido de exame enviado com sucesso!");
                setExamType("");
                setSampleType("");
                setComplement("");
                setName("");
            } else {
                setMensagem("O servidor não retornou um ID válido para o exame.");
            }
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao enviar o pedido de exame.");
        } finally {
            setLoading(false);
        }
    };

    const handleImprimir = async () => {
        if (!exameId) {
            setMensagem("Nenhum exame encontrado para imprimir.");
            return;
        }

        setLoadingPDF(true);
        setMensagem("");

        try {
            const response = await PDFExame({ id: exameId });
            console.log("Resposta do PDF:", response);

            if (response.success && response.data) {
                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
                setMensagem("PDF do exame gerado com sucesso!");
            } else {
                setMensagem("Falha ao gerar o PDF do exame.");
            }
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            setMensagem("❌ Erro ao gerar o PDF do exame.");
        } finally {
            setLoadingPDF(false);
        }
    };



    return (
        <div className={`${Style.section} ${Style.diagnosticoContainer}`}>
            <form onSubmit={handleSubmit} className={Style.formGrid}>
                <label>
                    Tipo de Exame
                    {loadingTipos ? (
                        <p>Carregando tipos de exame...</p>
                    ) : (
                        <select
                            value={exam_type}
                            onChange={(e) => setExamType(e.target.value)}
                            required
                        >
                            <option value="">Selecione um tipo de exame</option>
                            {tiposExame.map((tipo) => (
                                <option key={tipo.id || tipo.name} value={tipo.name}>
                                    {tipo.name}
                                </option>
                            ))}
                        </select>
                    )}
                </label>

                <label>
                    Tipo de Amostra
                    <input
                        type="text"
                        value={sample_type}
                        onChange={(e) => setSampleType(e.target.value)}
                        placeholder="Ex: Sangue, Urina, Saliva..."
                        required
                    />
                </label>

                <label>
                    Complemento / Observações
                    <textarea
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        placeholder="Observações adicionais sobre o exame..."
                    />
                </label>

                <label>
                    Nome do Laboratório
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Unidade 01"
                        required
                    />
                </label>

                <button type="submit" className={Style.saveBtn} disabled={loading}>
                    {loading ? "Enviando..." : "Pedir Exame"}
                </button>
            </form>

            {/* Botão extra só aparece após criar o exame */}
            {exameId && (
                <button
                    onClick={handleImprimir}
                    className={Style.btn2}
                    disabled={loadingPDF}
                    style={{ marginTop: "1rem" }}
                >
                    {loadingPDF ? "Gerando PDF..." : "Imprimir Exame"}
                </button>
            )}

            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}
