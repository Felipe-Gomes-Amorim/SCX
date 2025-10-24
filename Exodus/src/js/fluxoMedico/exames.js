import axios from "axios";

const API_BASE = "http://localhost:8080/doctor";
const token = localStorage.getItem("token");

// 🔹 Requisita um novo exame para o paciente atual
export async function requisitarExame({ paciente }) {
  try {
    const payload = { paciente };

    console.log("📤 Enviando requisição de exame:", payload);

    const response = await axios.post(`${API_BASE}/requisitarExame`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Exame requisitado com sucesso:", response.data);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Erro ao requisitar exame:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
