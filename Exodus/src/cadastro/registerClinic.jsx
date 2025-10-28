import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./registerClinic.module.css";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import { cadastrarClinica } from "../js/registros/cadastrar_clinica.js";
import { cadastrarAdm } from "../js/registros/cadastrate_adm.js";
import ActionButton from "../assents_link/ActionButton.jsx";

export default function RegisterClinic() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    address: "",
    telephone: "",
    clinicaAdm: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const clinicaData = {
        name: formData.name,
        cnpj: formData.cnpj,
        telephone: formData.telephone,
        address: formData.address,
      };
      const admClinicaData = {
        name: formData.clinicaAdm,
        email: formData.email,
        cnpj: formData.cnpj,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarClinica(clinicaData, token);

      if (result.success) {
        alert("Clínica cadastrada com sucesso!");

        const result2 = await cadastrarAdm(admClinicaData, token);
        if (result2.success) {
          alert("Administrador cadastrado com sucesso!");
          navigate("/");
        }
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
      }
    } catch (err) {
      setErrorMessage("Falha ao se conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className={Style.registerContainer}>
        <Header />

        <div className={Style.registerCard}>
          {/* Painel esquerdo - formulário */}
          <motion.div
            className={Style.leftPanel}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2>Cadastro de Clínica</h2>
            <p className={Style.subtitle}>
              Preencha os dados da clínica e do administrador responsável
            </p>

            <form onSubmit={handleSubmit}>
              {/* Seção da Clínica */}
              <h3 className={Style.sectionTitle}>Dados da Clínica</h3>
              <div className={Style.divider}></div>

              <div className={Style.formGrid}>
                <input name="name" placeholder="Nome da Clínica" required onChange={handleChange} />
                <input name="cnpj" placeholder="CNPJ" required onChange={handleChange} />
                <input name="address" placeholder="Endereço" required onChange={handleChange} />
                <input name="telephone" placeholder="Telefone" required onChange={handleChange} />
              </div>

              {/* Seção do ADM */}
              <h3 className={Style.sectionTitle}>Administrador da Clínica</h3>
              <div className={Style.divider}></div>

              <div className={Style.formGrid}>
                <input name="clinicaAdm" placeholder="Nome do ADM" required onChange={handleChange} />
                <input name="email" type="email" placeholder="Email do ADM" required onChange={handleChange} />
              </div>

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <div className={Style.buttonArea}>
                <ActionButton text="Cadastrar" loading={loading} />
              </div>
            </form>
          </motion.div>

          {/* Painel direito - texto informativo */}
          <motion.div
            className={Style.rightPanel}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2>Bem-vindo!</h2>
            <p>
              Cadastre a clínica e o administrador responsável de forma rápida e segura.  
              Os dados serão vinculados automaticamente ao sistema.
            </p>
          </motion.div>
        </div>

       
      </div>
       <Footer />
    </>
  );
}
