import axios from "axios";
import API_URL from "../apiConfig.js";

const API_BASE = `${API_URL}/secretary/openAppointment`; // endpoint para cadastrar consulta
const DOCS_BASE = `${API_URL}/secretary/getDocsAvailable`; // endpoint para buscar médicos

export async function buscarMedicosDisponiveis(tokenParam) {
  const authToken = tokenParam || localStorage.getItem("token");
  try {
    const response = await axios.get(DOCS_BASE, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : undefined,
      },
    });

    return {
      success: true,
      data: response.data, // espera-se [{ name, email }, ...]
    };
  } catch (error) {
    console.error("Erro ao buscar médicos disponíveis:", error.response || error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Erro desconhecido",
    };
  }
}


export async function cadastrarConsulta(consulta, tokenParam) {
  const authToken = tokenParam || localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_BASE}`,
      consulta,
      {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao cadastrar consulta:", error.response || error);
    console.log(error.response.data.error)
    let message = "CPF do paciente incorreto";

    if (error.response?.data?.error) {
      const backendError = error.response.data?.message;

      // ⚡ detecta erro de CPF inexistente
      if (
        backendError.includes("id_pat") ||
        backendError.includes("valor nulo na coluna") ||
        backendError.includes("null value in column \"id_pat\"")
      ) {
        message = "CPF inválido";
      }
    }

    return {
      success: false,
      message,
    };
  }
}


