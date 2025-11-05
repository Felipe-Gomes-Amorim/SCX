import axios from "axios";
import API_URL from "../apiConfig.js";

export async function verificarPaciente(cpf, token) {
  try {
    // 1️⃣ Verifica se o paciente existe no sistema
    const response = await axios.post(`${API_URL}/secretary/verificPatSyst`, { cpf });
    console.log(response.data)
    if (response.data === true) {
      // 2️⃣ Verifica se já está vinculado à clínica
      const response2 = await axios.post(
        `${API_URL}/secretary/verificPatCli`,
        { cpf },
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );

      if (response2.data === true) {
        return { status: "jaCadastrado", message: "Paciente já está vinculado à clínica." };
      } else {
        return { status: "transferivel", message: "Paciente existe no sistema, mas não está vinculado à clínica." };
      }
    } else {
      return { status: "novo", message: "Paciente não existe no sistema. Precisa ser cadastrado." };
    }
  } catch (error) {
    console.error("❌ Erro ao verificar paciente:", error);
    return { status: "erro", message: error.response?.data?.message || error.message };
  }
}
