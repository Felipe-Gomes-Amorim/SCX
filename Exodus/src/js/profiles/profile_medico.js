import axios from "axios";

export async function profileDoctor() {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:8080/auth/getProfileDoctor", {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Doctor:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Erro ao buscar perfil do Médico:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || error.message };
    }
}
