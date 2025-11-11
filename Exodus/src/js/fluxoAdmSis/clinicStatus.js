import axios from "axios";
import API_URL from "../apiConfig.js";

/**
 * Função genérica para ativar ou desativar clínicas
 * @param {string} cnpj - CNPJ da clínica
 * @param {string} action - 'enable' ou 'disable'
 * @param {string} token - JWT
 * @param {Function} [setLoadingId] - Função opcional para controle de loading
 * @param {Function} [setDados] - Função opcional para atualizar a lista local
 */
export async function toggleClinicStatus(cnpj, action, token, setLoadingId, setDados) {
  const route =
    action === "enable"
      ? `${API_URL}/adminSystem/enableClinic`
      : `${API_URL}/adminSystem/disableClinic`;

  try {
    if (setLoadingId) setLoadingId(cnpj);

    const response = await axios.patch(
      route,
      { cnpj },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Clínica ${action === "enable" ? "ativada" : "desativada"}:`, response.data);

    // Atualiza a lista local instantaneamente
    if (setDados) {
      setDados((prevClinicas) =>
        prevClinicas.map((clinica) =>
          clinica.cnpj === cnpj
            ? {
                ...clinica,
                status: action === "enable" ? "Ativo" : "Inativo",
              }
            : clinica
        )
      );
    }

    return {
      success: true,
      message:
        action === "enable"
          ? "Clínica ativada com sucesso!"
          : "Clínica desativada com sucesso!",
    };
  } catch (error) {
    console.error(`❌ Erro ao ${action} clínica:`, error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        `Erro ao ${action === "enable" ? "ativar" : "desativar"} clínica.`,
    };
  } finally {
    if (setLoadingId) setLoadingId(null);
  }
}
