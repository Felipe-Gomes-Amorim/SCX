import React, { useState, useRef } from "react";
import Style from "../../home/home.module.css";
import { devolverExame } from "../../js/fluxoLaboratorio/devolverExame.js";
import { useToast } from "../../context/ToastProvider.jsx";

export default function DevolverExameModal({ onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]); // agora é lista
  const [examCode, setExamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Filtra apenas arquivos PDF
    const pdfFiles = files.filter(file => file.type === "application/pdf");

    if (pdfFiles.length !== files.length) {
      showToast("Apenas arquivos PDF são permitidos.", "error");
    }

    // Adiciona só os válidos
    setSelectedFiles(prev => [...prev, ...pdfFiles]);

    // Limpa o input pra permitir reenvio do mesmo arquivo se deletado
    e.target.value = null;
  };


  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Remove um arquivo da lista
  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!examCode.trim()) {
      showToast("Digite o código da requisição.", "error");
      return;
    }

    if (!selectedFiles.length) {
      showToast("Selecione pelo menos um arquivo para enviar.", "error");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const result = await devolverExame(selectedFiles, examCode.trim(), token);

      if (result.success) {
        showToast("Exames devolvidos com sucesso!", "success");
        window.location.reload();
        setSelectedFiles([]);
        setExamCode("");
      } else {
        showToast(`Erro: ${result.message || "Falha ao enviar exames."}`, "error");
      }
    } catch (err) {
      showToast("Erro inesperado ao enviar os exames.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.overlay}>
      <div className={Style.customPopupCard}>
        <h3 className={Style.popupTitle}>Devolver Exames</h3>

        <div className={Style.formGrid}>
          <label>
            Código da requisição:
            <input
              type="text"
              placeholder="Ex: REQ12345"
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
              className={Style.popupInput}
            />
          </label>

          <div className={Style.uploadWrapper}>
            <label>Arquivos do exame:</label>
            <div className={Style.uploadRow}>
              <button
                type="button"
                className={Style.saveBtn}
                onClick={handleBrowseClick}
              >
                Selecionar arquivos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".pdf"
                style={{ display: "none" }}
              />
            </div>

            {/* Lista de arquivos adicionados */}
            {selectedFiles.length > 0 && (
              <ul className={Style.fileList}>
                {selectedFiles.map((file, index) => (
                  <li key={index} className={Style.fileItem}>
                    {file.name}
                    <button
                      type="button"
                      className={Style.removeFileBtn}
                      onClick={() => handleRemoveFile(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={Style.popupButtonsRow}>
          <button
            className={Style.btn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar devolução"}
          </button>
          <button className={Style.edit_btn} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
