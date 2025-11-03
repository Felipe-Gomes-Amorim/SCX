import axios from "axios";

export async function profilePatient() {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:8080/auth/getProfilePatient", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Patient:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar perfil do Paciente:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}
