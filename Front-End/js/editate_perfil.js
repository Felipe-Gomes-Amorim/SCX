document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const id = Number(localStorage.getItem('id'));

  if (!token || !id) {
    alert('Você precisa estar logado para editar o perfil.');
    window.location.href = 'login.html';
    return;
  }
  var instituicaoG = "";
  var senhaG = "";
  const form = document.querySelector('#formEditarPerfil');


  try {
    const response = await axios.get(`http://127.0.0.1:3333/paciente/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const paciente = response.data;

    form.nome.value = paciente.nome || '';
    form.email.value = paciente.email || '';
    form.cpf.value = paciente.cpf || '';
    instituicaoG ="UNICAMP";
    senhaG = paciente.senha;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error.response?.data || error.message);
    alert('Erro ao carregar dados do perfil.');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dadosAtualizados = {
      nome: form.nome.value,
      email: form.email.value,
      cpf: form.cpf.value,
      senha: senhaG,
      instituicao_vinc: instituicaoG
    };

    try {
      await axios.put(`http://127.0.0.1:3333/paciente/${id}`, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Perfil atualizado com sucesso!');
      window.location.href = 'perfil.html';
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.response?.data || error.message);
      alert('Erro ao atualizar perfil: ' + (error.response?.data?.message || error.message));
    }
  });
});
