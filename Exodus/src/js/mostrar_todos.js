export async function mostrar_todos(role, token) {
  let url = "";

  // SE O ADM PEDIR PRA VER OS MEDICOS
  if (role === "doctor") {
    url = "http://localhost:8080/admin/doctorClinic";
  } 
  // SE A SECRETARIA PEDIR PRA VER OS MEDICOS DISPONIVEIS
  if (role === "doctorAval") {
    url = "http://localhost:8080/secretary/getDocsAvailable";
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
