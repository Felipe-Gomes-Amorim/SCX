import axios from "axios";
import API_URL from "./apiConfig.js";

// Função para responder um ticket
export async function responderTicket(ticketData, token) {
  try {
    const response = await axios.patch(
      `${API_URL}/support/responseTicket`, // substitua pela sua URL da API
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

   
      return { success: true, data: response.data  };
    
  } catch (err) {
    console.error("Erro ao responder ticket:", err);
    return { success: false, message: err.response?.data?.message || err.message };
  }
}
