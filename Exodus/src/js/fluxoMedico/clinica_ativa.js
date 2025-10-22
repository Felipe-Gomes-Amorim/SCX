import axios from "axios";

const API_BASE = "http://localhost:8080/doctor";


// 🔹 Define a clínica ativa do médico
export async function ativarClinica(clinica) {
  try {
    const response = await axios.post(
      `${API_BASE}/updateClinicDocPresent`,
      { name: clinica },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.log("✅ Clínica ativada com sucesso:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Erro ao ativar clínica:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

// 🔹 Busca a clínica ativa atual
export async function buscarClinicaAtiva(token) {
  try {
    const response = await axios.get(`${API_BASE}/getClinicActive`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    console.log("🏥 Clínica ativa obtida:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("⚠️ Erro ao buscar clínica ativa:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
