import axios from "axios";
import API_URL from "../apiConfig.js";

const API_BASE = `${API_URL}/doctor`;
const token = localStorage.getItem("token");

// 🔹 Define a clínica ativa do médico
export async function ativarClinica(clinica) {
  console.log("Tipo de clinica:", typeof clinica);
  console.log(clinica)
  try {
    const response = await axios.patch(
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
export async function buscarClinicaAtiva() {
  try {
    const response = await axios.get(`${API_URL}/doctor/getClinicActive`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    
    const data = response.data;

    // Se não houver clínica ativa
    if (data == "Null") {
      console.log("💤 Nenhuma clínica ativa no momento.");
      return { success: true, active: false, clinic: null };
    }

    // Caso tenha clínica
    console.log("🏥 Clínica ativa obtida:", data);
    return { success: true, active: true, clinic: data};
  } catch (error) {
    console.error("⚠️ Erro ao buscar clínica ativa:", error);
    console.log(error)
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
