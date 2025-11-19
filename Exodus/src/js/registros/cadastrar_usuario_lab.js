import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarUsuarioLab(userData, token) {
  try {
    console.info(
      "%c👤 Cadastrando usuário do laboratório...",
      "color: #4DD0E1; font-weight: bold;"
    );

    const response = await axios.post(
      `${API_URL}/laboratory/register/User`,
      userData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.info(
      "%c✅ Usuário do laboratório cadastrado com sucesso:",
      "color: #81C784;",
      response.data
    );

    return {
      success: true,
      message: "Usuário do laboratório cadastrado com sucesso.",
      data: response.data,
    };

  } catch (error) {
    console.error(
      "%c❌ Erro ao cadastrar usuário do laboratório:",
      "color: #E57373; font-weight: bold;",
      error
    );

    let message = "Erro inesperado ao cadastrar o usuário.";

    // Se veio mensagem do backend, analisar
    if (error.response?.data) {
      const backendMessage = error.response.data.toString().toLowerCase();

      // 👇 Tratativas comuns do backend
      if (backendMessage.includes("email") && backendMessage.includes("cadastrado")) {
        message = "Este e-mail já está em uso por outro usuário.";
      }

      if (backendMessage.includes("nome") && backendMessage.includes("inválido")) {
        message = "O nome informado é inválido.";
      }
    }

    // Tratativa universal para código 409 (conflito de dados)
    if (error.response?.status === 409) {
      message = message || "Dados já cadastrados no sistema.";
    }

    return {
      success: false,
      message,
      error,
    };
  }
}
