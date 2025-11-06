import axios from "axios";
import API_URL from "../apiConfig.js";

// 🔹 Função principal: salvar a anamnese
export async function salvarAnamneseAPI(token, anamneseData) {
  try {
    const response = await axios.post(
      `${API_URL}/doctor/registerAnamnese`,
      anamneseData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Anamnese salva:", response.data);
    return { success: true, data: response.data };

  } catch (error) {
    console.error("❌ Erro ao salvar anamnese:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}

// 🔹 Envia lista de campos customizados (CustomFieldDTO)
export async function enviarCustomFieldsAPI(token, customFields) {
  if (!Array.isArray(customFields) || customFields.length === 0) {
    console.log("⚪ Nenhum campo customizado para enviar.");
    return { success: true, message: "Sem campos extras." };
  }

  try {
    const response = await axios.post(
      `${API_URL}/doctor/createCustomField`,
      customFields,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Campos customizados enviados:", response.data);
    return { success: true, data: response.data };

  } catch (error) {
    console.error("❌ Erro ao enviar campos customizados:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
}
