const form = document.querySelector('#formRegistroExame');
const cpfInput = document.querySelector('#cpf_paciente');
const nomePacienteSpan = document.querySelector('#nome_paciente');
const crmInput = document.querySelector('#crm_med');
const nomeMedicoSpan = document.querySelector('#nome_medico');

cpfInput.addEventListener('blur', async () => {
  const cpf = cpfInput.value;
  if (!cpf) return;

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('ROLEUsuario');
  const idUsuario = localStorage.getItem('idUsuario');

  try {
    const response = await axios.get(`http://127.0.0.1:3333/pacienteCPF/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        ROLEUsuario: role,
        idUsuario: idUsuario
      }
    });
    nomePacienteSpan.textContent = response.data.nome;
  } catch (error) {
    console.error('Erro ao buscar paciente:', error.response?.data || error.message);
    nomePacienteSpan.textContent = 'Não encontrado';
  }
});

crmInput.addEventListener('blur', async () => {
  const crm = crmInput.value;
  if (!crm) return;

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('ROLEUsuario');
  const idUsuario = localStorage.getItem('idUsuario');

  try {
    const response = await axios.get(`http://127.0.0.1:3333/medicoCRM/${crm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        ROLEUsuario: role,
        idUsuario: idUsuario
      }
    });
    nomeMedicoSpan.textContent = response.data.nome;
  } catch (error) {
    console.error('Erro ao buscar médico:', error.response?.data || error.message);
    nomeMedicoSpan.textContent = 'Não encontrado';
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa estar logado para registrar um exame.');
    return;
  }

  const exameData = {
    tipo: form.tipo.value,
    resultado: "", // sempre vazio no início
    cpf_paciente: Number(form.cpf_paciente.value),
    nome_paciente: nomePacienteSpan.textContent,
    crm_med: Number(form.crm_med.value),
    nome_medico: nomeMedicoSpan.textContent,
    status: "Pendente"
  };

  try {
    const response = await axios.post('http://127.0.0.1:3333/exames', exameData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert('Exame registrado com sucesso!');
    form.reset();
    nomePacienteSpan.textContent = '';
    nomeMedicoSpan.textContent = '';

  } catch (error) {
    console.error('Erro ao registrar exame:', error.response?.data || error.message);
    alert('Erro ao registrar exame: ' + (error.response?.data?.message || error.message));
  }
});
