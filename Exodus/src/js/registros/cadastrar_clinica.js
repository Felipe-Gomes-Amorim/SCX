import axios from "axios";

/**
 * Cadastra uma nova clínica no sistema.
 * @param {Object} clinicaData - Dados da clínica.
 * @returns {Object} Resultado da requisição.
 */
export async function cadastrarClinica(clinicaData) {
  try {
    const response = await axios.post("http://localhost:8080/clinic/create", clinicaData);

    console.log("Resposta do servidor:", response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Erro ao cadastrar clinica:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

/**
 * Busca informações de endereço a partir do CEP.
 * Chama a rota /getCep do backend (que internamente usa ViaCEP).
 * @param {string} cep - CEP no formato '00000-000'
 * @returns {Object|null} Dados do endereço ou null se não encontrado.
 */
export async function buscarCep(cep) {

  try {
    const response = await axios.post(
      "http://localhost:8080/consult/getCep",
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
