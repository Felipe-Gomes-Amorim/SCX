import Style from './Footer.module.css'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from './js/apiConfig.js';
import { useToast } from "./context/ToastProvider.jsx";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";


function About() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({ roles: [], nome: "", foto: "" });

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLogged(false);
        return;
      }

      try {
        const data = await carregarhome(token);
        setUserData({ ...data, roles: data.roles || [] });
        setIsLogged(true);
      } catch (error) {
        console.error("Erro ao carregar home:", error);
        setIsLogged(false);
      }
    };

    fetchUser();
  }, [token]);



  const navigate = useNavigate();
  const { showToast } = useToast();




  const handleSuporteClick = async () => {
    try {
      const response = await axios.post(`${API_URL}/adminSystem/registerUser`);
      console.log(" Rota chamada com sucesso:", response.data);
      showToast("Rota /adminSystem/registerUser chamada com sucesso!");
    } catch (error) {
      console.error(" Erro ao chamar a rota:", error);
      showToast("Erro ao chamar a rota do back-end!");
    }
  };

  const getHeaderColor = () => {
    if (!userData.roles || userData.roles.length === 0) return "";

    const role = userData.roles[0].name; // pega a primeira role

    switch (role) {
      case "AdminSystem":
      case "Admin":
        return "role-admin";
      case "Secretary":
        return "role-secretary";
      case "LaboratoryAdmin":
      case "LaboratoryUser":
        return "role-lab";
      case "Doctor":
        return "role-doctor";
      case "Patient":
        return "role-patient";
      default:
        return "";
    }
  };



  return (
    <footer className={`${Style.footer} ${getHeaderColor()}`}>


      <div className={Style.footer_container}>

        <div className={Style.footer_col}>
          <h2>SCX v1.9.8</h2>
          <p>Sistema de controle de exames para facilitar o acesso a exames, pacientes e médicos.</p>
        </div>

        <div className={Style.footer_col}>
          <h3>Links Rápidos</h3>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/sobre">Sobre nós</Link></li>
            <li><Link to="/TermosDeUso">Termos de Uso</Link></li>

            <li><Link to="/PoliticasPrivacidade">Políticas de Privacidade</Link></li>

          </ul>
        </div>

        <div className={Style.footer_col}>
          <h3>Contato</h3>
          <p>Email: <a href="mailto:felipegomespessoa@gmail.com.br">felipegomespessoal@gmail.com.br</a></p>
          <p>Telefone: (11) 95049-3923</p>
          <p>Endereço: Rua Teste de endereço, 777<br />Vila Teste - Belo Horizonte / MG</p>
        </div>

        <div className={Style.footer_col}>
          <h3>Siga-nos</h3>
          <div className={Style.socials}>

            <a href="https://www.linkedin.com/in/felipe-gomes-amorim/">
              <FaLinkedin size={28} />
            </a>
            <a href="https://github.com/Felipe-Gomes-Amorim/SCX">
              <FaGithub size={28} />
            </a>
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
