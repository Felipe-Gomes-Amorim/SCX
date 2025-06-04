document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Você precisa estar logado para visualizar os logs.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await axios.get('http://127.0.0.1:3333/logs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const logs = response.data;

    const tabela = document.querySelector('#tabelaLogs');

    logs.forEach(log => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${log.id}</td>
        <td>${log.usuario}</td>
        <td>${log.acao}</td>
        <td>${log.detalhes}</td>
        <td>${log.data_hora}</td>
      `;

      tabela.appendChild(row);
    });

  } catch (error) {
    console.error('Erro ao carregar logs:', error.response?.data || error.message);
    alert('Erro ao carregar os logs: ' + (error.response?.data?.message || error.message));
  }
});
