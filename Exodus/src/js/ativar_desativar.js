import axios from "axios";
import API_URL from "./apiConfig.js";

export async function toggleStatus(tipo, identificador, status, token) {
  const rotas = {
    lab: {
      Ativo: "/admin/disableLaboratory",
      Inativo: "/admin/enableLaboratory",
      bodyKey: "cnpj",
    },
    secretary: {
      Ativo: "/admin/disableSecretary",
      Inativo: "/admin/enableSecretary",
      bodyKey: "Email",
    },
  };

  const tipoInfo = rotas[tipo];
  const rota = tipoInfo?.[status];
  const bodyKey = tipoInfo?.bodyKey;

  if (!rota || !bodyKey) {
    throw new Error(`Tipo ou status inválido: ${tipo} - ${status}`);
  }

  try {
    // Monta o corpo dinâmico da requisição
    const body = { [bodyKey]: identificador };

    const response = await axios.patch(`${API_URL}${rota}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error("Erro na função toggleStatus:", err);
    return {
      success: false,
      message: err.response?.data?.message || err.message,
      status: err.response?.status,
    };
  }
}
