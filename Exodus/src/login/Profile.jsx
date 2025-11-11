import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IMaskInput } from "react-imask";
import Style from "./Profile.module.css";
import { updateProfile } from "../js/profiles/updateProfile.js";

import { profileAdm } from "../js/profiles/profile_adm.js";
import { profileDoctor } from "../js/profiles/profile_medico.js";
import { profilePatient } from "../js/profiles/profile_paciente.js";
import { profileSecretary } from "../js/profiles/profile_secretaria.js";
import { useToast } from "../context/ToastProvider.jsx";

const profileLoaders = {
  Admin: profileAdm,
  Doctor: profileDoctor,
  Patient: profilePatient,
  Secretary: profileSecretary,
};

const profileFields = {
  Admin: [
    { label: "CPF", key: "cpf", editable: true },
    { label: "Telefone", key: "telephone", editable: true },
    { label: "Clínica", key: "clinicN", editable: false },
  ],
  Doctor: [
    { label: "CRM", key: "crm", editable: false },
    { label: "Telefone", key: "telephone", editable: true },
  ],
  Patient: [
    { label: "Data de Nascimento", key: "dateBirth", editable: false },
    { label: "CPF", key: "cpf", editable: false },
    { label: "Telefone", key: "telephone", editable: true },
  ],
  Secretary: [
    { label: "CPF", key: "cpf", editable: false },
    { label: "Telefone", key: "telephone", editable: true },
    { label: "Clínica", key: "clinicN", editable: false },
  ],
};

export default function ProfileModal({ role, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [missingData, setMissingData] = useState(false); // ← Novo estado

  const token = localStorage.getItem("token");
  const { showToast } = useToast();

  useEffect(() => {
    async function getProfile() {
      const loader = profileLoaders[role];
      if (!loader) {
        console.error("Tipo de usuário desconhecido:", role);
        setLoading(false);
        return;
      }

      try {
        const data = await loader();
        if (data?.success) {
          const userData = data.data;
          setProfile(userData);

          // ← Verifica se tem campos obrigatórios não preenchidos
          const fields = profileFields[role] || [];
          const hasMissing = fields.some(
            ({ key }) => !userData[key] || userData[key].toString().trim() === ""
          );
          setMissingData(hasMissing);

          // Se tiver campos faltando, já habilita edição automaticamente
          if (hasMissing) setEditing(true);
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

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);

    // remove formatação antes de enviar
    const cleanProfile = {
      ...profile,
      cpf: profile.cpf?.replace(/\D/g, ""),
      telephone: profile.telephone?.replace(/\D/g, ""),
    };

    const result = await updateProfile(role, cleanProfile, token);
    setSaving(false);

    if (result.success) {
      setEditing(false);
      setMissingData(false); // ← depois de salvar, remove alerta
      showToast("Perfil atualizado com sucesso!");
    } else {
      showToast("" + result.message);
    }
  };

  const renderFields = () => {
    const fields = profileFields[role] || [];
    return fields.map(({ label, key, editable }) => {
      const value = profile[key] || "";
      const isCPF = key === "cpf";
      const isPhone = key === "telephone";

      return (
        <p key={key}>
          <strong>{label}:</strong>{" "}
          {editing && editable ? (
            isCPF ? (
              <IMaskInput
                mask="000.000.000-00"
                value={value}
                onAccept={(v) => handleChange(key, v)}
                className={Style.inputField}
              />
            ) : isPhone ? (
              <IMaskInput
                mask="(00) 00000-0000"
                value={value}
                onAccept={(v) => handleChange(key, v)}
                className={Style.inputField}
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className={Style.inputField}
              />
            )
          ) : value ? (
            value
          ) : (
            <i style={{ color: "#888" }}>Não informado</i>
          )}
        </p>
      );
    });
  };

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

        {/* ⚠️ Nova mensagem de alerta se tiver dados faltando */}
        {missingData && (
          <p style={{ color: "#c0392b", fontWeight: "bold", marginBottom: "10px" }}>
            Alguns dados estão incompletos. Por favor, preencha as informações restantes abaixo.
          </p>
        )}

        {renderFields()}

        {editing ? (
          <button className={Style.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Atualizar"}
          </button>
        ) : (
          <button className={Style.editBtn} onClick={() => setEditing(true)}>
            Atualizar Dados
          </button>
        )}

        <button className={Style.closeBtn} onClick={onClose}>
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
}
