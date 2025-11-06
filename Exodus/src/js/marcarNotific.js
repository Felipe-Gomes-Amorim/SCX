import API_URL from "./apiConfig.js";

export async function marcarComoLida(notificacaoId, token) {
  try {
    const response = await fetch(`${API_URL}/notification/markRead`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: notificacaoId}),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao marcar como lida: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro na função marcarComoLida:", err);
    throw err;
  }
}
