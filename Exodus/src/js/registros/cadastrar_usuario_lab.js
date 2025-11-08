import axios from "axios";
import API_URL from "../apiConfig.js";

// Método principal (data virá do componente RegisterLabUser.jsx / token vem do localStorage)
export async function cadastrarUsuarioLab(userData, token) {
  try {
    // Envia requisição POST para o endpoint correto
    const response = await axios.post(`${API_URL}/laboratory/register/User`, userData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    // Log para depuração (pode remover depois)
    console.log("Resposta do servidor (Usuário Lab):", response.data);

    // Retorna sucesso com os dados recebidos
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Log de erro mais detalhado
    console.error(
      "Erro ao cadastrar usuário do laboratório:",
      error.response?.data || error.message
    );

    // Retorna falha com a mensagem adequada
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
