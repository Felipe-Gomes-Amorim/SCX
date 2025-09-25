import axios from 'axios';

export async function loginPaciente(loginData) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/entrarPaciente', loginData);

    const { accessToken, nome, role, id, cpf } = response.data;

    localStorage.setItem('token', accessToken);
    localStorage.setItem('nome', nome);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
    localStorage.setItem('cpf', cpf);

    return { success: true }; // podemos retornar sucesso
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
}
