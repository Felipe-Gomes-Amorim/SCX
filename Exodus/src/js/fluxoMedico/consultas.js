import axios from "axios";

const API_BASE = "http://localhost:8080/doctor";


// 🔹 Busca a consulta atual do médico
export async function buscarConsultaAtual(token) {
    try {
        const response = await axios.get(`${API_BASE}/getAppointmentOpen`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });

        console.log("📦 Consulta atual retornada:", response.data);

        if (response.data) {
            return { success: true, data: response.data };
        } else {
            console.log("💤 Nenhuma consulta ativa no momento.");
            return { success: false, data: null, message: "Nenhuma consulta ativa." };
        }
    } catch (error) {
        console.error("⚠️ Erro ao buscar consulta atual:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
}

// 🔹 Encerra a consulta atual
export async function encerrarConsulta(token) {
    try {
    const response = await axios.patch(
      `${API_BASE}/closeAppointment`,
      {}, // corpo vazio (se o endpoint não precisa de body)
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

        console.log("✅ Consulta encerrada com sucesso:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("❌ Erro ao encerrar consulta:", error);

        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
}
