//SCRIPT INCOMPLETO FAVOR NAO USAR ATE FINALIZAR

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const idUsuario = localStorage.getItem('idUsuario');
  const role = localStorage.getItem('ROLEUsuario');



  try {
    const response = await axios.get('http://127.0.0.1:3333/examesPendent/Pendente', {
      headers: {
        Authorization: `Bearer ${token}`,
        ROLEUsuario: role,
        idUsuario: idUsuario
      }
    });

    const exames = response.data;

    const listaExames = document.querySelector('#lista-exames');
    listaExames.innerHTML = '';



  exames.forEach(exame => {
  const tr = document.createElement('tr');

  const botao = document.createElement('button');
  botao.textContent = 'Aprovar';
  botao.classList.add('botao-exame');


  botao.addEventListener('click', () => {
    localStorage.setItem('exameId', exame.id);
    window.location.href = 'editar_exame.html';
  });

  tr.innerHTML = `
    <td class="linha-exame">
      <div class="info-exame">
        <div class="titulo-exame">${exame.tipo}</div>
        <div class="descricao-exame">
          Paciente: ${exame.nome_paciente}<br>
          Médico: ${exame.nome_medico}
        </div>
      </div>
    </td>
  `;

  tr.querySelector('.info-exame').appendChild(botao);

  listaExames.appendChild(tr);
});



  } catch (error) {
    console.error('Erro ao carregar exames:', error.response?.data || error.message);
    alert('Erro ao carregar exames.');
  }
});
