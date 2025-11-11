import axios from "axios";
import API_URL from "../apiConfig.js";

/**
 * Desativa/anonimiza a conta de um usuário (paciente ou médico)
 * @param {string} role - 'Patient' ou 'Doctor'
 * @param {string} token - JWT do usuário logado
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function deactivateAccount(role, token) {
  const routes = {
    Patient: `${API_URL}/patient/anonimizePat`,
    Doctor: `${API_URL}/doctor/disableDoc`,
  };

  const route = routes[role];
  if (!route) return { success: false, message: "Função não disponível para este tipo de usuário." };

  try {
    const response = await axios.patch(route, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: response.data?.message || "Conta desativada com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao desativar conta:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Erro ao desativar conta.",
    };
  }
}
