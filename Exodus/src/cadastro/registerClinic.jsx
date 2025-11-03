import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./registerClinic.module.css";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import { cadastrarClinica } from "../js/registros/cadastrar_clinica.js";
import { buscarCep } from "../js/checarCep/buscarCep.js";
import { cadastrarAdm } from "../js/registros/cadastrate_adm.js";
import ActionButton from "../assents_link/ActionButton.jsx";
import { IMaskInput } from "react-imask";
import { validarCnpj } from "../js/validarCNPJ/validarCnpj.js";
import { style } from "framer-motion/client";



export default function RegisterClinic() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
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

    const cleanCNPJ = formData.cnpj.replace(/\D/g, "");
    const cleanPhone = formData.telephone.replace(/\D/g, "");

    // 🔹 Validação do CNPJ
    const cnpjStatus = await validarCnpj(cleanCNPJ);
    if (!cnpjStatus.valido) {
      setErrorMessage(`CNPJ inválido ou inativo`);
      setLoading(false);
      return;
    }

    try {
      const clinicaData = {
        name: formData.name,
        cnpj: cleanCNPJ,
        cep: formData.cep,
        logradouro: formData.logradouro,
        complemento: formData.complemento,
        bairro: formData.bairro,
        localidade: formData.localidade,
        uf: formData.uf,
        telephone: cleanPhone,
      };

      const admClinicaData = {
        name: formData.clinicaAdm,
        email: formData.email,
        cnpj: cleanCNPJ,
      };

      const token = localStorage.getItem("token");
      console.log("aqui chegou")
      const result = await cadastrarClinica(clinicaData, token);

      if (result.success) {
        alert("Clínica cadastrada com sucesso!");
        console.log("aqui chegou tambem")
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
        <div className={Style.clinic_page}>      
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
                <input
                  name="name"
                  placeholder="Nome da Clínica"
                  required
                  onChange={handleChange}
                />

                <IMaskInput
                  mask="00.000.000/0000-00"
                  name="cnpj"
                  placeholder="CNPJ"
                  required
                  value={formData.cnpj}
                  onAccept={(value) => setFormData((prev) => ({ ...prev, cnpj: value }))}
                />
                <div className={Style.formGrid}>
                  <div className={Style.cepGroup}>
                    <IMaskInput
                      mask="00000-000"
                      name="cep"
                      placeholder="CEP"
                      required
                      value={formData.cep}
                      onAccept={(value) => setFormData((prev) => ({ ...prev, cep: value }))}
                    />
                    <button
                      type="button"
                      className={Style.cepButton}
                      onClick={async () => {
                        const data = await buscarCep(formData.cep);
                        if (data) {
                          setFormData((prev) => ({ ...prev, ...data }));
                        } else {
                          alert("CEP não encontrado.");
                        }
                      }}
                    >
                      Confirmar CEP
                    </button>
                  </div>

                  <input name="logradouro" placeholder="Logradouro" value={formData.logradouro} onChange={handleChange} />
                  <input name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} />
                  <input name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} />
                  <input name="localidade" placeholder="Cidade" value={formData.localidade} onChange={handleChange} />
                  <input name="uf" placeholder="UF" value={formData.uf} onChange={handleChange} />
                </div>


                <IMaskInput
                  mask="(00) 00000-0000"
                  name="telephone"
                  placeholder="Telefone"
                  required
                  value={formData.telephone}
                  onAccept={(value) => setFormData((prev) => ({ ...prev, telephone: value }))}
                />
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

          {/* Painel direito - texto informativo 
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
          */}
        </div>


      </div>
      </div>
      <Footer />
    </>
  );
}
