//metodo principal ( vai ser chamado pelo Perfil.jsx )
export async function logoutUsuario() {
  try {
    let endpoint = "";

    //remove os dados do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("role");
    localStorage.removeItem("cpf");
    localStorage.removeItem("id");
    localStorage.removeItem("foto");
    
    return { 
      //ele vai retornar o resultado
      success: true
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
