import axios from "axios";

export async function profileSecretary() {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:8080/auth/getProfileSecretary", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Secretary:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar perfil da Secretária:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}
