const form = document.querySelector('#formLoginMedico');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const loginData = {
    email: form.email.value,
    senha: form.senha.value
  };

  await loginMedico(loginData);
});

async function loginMedico(loginData) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/entrarMedico', loginData);

    const token = response.data.accessToken;
    const id = response.data.id;
    const nome = response.data.nome || 'Médico';

    // ✅ Armazena o token e informações do médico
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('nome', nome);

    alert('Login realizado com sucesso!');

    console.log('Token JWT:', token);

  
    

  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    alert('Erro no login: ' + (error.response?.data?.message || error.message));
  }
}
