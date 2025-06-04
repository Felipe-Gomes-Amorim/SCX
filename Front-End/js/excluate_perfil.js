document.addEventListener('DOMContentLoaded', () => {
  const btnExcluir = document.querySelector('#btnExcluirPerfil');

  btnExcluir.addEventListener('click', async () => {
    const confirmar = confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.');

    if (!confirmar) return;

    const token = localStorage.getItem('token');
    const id = Number(localStorage.getItem('id'));

    if (!token || !id) {
      alert('Você precisa estar logado para excluir o perfil.');
      window.location.href = 'login.html';
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:3333/paciente/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Perfil excluído com sucesso!');

      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('nome');

      window.location.href = 'index.html';

    } catch (error) {
      console.error('Erro ao excluir perfil:', error.response?.data || error.message);
      alert('Erro ao excluir perfil: ' + (error.response?.data?.message || error.message));
    }
  });
});
