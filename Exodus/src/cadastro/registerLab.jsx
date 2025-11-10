import React, { useState } from "react";
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
import { useToast } from "../context/ToastProvider.jsx"; // 👈 hook do toaster

export default function RegisterLaboratory() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast(); // 👈 habilita toasts

  const cnpjFromUrl = new URLSearchParams(window.location.search).get("cnpj");

  const [formdata, setformdata] = useState({
    name: "",
    cnpj: cnpjFromUrl ? formatCNPJ(cnpjFromUrl) : "",
    cep: "",
    address: "",
    telephone: "",
    labUser: "",
    email: "",
  });

  const fields = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "cnpj", type: "text", placeholder: "CNPJ", required: true, defaultValue: formdata.cnpj },
    { name: "cep", type: "text", placeholder: "CEP", required: true, defaultValue: formdata.cep },
    { name: "address", type: "text", placeholder: "Endereço", required: true },
    { name: "telephone", type: "text", placeholder: "Telefone", required: true },
    { name: "labUser", type: "text", placeholder: "Nome do ADM do laboratório", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
  ];

  const handleSubmit = async (formValues) => {
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    const cnpjLimpo = unmask(formValues.cnpj);
    const cnpjStatus = await validarCnpj(cnpjLimpo);

    if (!cnpjStatus.valido) {
      const msg = "CNPJ inválido ou inativo.";
      setErrorMessage(msg);
      showToast(msg, "error");
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
      if (!result.success) {
        const msg = result.message || "Erro ao cadastrar laboratório.";
        setErrorMessage(msg);
        showToast(msg, "error");
      }

      const result2 = await cadastrarAdmLaboratorio(admLabData, token);
      if (result2.success) {
        setSuccess(true);
        showToast("Laboratório cadastrado com sucesso!", "success");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        const msg = result2.message || "Erro ao cadastrar administrador do laboratório.";
        setErrorMessage(msg);
        showToast(msg, "error");
      }
    } catch (err) {
      const msg = "Falha ao se conectar ao servidor.";
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={Style.login_page}>
        <ExodusTop />
        <div className={Style.login_card}>
          <motion.div
            className={Style.login_left}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2>Cadastro de Laboratório</h2>
            <p className={Style.subtitle}>Preencha com os dados</p>

            <DynamicForm
              fields={fields.map((field) => {
                if (field.name === "cep") {
                  return {
                    ...field,
                    render: ({ value, onChange, name, placeholder, type }) => (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <input value={value} onChange={onChange} name={name} placeholder={placeholder} type={type} />
                        <button
                          type="button"
                          className={Style.cepButton}
                          onClick={async () => {
                            const data = await buscarCep(unmask(value));
                            if (data) {
                              showToast("CEP confirmado!", "success");
                              setformdata((prev) => ({
                                ...prev,
                                cep: data.cep,
                                address: data.logradouro,
                                bairro: data.bairro,
                                localidade: data.localidade,
                                uf: data.uf,
                                complemento: data.complemento,
                              }));
                            } else {
                              showToast("CEP não encontrado.", "warning");
                            }
                          }}
                        >
                          Confirmar CEP
                        </button>
                      </div>
                    ),
                  };
                }
                return field;
              })}
              values={formdata}
              onChangeValues={setformdata}
              onSubmit={handleSubmit}
              buttonText={success ? "Cadastrado" : "Confirmar"}
              loading={loading}
              buttonSuccess={success}
            />
          </motion.div>

          <motion.div
            className={Style.login_right}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <motion.h2>Integração do Laboratório ao Sistema</motion.h2>
            <motion.p>
              Cadastre o laboratório no sistema para garantir sua identificação e autenticação dentro da plataforma. 
              O registro armazena informações essenciais como endereço, telefone e responsável técnico, permitindo que o laboratório realize operações com segurança e confiabilidade.
            </motion.p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
