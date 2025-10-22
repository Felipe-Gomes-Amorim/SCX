import axios from "axios";

export async function verificarMedico(crm, token) {
  try {
    // 1️⃣ Verifica se o médico existe no sistema
    const response = await axios.post("http://localhost:8080/doctor/getByCrm", { crm });

    if (response.data === true) {
      // 2️⃣ Verifica se já está vinculado à clínica
      const response2 = await axios.post(
        "http://localhost:8080/doctor/searchDoc",
        { crm },
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );

      if (response2.data === true) {
        return { status: "jaCadastrado", message: "Médico já está vinculado à clínica." };
      } else {
        return { status: "transferivel", message: "Médico existe no sistema, mas não na clínica." };
      }
    } else {
      return { status: "novo", message: "Médico não existe no sistema. Precisa ser cadastrado." };
    }
  } catch (error) {
    console.error("❌ Erro ao verificar médico:", error);
    return { status: "erro", message: error.response?.data?.message || error.message };
  }
}
