import axios from "axios";
import API_URL from "../apiConfig.js";

const API_BASE = "${API_URL}/doctor";


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

// 🔹 Abre uma nova consulta
export async function abrirConsulta(token) {
    try {
        const response = await axios.post(`${API_BASE}/openConsultation`, {}, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });

        console.log("✅ Consulta aberta com sucesso:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("❌ Erro ao abrir consulta:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
}

// 🔹 Encerra a consulta atual
export async function encerrarConsulta(token, patientShouldReturn) {
    try {
        const response = await axios.patch(
            `${API_BASE}/closeConsultation`,
            { patientShouldReturn }, // envia o boolean no body
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