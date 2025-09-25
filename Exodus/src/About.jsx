import Style from './About.module.css'
import { motion } from "framer-motion"; 
function About() {
return (
    <section className={Style.about_section}>
        <motion.div 
        initial={{ x: "50%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1], delay: 0.4 }}
        className={Style.about_content}>
            <h2>Sobre nós</h2>
            <p>
                elementum erat sit amet rutrum vestibulum. Nullam odio tortor, vulputate 
                semper hendrerit et, scelerisque a arcu. Aliquam ultricies rhoncus molestie. 
                Donec tortor nisi, posuere a efficitur et, auctor a libero. Pellentesque urna 
                massa, rhoncus vitae lacus vitae, rutrum hendrerit quam. Nulla ac aliquam ipsum. 
                Pellentesque quis eros eu libero elementum laoreet.
            </p>
        </motion.div>
    </section>
);
}


export default About;