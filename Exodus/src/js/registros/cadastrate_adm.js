import axios from "axios";
import API_URL from "../apiConfig.js";

const authToken = localStorage.getItem("token");

//metodo principal ( data vai vir do registerADM.jsx / token tá armazenado no localStorage )
export async function cadastrarAdm(admData, token) {
  console.log("chegou antes do try")
  try {
    console.log("chegou dentro do try")                            //ver rotas do médico no AdminController (Back-End)      
    const response = await axios.post(`${API_URL}/clinic/firstAdm`, admData,
      {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
      }

    );

    //print pra teste com o body do exame
    console.log("Resposta do servidor:", response.data);


    //quiser adicionar qlqr coisa no processo é aqui


    return {
      success: true,
      //ele vai retornar os dados do adm
      data: response.data,
    };
  } catch (error) {
    console.log(error)
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
