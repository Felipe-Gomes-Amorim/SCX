import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./login/Login.module.css";
import Avatar from "./assets/user-icon.png";
import { logoutUsuario } from "./js/login e home/logout.js";
import { carregarhome } from "./js/login e home/home.js";
import { mostrar_todos } from "./js/mostrar_todos.js";
import Sidebar from "./home/SideBar.jsx";
import { useToast } from "./context/ToastProvider.jsx";


function ExodusTop() {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({ roles: [], nome: "", foto: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false); // 🆕 novo estado
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLogged(false);
        return;
      }

      try {
        const data = await carregarhome(token);
        setUserData({ ...data, roles: data.roles || [] });
        setIsLogged(true);
      } catch (error) {
        console.error("Erro ao carregar home:", error);
        setIsLogged(false);
      }
    };

    fetchUser();
  }, [token]);

  // 🆕 Verifica notificações não lidas sempre que a página recarregar
  useEffect(() => {
    const checkUnreadNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await mostrar_todos("notific", token);

        // se for uma lista e tiver 1+ notificações não lidas
        if (Array.isArray(response) && response.length > 0) {
          setHasUnread(true);
        } else {
          setHasUnread(false);
        }
      } catch (error) {
        console.error("Erro ao verificar notificações não lidas:", error);
      }
    };

    checkUnreadNotifications();
  }, []); // executa uma vez ao montar

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleNotifications = async () => navigate("/notification");

  const handleLogout = async () => {
    const result = await logoutUsuario();
    if (result.success) navigate("/");
    else showToast("Erro ao fazer logout: " + result.message);
  };

  // Itens fixos do menu
  const fixedMenuItems = [
    { label: "Início", onClick: (navigate) => navigate("/home") },
    { label: "Fazer Logout", onClick: () => handleLogout() },
  ];

  // Itens dinâmicos
  const dynamicMenuItems = [];
  if (userData.roles?.some((role) => role.name === "Admin")) {
    dynamicMenuItems.push(
      { label: "Cadastrar Secretária", onClick: (navigate) => navigate("/registerSecretaria") },
      { label: "Cadastrar Médico", onClick: (navigate) => navigate("/checkDoctor") },
      { label: "Cadastrar Laboratório", onClick: (navigate) => navigate("/checkLab") }
    );
  } else if (userData.roles?.some((role) => role.name === "Secretary")) {
    dynamicMenuItems.push({
      label: "Cadastrar Paciente",
      onClick: (navigate) => navigate("/register"),
    });
  }

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        fixedMenuItems={fixedMenuItems}
        dynamicMenuItems={dynamicMenuItems}
      />

      <header className={Style.login_header}>
        {/* Esquerda */}
        <div className={Style.headerLeft}>
          {isLogged && (
            <div className={Style.addButtonWrapper}>
              <button className={Style.addButton} onClick={toggleSidebar}></button>
            </div>
          )}
        </div>

        {/* Direita */}
        <div className={Style.headerRight}>
          <div className={Style.addButtonWrapper}>
            <button
              className={Style.addButton2}
              onClick={toggleNotifications}
              style={{
                backgroundImage: hasUnread
                  ? "url('src/assets/email2.png')" // 🆕 troca ícone se tiver notificações
                  : "url('src/assets/email.png')",
              }}
            ></button>
          </div>

          <div
            className={Style.user_icon}
            onClick={() => {
              if (isLogged) navigate("/home");
            }}
            style={{ cursor: isLogged ? "pointer" : "default" }}
          >
            <img src={userData.foto || Avatar} alt="Usuário" />
          </div>
        </div>
      </header>
    </>
  );
}

export default ExodusTop;
