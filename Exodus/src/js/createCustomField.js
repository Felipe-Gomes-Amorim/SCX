import axios from "axios";
import API_URL from "./apiConfig.js"; // usa a variável centralizada

export async function createCustomField(nomeCampo, valorCampo, token) {
  try {
    const response = await axios.post(
      `${API_URL}/createCustomField`,
      { name: nomeCampo, value: valorCampo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data };
  } catch (err) {
    console.error("Erro ao criar campo personalizado:", err);
    return { success: false, message: err.response?.data?.message || err.message };
  }
}
