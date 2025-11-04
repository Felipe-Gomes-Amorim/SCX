import axios from "axios";
import API_URL from "../apiConfig.js";

//metodo principal ( data vai vir do register.jsx / token tá armazenado no localStorage )
export async function checarClinica(token) {
  try {                               //ver rotas do médico no DoctorController (Back-End)
    const request = await axios.get(`${API_URL}/admin/clinicAdm`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //print pra teste com o body do exame
    console.log("Resposta do servidor:", request.data);


    //quiser adicionar qlqr coisa no processo é aqui


    return { 
      //ele vai retornar os dados do paciente
      success: true, data: request.data 
    };
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error.request?.data || error.message);
    return {
      success: false,
      message: error.request?.data?.message || error.message,
    };
  }
}
