import axios from "axios";
import API_URL from "../apiConfig.js";

export async function profileAdm() {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/auth/getProfileAdmin`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Admin:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Erro ao buscar perfil do Médico:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || error.message };
    }
}
