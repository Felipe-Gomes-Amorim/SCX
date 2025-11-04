import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarSuporte() {
  try {
    console.info(
      "%c🆕 Cadastrando suporte no sistema...",
      "color: #4DD0E1; font-weight: bold;"
    );

    const response = await axios.post(
      `${API_URL}/support/registerUser`,
    );

    console.info(
      "%c✅ Suporte cadastrado com sucesso:",
      "color: #81C784;",
      response.data
    );

    return {
      success: true,
      message: "Suporte cadastrado no sistema com sucesso.",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "%c❌ Erro ao cadastrar suporte:",
      "color: #E57373; font-weight: bold;",
      error
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Erro inesperado ao cadastrar a suporte.",
      error,
    };
  }
}
