import React, { useEffect, useState } from "react";
import Style from "./devolverExameModal.module.css";
import { devolverExame } from "../../js/fluxoLaboratorio/devolverExame.js";
import { mostrar_todos } from "../../js/mostrar_todos.js";

export default function DevolverExameModal({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Carrega todas as requisições
  useEffect(() => {
    async function carregarResultados() {
      try {
        const data = await mostrar_todos("examsRequests", token);
        console.log("🔍 Dados recebidos:", data);
        if (data && data.length > 0) setDados(data);
        else setErro("Nenhum exame encontrado.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar resultados de exames.");
      } finally {
        setCarregando(false);
      }
    }
    carregarResultados();
  }, [token]);

  // 🔍 Filtro da busca
  const filteredData = dados.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.paciente?.toLowerCase().includes(termo) ||
      item.clinica?.toLowerCase().includes(termo) ||
      item.medico?.toLowerCase().includes(termo) ||
      item.status?.toLowerCase().includes(termo) ||
      item.tipoexame?.toLowerCase().includes(termo)
    );
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 🔹 Enviar devolução (arquivo + id)
  const handleSubmit = async () => {
    console.log(selectedExamId)
    if (!selectedExamId) {
      setMessage("Por favor, selecione uma requisição antes de enviar.");
      return;
    }
    if (!selectedFile) {
      setMessage("Por favor, selecione um arquivo para enviar.");
      return;
    }
    console.log(selectedFile)
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    const result = await devolverExame(selectedFile, selectedExamId, token);

    if (result.success) {
      setMessage("✅ Exame devolvido com sucesso!");
    } else {
      setMessage(`❌ Erro: ${result.message}`);
    }

    setLoading(false);
  };

  return (
    <div className={Style.overlay}>
      <div className={Style.modal}>
        <h3>Devolver Exame</h3>

        {/* 🔍 Campo de busca */}
        <div className={Style.searchBox}>
          <input
            type="text"
            placeholder="Pesquisar por paciente, médico ou tipo de exame..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={Style.searchInput}
          />
        </div>

        {/* 🔹 Lista de requisições */}
        {carregando ? (
          <p>Carregando requisições...</p>
        ) : erro ? (
          <p className={Style.error}>{erro}</p>
        ) : (
          <div className={Style.listContainer}>
            {filteredData.map((item) => (
              <div
                key={item.idReq || index}
                className={`${Style.card} ${
                  selectedExamId === item.id ? Style.selectedCard : ""
                }`}
              >
                <div className={Style.infoArea}>
                  <span><strong>Tipo de exame:</strong> {item.exam_type || "-"}</span>
                  <span><strong>Tipo de amostra:</strong> {item.sample_type || "-"}</span>
                  <span><strong>Complemento:</strong> {item.complement || "-"}</span>
                </div>
                <button
                  className={Style.selectBtn}
                  onClick={() => setSelectedExamId(item.idReq)}
                >
                  {selectedExamId === item.idReq ? "Selecionado ✅" : "Selecionar"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Upload */}
        <div className={Style.uploadArea}>
          <input type="file" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
          <button
            className={Style.btnFull}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar devolução"}
          </button>
        </div>

        {message && <p className={Style.message}>{message}</p>}

        <button className={Style.btnClose} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
