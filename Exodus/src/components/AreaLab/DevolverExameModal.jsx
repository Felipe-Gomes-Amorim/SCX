import React, { useRef, useState } from "react";
import Style from "../../home/home.module.css";
import { devolverExame } from "../../js/fluxoLaboratorio/devolverExame.js";
import { useToast } from "../../context/ToastProvider.jsx"; 

export default function DevolverExameModal({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [examCode, setExamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast(); 

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!examCode.trim()) {
      showToast("Digite o código da requisição.", "error");
      return;
    }

    if (!selectedFile) {
      showToast("Selecione um arquivo para enviar.", "error");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const result = await devolverExame(selectedFile, examCode.trim(), token);

      if (result.success) {
        showToast("Exame devolvido com sucesso!", "success");
        setSelectedFile(null);
        setExamCode("");
      } else {
        showToast(`Erro: ${result.message || "Falha ao enviar exame."}`, "error");
      }
    } catch (err) {
      showToast("Erro inesperado ao enviar o exame.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.overlay}>
      <div className={Style.customPopupCard}>
        <h3 className={Style.popupTitle}>Devolver Exame</h3>

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
            <label>Arquivo do exame:</label>
            <div className={Style.uploadRow}>
              <button
                type="button"
                className={Style.saveBtn}
                onClick={handleBrowseClick}
              >
                Selecionar arquivo
              </button>
              <span className={Style.fileName}>
                {selectedFile ? selectedFile.name : "Nenhum arquivo selecionado"}
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png"
              style={{ display: "none" }}
            />
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
