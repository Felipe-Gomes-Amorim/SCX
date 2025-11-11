import axios from "axios";
import API_URL from "./apiConfig.js";

/**
 * Verifica se a clínica ou laboratório vinculado ao usuário está ativo.
 * Caso esteja inativo, retorna false (para que o front saiba deslogar o usuário).
 *
 * @param {string} roleName - Nome do papel do usuário (ex: "Secretary", "LaboratoryAdmin")
 * @param {string} token - Token JWT do usuário logado
 * @returns {Promise<boolean>} true se tudo ativo, false se estiver inativo ou houver erro
 */
export async function verificarStatusInstituicao(roleName, token) {
    try {
        if (["LaboratoryUser", "LaboratoryAdmin"].includes(roleName)) {
            const labActiveRes = await axios.get(`${API_URL}/laboratory/getLabActive`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return labActiveRes.data === true;
        }

        if (["Secretary", "Admin"].includes(roleName)) {
            const clinicActiveRes = await axios.get(`${API_URL}/clinic/getCliActive`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return clinicActiveRes.data === true;
        }

        // Para outras roles não há checagem
        return true;
    } catch (error) {
        console.error("Erro ao verificar status da instituição:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.config?.headers,
        });
        return false;
    }
}
