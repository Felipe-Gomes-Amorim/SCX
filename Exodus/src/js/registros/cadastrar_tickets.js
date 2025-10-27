import axios from "axios";

export async function cadastrarTicket(ticketData, token) {
  try {
    console.info(
      "%c🆕 enviando seu ticket no sistema...",
      "color: #4DD0E1; font-weight: bold;"
    );

    const response = await axios.post( "http://localhost:8080/support/registerTicket", ticketData,{
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.info(
      "%c✅ Ticket enviado com sucesso:",
      "color: #81C784;",
      response.data
    );

    return {
      success: true,
      message: "Ticket enviado com sucesso.",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "%c❌ Erro ao enviar ticket:",
      "color: #E57373; font-weight: bold;",
      error
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Erro inesperado ao cadastrar a suporte.",
      error,
    };
  }
}
