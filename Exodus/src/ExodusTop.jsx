import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./login/Login.module.css";
import profilePic from "./assets/user-icon.png"; 
import Avatar from "./assets/avatar.png"; 
import { logoutUsuario } from "./js/login e perfil/logout.js";
import { carregarPerfil } from "./js/login e perfil/perfil.js"; // mesmo que você usa no Perfil

function ExodusTop() {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({ roles: [], nome: "", foto: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // pegar token

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLogged(false);
        return;
      }

      try {
        const data = await carregarPerfil(token); // busca direto do backend
        setUserData({
          ...data,
          roles: data.roles || [],
        });
        setIsLogged(true);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setIsLogged(false);
      }
    };

    fetchUser();
  }, [token]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    const result = await logoutUsuario();
    if (result.success) {
      navigate("/");
    } else {
      alert("Erro ao fazer logout: " + result.message);
    }
  };

  const isAdmin = userData.roles?.some(role => role.name?.toUpperCase() === "ADMIN");
  const isSecretary = userData.roles?.some(role => role.name?.toUpperCase() === "SECRETARY");
  return (
    <header className={Style.login_header}>
      <Link to="/perfil" className={Style.hyperText}>
        <h1><strong>SCX</strong></h1>
      </Link>

      <div className={Style.headerRight}>
        {isLogged  && (
          <div className={Style.addButtonWrapper}>
            <button className={Style.addButton} onClick={toggleMenu}></button>
            {menuOpen && (
              <div className={Style.addMenu}>
                
                {
                //SE FOR ADM
                isAdmin&&(
                <>
                <p
                  onClick={() => {
                    navigate("/registerLaboratory");
                    setMenuOpen(false);
                  }}
                >
                  Cadastrar laboratório
                </p>

                <p
                  onClick={() => {
                    navigate("/checkDoctor");
                    setMenuOpen(false);
                  }}
                >
                  Cadastrar Médico
                </p>

                <p
                  onClick={() => {
                    navigate("/registerSecretaria");
                    setMenuOpen(false);
                  }}
                >
                  Cadastrar Secretaria
                </p>
                <p
                  onClick={() => {
                    navigate("/selectAll/doctor");
                    setMenuOpen(false);
                  }}
                >
                  Ver Médicos
                </p>
                <p
                  onClick={() => {
                    navigate("/selectAll/lab");
                    setMenuOpen(false);
                  }}
                >
                  Ver Laboratórios
                </p>
                </>
                
                )}

                {


                //SE FOR SECRETARIA
                isSecretary&&(
                <>
                <p
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                >
                  Cadastrar Paciente
                </p>

                <p
                  onClick={() => {
                    navigate("/registerConsulta");
                    setMenuOpen(false);
                  }}
                >
                  Abrir Consulta
                </p>
                <p
                  onClick={() => {
                    navigate("/selectAll/patient");
                    setMenuOpen(false);
                  }}
                >
                  Ver Pacientes
                </p>

                <p
                  onClick={() => {
                    navigate("/selectAll/doctorAval");
                    setMenuOpen(false);
                  }}
                >
                  Ver Médicos Disponíveis
                </p>
                </>
                
                )}
                <p
                  className={Style.logout}
                  onClick={() => handleLogout()}
                >
                  Fazer Logout
                </p>
              </div>
            )}
          </div>
        )}

        <div
          className={Style.user_icon}
          onClick={() => { if (isLogged) navigate("/perfil"); }}
          style={{ cursor: isLogged ? "pointer" : "default" }}
        >
          <img src={userData.foto || Avatar} alt="Usuário" />
        </div>
      </div>
    </header>
  );
}

export default ExodusTop;
