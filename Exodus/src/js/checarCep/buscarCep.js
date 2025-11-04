import axios from "axios";
import API_URL from "../apiConfig.js";

/**
 * Busca informações de endereço a partir do CEP.
 * Chama a rota /getCep do backend (que internamente usa ViaCEP).
 * @param {string} cep - CEP no formato '00000-000'
 * @returns {Object|null} Dados do endereço ou null se não encontrado.
 */
export async function buscarCep(cep) {

  try {
    const response = await axios.post(
      `${API_URL}/consult/getCep`,
      { cep: cep },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data && response.data.cep) {
      return {
        cep: response.data.cep,
        logradouro: response.data.logradouro,
        complemento: response.data.complemento,
        bairro: response.data.bairro,
        localidade: response.data.localidade,
        uf: response.data.uf,
      };
    } else {
      console.warn("CEP não encontrado:", cep);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error.response?.data || error.message);
    return null;
  }
}
