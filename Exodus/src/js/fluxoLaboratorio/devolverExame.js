import axios from "axios";
import API_URL from "../apiConfig.js";

export async function devolverExame(filesData, examId, token) {
  try {
    const formData = new FormData();

    // 🔹 Montar estrutura correta para o backend
    filesData.forEach((entry, index) => {
      formData.append(`file[${index}].file`, entry.file);       // PDF
      formData.append(`file[${index}].examType`, entry.examType); // Tipo do exame
    });

    // 🔹 ID da requisição
    formData.append("examsReqId", examId);

    const response = await axios.post(
      `${API_URL}/laboratory/uploadExam`,
      formData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );

    console.log("Resposta do servidor:", response.data);
    return { success: true, data: response.data };

  } catch (error) {
    console.error("Erro ao devolver exame:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
