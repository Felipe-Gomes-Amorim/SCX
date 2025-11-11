import Style from './About.module.css'
import { motion } from "framer-motion"; 
import RegisterTicket from './cadastro/registerTicket';
function About() {
return (
    <section className={Style.about_section}>
        <div className={Style.about_inside} >
        <motion.div 
        initial={{ x: "50%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1], delay: 0.4 }}
        className={Style.about_content}>
            <h2>Suporte SCX à Sua Disposição</h2>
            <p>
                Tem alguma dúvida sobre a gestão de exames ou precisa de auxílio em um processo específico? Nossa equipe de suporte está pronta para ajudar. Mande um email para <strong>scxservices@gmail.com</strong> e entre em contato conosco para garantir que sua operação clínica funcione com a máxima eficiência.
            </p>
        </motion.div>
        </div>
        
    </section>
);
}


export default About;