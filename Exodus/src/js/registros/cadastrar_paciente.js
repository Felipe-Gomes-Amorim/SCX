import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarPaciente(pacienteData, token) {
  try {
    const response = await axios.post(
      `${API_URL}/secretary/registerPatient`,
      pacienteData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.log("Resposta do servidor:", response.data);

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error.response?.data || error.message);

    let message = "Erro inesperado ao cadastrar o paciente.";

    // Se o backend mandou mensagem clara
    if (error.response?.data) {
      const backendMessage = error.response.data.toString().toLowerCase();

      // 🔍 Identifica duplicidade de email
      if (backendMessage.includes("email") && backendMessage.includes("cadastrado")) {
        message = "Este e-mail já está cadastrado no sistema.";
      }

      // 🔍 Identifica duplicidade de CPF
      if (backendMessage.includes("cpf") && backendMessage.includes("cadastrado")) {
        message = "Este CPF já está cadastrado no sistema.";
      }

      // 🔍 Se futuramente adicionar telefone no paciente
      if (backendMessage.includes("telefone") && backendMessage.includes("cadastrado")) {
        message = "Este telefone já está cadastrado no sistema.";
      }
    }

    // Tratamento universal para conflito
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
