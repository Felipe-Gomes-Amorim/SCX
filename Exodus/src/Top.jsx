import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Top.module.css";


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
          <strong>SCX</strong>{" "}
          <span>{new Date().getFullYear()}</span>
        </h1>
      </div>

      
    </section>
  );
}

export default Top;
