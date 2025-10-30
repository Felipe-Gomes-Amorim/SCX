import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Sidebar.module.css";

function Sidebar({ isOpen, onClose, fixedMenuItems, dynamicMenuItems }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay com transição controlada por classe */}
      <div
        className={`${Style.overlay} ${isOpen ? Style.open : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar com transição controlada por classe */}
      <div
        className={`${Style.sidebar} ${isOpen ? Style.open : Style.closed}`}
      >
        <button className={Style.closeButton} onClick={onClose}>
          ×
        </button>

        {/* Menu fixo */}
        <ul className={Style.menuList}>
          {fixedMenuItems.map((item, index) => (
            <li key={index} className={Style.menuItem}>
              <button
                onClick={() => {
                  item.onClick(navigate);
                  onClose();
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Linha separadora e menu dinâmico */}
        {dynamicMenuItems.length > 0 && <hr className={Style.separator} />}

        {dynamicMenuItems.length > 0 && (
          <ul className={Style.menuList}>
            {dynamicMenuItems.map((item, index) => (
              <li key={index} className={Style.menuItem}>
                <button
                  onClick={() => {
                    item.onClick(navigate);
                    onClose();
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;
