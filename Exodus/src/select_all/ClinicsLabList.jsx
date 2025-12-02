import React, { useEffect, useState } from "react";
import Style from "./ExamsRequests.module.css";
import { mostrar_todos } from "../js/mostrar_todos.js";
import API_URL from "../js/apiConfig.js";
import { updateExamRequest } from "../js/fluxoLaboratorio/editarExames.js";
import { useToast } from "../context/ToastProvider.jsx";

import SelecionarTipoExameModal from "../components/AreaLab/SelecionarTipoExame.jsx";


// modalData = { file, fileName, examType }

export default function ClinicsLabList() {
  const [abaAtiva, setAbaAtiva] = useState("clinics"); // clinics | exams

  const [dadosClinicas, setDadosClinicas] = useState([]);
  const [dadosExames, setDadosExames] = useState([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  const getBaseName = (fileName) => fileName.split("_")[0];

  const { showToast } = useToast();
  const [modalData, setModalData] = useState(null);

  async function handleFileEdit(file, fileName, examType) {
    if (!file) return;

    try {
      showToast("Atualizando arquivo...", "info");
      await updateExamRequest(token, file, fileName, examType);
      showToast("Arquivo atualizado com sucesso!", "success");

      // Recarregar automaticamente
      setAbaAtiva("exams");
    } catch (err) {
      console.error(err);
      showToast("Erro ao atualizar exame.", "error");
    }
  }



  // ============================
  // 🔁 Carregar dados conforme a aba
  // ============================
  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro(null);

      try {
        if (abaAtiva === "clinics") {
          const data = await mostrar_todos("allClinicsLab", token);
          setDadosClinicas(data || []);
        } else {
          const data = await mostrar_todos("examsLab", token);
          console.log(data);
          setDadosExames(data || []);
        }
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [abaAtiva, token]);

  // ============================
  // 🔎 Filtros
  // ============================

  const filteredClinics = dadosClinicas.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(termo) ||
      item.cnpj?.toLowerCase().includes(termo)
    );
  });

  const filteredExams = dadosExames.filter((item) => {
    const termo = searchTerm.toLowerCase();
    return (
      item.fileName?.toLowerCase().includes(termo)
    );
  });


  const getSafeHash = (fileName) => {
    if (!fileName) return "";
    const parts = fileName.split("_");
    if (parts.length < 2) return "";

    const lastPart = parts[parts.length - 1];
    const hash = lastPart.replace(".pdf", "");

    if (hash.length <= 6) return hash;

    const midStart = Math.floor((hash.length - 6) / 2);
    return hash.substring(midStart, midStart + 6);
  };


  return (
    <>


      {/* ============================ 
           ABAS 
      ============================ */}
      <div className={Style.tabHeader}>
        <h3
          className={`${Style.title} ${abaAtiva === "clinics" ? Style.activeTab : ""}`}
          onClick={() => setAbaAtiva("clinics")}
        >
          Clínicas vinculadas
        </h3>

        <h3
          className={`${Style.title} ${abaAtiva === "exams" ? Style.activeTab : ""}`}
          onClick={() => setAbaAtiva("exams")}
        >
          Exames devolvidos
        </h3>
      </div>

      {/* ============================ 
           BUSCA 
      ============================ */}
      <div className={Style.searchBox}>
        <input
          type="text"
          placeholder={
            abaAtiva === "clinics"
              ? "Pesquisar por nome ou CNPJ..."
              : "Pesquisar por paciente, exame ou ID..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Style.searchInput}
        />
      </div>

      {/* ============================ 
           CONTEÚDO 
      ============================ */}
      {carregando ? (
        <p className={Style.info}>Carregando...</p>
      ) : erro ? (
        <p className={Style.error}>{erro}</p>
      ) : abaAtiva === "clinics" ? (
        // ============================
        // LISTA DE CLÍNICAS
        // ============================
        filteredClinics.length > 0 ? (
          <div className={Style.listContainer}>
            {filteredClinics.map((item) => (
              <div key={item.id} className={Style.card}>
                <p>
                  <strong>Nome:</strong> {item.name}
                </p>
                <p>
                  <strong>CNPJ:</strong> {item.cnpj} 
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className={Style.info}>Nenhuma clínica encontrada.</p>
        )
      ) : (
        // ============================
        // LISTA DE EXAMES DEVOLVIDOS
        // ============================
        filteredExams.length > 0 ? (
          <div className={Style.listContainer}>
            {filteredExams.map((item, index) => (
              <div key={index} className={Style.card}>

                {/* ESQUERDA (nome do arquivo) */}
                <span>
                  <strong>Arquivo:</strong>{" "}
                  {item.fileName
                    ? `${item.fileName.split("_")[0]} (${getSafeHash(item.fileName)})`
                    : "Nome não disponível"}
                </span>

                {/* DIREITA (botões) */}
                <div className={Style.actions}>

                  {/* Botão editar */}
                  <button
                    className={Style.editBtn}
                    onClick={() => document.getElementById(`fileInput-${index}`).click()}
                  >
                    Editar arquivo
                  </button>

                  {/* Input invisível */}
                  <input
                    id={`fileInput-${index}`}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      // Abre o modal pedindo o tipo
                      setModalData({
                        file,
                        fileName: item.fileName,
                      });
                    }}

                  />

                  {/* Botão abrir */}
                  <a
                    href={`${API_URL}/files/preview/${item.fileName}`}
                    target="_blank"
                    rel="noreferrer"
                    className={Style.downloadBtn}
                  >
                    Abrir
                  </a>

                </div>

              </div>

            ))}

          </div>
        ) : (
          <p className={Style.info}>Nenhum exame encontrado.</p>
        )



      )}

      {modalData && (
        <SelecionarTipoExameModal
          file={modalData.file}
          onClose={() => setModalData(null)}
          onConfirm={(tipoSelecionado) => {
            handleFileEdit(
              modalData.file,
              modalData.fileName,
              tipoSelecionado
            );
            setModalData(null);
          }}
        />
      )}

    </>
  );
}
