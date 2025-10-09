import axios from "axios";

export async function cadastrarExame(examData, token) {
  try {
    const response = await axios.post("http://localhost:8080/doctor/requestExm", examData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    console.log("Exame cadastrado:", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Erro ao cadastrar exame:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
