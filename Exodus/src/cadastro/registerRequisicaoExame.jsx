import React, { useEffect, useState } from "react";
import Style from "./registerExamReq.module.css";
import ExodusTop from "../ExodusTop.jsx";
import Footer from "../Footer.jsx";
import {
  cadastrarRequisicaoExame,
  buscarLaboratorios,
  buscarTiposExame,
} from "../js/fluxoMedico/exames.js";

export default function RegisterExameRequest() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [laboratorios, setLaboratorios] = useState([]);
  const [tiposExame, setTiposExame] = useState([]);
  const [form, setForm] = useState({
    exam_type: "",
    sample_type: "",
    complement: "",
    name: "",
  });

  // Carregar opções dinâmicas
  useEffect(() => {
    async function carregarDados() {
      try {
        const [labsRes, examsRes] = await Promise.all([
          buscarLaboratorios(),
          buscarTiposExame(),
        ]);

        if (labsRes.success) setLaboratorios(labsRes.data);
        else setErrorMessage("Erro ao carregar laboratórios.");

        if (examsRes.success) setTiposExame(examsRes.data);
        else setErrorMessage("Erro ao carregar tipos de exame.");
      } catch {
        setErrorMessage("Erro ao carregar dados iniciais.");
      }
    }

    carregarDados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const result = await cadastrarRequisicaoExame(form);

      if (result.success) {
        alert("Requisição de exame cadastrada com sucesso!");
        setForm({ exam_type: "", sample_type: "", complement: "", name: "" });
      } else {
        setErrorMessage(result.message || "Erro ao cadastrar exame.");
      }
    } catch {
      setErrorMessage("Falha ao se conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <>
    <ExodusTop />
    <div className={Style.register_page}>
      

      <div className={Style.register_card}>
        <h2>Cadastro de exame</h2>
        <hr className={Style.section_line} />

        <form onSubmit={handleSubmit} className={Style.form_area}>
          <div className={Style.form_group}>
            <label>Tipo do Exame</label>
            <select
              name="exam_type"
              value={form.exam_type}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o tipo de exame</option>
              {tiposExame.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className={Style.form_group}>
            <label>Tipo da Amostra</label>
            <input
              type="text"
              name="sample_type"
              placeholder="Ex: Sangue"
              value={form.sample_type}
              onChange={handleChange}
              required
            />
          </div>

          <div className={Style.form_group}>
            <label>Observações</label>
            <textarea
              name="complement"
              placeholder="..."
              value={form.complement}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className={Style.form_group}>
            <label>Encaminhamento para o laboratório</label>
            <select
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o Laboratório</option>
              {laboratorios.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className={Style.button_container}>
            <button className={Style.bttn}type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Exame"}
            </button>
          </div>
          </div>

          
        </form>

        {errorMessage && <p className={Style.error}>{errorMessage}</p>}
      </div>

      
    </div>

    <Footer />

    </>
  );
}
