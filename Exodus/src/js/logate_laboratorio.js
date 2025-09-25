// ✅ Seleciona o formulário
const form = document.querySelector('#formLoginLaboratorio');

// ✅ Adiciona o evento de submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // ✅ Pega os dados do form
  const loginData = {
    email: form.email.value,
    senha: form.senha.value
  };

 
  await loginAdm(loginData);
});


async function loginAdm(loginData) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/entrarLaboratorio', loginData);

    const token = response.data.accessToken;
    const nome = response.data.nome;
    const role = response.data.role;
    
    localStorage.setItem('token', token);
    localStorage.setItem('nome', nome);
    localStorage.setItem('role', role);
  
    console.log('NOME:',nome);
    console.log('NOME:',nome);
    console.log('Token JWT:', token);

  

  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    alert('Erro no login: ' + (error.response?.data?.message || error.message));
  }
}
