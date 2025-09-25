import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Top.module.css";
import profilePic from "./assets/user-icon.png"; // ícone padrão
import Avatar from "./assets/avatar.png"; // avatar usado no perfil

function Top() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se existe um usuário logado (ex: ID salvo no login)
    const userId = localStorage.getItem("id");
    setIsLogged(!!userId);
  }, []);

  return (
    <section className={Style.logo_bar}>
      <div className={Style.logo}>
        <h1>
          <strong>EXODUS</strong>{" "}
          <span>{new Date().getFullYear()}</span>
        </h1>
      </div>

      <div
        className={Style.user_icon}
        onClick={() => {
          if (isLogged) navigate("/perfil");
        }}
        style={{ cursor: isLogged ? "pointer" : "default" }}
      >
        <img src={isLogged ? Avatar : profilePic} alt="Usuário" />
      </div>
    </section>
  );
}

export default Top;
