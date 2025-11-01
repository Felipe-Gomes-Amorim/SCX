import React from "react";
import Style from "./Sobre.module.css"; // Crie o CSS para estilizar a página
import Header from "./Header.jsx";
import Footer from "./Footer.jsx"

export default function Sobre() {
  return (
    
    <div className={Style.sobre_page}>
      <Header/>
    
      <main className={Style.main_area}>
        <h1>Sobre Nós</h1>

        <section className={Style.section}>
          <h2>Objetivo do Projeto</h2>
          <p>
            O SCX é um sistema que unifica requisições e devoluções de exames,
            tornando o processo prático, simples e transparente. Pacientes têm
            acesso a seus exames, enquanto profissionais de saúde e laboratórios
            podem gerenciar todo o fluxo de forma integrada.
          </p>
        </section>

        <section className={Style.section}>
          <h2>Funcionalidades Principais</h2>
          <ul>
            <li>Cadastrar e gerenciar laboratórios vinculados a clínicas.</li>
            <li>Cadastrar e gerenciar médicos em clínicas.</li>
            <li>Visualizar listas de médicos e laboratórios ativos.</li>
            <li>Controle de exames para pacientes e profissionais de saúde.</li>
          </ul>
        </section>

        <section className={Style.section}>
          <h2>Equipe e Colaboradores</h2>
          <p>
            Este projeto foi desenvolvido por Felipe Gomes, Guilherme de Almeida, Eduardo Darwich e Henry Geraldes,
             com foco em melhorar a gestão de exames em
            clínicas e laboratórios.
          </p>
        </section>
      </main>

      <Footer/>
    </div>
  );
}
