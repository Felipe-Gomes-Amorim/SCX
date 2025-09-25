
const form = document.querySelector('#formCadastroMedico');


form.addEventListener('submit', async (e) => {
  e.preventDefault(); 


  const medicoData = {
    crm: form.crm.value,
    nome: form.nome.value,
    email: form.email.value,
    senha: form.senha.value,
    uf_crm: form.uf_crm.value,
    espec: form.especificacao.value
  };

  // ✅ Recupera o token armazenado (normalmente após login):
  const token = localStorage.getItem('token');

  // ✅ Chama a função para cadastrar:
  await cadastrarMedico(medicoData, token);
});

// ✅ Função assíncrona para enviar os dados via Axios:
async function cadastrarMedico(medicoData, token) {
  try {
    const response = await axios.post('http://127.0.0.1:3333/medico', medicoData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Resposta do servidor:', response.data);

    //REDIRECT PRA PAGINA DO ADM
    window.location.href = '/adiministracao.html';

  } catch (error) {
    console.error('Erro ao cadastrar médico:', error.response?.data || error.message);
    alert('Erro ao cadastrar médico: ' + (error.response?.data?.message || error.message));
  }
}
