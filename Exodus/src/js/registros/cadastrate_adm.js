import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarAdm(admData) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/clinic/firstAdm`,
      admData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.log("Resposta do servidor (ADM):", response.data);

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {
    console.error(
      "Erro ao cadastrar ADM:",
      error.response?.data || error.message
    );

    let message = "Erro inesperado ao cadastrar administrador.";

    if (error.response?.data) {
      const backendMessage = error.response.data.toString().toLowerCase();

    
      if (backendMessage.includes("email") && backendMessage.includes("cadastrado")) {
        message = "Este e-mail já está cadastrado no sistema.";
      }

     
      if (backendMessage.includes("cnpj") && backendMessage.includes("cadastrado")) {
        message = "Este CNPJ já possui um administrador cadastrado.";
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
