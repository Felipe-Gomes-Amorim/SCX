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
      data: response.data.map(lab => ({ name: lab.name })),
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
      data: response.data.map(exam => ({ name: exam.name })),
    };
  } catch (error) {
    console.error("Erro ao buscar tipos de exame:", error);
    return { success: false };
  }
}

export async function cadastrarRequisicaoExame() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE}/doctor/requestExm`, {}, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao chamar requestExm:", error.response || error);
    return {
      success: false,
      message: error.response?.data?.error || "Erro no servidor.",
    };
  }
}

// 🆕 Nova rota: createExams
export async function criarExames(payload) {
  try {
    const token = localStorage.getItem("token");
    console.log("token passado para criar:", token);
    console.log("payload passado para criar:", payload);
    const response = await axios.post(`${API_BASE}/doctor/createExams`, payload, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error)
    console.error("Erro ao criar exames:", error.response || error);
    return {
      success: false,
      message: error.response?.data?.error || "Erro no servidor ao criar exames.",
    };
  }
}

export async function PDFExame(exameData) {
  try {
    const token = localStorage.getItem("token");
    console.log("Dados do exame para gerar PDF:", exameData);
    console.log("Token para gerar PDF:", token);
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
    console.log("Resposta do PDFExame:", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error)
    console.error("Erro ao gerar PDF:", error.response || error);
    return { success: false, message: "Erro ao gerar PDF" };
  }
}
