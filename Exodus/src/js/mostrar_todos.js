export async function mostrar_todos(role, token) {
  let url = "";
  console.log(token)
  // SE O ADM PEDIR PRA VER OS MEDICOS
  if (role === "doctor") {
    url = "http://localhost:8080/admin/doctorClinic";
  } 
  // SE A SECRETARIA PEDIR PRA VER OS MEDICOS DISPONIVEIS
  else if(role === "doctorAval") {
    url = "http://localhost:8080/secretary/getDocsAvailable";
  }
  // SE O MEDICO PEDIR PRA VER TODAS AS REQUISIÇÕES DE EXAMES PENDENTES
  else if(role === "examsPend") {
    url = "http://localhost:8080/doctor/getRequestExamPendent";
  }
  // SE O SUPORTE PEDIR RPA VER TODOS OS TICKETS
  else if(role === "tickets") {
    url = "http://localhost:8080/support/getOpen";
  }

  // SE ALGM PEDIR PRA VER OS TICKETS DELE
  else if(role === "myTickets") {
    url = "http://localhost:8080/support/getByUser";
    
  }
  
  else if(role === "registerTicket") {
    url = "http://localhost:8080/support/registerTicket";
  }
  

  // SE O MEDICO PEDIR PRA VER TODAS AS DEVOLUÇÕES DE EXAMES
  else if(role === "examsReturn") {
    url = "http://localhost:8080/doctor/getExamsResult";
  } 

  // SE O MEDICO PEDIR PRA VER TODAS AS DEVOLUÇÕES DE EXAMES
  else if(role === "examsReturnPac") {
    url = "http://localhost:8080/patient/getExamsResult";
  } 

  // SE O PACIENTE PEDIR PRA VER TODAS AS REQUISIÇÕES DE EXAMES PENDENTES
  else if(role === "pendingExams") {
    url = "http://localhost:8080/patient/getRequestExamPendent";
  } 
  // SE O O LAB PEDIR PRA VER TODAS AS REQUISIÇÕES DE EXAMES PENDENTES
  else if(role === "examRequests") {
    url = "http://localhost:8080/laboratory/getRequestExamPendent";
  }  
  else if (role === "adm") {
    console.log("Função de listar administradores ainda não implementada.");
    return [];
  } else if (role === "lab_adm") {
    console.log("Função de listar administradores de laboratório ainda não implementada.");
    return [];
  }
  else if (role === "patient") {
    url = "http://localhost:8080/secretary/getPatientsCli";
  }
  //SE O ADM PEDIR PRA VER OS LABS
  else if (role === "lab") {
    url = "http://localhost:8080/admin/getLabCli";
  }
  //SE O MÉDICO PEDIR PRA VER AS CLÍNICAS
  else if (role === "clinics") {
    url = "http://localhost:8080/doctor/clinicsDoctor";
  }
  else {
    console.error("Role inválida:", role);
    return [];
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
       },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados (${response.status})`);
    }
    
    const data = await response.json();
    
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
}
