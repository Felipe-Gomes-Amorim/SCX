import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Top.module.css";
import GenericButton from './assents_link/GenericButton.jsx';
import { cadastrarSuporte } from "./js/registros/cadastrar_suporte.js";
import { useToast } from "./context/ToastProvider.jsx";


function Top() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    // Verifica se existe um usuário logado (ex: ID salvo no login)
    const userId = localStorage.getItem("id");
    setIsLogged(!!userId);
  }, []);

  async function handleCadastrarSuporte() {
    const result = await cadastrarSuporte();

    if (result.success) {
      showToast(result.message);
    } else {
      showToast(result.message);
    }
  }
  return (
    <section className={Style.logo_bar}>

      <GenericButton text="Portal do Médico" place={"/login"} color="#007DFA" hoverColor="#fff" hoverBackground="#007DFA" />
      <GenericButton text="Portal do Laboratório" place={"/register"} color="#007DFA" hoverColor="#fff" hoverBackground="#007DFA" />
      <GenericButton text="Portal da Secretaria" place={"/register"} color="#007DFA" hoverColor="#fff" hoverBackground="#007DFA" />


    </section>
  );
}

export default Top;
