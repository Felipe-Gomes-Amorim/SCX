import React, { useEffect, useState } from "react";
import { profileAdm } from "../js/profiles/profile_adm.js";
import { profileDoctor } from "../js/profiles/profile_medico.js";
import { profilePatient } from "../js/profiles/profile_paciente.js";
import { profileSecretary } from "../js/profiles/profile_secretaria.js";
import Style from "./Profile.module.css";

import { motion } from "framer-motion";

export default function ProfileModal({ role, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      try {
        let data;
        switch (role) {
          case "Admin":
            data = await profileAdm();
            break;
          case "Doctor":
            data = await profileDoctor();
            break;
          case "Patient":
            data = await profilePatient();
            break;
          case "Secretary":
            data = await profileSecretary();
            break;
          default:
            console.error("Tipo de usuário desconhecido:", role);
            return;
        }

        if (data && data.success) {
          setProfile(data.data);
        } else {
          console.error("Erro: formato de dados inesperado", data);
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [role]);

  if (loading)
    return (
      <div className={Style.backdrop}>
        <div className={Style.modal}>
          <p>Carregando dados do perfil...</p>
        </div>
      </div>
    );

  if (!profile)
    return (
      <div className={Style.backdrop}>
        <div className={Style.modal}>
          <p>Não foi possível carregar os dados do perfil.</p>
          <button className={Style.closeBtn} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );

  return (
    <motion.div
      className={Style.backdrop}
      onClick={onClose}
      initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.3)" }}
      exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className={Style.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <h3>Dados do Usuário</h3>

        {role === "Admin" && (
          <>
            <p>
              <strong>CPF:</strong>{" "}
              {profile.cpf ? profile.cpf : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
            <p>
              <strong>Telefone:</strong>{" "}
              {profile.telephone ? profile.telephone : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
            <p>
              <strong>Clínica:</strong>{" "}
              {profile.clinicN ? profile.clinicN : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
          </>
        )}

        {role === "Doctor" && (
          <>
            <p>
              <strong>CRM:</strong>{" "}
              {profile.crm ? profile.crm : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
            <p>
              <strong>Telefone:</strong>{" "}
              {profile.telephone ? profile.telephone : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
          </>
        )}

        {role === "Patient" && (
          <>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {profile.dateBirth ? profile.dateBirth : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
            <p>
              <strong>CPF:</strong>{" "}
              {profile.cpf ? profile.cpf : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
            <p>
              <strong>Telefone:</strong>{" "}
              {profile.telephone ? profile.telephone : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
          </>
        )}

        {role === "Secretary" && (
          <>
            <p>
              <strong>CPF:</strong>{" "}
              {profile.cpf ? profile.cpf : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
            <p>
              <strong>Telefone:</strong>{" "}
              {profile.telephone ? profile.telephone : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
            <p>
              <strong>Clínica:</strong>{" "}
              {profile.clinicN ? profile.clinicN : <i style={{ color: "#888" }}>Não informado</i>}
            </p>
          </>
        )}


        <button className={Style.closeBtn} onClick={onClose}>
          Fechar
        </button>


      </motion.div>
    </motion.div >
  );
}
