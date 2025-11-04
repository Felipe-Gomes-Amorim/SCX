import axios from "axios";
import API_URL from "../apiConfig.js";
//metodo principal ( data vai vir do registerLab.jsx / token tá armazenado no localStorage )
export async function cadastrarAdmLaboratorio(admData, token) {
  try {                              //ver rotas do médico no AdminController (Back-End)      
    const response = await axios.post(`${API_URL}/laboratory/register/Adm`, admData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    //print pra teste com o body do exame
    console.log("Resposta do servidor:", response.data);


    //quiser adicionar qlqr coisa no processo é aqui


    return {
      success: true,
      //ele vai retornar os dados do adm
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
