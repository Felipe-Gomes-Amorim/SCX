import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./login/Login.module.css";
import Avatar from "./assets/avatar.png";
import { logoutUsuario } from "./js/login e home/logout.js";
import { carregarhome } from "./js/login e home/home.js";
import { mostrar_todos } from "./js/mostrar_todos.js";
import { NotificationItem } from "./assents_link/NotificationItem.jsx";
import Sidebar from "./home/SideBar.jsx";

function ExodusTop() {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({ roles: [], nome: "", foto: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLogged(false);
        return;
      }

      try {
        const data = await carregarhome(token);
        setUserData({
          ...data,
          roles: data.roles || [],
        });
        setIsLogged(true);
      } catch (error) {
        console.error("Erro ao carregar home:", error);
        setIsLogged(false);
      }
    };

    fetchUser();
  }, [token]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const toggleNotifications = async () => {
    setNotificationsOpen(prev => !prev);
    if (!notificationsOpen) {
      const data = await mostrar_todos("notific", token);
      if (data && data.length > 0) {
        const sorted = data
          .sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate))
          .reverse();
        setNotifications(sorted.slice(0, 5));
      }
    }
  };

  const handleLogout = async () => {
    const result = await logoutUsuario();
    if (result.success) {
      navigate("/");
    } else {
      alert("Erro ao fazer logout: " + result.message);
    }
  };

  // Itens fixos do menu
  const fixedMenuItems = [
    { label: "Início", onClick: (navigate) => navigate("/home") },
    { label: "Ver Tickets", onClick: (navigate) => navigate("/selectAll/myTickets") },
    { label: "Fazer Logout", onClick: () => handleLogout() },
  ];

  // Itens dinâmicos com base na role
  const dynamicMenuItems = [];
  if (userData.roles?.some(role => role.name === "Admin")) {
    dynamicMenuItems.push(
      { label: "Gerenciar Médicos", onClick: (navigate) => navigate("/selectAll/doctor") },
      { label: "Gerenciar Laboratórios", onClick: (navigate) => navigate("/selectAll/lab") },
      { label: "Cadastrar Secretária", onClick: (navigate) => navigate("/registerSecretaria") }
    );
  }

  return (
    <>
      {/* Sidebar com itens fixos e dinâmicos */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        fixedMenuItems={fixedMenuItems}
        dynamicMenuItems={dynamicMenuItems}
      />

      <header className={Style.login_header}>
        {/* Seção esquerda: botão de menu */}
        <div className={Style.headerLeft}>
          {isLogged && (
            <div className={Style.addButtonWrapper}>
              <button className={Style.addButton} onClick={toggleSidebar}></button>
            </div>
          )}
        </div>

        {/* Seção direita: notificações e ícone do usuário */}
        <div className={Style.headerRight}>
          <div className={Style.addButtonWrapper}>
            <button className={Style.addButton2} onClick={toggleNotifications}></button>
            {notificationsOpen && (
              <div className={Style.addMenu}>
                <p><strong>Notificações</strong></p>
                {notifications.length === 0 ? (
                  <p>Nenhuma notificação</p>
                ) : (
                  notifications.map((item, index) => (
                    <NotificationItem
                      key={index}
                      item={item}
                      navigate={navigate}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div
            className={Style.user_icon}
            onClick={() => { if (isLogged) navigate("/home"); }}
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
