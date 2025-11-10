import axios from "axios";
import API_URL from "../apiConfig.js";

export async function verificarLaboratorio(cnpj, token) {
  try {
    // 1️⃣ Verifica se o laboratório existe no sistema
    const response = await axios.post(`${API_URL}/admin/verificLabExists`, { cnpj },
      { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
    );
    console.log(response.data)
    if (response.data === true) {
      // 2️⃣ Verifica se já está vinculado à clínica
      const response2 = await axios.post(
        `${API_URL}/admin/verificLabCli`,
        { cnpj },
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );

      if (response2.data === true) {
        return { status: "jaCadastrado", message: "Laboratório já está vinculado à clínica." };
      } else {
        return { status: "transferivel", message: "Laboratório existe no sistema, mas não está vinculado à clínica." };
      }
    } else {
      return { status: "novo", message: "Laboratório não existe no sistema. Precisa ser cadastrado." };
    }
  } catch (error) {
    console.error("❌ Erro ao verificar laboratório:", error);
    return { status: "erro", message: error.response?.data?.message || error.message };
  }
}
