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
import { useToast } from "../context/ToastProvider.jsx"; 

export default function RegisterClinic() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const { showToast } = useToast();

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

    // Validação do CNPJ
    const cnpjStatus = await validarCnpj(cleanCNPJ);
    if (!cnpjStatus.valido) {
      showToast("CNPJ inválido ou inativo", "error");
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

      const result = await cadastrarClinica(clinicaData, token);

      if (result.success) {
        showToast("Clínica cadastrada com sucesso!", "success", 2500);

        const result2 = await cadastrarAdm(admClinicaData, token);
        if (result2.success) {
          showToast("Administrador cadastrado com sucesso!", "success", 2500);
          navigate("/home");
        } else {
          showToast("Erro ao cadastrar administrador.", "error", 2500);
        }
      } else {
        showToast(result.message || "Erro ao cadastrar clínica.", "error", 2500);
      }
    } catch (err) {
      showToast("Falha ao se conectar ao servidor.", "error", 2500);
    }

    setLoading(false);
  };

  return (
    <>
      <div className={Style.registerContainer}>
        <Header />
        <div className={Style.clinic_page}>
          <div className={Style.registerCard}>
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
                          showToast("CEP encontrado com sucesso!", "success");
                        } else {
                          showToast("CEP não encontrado.", "error");
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
                  <IMaskInput
                    mask="(00) 00000-0000"
                    name="telephone"
                    placeholder="Telefone"
                    required
                    value={formData.telephone}
                    onAccept={(value) => setFormData((prev) => ({ ...prev, telephone: value }))}
                  />
                </div>

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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
