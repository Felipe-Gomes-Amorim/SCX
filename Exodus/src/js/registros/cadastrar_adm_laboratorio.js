import axios from "axios";
import API_URL from "../apiConfig.js";

export async function cadastrarAdmLaboratorio(admData, token) {
  try {
    console.info(
      "%c🧑‍💼 Cadastrando administrador do laboratório...",
      "color: #4DD0E1; font-weight: bold;"
    );

    const response = await axios.post(
      `${API_URL}/laboratory/register/Adm`,
      admData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        }
      }
    );

    console.info(
      "%c✅ Administrador cadastrado com sucesso:",
      "color: #81C784;",
      response.data
    );

    return {
      success: true,
      message: "Administrador do laboratório cadastrado com sucesso.",
      data: response.data,
    };

  } catch (error) {
    console.error(
      "%c❌ Erro ao cadastrar ADM do laboratório:",
      "color: #E57373; font-weight: bold;",
      error
    );

    let message = "Erro inesperado ao cadastrar o administrador.";

    if (error.response?.data) {
      const backendMessage = error.response.data.toString().toLowerCase();

    
      if (backendMessage.includes("email") && backendMessage.includes("cadastrado")) {
        message = "Este e-mail já está cadastrado para outro administrador.";
      }

      if (backendMessage.includes("nome") && backendMessage.includes("inválido")) {
        message = "O nome informado é inválido.";
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
