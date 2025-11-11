import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./Header.module.css";
import profilePic from "./assets/user-icon.png";
import Avatar from "./assets/user-icon.png";
import { logoutUsuario } from "./js/login e home/logout.js";
import { useToast } from "./context/ToastProvider.jsx";

function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    setIsLogged(!!userId);
    setUserRole(role);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // LOGOUT DO USUARIO
  const handleLogout = async () => {
    // chama a função logoutUsuario que tá em logout.js
    const result = await logoutUsuario();
    if (result.success) {
      // redireciona pra tela inicial
      navigate("/");
    } else {
      showToast("Erro ao fazer logout: " + result.message);
    }
  };

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
        <Link to="/" className={Style.navLink}>Suporte</Link>
        <Link to="/" className={Style.navLink}>Contato</Link>
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