import axios from "axios";
import API_URL from "../apiConfig.js";

const updateRoutes = {
  Patient: `${API_URL}/auth/updatePat`,
  Doctor: `${API_URL}/auth/updateDoc`,
  Secretary: `${API_URL}/auth/updateSecretary`,
  Admin: `${API_URL}/auth/updateAdmin`,
};

/**
 * Atualiza o perfil do usuário com base na função.
 * @param {string} role - Papel do usuário (Admin, Doctor, Patient, Secretary)
 * @param {object} data - Dados a serem atualizados
 * @param {string} token - Token JWT do usuário
 */
export async function updateProfile(role, data, token) {
  const route = updateRoutes[role];
  if (!route) {
    throw new Error(`Rota não encontrada para o papel: ${role}`);
  }
  
  console.log(role, data, token)
  try {
    const response = await axios.patch(route,  data  , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Resposta da atualização:", response.data);
    return {
      success: true,
      data: response.data,
 
      message: "Perfil atualizado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Erro ao atualizar perfil.",
    };
  }
}
