const form = document.querySelector('#formLoginPaciente');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const loginData = {
    email: form.email.value,
    senha: form.senha.value
  };

  await loginPaciente(loginData);
});

async function loginPaciente(loginData) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/entrarPaciente', loginData);

    const token = response.data.accessToken;
    const nome = response.data.nome;
    const role = response.data.role;
    const id = response.data.id;
    const cpf = response.data.cpf;

    localStorage.setItem('token', token);
    localStorage.setItem('nome', nome);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
    localStorage.setItem('cpf', cpf);

    console.log('Token JWT:', token);

    window.location.href = 'perfil.html';

  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    alert('Erro no login: ' + (error.response?.data?.message || error.message));
  }
}
