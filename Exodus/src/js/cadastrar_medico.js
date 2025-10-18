import axios from "axios";

export async function cadastrarMedico(medicoData, token) {
  try {
    console.info("%c🔍 Verificando se o médico já existe no sistema...", "color: #4FC3F7; font-weight: bold;");

    // 1️⃣ Verifica se o médico existe no sistema
    const response = await axios.post(
      "http://localhost:8080/doctor/getByCrm",
      { crm: medicoData.crm }
    );

    console.info("%cResposta (getByCrm):", "color: #81C784;", response.data);

    // Se o médico existe:
    if (response.data === true) {
      console.info("%c✅ Médico encontrado no sistema. Verificando vínculo com a clínica...", "color: #4CAF50; font-weight: bold;");

      // 2️⃣ Verifica se o médico já está vinculado à clínica
      const response2 = await axios.post(
        "http://localhost:8080/doctor/searchDoc",
        { crm: medicoData.crm },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      console.info("%cResposta (searchDoc):", "color: #AED581;", response2.data);

      if (response2.data === true) {
        // 3️⃣ Já cadastrado na clínica
        console.warn("%c⚠️ O médico já está vinculado a esta clínica.", "color: #FFB300; font-weight: bold;");
        return {
          success: true,
          status: "jaCadastrado",
          message: "O médico já está cadastrado nesta clínica.",
        };
      } else {
        // 4️⃣ Existe no sistema mas não na clínica → vincula/cadastra
        console.info("%c🔁 Médico encontrado, transferindo para a clínica...", "color: #64B5F6; font-weight: bold;");

        const response3 = await axios.post(
          "http://localhost:8080/doctor/transferDoctor",
          medicoData,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );

        console.info("%c✅ Médico vinculado à nova clínica:", "color: #81C784;", response3.data);

        return {
          success: true,
          status: "transferido",
          message: "Médico transferido para a clínica com sucesso.",
          data: response3.data,
        };
      }
    } else {
      // 5️⃣ Médico não existe → cadastrar no sistema
      console.info("%c🆕 Médico não encontrado. Cadastrando novo médico no sistema...", "color: #4DD0E1; font-weight: bold;");

      const response4 = await axios.post(
        "http://localhost:8080/doctor/register",
        medicoData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      console.info("%c✅ Médico cadastrado do zero:", "color: #81C784;", response4.data);

      return {
        success: true,
        status: "novoCadastro",
        message: "Médico cadastrado no sistema com sucesso.",
        data: response4.data,
      };
    }
  } catch (error) {
    console.error("%c❌ Erro ao processar cadastro do médico:", "color: #E57373; font-weight: bold;", error);

    // Se nada deu certo, retorna status neutro
    return {
      success: false,
      status: "erro",
      message: error.response?.data?.message || "Erro inesperado ao processar o cadastro.",
    };
  }
}
