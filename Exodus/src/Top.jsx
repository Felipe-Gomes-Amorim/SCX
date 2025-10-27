import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Top.module.css";
import GenericButton from './assents_link/GenericButton.jsx';
import { cadastrarSuporte } from "./js/registros/cadastrar_suporte.js";



function Top() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se existe um usuário logado (ex: ID salvo no login)
    const userId = localStorage.getItem("id");
    setIsLogged(!!userId);
  }, []);

  async function handleCadastrarSuporte() {
    const result = await cadastrarSuporte();

    if (result.success) {
    alert(result.message);
   } else {
    alert(result.message);
   }
  }
  return (
    <section className={Style.logo_bar}>
      
        <GenericButton text="Portal do Médico" place={"/login"} color="#007DFA" hoverColor="#fff" hoverBackground="#007DFA"/>
        <GenericButton text="Portal do Laboratório" place={"/register"} color="#007DFA" hoverColor="#fff" hoverBackground="#007DFA"/>
        <GenericButton text="Portal da Secretaria" place={"/register"} color="#007DFA" hoverColor="#fff" hoverBackground="#007DFA"/>
        <button onClick={handleCadastrarSuporte}>
           Criar Usuário Suporte
        </button>

    </section>
  );
}

export default Top;
