import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import Avatar from "../assets/avatar.png";
import axios from "axios";
import { logoutUsuario } from "../js/login e home/logout.js";
import { useNavigate } from "react-router-dom";
import { carregarhome } from "../js/login e home/home.js";
import { motion, AnimatePresence } from "framer-motion";

import ExamsReturn from "../select_all/ExamsReturn.jsx";
import AdmArea from "./AdmArea.jsx";
import MedicoArea from "./MedicoArea.jsx";
import SecretariaArea from "./SecretArea.jsx";
import ConsultArea from "./ConsultArea.jsx";
import LabArea from "./LabArea.jsx";
import PacienteArea from "./PacientArea.jsx";
import SuporteArea from "./SuportArea.jsx";
import HistoricoAtividade from "./HistoricoAtividade.jsx";
import ClinicaList from "../select_all/SelectClinics.jsx";
import ExamsReturnPacList from "../select_all/ExamsReturnPac.jsx";
import SelectMedLab from "../select_all/SelectMedLab.jsx";
import PatientList from "../select_all/PatientDoctorList.jsx";
import ProfileCard from "../login/Profile.jsx"; // ✅ Novo import

export default function Home() {
  const [userData, setUserData] = useState({
    nome: "",
    roles: "",
    cpf: "",
    id: "",
    foto: "",
    instituicao_vinc: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showProfile, setShowProfile] = useState(false); // ✅ controla exibição do perfil

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Carrega dados da home
  useEffect(() => {
    const fetchhome = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await carregarhome(token);
        setUserData({
          ...data,
          roles: data.roles || [],
        });
        console.log("Dados do usuário:", data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMsg("Erro ao carregar home.");
        localStorage.clear();
        navigate("/login");
        setLoading(false);
      }
    };

    fetchhome();
  }, [token, navigate]);

  // Logout
  const handleLogout = async () => {
    const result = await logoutUsuario();
    if (result.success) {
      navigate("/");
    } else {
      alert("Erro ao fazer logout: " + result.message);
    }
  };

  // Alterna exibição do perfil
  const handleViewProfile = () => {
    setShowProfile(!showProfile);
  };

  // Redireciona para página de edição
  const handleEditProfile = () => {

  };

  if (loading) {
    return (
      <div className={Style.home_page}>
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
      <div className={Style.home_page}>
        <ExodusTop />

        <div className={Style.home_content}>
          {/* Sidebar */}
          <aside className={Style.sidebar}>
            <img
              src={userData.foto || Avatar}
              alt="Foto de perfil"
              className={Style.avatar}
            />
            <h3>{userData.nome}</h3>
            <p>{userData.email}</p>

            {/* ✅ Exibe o perfil acima do botão */}
            <AnimatePresence>
              {showProfile && userData.roles?.[0]?.name && (
                <motion.div
                  key="profile-card"
                  initial={{ y: "-22%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-20%", opacity: 0 }}  // 🔹 animação ao fechar
                  transition={{
                    y: { duration: 1.2, ease: [0.25, 0.5, 0.25, 1] },   // 🔹 mais lenta ao abrir
                    opacity: { duration: 0.5, ease: "easeOut" },   
                    opacity: { duration: 0.5, ease: "easeIn" }      // 🔹 suaviza o fade-in
                  }}
                  className={Style.profileBox}
                >
                  <ProfileCard role={userData.roles[0].name} />

                  {/* Botão para editar dados */}
                  <button
                    className={Style.btn}
                    onClick={handleEditProfile}
                  >
                    Editar meus dados
                  </button>
                </motion.div>
              )}
              </AnimatePresence>
            <AnimatePresence>

            <motion.div 
            key="profile-card"
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            
            transition={{
              y: { duration: 0.4, ease: [0.25, 0.5, 0.25, 1] },   // 🔹 mais lenta ao abrir
              opacity: { duration: 0.5, ease: "easeOut" },         // 🔹 suaviza o fade-in
            }}>
            <button className={Style.edit_btn} onClick={handleViewProfile}>
              {showProfile ? "Fechar meus dados" : "Ver meus dados"}
            </button>

            <button className={Style.logout_btn} onClick={handleLogout}>
              Logout
            </button>
            </motion.div>
            </AnimatePresence>

          </aside>

          {/* Conteúdo principal */}
          <main className={Style.main_area}>
            {errorMsg ? (
              <p style={{ color: "red" }}>{errorMsg}</p>
            ) : (
              <div className={Style.mainLayout}>
                <div className={Style.mainContent}>
                  {userData.roles?.some((role) => role.name === "Admin") ? (
                    <>
                      <SelectMedLab />
                      <AdmArea />
                    </>
                  ) : userData.roles?.some(
                    (role) => role.name === "Support"
                  ) ? (
                    <SuporteArea />
                  ) : (
                    <>
                      {userData.roles?.some(role => role.name === "Doctor") && <><MedicoArea /><ExamsReturn /></>}
                      {userData.roles?.some(role => role.name === "Patient") && <><ExamsReturnPacList /></>}
                      {userData.roles?.some(role => role.name === "Secretary") && <><PatientList /><SecretariaArea /></>}
                      {userData.roles?.some(role => role.name === "LaboratoryAdmin") && <LabArea />}
                    </>
                  )}
                </div>

                {/* Coluna lateral direita */}
                <div className={Style.rightColumn}>
                  {userData.roles?.some((role) => role.name === "Doctor") && (
                    <ClinicaList />
                  )}
                  <HistoricoAtividade />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
