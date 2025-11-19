import React, { useState, useRef, useEffect } from "react";
import Style from "../../home/home.module.css";
import { devolverExame } from "../../js/fluxoLaboratorio/devolverExame.js";
import { buscarTiposExame } from "../../js/fluxoMedico/exames.js";
import { useToast } from "../../context/ToastProvider.jsx";

export default function DevolverExameModal({ onClose }) {
  const [filesData, setFilesData] = useState([]); 
  const [tiposExame, setTiposExame] = useState([]);
  const [loadingTipos, setLoadingTipos] = useState(true);

  const [examCode, setExamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  // 🔹 Buscar tipos de exame ao montar
  useEffect(() => {
    const carregarTipos = async () => {
      try {
        const lista = await buscarTiposExame();
        setTiposExame(lista.data || []);
      } catch (err) {
        showToast("Erro ao buscar tipos de exame", "error");
      } finally {
        setLoadingTipos(false);
      }
    };
    carregarTipos();
  }, [showToast]);

  // 🔹 Adiciona arquivos e cria objeto com campo examType
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfs = files.filter((f) => f.type === "application/pdf");

    if (pdfs.length !== files.length) {
      showToast("Apenas arquivos PDF são permitidos.", "error");
    }

    const novos = pdfs.map((file) => ({
      file,
      examType: "", // ainda não selecionado
    }));

    setFilesData((prev) => [...prev, ...novos]);
    e.target.value = null;
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // 🔹 Atualiza examType do item
  const handleChangeExamType = (index, value) => {
    const copia = [...filesData];
    copia[index].examType = value;
    setFilesData(copia);
  };

  const handleRemoveFile = (index) => {
    setFilesData((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Enviar arquivos + examTypes para o backend
  const handleSubmit = async () => {
    if (!examCode.trim()) {
      showToast("Digite o código da requisição.", "error");
      return;
    }

    if (filesData.length === 0) {
      showToast("Selecione ao menos um arquivo.", "error");
      return;
    }

    // Verificar se todos têm examType
    if (filesData.some((f) => !f.examType)) {
      showToast("Selecione o tipo de exame para todos os arquivos.", "error");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const result = await devolverExame(
        filesData, // envia já no formato com file + examType
        examCode.trim(),
        token
      );

      if (result.success) {
        showToast("Exames devolvidos com sucesso!", "success");
        window.location.reload();
      } else {
        showToast(result.message || "Erro ao enviar exame.", "error");
      }
    } catch (err) {
      showToast("Erro inesperado ao enviar.", "error");
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
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
              placeholder="Ex: REQ12345"
              className={Style.popupInput}
            />
          </label>

          <div className={Style.uploadWrapper}>
            <label>Arquivos do exame:</label>

            <div className={Style.uploadRow}>
              <button type="button" onClick={handleBrowseClick} className={Style.saveBtn}>
                Selecionar arquivos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Lista com select de tipo */}
            {filesData.length > 0 && (
              <ul className={Style.fileList}>
                {filesData.map((entry, index) => (
                  <li key={index} className={Style.fileItem}>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                      <strong>{entry.file.name}</strong>

                      {/* Selecionar tipo */}
                      {loadingTipos ? (
                        <p>Carregando tipos...</p>
                      ) : (
                        <select
                          value={entry.examType}
                          onChange={(e) => handleChangeExamType(index, e.target.value)}
                          className={Style.popupInput}
                          required
                        >
                          <option value="">Selecione o tipo do exame</option>
                          {tiposExame.map((t) => (
                            <option key={t.name} value={t.name}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

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
          <button className={Style.btn} onClick={handleSubmit} disabled={loading}>
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
