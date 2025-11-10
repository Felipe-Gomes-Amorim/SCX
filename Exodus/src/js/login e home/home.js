import axios from 'axios';

import API_URL from "../apiConfig.js";
export async function carregarhome(token) {
  if (!token) throw new Error("Token não fornecido");

  const response = await axios.get(`${API_URL}/auth/perfil`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}

    //altera os campos do html


   //EXAMES
   /*
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
      showToast('Erro ao carregar exames.');
    

  } catch (error) {
    console.error('Erro ao carregar home:', error.response?.data || error.message);
    showToast('Erro ao carregar o home.');
  }
}
*/