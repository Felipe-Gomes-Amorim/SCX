import axios from "axios";
import API_URL from "../apiConfig.js";
//metodo principal ( data vai vir do Login.jsx / token tá armazenado no localStorage )
export async function loginUsuario(loginData, role) {
  try {
    let endpoint = "";



    const response = await axios.post(
      //ver rotas do médico no AuthController (Back-End)
      `${API_URL}/auth/login`,
      loginData
    );

    const { Token, nome, role: userRole, id, email } = response.data;

    //Passar token pra manter a persistência do tipo do usuário até o logout
    localStorage.setItem("token",Token);
    console.log(Token)
    //ESSES DADOS AQUI SÃO TEMPORÁRIOS BIXO, DEPOIS TEM QUE FAZER UM GET PRA PEGAR OS DADOS DO USUÁRIO LOGADO
    
    localStorage.setItem("role", userRole || role);
    localStorage.setItem("id", id);
    localStorage.setItem("email", email);


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
