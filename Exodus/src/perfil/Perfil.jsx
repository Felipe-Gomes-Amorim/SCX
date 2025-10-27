import React, { useEffect, useState } from "react";
import Style from "./Perfil.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import Avatar from "../assets/avatar.png";
import axios from "axios";
import { logoutUsuario } from "../js/login e perfil/logout.js";
import { useNavigate } from "react-router-dom";
import { carregarPerfil } from "../js/login e perfil/perfil.js"; 

import AdmArea from "./AdmArea.jsx";
import MedicoArea from "./MedicoArea.jsx";
import SecretariaArea from "./SecretArea.jsx";
import ConsultArea from "./ConsultArea.jsx";
import LabArea from "./LabArea.jsx";
import PacienteArea from "./PacientArea.jsx";
import SuporteArea from "./SuportArea.jsx";

export default function Perfil() {
  const [userData, setUserData] = useState({
    nome: "",
    roles: "",
    cpf: "",
    id: "",
    foto: "",
    instituicao_vinc: "",
    email: "",
  });
  const token = localStorage.getItem("token");
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
 
  useEffect(() => {
  const foto = Avatar;
  const fetchPerfil = async () => {
    
    if (!token) {
      navigate("/login"); // não está logado
      return;
    }

    try {
      const data = await carregarPerfil(token); // aguarda o retorno
      setUserData({
        ...data,
        roles: data.roles || []
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMsg("Erro ao carregar perfil.");
      localStorage.clear();
      navigate("/login");
      setLoading(false);
    }
  };
  

  fetchPerfil();
}, [token]);


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
              src={userData.foto || Avatar}
              alt="Foto de perfil"
              className={Style.avatar}
            />
            <h3>{userData.nome}</h3>
            <p>{userData.email}</p>
            <button className={Style.edit_btn}>Ver meus dados</button>
            <button
              className={Style.logout_btn}
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
                {userData.roles?.some(role => role.name === "Doctor") && (
                  
                <ConsultArea/>
                )}

                {userData.roles?.some(role => role.name === "Doctor") && (
                 
                <MedicoArea/>
                
                )}
                {userData.roles?.some(role => role.name === "Admin") && (
                 
                <AdmArea/>
                
                )}
                {userData.roles?.some(role => role.name === "LaboratoryAdmin") && (
               
                <LabArea/>
                
                )}

                {userData.roles?.some(role => role.name === "Patient") && (
               
                <PacienteArea/>
                
                )}
                
                {userData.roles?.some(role => role.name === "Secretary") && (
             
                <SecretariaArea/>
                
                )}
                {userData.roles?.some(role => role.name === "Support") && (
             
                <SuporteArea/>
                
                )}

                
                {/* Área do usuário */}
                <section className={Style.section}>
                  <h2>Área do Usuário</h2>
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
