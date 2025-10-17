import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./login/Login.module.css";
import profilePic from "./assets/user-icon.png"; // ícone padrão
import Avatar from "./assets/avatar.png"; // avatar do usuário
import { logoutUsuario } from "./js/logout.js";

function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const role = localStorage.getItem("role"); // pega a role do usuário
    setIsLogged(!!userId);
    setUserRole(role);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  //LOGOUT DO USUARIO
  const handleLogout = async () => {
      
                          //chama a função logoutUsuario que tá em logout.js
      const result = await logoutUsuario();
      if (result.success) {
        // redireciona pra tela inicial
        navigate("/");
      } else {
        alert("Erro ao fazer logout: " + result.message);
      }
    };

  return (
    <header className={Style.login_header}>
      <Link to="/" className={Style.hyperText}>
        <h1>
          <strong>SCX</strong>
        </h1>
      </Link>


      

    
    </header>
  );
}

export default Header;
