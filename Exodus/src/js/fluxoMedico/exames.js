import axios from "axios";
import API_URL from "../apiConfig.js";

const API_BASE = `${API_URL}`;

export async function buscarLaboratorios() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE}/doctor/getLabDocCli`, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });

    return {
      success: true,
      data: response.data.map(lab => ({ name: lab.name })), // adapta para o DynamicForm
    };
  } catch (error) {
    console.error("Erro ao buscar laboratórios:", error);
    return { success: false };
  }
}

export async function buscarTiposExame() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE}/doctor/getExamsType`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    return {
      success: true,
      data: response.data.map(exam => ({ name: exam.name })), // garante compatibilidade
    };
  } catch (error) {
    console.error("Erro ao buscar tipos de exame:", error);
    return { success: false };
  }
}

export async function cadastrarRequisicaoExame(exameData) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE}/doctor/requestExm`, exameData, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao cadastrar requisição de exame:", error.response || error);
    return {
      success: false,
      message: error.response?.data?.error || "Erro no servidor.",
    };
  }
}

export async function PDFExame(exameData) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE}/files/examsRequestPDF`,
      exameData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        responseType: "arraybuffer",
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao gerar PDF:", error.response || error);
    return { success: false, message: "Erro ao gerar PDF" };
  }
}
