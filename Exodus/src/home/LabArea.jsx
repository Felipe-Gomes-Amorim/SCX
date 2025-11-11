import React, { useState } from "react";
import Style from "./home.module.css";
import RegisterLabUserModal from "../cadastro/registerLabUserModal.jsx";
import ClinicsLabList from "../select_all/ClinicsLabList.jsx"; 

export default function LabArea() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className={Style.section}>
      <h2>Área do Laboratório</h2>

      <div className={Style.subsection}>
       
        <ClinicsLabList />

        <button className={Style.btnFull} onClick={() => setShowModal(true)}>
          Registrar usuário do laboratório
        </button>
      </div>

      {showModal && <RegisterLabUserModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
