import axios from "axios";

export async function loginUsuario(loginData, role) {
  try {
    let endpoint = "";



    const response = await axios.post(
      `http://127.0.0.1:8080/auth/login`,
      loginData
    );

    const { Token, nome, role: userRole, id, email } = response.data;

    localStorage.setItem("token", Token);
    localStorage.setItem("nome", nome);
    localStorage.setItem("role", userRole || role);
    localStorage.setItem("id", id);
    localStorage.setItem("email", email);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
