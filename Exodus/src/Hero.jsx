import Style from './Hero.module.css'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GenericButton from './assents_link/GenericButton.jsx';


function Hero(){
  const navigate = useNavigate();
  const homeWindow = localStorage.getItem("homeAberto");

  return (
    <section className={Style.hero}>
      <motion.div 
        initial={{ x: "-50%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1], delay: 0.4 }}
        className={Style.hero_content}
      >
        <h2>Sua jornada de saúde mais simples começa aqui.</h2>
        <p>
          Sua plataforma SCX está pronta para transformar o fluxo de trabalho. Gerencie as requisições, acompanhe o status das devoluções e acesse os dados dos pacientes com total agilidade. Concentre-se no cuidado: nós unificamos e simplificamos a burocracia do processo de exames.
        </p>
        <GenericButton text="Entrar" homeWindow={homeWindow}/>
      </motion.div>
    </section>
  )
}

export default Hero;
