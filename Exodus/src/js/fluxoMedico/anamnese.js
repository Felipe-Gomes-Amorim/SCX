
import axios from "axios";
import API_URL from "../apiConfig.js";

export async function salvarAnamneseAPI(token, anamneseData) {
  try {
    const response = await axios.post(`${API_URL}/doctor/registerAnamnese`, anamneseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Se o backend respondeu 200, consideramos sucesso
    if (response.status === 200) {
      return { success: true, message: "Anamnese cadastrada com sucesso!" };
    } else {
      return { success: false, message: "Erro ao cadastrar anamnese." };
    }
  } catch (error) {
    console.error("Erro ao salvar anamnese:", error);
    return { success: false, message: "Erro ao salvar anamnese." };
  }
}
