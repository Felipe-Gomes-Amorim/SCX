import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarLaboratorio(labData, token) {
  try {
    console.info(
      "%c🧪 Cadastrando laboratório...",
      "color: #4DD0E1; font-weight: bold;"
    );

    const response = await axios.post(
      `${API_URL}/laboratory/register`,
      labData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        }
      }
    );

    console.info(
      "%c✅ Laboratório cadastrado com sucesso:",
      "color: #81C784;",
      response.data
    );

    return {
      success: true,
      message: "Laboratório cadastrado com sucesso.",
      data: response.data,
    };

  } catch (error) {
    console.error(
      "%c❌ Erro ao cadastrar laboratório:",
      "color: #E57373; font-weight: bold;",
      error
    );

    let message = "Erro inesperado ao cadastrar o laboratório.";

    if (error.response?.data) {
      const backendMessage = error.response.data.toString().toLowerCase();

     
      if (backendMessage.includes("cnpj") && backendMessage.includes("cadastrado")) {
        message = "Este CNPJ já está cadastrado no sistema.";
      }

      if (backendMessage.includes("telefone") && backendMessage.includes("cadastrado")) {
        message = "Este telefone já está cadastrado.";
      }

      if (backendMessage.includes("endereço") && backendMessage.includes("inválido")) {
        message = "O endereço informado é inválido.";
      }
    }

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
