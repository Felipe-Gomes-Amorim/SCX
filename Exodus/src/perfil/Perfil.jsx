import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import Avatar from "../assets/avatar.png";
import axios from "axios";
import { logoutUsuario } from "../js/logout.js";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [userData, setUserData] = useState({
    nome: "",
    role: "",
    cpf: "",
    id: "",
    foto: "",
    instituicao_vinc: "",
    email: "",
  });

  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome") || "Usuário";
    const role = localStorage.getItem("role") || "paciente";
    const cpf = localStorage.getItem("cpf") || "";
    const id = localStorage.getItem("id") || "";
    const foto = localStorage.getItem("foto") || Avatar;

    setUserData((prev) => ({ ...prev, nome, role, cpf, id, foto }));

    if (!token || !id) {
      setErrorMsg("Usuário não autenticado. Faça login novamente.");
      setLoading(false);
      return;
    }

    //Função pra carregar o perfil
    const carregarPerfil = async () => {
      try {
        const perfilResponse = await axios.get(`http://127.0.0.1:3333/paciente/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const paciente = perfilResponse.data;

        setUserData({
          nome: paciente.nome,
          cpf: paciente.cpf,
          id: id,
          foto,
          role,
          instituicao_vinc: paciente.instituicao_vinc,
          email: paciente.email,
        });

        // Buscar exames
        try {
          const examesResponse = await axios.get(
            `http://127.0.0.1:3333/examesPac/${paciente.cpf}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setExames(examesResponse.data);
        } catch (err) {
          console.error("Erro ao carregar exames:", err.response?.data || err.message);
          setErrorMsg("Erro ao carregar exames.");
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error.response?.data || error.message);
        setErrorMsg("Erro ao carregar perfil.");
      } finally {
        setLoading(false);
      }
    };

    carregarPerfil();
  }, []);

  //Função de LOGOUT
  const handleLogout = async () => {
    
                        //chama a função logoutUsuario que tá em logout.js
    const result = await logoutUsuario();
    if (result.success) {
      // redireciona pra tela inicial
      navigate("/"); 
    } else {
      alert("Erro ao fazer logout: " + result.message);
    }
  };

  

  if (loading) {
    return (
      <div className={Style.perfil_page}>
        <ExodusTop />
        <main className={Style.main_area}>
          <p>Carregando informações...</p>
        </main>
        <Footer />
      </div>
    );
  }

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
            <p>{userData.email}</p>
            <button className={Style.edit_btn}>Editar Perfil</button>
            <button
              className={Style.edit_btn}
              style={{ marginTop: "8px" }}
              onClick={handleLogout}
            
            >
              Logout
            </button>
            
          </aside>

          {/* Conteúdo principal */}
          <main className={Style.main_area}>
            {errorMsg ? (
              <p style={{ color: "red" }}>{errorMsg}</p>
            ) : (
              <>
                {/* Área do usuário */}
                <section className={Style.section}>
                  <h2>Área do {userData.role}</h2>
                  <p>
                    <strong>Instituição:</strong> {userData.instituicao_vinc || "—"}
                  </p>
                  <p>
                    <strong>CPF:</strong> {userData.cpf}
                  </p>

                  <h3 style={{ marginTop: "20px" }}>Laudos disponíveis</h3>

                  {exames.length === 0 ? (
                    <p>Nenhum exame disponível.</p>
                  ) : (
                    <div className={Style.laudos}>
                      {exames.map((exame, i) => (
                        <div key={i} className={Style.laudo_card}>
                          <h4>{exame.tipo}</h4>
                          <p>Status: {exame.status}</p>
                          <button className={Style.btn}>Abrir</button>
                        </div>
                      ))}
                    </div>
                  )}
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
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
