import React, { useEffect, useState } from "react";
import { profileAdm } from "../js/profiles/profile_adm.js";
import { profileDoctor } from "../js/profiles/profile_medico.js";
import { profilePatient } from "../js/profiles/profile_paciente.js";
import { profileSecretary } from "../js/profiles/profile_secretaria.js";
import Style from "./Profile.module.css";

export default function ProfileCard({ role }) {
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

  if (loading) return <p>Carregando dados do perfil...</p>;
  if (!profile) return <p>Não foi possível carregar os dados do perfil.</p>;

  return (
    <div className={Style.profileCard}>
      <h3>Dados do Usuário</h3>
      {role === "Admin" && (
        <>
          
          <p><strong>CPF:</strong> {profile.cpf}</p>
          <p><strong>Telefone:</strong> {profile.telephone}</p>
          <p><strong>Clínica:</strong> {profile.clinicN}</p>
          
        </>
      )}
      {role === "Doctor" && (
        <>
          <p><strong>CRM:</strong> {profile.crm}</p>
          <p><strong>Telefone:</strong> {profile.telephone}</p>
        </>
      )}
      {role === "Patient" && (
        <>
          
          <p><strong>Data de Nascimento:</strong> {profile.dateBirth}</p>
          <p><strong>CPF:</strong> {profile.cpf}</p>
          <p><strong>Telefone:</strong> {profile.telephone}</p>
          
        </>
      )}
      {role === "Secretary" && (
        <>
          
          <p><strong>CPF:</strong> {profile.cpf}</p>
          <p><strong>Telefone:</strong> {profile.telephone}</p>
          <p><strong>Clínica:</strong> {profile.clinicN}</p>
         
        </>
      )}
    </div>
  );
}
