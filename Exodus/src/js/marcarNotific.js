import axios from "axios";
import API_URL from "./apiConfig.js";

export async function marcarComoLida(notificacaoId, token) {
  if(token === null || token === undefined) {
    token = localStorage.getItem("token");
  }
  try {
    const response = await axios.patch(
      `${API_URL}/notification/markRead`,
      { id: notificacaoId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (err) {
    console.error("Erro na função marcarComoLida:", err);
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}
