import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarSecretaria(secretariaData, token) {
  try {
    console.info(
      "%c🆕 Cadastrando secretária no sistema...",
      "color: #4DD0E1; font-weight: bold;"
    );

    const response = await axios.post(
      `${API_URL}/admin/registerSecretary`,
      secretariaData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.info(
      "%c✅ Secretária cadastrada com sucesso:",
      "color: #81C784;",
      response.data
    );

    return {
      success: true,
      message: "Secretária cadastrada no sistema com sucesso.",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "%c❌ Erro ao cadastrar secretária:",
      "color: #E57373; font-weight: bold;",
      error
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Erro inesperado ao cadastrar a secretária.",
      error,
    };
  }
}
