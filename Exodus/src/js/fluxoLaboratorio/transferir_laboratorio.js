import axios from "axios";
const token = localStorage.getItem("token");

// Método principal (dados vêm do form / token armazenado no localStorage)
export async function transferirLaboratorio(labData) {
  try {
    // 📤 Rota de transferência do laboratório
    const response = await axios.post(
      "http://localhost:8080/laboratory/transferLaboratory",
      labData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.log("Resposta do servidor (transferência de laboratório):", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("❌ Erro ao transferir laboratório:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
