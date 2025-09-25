import axios from "axios";
import { nav } from "framer-motion/client";


export async function excluirUsuario() {
  try {
    const token = localStorage.getItem("token");
    const id = Number(localStorage.getItem("id"));
    const tipo = localStorage.getItem("role"); 

    if (!token || !id || !tipo) {
      return { success: false, message: "Você precisa estar logado para excluir o perfil." };
    }

    // rota dinâmica conforme tipo
    await axios.delete(`http://127.0.0.1:3333/${tipo}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // limpar storage
    localStorage.clear();


    return { success: true, message: "Perfil excluído com sucesso!" };
  } catch (error) {
    console.error("Erro ao excluir perfil:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
