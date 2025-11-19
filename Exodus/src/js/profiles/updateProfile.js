import axios from "axios";
import API_URL from "../apiConfig.js";

const updateRoutes = {
  Patient: `${API_URL}/auth/updatePat`,
  Doctor: `${API_URL}/auth/updateDoc`,
  Secretary: `${API_URL}/auth/updateSecretary`,
  Admin: `${API_URL}/auth/updateAdmin`,
};

/**
 * Atualiza o perfil do usuário com base na função.
 * @param {string} role - Papel do usuário (Admin, Doctor, Patient, Secretary)
 * @param {object} data - Dados de atualização
 * @param {string} token - JWT
 */
export async function updateProfile(role, data, token) {
  const route = updateRoutes[role];
  if (!route) {
    throw new Error(`Rota não encontrada para o papel: ${role}`);
  }

  console.info(
    `%c🔄 Atualizando perfil (${role})...`,
    "color: #4DD0E1; font-weight: bold;"
  );

  try {
    const response = await axios.patch(route, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.info(
      "%c✅ Perfil atualizado com sucesso:",
      "color: #81C784;",
      response.data
    );

    return {
      success: true,
      message: "Perfil atualizado com sucesso!",
      data: response.data,
    };

  } catch (error) {
    console.error(
      "%c❌ Erro ao atualizar perfil:",
      "color: #E57373; font-weight: bold;",
      error
    );

    let message = "Erro inesperado ao atualizar o perfil.";

    // Se backend retornou algo, tratar inteligentemente
    if (error.response?.data) {
      const backend = error.response.data.toString().toLowerCase();

      // 🔎 Erros típicos que podem ocorrer
      if (backend.includes("cpf") && backend.includes("cadastrado")) {
        message = "Este CPF já está em uso por outro usuário.";
      }

      if (backend.includes("cpf") && backend.includes("inválido")) {
        message = "O CPF informado é inválido.";
      }

      if (backend.includes("telefone") && backend.includes("cadastrado")) {
        message = "Este telefone já está cadastrado no sistema.";
      }

      if (backend.includes("telefone") && backend.includes("inválido")) {
        message = "O telefone informado é inválido.";
      }

      if (backend.includes("email") && backend.includes("cadastrado")) {
        message = "Este e-mail já está sendo usado por outra conta.";
      }

      if (backend.includes("nome") && backend.includes("inválido")) {
        message = "O nome informado é inválido.";
      }
    }

    // ⚠️ Tratamento universal de conflito
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
