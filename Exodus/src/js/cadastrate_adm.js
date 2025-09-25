import axios from "axios";

export async function cadastrarAdm(admData, token) {
  try {
    const response = await axios.post("http://localhost:3333/adm", admData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined, // caso precise de token
      },
    });

    console.log("Resposta do servidor:", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Erro ao cadastrar ADM:",
      error.response?.data || error.message
    );

    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
