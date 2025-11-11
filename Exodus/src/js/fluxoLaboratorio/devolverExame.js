import axios from "axios";
import API_URL from "../apiConfig.js";

export async function devolverExame(files, examId, token) {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file)); 
    formData.append("examsReqId", examId);

    const response = await axios.post(`${API_URL}/laboratory/uploadExam`, formData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

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

