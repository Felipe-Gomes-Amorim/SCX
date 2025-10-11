import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from './login/Login.module.css'
import profilePic from "./assets/user-icon.png"; // ícone padrão
import Avatar from "./assets/avatar.png"; // avatar usado no perfil
function ExodusTop(){
     const [isLogged, setIsLogged] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
        // Verifica se existe um usuário logado (ex: ID salvo no login)
        const userId = localStorage.getItem("id");
        setIsLogged(!!userId);
      }, []);
  
    return (
      <>
        <header className={Style.login_header}>
          <Link to={"/"} className={Style.hyperText}><h1><strong>SCX</strong></h1></Link>
        

        <div
        className={Style.user_icon}
        onClick={() => {
          if (isLogged) navigate("/perfil");
        }}
        style={{ cursor: isLogged ? "pointer" : "default" }}
        >
          <img src={isLogged ? Avatar : profilePic} alt="Usuário" />
        </div>
        </header>

      </>
    );
};

export default ExodusTop;