// Seleciona o formulário pelo ID:
const form = document.querySelector('#formCadastro');

// Adiciona o evento de submit:
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o comportamento padrão de recarregar a página.

  // Pega os valores dos inputs:
const pacienteData = {
  nome: form.nome.value,
  email: form.email.value,
  senha: form.senha.value,
  cpf: parseInt(form.cpf.value),
};

  
  const token = localStorage.getItem('token');

 
  await cadastrarPaciente(pacienteData, token);
});


async function cadastrarPaciente(pacienteData, token) {
  try {
    const response = await axios.post('http://localhost:3333/paciente', pacienteData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    
    console.log('Resposta do servidor:', response.data);

    //REDIRECT PRA PAGINA INICIAL
    window.location.href = '/index.html';

  } catch (error) {
 
    console.error('Erro ao cadastrar paciente:', error.response?.data || error.message);
    alert('Erro ao cadastrar paciente: ' + (error.response?.data?.message || error.message));
  }
}
