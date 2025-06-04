const form = document.querySelector('#formCadastroAdm');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const admData = {
    nome: form.nome.value,
    email: form.email.value,
    senha: form.senha.value
  };
  await cadastrarAdm(admData);
});

async function cadastrarAdm(admData) {
  try {
    const response = await axios.post('http://localhost:3333/adm', admData);

  
    console.log('Resposta do servidor:', response.data);

    //REDIRECT PARA O INDEX
    window.location.href = '/index.html';

  } catch (error) {
    console.error('Erro ao cadastrar ADM:', error.response?.data || error.message);
    alert('Erro ao cadastrar ADM: ' + (error.response?.data?.message || error.message));
  }
}
