import axios from "axios";

export async function cadastrarPaciente(pacienteData, token) {
  try {
    const response = await axios.post("http://localhost:3333/paciente", pacienteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Resposta do servidor:", response.data);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
