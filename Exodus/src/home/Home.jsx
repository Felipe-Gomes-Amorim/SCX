import React, { useEffect, useState } from "react";
import Style from "./home.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import Avatar from "../assets/avatar.png";
import axios from "axios";
import { logoutUsuario } from "../js/login e home/logout.js";
import { useNavigate } from "react-router-dom";
import { carregarhome } from "../js/login e home/home.js";

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


export default function home() {
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
    const fetchhome = async () => {

      if (!token) {
        navigate("/login"); // não está logado
        return;
      }

      try {
        const data = await carregarhome(token); // aguarda o retorno
        setUserData({
          ...data,
          roles: data.roles || []
        });
        console.log(data);
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
  // Dentro do componente home()
  const handleViewProfile = () => {
    const role = userData.roles?.[0]?.name;
    
    console.log(role)
    navigate("/profile/"+role);
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
          {/* Coluna lateral esquerda */}
          <aside className={Style.sidebar}>
            <img
              src={userData.foto || Avatar}
              alt="Foto de home"
              className={Style.avatar}
            />
            <h3>{userData.nome}</h3>
            <p>{userData.email}</p>
            <button
              className={Style.edit_btn}
              onClick={handleViewProfile}
            >
              Ver meus dados
            </button>

            <button
              className={Style.logout_btn}

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
              <div className={Style.mainLayout}>
                {/* Área principal (Admin, Médico, etc.) */}
                <div className={Style.mainContent}>
                  {userData.roles?.some(role => role.name === "Admin") ? (
                    <><SelectMedLab /><AdmArea /></>
                  ) : userData.roles?.some(role => role.name === "Support") ? (
                    <SuporteArea />
                  ) : (
                    <>
                      {userData.roles?.some(role => role.name === "Doctor") && <><ExamsReturn /><MedicoArea /></>}
                      {userData.roles?.some(role => role.name === "Patient") && <><ExamsReturnPacList /><PacienteArea /></>}
                      {userData.roles?.some(role => role.name === "Secretary") && <><PatientList /><SecretariaArea /></>}
                      {userData.roles?.some(role => role.name === "LaboratoryAdmin") && <LabArea />}
                    </>
                  )}
                </div>

                {/* Painel lateral direito */}
                <div className={Style.rightColumn}>
                  {userData.roles?.some(role => role.name === "Doctor") && (

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
