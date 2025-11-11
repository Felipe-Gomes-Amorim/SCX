import axios from "axios";
import API_URL from "../apiConfig.js";
//metodo principal ( data vai vir do Login.jsx / token tá armazenado no localStorage )
export async function resetPassword(loginData) {
  try {
    let endpoint = "";
    const path = window.location.pathname; // "/auth/abc123"
    const parts = path.split('/');
    const token = parts[2]; // "abc123" (ajusta índice conforme sua rota)


    const response = await axios.post(
      //ver rotas do médico no AuthController (Back-End)
      `${API_URL}/auth/first-login/` + token,
      loginData
    );


    //Passar token pra manter a persistência do tipo do usuário até o logout
    
    console.log(token)

   
    //quiser adicionar qlqr coisa no processo é aqui


    return { 
      //ele vai retornar os dados do paciente
      success: true

    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
