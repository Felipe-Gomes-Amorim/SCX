import axios from "axios";
import API_URL from "../apiConfig.js";
//metodo principal ( data vai vir do registerExam.jsx / token tá armazenado no localStorage )
export async function cadastrarExame(examData, token) {

  try {                               //ver rotas do médico no DoctorController (Back-End)
    const response = await axios.post(`${API_URL}/laboratory/registerExam`, examData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    
    //print pra teste com o body do exame
    console.log("Exame cadastrado:", response.data);

    //quiser adicionar qlqr coisa no processo é aqui



    return {
      success: true,
      //ele vai retornar os dados do exame cadastrado
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
