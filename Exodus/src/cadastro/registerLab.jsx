import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Style from "./register.module.css";
import Footer from "../Footer.jsx";
import ExodusTop from "../ExodusTop.jsx";
import { cadastrarLaboratorio } from "../js/registros/cadastrar_laboratorio.js";
import DynamicForm from "../assents_link/DynamicForm.jsx";
import { cadastrarAdmLaboratorio } from "../js/registros/cadastrar_adm_laboratorio.js";
import { formatCNPJ, unmask } from "../js/formatters.js";
import { buscarCep } from "../js/checarCep/buscarCep.js";
import { validarCnpj } from "../js/validarCNPJ/validarCnpj.js";
export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const cnpjFromUrl = new URLSearchParams(window.location.search).get("cnpj");

  // Estado do formulário
  const [formdata, setformdata] = useState({
    name: "",
    cnpj: cnpjFromUrl ? formatCNPJ(cnpjFromUrl) : "", // aplica máscara já aqui
    cep: "",
    address: "",
    telephone: "",
    labUser: "",
    email: "",
  });

  // Campos do formulário
  const fields = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "cnpj", type: "text", placeholder: "CNPJ", required: true, defaultValue: formdata.cnpj },
    { name: "cep", type: "text", placeholder: "CEP", required: true, defaultValue: formdata.cep },
    { name: "address", type: "text", placeholder: "Endereço", required: true },
    { name: "telephone", type: "text", placeholder: "Telefone", required: true },
    { name: "labUser", type: "text", placeholder: "Nome do ADM do laboratório", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
  ];

  // Submissão do formulário

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    const cnpjLimpo = unmask(formValues.cnpj); // remove máscara
    const cnpjStatus = await validarCnpj(cnpjLimpo);

    if (!cnpjStatus.valido) {
      setErrorMessage(`CNPJ inválido ou inativo`);
      setLoading(false);
      return;
    }

    try {
      const labData = {
        name: formValues.name,
        cnpj: cnpjLimpo,
        cep: unmask(formValues.cep),
        address: formValues.address,
        telephone: unmask(formValues.telephone),
      };

      const admLabData = {
        name: formValues.labUser,
        email: formValues.email,
        cnpj: cnpjLimpo,
      };

      const token = localStorage.getItem("token");
      const result = await cadastrarLaboratorio(labData, token);
      if (result.success) {        
      } else {
        setErrorMessage(result.message || "Erro desconhecido ao cadastrar");
      }

      const result2 = await cadastrarAdmLaboratorio(admLabData, token);
      if (result2.success) {
        setSuccess(true);
        setTimeout(() => navigate("/home"), 2000)
      } else {
        setErrorMessage(result2.message || "Erro desconhecido ao cadastrar");
      }
    } catch (err) {
      setErrorMessage("Falha ao se conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />
        <div className={Style.login_card}>
          {/* Lado direito */}
          <motion.div className={Style.login_right} initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
            <motion.h2>Bem-vindo!</motion.h2>
            <motion.p>Registre o Laboratório no sistema.</motion.p>
          </motion.div>

          {/* Lado esquerdo */}
          <motion.div className={Style.login_left} initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
            <h2>Cadastro de Laboratório</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            <DynamicForm

              fields={fields.map((field) => {
                if (field.name === "cep") {
                  return {
                    ...field,
                    render: (props) => (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <input {...props} />
                        <button
                          type="button"
                          className={Style.cepButton}
                          onClick={async () => {
                            const data = await buscarCep(unmask(formdata.cep)); // remove máscara
                            if (data) {
                              setformdata(prev => ({
                                ...prev,
                                cep: data.cep,
                                address: data.logradouro,  // mapeia logradouro para address
                                bairro: data.bairro,
                                localidade: data.localidade,
                                uf: data.uf,
                                complemento: data.complemento,
                              }));
                            } else {
                              alert("CEP não encontrado.");
                            }
                          }}
                        >
                          Buscar CEP
                        </button>

                      </div>
                    ),
                  };
                }
                return field;
              })}
              values={formdata}                    // ✅ envia dados atuais
              onChangeValues={setformdata}          // ✅ recebe alterações
              onSubmit={handleSubmit}
              buttonText={success ? "Cadastrado" : "Confirmar"}
              loading={loading}
              buttonStyle={{
                backgroundColor: success ? "#28a745" : "#007bff",
                color: "white",
                borderColor: success ? "#28a745" : "#007bff",
                boxShadow: success ? "0 0 15px 3px #28a745" : "#007bff",
                transition: "all 0.1s ease",
              }}
            />

          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
