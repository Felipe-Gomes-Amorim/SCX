import React from "react";
import { motion } from "framer-motion";
import Style from "./PoliticaPrivacidade.module.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function TermosUso() {
  return (
    <div className={Style.termos_page}>
      <Header />

      <main className={Style.main_area}>
        <h1>Termos e Condições de Uso</h1>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            Estes Termos e Condições de Uso regulam o uso do site SCX – Sistema de Controle de Exames (“SCX”), desenvolvido e administrado por Henry Geraldes, Eduardo Darwich e Felipe Gomes. Qualquer pessoa que pretenda utilizar os Serviços deverá aceitar todos os termos aqui descritos.
          </p>
          <p>
            A aceitação destes Termos é indispensável para a utilização do aplicativo e dos Serviços prestados pelo Sistema “SCX”.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 01 – Dos Serviços</h2>
          <ul>
            <li>cadastrar, visualizar e gerenciar exames;</li>
            <li>acessar funcionalidades administrativas;</li>
            <li>utilizar recursos internos de acordo com permissões definidas.</li>
          </ul>
          <p>O SCX não realiza transações financeiras ou comercialização de produtos.</p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 02 – Cadastro dos Usuários</h2>
          <p>
            O Usuário deverá preencher o cadastro com informações verdadeiras, sendo responsável civil e criminalmente pelos dados fornecidos.
          </p>
          <p>
            O SCX reserva-se o direito de recusar ou suspender cadastros em desacordo com estes Termos.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 03 – Alterações nos Termos</h2>
          <p>
            O SCX poderá modificar estes Termos a qualquer momento. Caso o Usuário discorde, deverá manifestar-se em até 5 dias úteis.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 04 – Privacidade das Informações</h2>
          <p>
            Dados pessoais são armazenados com segurança, mas o SCX não se responsabiliza por ataques ou acessos indevidos realizados por terceiros.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 05 – Obrigações dos Usuários</h2>
          <ul>
            <li>usar o sistema apenas para fins lícitos;</li>
            <li>fornecer dados verdadeiros;</li>
            <li>não compartilhar conta;</li>
            <li>não tentar acessar áreas restritas;</li>
            <li>não utilizar o sistema para atos ilegais.</li>
          </ul>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 06 – Funcionamento do Sistema</h2>
          <p>
            O SCX é oferecido "como está", sem garantias de funcionamento contínuo ou compatibilidade com dispositivos específicos.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 07 – Propriedade Intelectual</h2>
          <p>Todo conteúdo do SCX é protegido e não pode ser copiado ou modificado sem autorização.</p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 08 – Práticas Vedadas</h2>
          <p>
            É proibido praticar atos ilícitos, violar direitos, divulgar dados pessoais ou ofender outros usuários. Violações podem gerar sanções.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 09 – Violação do Sistema</h2>
          <p>
            Tentativas de violação tornam o responsável sujeito a medidas legais e indenizações.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 10 – Penalidades</h2>
          <p>O SCX poderá advertir, suspender ou encerrar contas a qualquer momento.</p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 11 – Limitação de Responsabilidade</h2>
          <p>
            O SCX não se responsabiliza por falhas decorrentes de problemas técnicos do usuário ou de terceiros.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 12 – Legislação Aplicável</h2>
          <p>
            Estes Termos são regidos pelas leis brasileiras. O foro eleito é o da Comarca de Mogi das Cruzes, SP.
          </p>
        </motion.section>

        <motion.section className={Style.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seção 13 – Políticas de Retenção</h2>
          <p>
            Informamos que os dados pessoais e dados sensíveis fornecidos pelo paciente, incluindo informações clínicas e resultados de exames, serão armazenados e retidos pelo sistema pelo período necessário para cumprimento de obrigações legais, preservação do histórico de exames e garantia da disponibilidade futura dos resultados, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
          </p>
        </motion.section>

      </main>

      <Footer />
    </div>
  );
}
