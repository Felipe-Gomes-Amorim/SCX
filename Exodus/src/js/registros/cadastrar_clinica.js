import axios from "axios";
import API_URL from "../apiConfig.js";
const authToken = localStorage.getItem("token");

/**
 * Cadastra uma nova clínica no sistema.
 * @param {Object} clinicaData - Dados da clínica.
 * @returns {Object} Resultado da requisição.
 */
export async function cadastrarClinica(clinicaData) {
  try {
    const response = await axios.post(`${API_URL}/clinic/create`, clinicaData,
      {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
      }

    );

    console.log("Resposta do servidor:", response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Erro ao cadastrar clinica:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
