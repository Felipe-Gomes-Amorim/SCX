import axios from "axios";
/**
 * Valida um CNPJ através da rota /getCnpj.
 * Retorna o status da empresa e outros dados.
 * @param {string} cnpj - CNPJ limpo (apenas números)
 * @returns {Object} { valido: boolean, situacao?: string, data?: any }
 */
export async function validarCnpj(cnpj) {
  
  try {
    const response = await axios.post(
      "http://localhost:8080/consult/getCnpj",
      { cnpj: cnpj },
      { headers: { "Content-Type": "application/json" } }
    );
    
    const situacao = response.data?.situacao?.toLowerCase();

    if (situacao === "ativa" || situacao === "ativo") {
      return { valido: true, situacao };
    } else {
      return { valido: false, situacao: situacao || "desconhecida" };
    }
  } catch (error) {
    console.error("Erro ao validar CNPJ:", error.response?.data || error.message);
    return { valido: false, situacao: "erro" };
  }
}
