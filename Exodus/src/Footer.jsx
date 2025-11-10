import Style from './Footer.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from './js/apiConfig.js'; // 🔹 Ajuste o caminho conforme seu projeto

function About() {
  const navigate = useNavigate();

  const handleSuporteClick = async () => {
    try {
      const response = await axios.post(`${API_URL}/adminSystem/registerUser`);
      console.log("✅ Rota chamada com sucesso:", response.data);
      alert("Rota /adminSystem/registerUser chamada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao chamar a rota:", error);
      alert("Erro ao chamar a rota do back-end!");
    }
  };

  return (
    <footer className={Style.footer}>
      <div className={Style.footer_container}>

        <div className={Style.footer_col}>
          <h2>SCX</h2>
          <p>Sistema de controle de exames para facilitar o acesso a exames, pacientes e médicos.</p>
        </div>

        <div className={Style.footer_col}>
          <h3>Links Rápidos</h3>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Sobre nós</a></li>
            <li>
              <button 
                className={Style.linkButton} 
                onClick={handleSuporteClick}
              >
                Suporte
              </button>
            </li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>

        <div className={Style.footer_col}>
          <h3>Contato</h3>
          <p>Email: <a href="mailto:emailteste@gmail.com.br">emailteste@gmail.com.br</a></p>
          <p>Telefone: (11) 4444-4444</p>
          <p>Endereço: Rua Teste de endereço, 777<br />Vila Teste - Belo Horizonte / MG</p>
        </div>

        <div className={Style.footer_col}>
          <h3>Siga-nos</h3>
          <div className={Style.socials}>
            <a href="#"><img src="img/facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="img/linkedin.png" alt="LinkedIn" /></a>
            <a href="#"><img src="img/github.png" alt="GitHub" /></a>
          </div>
        </div>
      </div>

      <div className={Style.footer_bottom}>
        <p>© 2025 SCX - Sistema de Controle de Exames. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default About;
