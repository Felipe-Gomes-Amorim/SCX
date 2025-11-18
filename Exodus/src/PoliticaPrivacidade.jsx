// PoliticaPrivacidade.jsx
import React from "react";
import Style from "./PoliticaPrivacidade.module.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import { motion } from "framer-motion";

export default function PoliticaPrivacidade() {
  return (
    <div className={Style.page}>
      <Header />

      <main className={Style.main_area}>
        <h1>Política de Privacidade</h1>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 1 - INFORMAÇÕES GERAIS</h2>
          <p>
            A presente Política de Privacidade descreve como ocorre a coleta, uso,
            armazenamento, tratamento e proteção dos dados pessoais dos usuários e
            visitantes do site SCX – Sistema de Controle de Exames. O objetivo é
            garantir transparência quanto ao tratamento das informações, informando
            quais dados são coletados, por qual motivo são utilizados e como o
            usuário pode gerenciar seus dados pessoais.
            <br /><br />
            O presente documento foi elaborado em conformidade com a Lei Geral de
            Proteçâo de Dados Pessoais (Lei 13.709/18), o Marco Civil da Internet
            (Lei 12.965/14) (e o Regulamento da UE n. 2016/6790). Ainda, o
            documento poderá ser atualizado em decorrência de eventual atualização
            normativa, razão pela qual se convida o usuário a consultar
            periodicamente esta seção.
          </p>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 2 - COMO RECOLHEMOS OS DADOS</h2>
          <p>Os dados pessoais são recolhidos da seguinte forma:</p>
          <ul>
            <li>
              <strong>Cadastro no sistema:</strong> nome completo, e-mail e demais
              informações necessárias.
            </li>
            <li>
              <strong>Navegação no site:</strong> páginas visitadas, IP, navegador,
              origem da visita, entre outros.
            </li>
          </ul>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 3 - QUAIS DADOS COLETAMOS?</h2>
          <ul>
            <li><strong>Dados de cadastro:</strong> nome, e-mail etc.</li>
            <li>
              <strong>Dados sensíveis:</strong> dados clínicos como tipo sanguíneo,
              histórico de doenças, resultados de exames, entre outros.
            </li>
          </ul>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 3 - FINALIDADE DO USO DOS DADOS</h2>
          <ul>
            <li>Aprimorar serviços, suporte e experiência do usuário.</li>
            <li>Melhorias técnicas e de usabilidade da plataforma.</li>
            <li>Análises comportamentais e de uso.</li>
            <li>Acesso a funcionalidades restritas.</li>
            <li>
              Dados clínicos para execução dos serviços, emissão de prontuários e
              cumprimento de obrigações legais.
            </li>
          </ul>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 4 - ARMAZENAMENTO DOS DADOS</h2>
          <p>
            Os dados são armazenados pelo tempo necessário para cumprimento das
            finalidades desta política, conforme a Lei 13.709/18. Podem ser
            removidos ou anonimizados a pedido, exceto nos casos previstos em lei.
          </p>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 5 - SEGURANÇA</h2>
          <p>
            Medidas técnicas são aplicadas para proteger os dados. Não nos
            responsabilizamos por culpa exclusiva de terceiros (ataques hacker) ou
            do próprio usuário. Em caso de violação, o usuário será informado.
          </p>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 6 - COMPARTILHAMENTO</h2>
          <p>
            Os dados são compartilhados apenas com clínicas e laboratórios
            vinculados ao sistema SCX, conforme necessário para execução dos
            serviços.
          </p>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 7 – COOKIES</h2>
          <p>
            Cookies são usados para registrar dados de navegação. O usuário pode
            desativá-los no navegador, mas isso pode impactar funcionalidades.
          </p>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 8 - CONSENTIMENTO</h2>
          <p>
            Ao utilizar a plataforma, o usuário consente com esta política. O
            consentimento pode ser retirado a qualquer momento pelo e-mail:
            admscx@gmail.com.
          </p>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 9 - ALTERAÇÕES DA POLÍTICA</h2>
          <p>
            A Política de Privacidade pode ser alterada a qualquer momento, com
            efeito imediato após publicação. O uso contínuo implica concordância.
          </p>
        </motion.section>

        <motion.section className={Style.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
          <h2>SEÇÃO 10 – JURISDIÇÃO</h2>
          <p>
            O foro competente para resolver eventuais conflitos será o da comarca
            onde se encontra a sede da empresa, conforme legislação brasileira.
          </p>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
