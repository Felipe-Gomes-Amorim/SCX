import axios from "axios";
import API_URL from "../apiConfig.js";

/**
 * Cadastra uma nova clínica no sistema.
 * @param {Object} clinicaData - Dados da clínica.
 * @returns {Object} Resultado da requisição.
 */
export async function cadastrarClinica(clinicaData) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/clinic/create`,
      clinicaData,
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
    console.error(
      "Erro ao cadastrar clínica:",
      error.response?.data || error.message
    );

    let message = "Erro inesperado ao cadastrar clínica.";

    if (error.response?.data) {
      const backendMessage = error.response.data.toString().toLowerCase();

      // 🔍 CNPJ duplicado
      if (backendMessage.includes("cnpj") && backendMessage.includes("cadastrado")) {
        message = "Este CNPJ já está cadastrado no sistema.";
      }

      // 🔍 Telefone duplicado
      if (backendMessage.includes("telefone") && backendMessage.includes("cadastrado")) {
        message = "Este telefone já está cadastrado no sistema.";
      }

      // 🔍 Email duplicado (caso backend retorne isso para clínica)
      if (backendMessage.includes("email") && backendMessage.includes("cadastrado")) {
        message = "Este e-mail já está cadastrado no sistema.";
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
