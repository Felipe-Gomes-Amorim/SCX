import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { profileAdm } from "../js/profiles/profile_adm.js";
import { profileDoctor } from "../js/profiles/profile_medico.js";
import { profilePatient } from "../js/profiles/profile_paciente.js";
import { profileSecretary } from "../js/profiles/profile_secretaria.js";

import Style from "./profile.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { role } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {


            console.log(role)
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
                        alert("Nenhum tipo de usuário encontrado no localStorage!");
                        navigate("/home")
                        return;
                }

                console.log("Dados recebidos da API:", data);
                setProfile(data)
            } catch (err) {
                console.error("Erro ao carregar perfil:", err);
                setLoading(false);
            }
        }

        getProfile();
    }, [navigate]);


    const handleUpdate = () => {
        navigate("/updateProfile");
    };

    if (!profile) {
        return (
            <div className={Style.profilePage}>
                <ExodusTop />
                <div className={Style.loadingContainer}>
                    <p>Carregando informações do perfil...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={Style.profilePage}>
            <ExodusTop />
            <div className={Style.profileContainer}>
                <h2>Informações do Usuário</h2>
                <div className={Style.profileCard}>
                    {role === "Adm" && (
                        <>
                            <p><strong>Nome:</strong> {profile.name}</p>
                            <p><strong>CPF:</strong> {profile.cpf}</p>
                            <p><strong>Telefone:</strong> {profile.telephone}</p>
                            <p><strong>Clínica:</strong> {profile.clinicN}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                        </>
                    )}

                    {role === "Doctor" && (
                        <>
                            <p><strong>Nome:</strong> {profile.name}</p>
                            <p><strong>CRM:</strong> {profile.crm}</p>
                            <p><strong>Telefone:</strong> {profile.telephone}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                        </>
                    )}

                    {role === "Patient" && (
                        <>
                            <p><strong>Nome:</strong> {profile.name}</p>
                            <p><strong>Data de Nascimento:</strong> {profile.dateBirth}</p>
                            <p><strong>CPF:</strong> {profile.cpf}</p>
                            <p><strong>Telefone:</strong> {profile.telephone}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                        </>
                    )}

                    {role === "Secretary" && (
                        <>
                            <p><strong>Nome:</strong> {profile.name}</p>
                            <p><strong>CPF:</strong> {profile.cpf}</p>
                            <p><strong>Telefone:</strong> {profile.telephone}</p>
                            <p><strong>Clínica:</strong> {profile.clinicN}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                        </>
                    )}
                </div>

                <button className={Style.updateButton} onClick={handleUpdate}>
                    Atualizar Dados
                </button>
            </div>
            <Footer />
        </div>
    );
}
