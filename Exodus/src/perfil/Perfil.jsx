import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import Avatar from "../assets/avatar.png"; 
import { excluirUsuario } from "../js/excluirUsuario.js";

export default function Perfil() {
  const [userData, setUserData] = useState({
    nome: "",
    role: "",
    cpf: "",
    id: "",
    foto: "",
  });

  useEffect(() => {
    // Busca dados do usuário armazenados no login
    const nome = localStorage.getItem("nome") || "Usuário";
    const role = localStorage.getItem("role") || "paciente";
    const cpf = localStorage.getItem("cpf") || "";
    const id = localStorage.getItem("id") || "";
    const foto = localStorage.getItem("foto") || Avatar;

    setUserData({ nome, role, cpf, id, foto });
  }, []);

  const handleExcluirPerfil = async () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
    );

    if (!confirmar) return;

    const result = await excluirUsuario();

    if (result.success) {
      alert(result.message);
      
      window.location.href = "/";
    } else {
      alert("Erro: " + result.message);
      if (result.message.includes("logado")) {
        navigate("/login"); 
      }
    }
  };


  return (
    <>
      <div className={Style.perfil_page}>
        <ExodusTop />

        <div className={Style.perfil_content}>
          {/* Coluna lateral esquerda */}
          <aside className={Style.sidebar}>
            <img
              src={userData.foto}
              alt="Foto de perfil"
              className={Style.avatar}
            />
            <h3>{userData.nome}</h3>
            <button className={Style.edit_btn}>Editar Perfil</button>
            <button
              className={Style.edit_btn}
              style={{ marginTop: "8px" }}
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
             <button
            id="btnExcluirPerfil"
            className={Style.edit_btn}
            onClick={handleExcluirPerfil}
          >
            Excluir Perfil
          </button>
          </aside>

          {/* Conteúdo principal */}
          <main className={Style.main_area}>
            {/* Área do usuário */}
            <section className={Style.section}>
              <h2>Área do {userData.role}</h2>
              <p>3 laudos disponíveis</p>

              <div className={Style.laudos}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className={Style.laudo_card}>
                    <h4>Teste de laudo {n}</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque ex tortor, malesuada sed sapien eget.
                    </p>
                    <button className={Style.btn}>Abrir</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Histórico de atividades */}
            <section className={Style.section}>
              <h2>Histórico de Atividade</h2>
              <div className={Style.activity}>
                <p>
                  <strong>Terça-Feira, 5 de Agosto de 2025</strong>
                  <br />
                  Requisição de exame enviada para laboratório X
                </p>
              </div>
              <div className={Style.activity}>
                <p>
                  <strong>Sexta-Feira, 1 de Agosto de 2025</strong>
                  <br />
                  Teste de laudo 3 recebido
                </p>
              </div>
              <button className={Style.btn}>Ver mais</button>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
