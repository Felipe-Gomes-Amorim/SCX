

export async function logoutUsuario() {
  try {
    let endpoint = "";

    //remove os dados do localStorage
    localStorage.clear();
    
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
