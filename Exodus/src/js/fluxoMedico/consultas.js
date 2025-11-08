import axios from "axios";
import API_URL from "../apiConfig.js";

const API_BASE = `${API_URL}/doctor`;

// 🔹 Verifica se o médico está em uma consulta (retorna boolean)
export async function verificarConsultaAtiva(token) {
  try {
    const response = await axios.get(`${API_BASE}/verifyDocIsConsult`, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });

    console.log("🔍 Verificação de consulta ativa:", response.data);
    return { success: true, isConsulting: Boolean(response.data) };
  } catch (error) {
    console.error("⚠️ Erro ao verificar consulta ativa:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      isConsulting: false,
    };
  }
}

// 🔹 Busca o atendimento atual do médico
export async function buscarAtendimentoAtual(token) {
  try {
    const response = await axios.get(`${API_BASE}/getAppointmentOpen`, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });

    console.log("📦 Atendimento atual retornado:", response.data);
    return response.data
      ? { success: true, data: response.data }
      : { success: false, data: null, message: "Nenhum atendimento ativo." };
  } catch (error) {
    console.error("⚠️ Erro ao buscar atendimento atual:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}

// 🔹 Abre um novo atendimento
export async function abrirConsulta(token) {
  try {
    const response = await axios.post(
      `${API_BASE}/openConsultation`,
      {},
      { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
    );
    console.log("✅ Consulta aberta com sucesso:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Erro ao abrir consulta:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}

// 🔹 Encerra o atendimento atual
export async function encerrarAtendimento(token, patientShouldReturn, diagnostico, prescricao) {
  try {
    const payload = {
      returns: patientShouldReturn,
      diagnosis: diagnostico || "",
      prescription: prescricao || "",
    };

    const response = await axios.patch(`${API_BASE}/closeConsultation`, payload, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });

    console.log("✅ Atendimento encerrado com sucesso:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Erro ao encerrar atendimento:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}

// 🔹 Busca o diagnóstico de uma consulta específica
export async function buscarDiagnostico(token, idAppointment) {
  try {
    const response = await axios.get(
      `${API_URL}/prontuario/getDiagnostic?id=${idAppointment}`,
      { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
    );

    console.log("🧾 Diagnóstico retornado:", response.data);
    return { success: true, data: response.data, diagnostic: response.data?.diagnostic || "Sem diagnóstico registrado." };
  } catch (error) {
    console.error("❌ Erro ao buscar diagnóstico:", error);
    return { success: false, message: error.response?.data?.message || error.message, diagnostic: "Erro ao carregar diagnóstico." };
  }
}

// 🔹 🔹 NOVO: Busca exames de uma consulta
export async function buscarExamesConsulta(token, idAppointment) {
  
  try {
    const response = await axios.get(`${API_URL}/prontuario/getExams`, {
      params: { id: idAppointment },
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });

    console.log("📦 Exames retornados:", response.data);
    // Espera-se que response.data tenha examsFile: [{ fileName }]
    return { success: true, data: response.data?.ExamsResults || [] };
  } catch (error) {
    console.error("❌ Erro ao buscar exames:", error);
    return { success: false, message: error.response?.data?.message || error.message, data: [] };
  }
}
