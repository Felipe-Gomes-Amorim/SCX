import axios from "axios";
import API_URL from "../apiConfig";

/**
 * Função genérica para ativar ou desativar administradores de clínica
 * @param {string} email - email do administrador
 * @param {string} action - 'enable' ou 'disable'
 * @param {string} token - JWT
 */
export async function admClinicAction(Email, action, token) {
  const route =
    action === "enable"
      ? `${API_URL}/adminSystem/enableAdmCli`
      : `${API_URL}/adminSystem/disableAdmCli`;

  try {
    const response = await axios.patch(
      route,
      { Email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(`Administrador ${action === "enable" ? "ativado" : "desativado"}:`, response.data);

    return {
      success: true,
      message:
        action === "enable"
          ? "Administrador ativado com sucesso!"
          : "Administrador desativado com sucesso!",
    };
  } catch (error) {
    console.error(`Erro ao ${action} administrador:`, error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Erro ao ${action === "enable" ? "ativar" : "desativar"} administrador.`,
    };
  }
}
