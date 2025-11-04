import axios from "axios";
import API_URL from "../apiConfig.js";
//metodo principal ( data vai vir do register.jsx / token tá armazenado no localStorage )
export async function cadastrarPaciente(pacienteData, token) {
  try {                               //ver rotas do médico no DoctorController (Back-End)
    const response = await axios.post(`${API_URL}/secretary/registerPatient`, pacienteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //print pra teste com o body do exame
    console.log("Resposta do servidor:", response.data);


    //quiser adicionar qlqr coisa no processo é aqui


    return { 
      //ele vai retornar os dados do paciente
      success: true, data: response.data 
    };
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
