document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('ROLEUsuario');
  const idUsuario = localStorage.getItem('idUsuario');

  const exameId = localStorage.getItem('exameId');


  const form = document.querySelector('#formEditarExame');


  let tipo = '';
  let nome_paciente = '';
  let nome_medico = '';
  let cpf_paciente = '';
  let crm_med = '';

  try {
    const response = await axios.get(`http://127.0.0.1:3333/exames/${exameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        ROLEUsuario: role,
        idUsuario: idUsuario
      }
    });

    const exame = response.data;

    tipo = exame.tipo;
    nome_paciente = exame.nome_paciente;
    nome_medico = exame.nome_medico;
    cpf_paciente = exame.cpf_paciente;
    crm_med = exame.crm_med;

    form.tipo.value = tipo;
    form.nome_paciente.value = nome_paciente;
    form.nome_medico.value = nome_medico;
    form.resultado.value = exame.resultado || '';

  } catch (error) {
    console.error('Erro ao carregar exame:', error.response?.data || error.message);
    alert('Erro ao carregar exame.');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoResultado = form.resultado.value;

    try {
      const response = await axios.put(`http://127.0.0.1:3333/exames/${exameId}`, {
        tipo: tipo,
        nome_paciente: nome_paciente,
        nome_medico: nome_medico,
        cpf_paciente: cpf_paciente,
        crm_med: crm_med,
        resultado: novoResultado,
        status: 'Aprovado'
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          ROLEUsuario: role,
          idUsuario: idUsuario
        }
      });

      alert('Exame atualizado com sucesso!');
      localStorage.removeItem('exameId');
      window.location.href = '/exames_paciente.html';

    } catch (error) {
      console.error('Erro ao atualizar exame:', error.response?.data || error.message);
      alert('Erro ao atualizar exame: ' + (error.response?.data?.message || error.message));
    }
  });
});
