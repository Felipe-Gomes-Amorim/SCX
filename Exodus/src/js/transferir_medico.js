import axios from "axios";
const token = localStorage.getItem("token"); 

//metodo principal ( data vai vir do register.jsx / token tá armazenado no localStorage )
export async function transferirMedico(medicoData) {
  try {                               //ver rotas do médico no DoctorController (Back-End)
    const response = await axios.post(
          "http://localhost:8080/doctor/transferDoctor",
          medicoData,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
    );
    
    //print pra teste com o body do exame
    console.log("Resposta do servidor:", response.data);
    

    //quiser adicionar qlqr coisa no processo é aqui


    return { 
      //ele vai retornar os dados do paciente
      success: true, data: response.data 
    };
  } catch (error) {
    console.error("Erro ao transferir médico:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}


