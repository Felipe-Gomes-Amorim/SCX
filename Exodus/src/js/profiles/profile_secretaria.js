import axios from "axios";
import API_URL from "../apiConfig.js";

export async function profileSecretary() {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${API_URL}/auth/getProfileSecretary`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Secretary:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar perfil da Secretária:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}
