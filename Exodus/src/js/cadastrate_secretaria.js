// ✅ Seleciona o formulário pelo ID
const form = document.querySelector('#formCadastroSecretaria');

// ✅ Adiciona o evento de submit
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o reload da página

  // ✅ Pega os valores dos inputs
  const secretariaData = {
    nome: form.nome.value,
    email: form.email.value,
    senha: form.senha.value,
  };

  // ✅ Recupera o token do localStorage
  const token = localStorage.getItem('token');

  // ✅ Chama a função para cadastrar
  await cadastrarSecretaria(secretariaData, token);
});

// ✅ Função assíncrona para enviar a requisição
async function cadastrarSecretaria(secretariaData, token) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/secretaria', secretariaData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Resposta do servidor:', response.data);

    //REDIRECT PRA PAGINA DO ADM
    window.location.href = '/adiministracao.html';

  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error.response?.data || error.message);
    alert('Erro ao cadastrar funcionário: ' + (error.response?.data?.message || error.message));
  }
}
