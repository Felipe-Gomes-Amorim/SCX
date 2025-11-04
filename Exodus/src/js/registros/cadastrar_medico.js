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

    return {
      success: false,
      message: error.response?.data?.message || "Erro inesperado ao cadastrar o médico.",
      error,
    };
  }
}
