import axios from "axios";

/**
 * Cadastra uma nova clínica no sistema.
 * @param {Object} clinicaData - Dados da clínica.
 * @returns {Object} Resultado da requisição.
 */
export async function cadastrarClinica(clinicaData) {
  try {
    const response = await axios.post("http://localhost:8080/clinic/create", clinicaData);

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
