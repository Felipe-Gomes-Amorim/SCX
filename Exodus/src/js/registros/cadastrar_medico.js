import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarMedico(medicoData, token) {
  try {
    console.info("%c🆕 Cadastrando médico no sistema...", "color: #4DD0E1; font-weight: bold;");

    const response = await axios.post(
      `${API_URL}/doctor/register`,
      medicoData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.info("%c✅ Médico cadastrado com sucesso:", "color: #81C784;", response.data);

    return {
      success: true,
      message: "Médico cadastrado no sistema com sucesso.",
      data: response.data,
    };

  } catch (error) {
    console.error("%c❌ Erro ao cadastrar médico:", "color: #E57373; font-weight: bold;", error);

    let message = "Erro inesperado ao cadastrar o médico.";

    // Se o backend mandou uma mensagem, usa
    if (error.response?.data) {
      const backendMessage = error.response.data.toString().toLowerCase();

      // 👇 Tratativas baseadas no texto vindo do backend
      if (backendMessage.includes("email") && backendMessage.includes("cadastrado")) {
        message = "Este e-mail já está em uso por outro usuário.";
      }

      if (backendMessage.includes("telefone") && backendMessage.includes("cadastrado")) {
        message = "Este telefone já está cadastrado no sistema.";
      }

      if (backendMessage.includes("crm") && backendMessage.includes("cadastrado")) {
        message = "Este CRM já está cadastrado no sistema.";
      }
    }

    // 👇 Tratativa universal para código 409 sem texto claro
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
