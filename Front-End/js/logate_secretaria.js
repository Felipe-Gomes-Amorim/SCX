const form = document.querySelector('#formLoginSecretaria');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const loginData = {
    email: form.email.value,
    senha: form.senha.value
    
  };

  await loginSecretaria(loginData);
});

async function loginSecretaria(loginData) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/entrarSecretaria', loginData);

    const token = response.data.accessToken;
    const nome = response.data.nome;
    const role = response.data.role;

    localStorage.setItem('token', token);
    localStorage.setItem('nome', nome);
    localStorage.setItem('role', role);

    console.log('Token JWT:', token);

    window.location.href = 'secretaria.html';

  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    alert('Erro no login: ' + (error.response?.data?.message || error.message));
  }
}
