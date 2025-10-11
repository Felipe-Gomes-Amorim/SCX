//SCRIPT INCOMPLETO FAVOR NAO USAR ATE FINALIZAR

document.addEventListener('DOMContentLoaded', async () => {
    //Pega o token e o nome
  const token = localStorage.getItem('token');
  const nome = localStorage.getItem('nome');

  const id2 = localStorage.getItem('id');
  console.log('Token:', token);
  console.log('Nome:', nome);

  //carregando o perfil
  try {
    const response = await axios.get('http://127.0.0.1:3333/paciente/' + id2, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const paciente = response.data;

    //altera os campos do html
    document.querySelector('#nome').textContent = paciente.nome;
    document.querySelector('#cpf').textContent = paciente.cpf;
    document.querySelector('#instituicao_vinc').textContent = paciente.instituicao_vinc;
    document.querySelector('#email').textContent = paciente.email;

   //EXAMES
    try {
      const examesResponse = await axios.get(`http://127.0.0.1:3333/examesPac/` + paciente.cpf, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log(paciente.cpf)
      const exames = examesResponse.data;
      const listaExames = document.querySelector('#lista-exames');
      listaExames.innerHTML = ''; // Limpa qualquer conteúdo estático

      exames.forEach(exame => {
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="linha-exame">
            <div class="info-exame">
              <div class="titulo-exame">${exame.tipo}</div>
              <div class="descricao-exame">${exame.status}</div>
            </div>
            <a href="#" class="botao-exame">Abrir</a>
          </td>
        `;
        listaExames.appendChild(tr);
      });
      console.log(exames)
    } catch (error) {
      console.error('Erro ao carregar exames:', error.response?.data || error.message);
      alert('Erro ao carregar exames.');
    }

  } catch (error) {
    console.error('Erro ao carregar perfil:', error.response?.data || error.message);
    alert('Erro ao carregar o perfil.');
  }
});
