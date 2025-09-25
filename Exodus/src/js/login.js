import axios from "axios";

export async function loginUsuario(loginData, role) {
  try {
    let endpoint = "";

    switch (role) {
      case "paciente":
        endpoint = "entrarPaciente";
        break;
      case "medico":
        endpoint = "entrarMedico";
        break;
      case "adm":
        endpoint = "entrarAdm";
        break;
      case "secretaria":
        endpoint = "entrarSecretaria";
        break;
      case "laboratorio":
        endpoint = "entrarLaboratorio";
        break;
      default:
        throw new Error("Role inválida!");
    }

    const response = await axios.post(
      `http://127.0.0.1:3333/${endpoint}`,
      loginData
    );

    const { accessToken, nome, role: userRole, id, email } = response.data;

    localStorage.setItem("token", accessToken);
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
