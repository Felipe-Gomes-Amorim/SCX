import React, { useState } from "react";
import Style from "./home.module.css";
import DevolverExameModal from "../components/AreaLab/DevolverExameModal.jsx";
import { BiTestTube } from "react-icons/bi";
import { FaFileMedical } from "react-icons/fa";



export default function LabAreaUser() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className={Style.section}>
      <h2>
        <BiTestTube style={{ marginRight: 8 }} />
        Área do Usuário do Laboratório
      </h2>


      <div className={Style.subsection}>
        <button className={Style.btnFull} onClick={() => setShowModal(true)}>
          <FaFileMedical style={{ marginRight: 6 }} />
          Devolver exame
        </button>

      </div>

      {showModal && <DevolverExameModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
