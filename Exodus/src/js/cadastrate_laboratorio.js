const form = document.querySelector('#formCadastroLaboratorio');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const laboratorioData = {
    espec: form.espec.value,
    nome: form.nome.value,
    email: form.email.value,
    senha: form.senha.value
  };

  // ✅ Se for necessário autenticação, recupere token:
  const token = localStorage.getItem('token');

  await cadastrarLaboratorio(laboratorioData, token);
});

async function cadastrarLaboratorio(laboratorioData, token) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/laboratorio', laboratorioData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });


    console.log('Resposta do servidor:', response.data);

    

  } catch (error) {
    console.error('Erro ao cadastrar laboratório:', error.response?.data || error.message);
    alert('Erro ao cadastrar laboratório: ' + (error.response?.data?.message || error.message));
  }
}
