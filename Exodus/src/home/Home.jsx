import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import Avatar from "../assets/user-icon.png";
import axios from "axios";
import API_URL from "../js/apiConfig.js";

import { verificarStatusInstituicao } from "../js/verificarStatusInstituicao.js";

import { logoutUsuario } from "../js/login e home/logout.js";
import { useNavigate } from "react-router-dom";
import { carregarhome } from "../js/login e home/home.js";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastProvider.jsx";

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
import ProfileCard from "../login/Profile.jsx";
import ExamsRequests from "../select_all/ExamsRequest.jsx";
import LabAreaUser from "./LabAreaUser.jsx";
import ClinicsList from "../select_all/ClinicsList.jsx";

import ProfileModal from "../login/Profile.jsx";
import { getProfileByRole } from "../js/profiles/getProfileByRole.js";

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
  const [showProfile, setShowProfile] = useState(false);
  const { showToast } = useToast();


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

        const roleName = data.roles?.[0]?.name;

        // ✅ Nova verificação simplificada
        const ativo = await verificarStatusInstituicao(roleName, token);
        if (!ativo) {
          await logoutUsuario();
          showToast("A instituição vinculada à sua conta está desativada.");
          navigate("/login");
          return;
        }

        // 🚀 Depois de verificar ativação, checa os dados do perfil
        if (data.roles && data.roles.length > 0) {
          const profileData = await getProfileByRole(roleName);
          if (profileData) {
            const missingFields = Object.entries(profileData)
              .filter(([_, value]) => !value || value === "")
              .map(([key]) => key);

            if (missingFields.length > 0) {
              setShowProfile(true);
            }
          }
        }

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
      showToast("Erro ao fazer logout: " + result.message);
    }
  };

  // Alterna exibição do perfil
  const handleViewProfile = () => {
    setShowProfile(!showProfile);
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


            <AnimatePresence>
              {showProfile && userData.roles?.[0]?.name && (
                <motion.div
                  key="profile-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileModal
                    role={userData.roles[0].name}
                    onClose={() => setShowProfile(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>



            {/* Só mostra o botão "Ver meus dados" se NÃO for AdminSystem, LaboratoryUser ou LaboratoryAdmin */}
            {!userData.roles?.some((role) =>
              ["AdminSystem", "LaboratoryUser", "LaboratoryAdmin"].includes(role.name)
            ) && (
                <button className={Style.edit_btn} onClick={handleViewProfile}>
                  Ver meus dados
                </button>
              )}

            <button className={Style.logout_btn} onClick={handleLogout}>
              Logout
            </button>



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

                    </>
                  ) : userData.roles?.some(
                    (role) => role.name === "Support"
                  ) ? (
                    <SuporteArea />
                  ) : (
                    <>
                      {userData.roles?.some(role => role.name === "Doctor") && <><MedicoArea /></>}
                      {userData.roles?.some(role => role.name === "Patient") && <><ExamsReturnPacList /></>}
                      {userData.roles?.some(role => role.name === "Secretary") && <><PatientList /></>}
                      {userData.roles?.some(role => role.name === "LaboratoryAdmin") && <><LabArea></LabArea></>}
                      {userData.roles?.some(role => role.name === "LaboratoryUser") && <LabAreaUser></LabAreaUser>}
                      {userData.roles?.some(role => role.name === "AdminSystem") && <><AdmArea /><ClinicsList></ClinicsList></>}
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
