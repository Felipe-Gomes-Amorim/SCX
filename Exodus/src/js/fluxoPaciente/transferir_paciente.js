import axios from "axios";
import API_URL from "../apiConfig.js";
const token = localStorage.getItem("token");

// Método principal (dados vêm do form / token armazenado no localStorage)
export async function transferirPaciente(patData) {
  try {
    // 📤 Rota de transferência do laboratório
    const response = await axios.post(
      `${API_URL}/secretary/transferPat`,
      patData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.log("Resposta do servidor (transferência de paciente):", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("❌ Erro ao transferir paciente:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
