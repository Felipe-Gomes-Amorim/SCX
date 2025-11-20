import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./Header.module.css";


function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState(null);

 

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    setIsLogged(!!userId);
    setUserRole(role);
  }, []);

  return (
    <header className={Style.login_header}>
      {/* Seção esquerda: Logo */}
      <div className={Style.logo}>
        <Link to="/" className={Style.hyperText}>
          <h1>
            <strong>SCX</strong>
          </h1>
        </Link>
      </div>

      {/* Seção central: Navegação com links */}
      <nav className={Style.nav}>
        <Link to="/" className={Style.navLink}>Início</Link>
        <Link to="/sobre" className={Style.navLink}>Sobre nós</Link>
        <Link to="/TermosDeUso" className={Style.navLink}>Termos de Uso</Link>
        <Link to="/PoliticasPrivacidade" className={Style.navLink}>Políticas de Privacidade</Link>
      </nav>

      {/* Seção direita: Menu do usuário (expanda aqui se necessário) */}
      <div className={Style.userMenu}>
        {/* Exemplo: Ícone de home ou menu dropdown */}
        {/* Você pode adicionar lógica aqui para renderizar o menu baseado em isLogged */}
      </div>
    </header>
  );
}

export default Header;