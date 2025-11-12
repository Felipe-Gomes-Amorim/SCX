import API_URL from "./apiConfig.js";

export async function mostrar_todos(role, token) {
  const endpoints = {
    doctor: "/admin/doctorClinic",
    doctorAval: "/secretary/getDocsAvailable",
    examsPend: "/doctor/getRequestExamPendent",
    tickets: "/support/getOpen",
    myTickets: "/support/getByUser",
    registerTicket: "/support/registerTicket",
    examsReturn: "/doctor/getExamsResult",
    examsReturnPac: "/patient/getExamsResult",
    history: "/auth/getHistory",
    notific: "/notification/getNoRead",
    pendingExams: "/patient/getRequestExamPendent",
    examsRequests: "/laboratory/getRequestExamPendent",
    patient: "/secretary/getPatientsCli",
    lab: "/admin/getLabCli",
    clinics: "/doctor/clinicsDoctor",
    allClinics: "/adminSystem/getAllCli",
    secretary: "/admin/getSecretary",
    allClinicsLab: "/laboratory/clinicsLab",
    AllLabSystem: "/adminSystem/getAllLab",
    patientClinics: "/patient/getClinicPat"
  };

  const path = endpoints[role];
  if (!path) {
    console.error("❌ Role inválida:", role);
    return [];
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) throw new Error(`Erro ${response.status}`);

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("⚠️ Resposta não é JSON válida:", text);
      return [];
    }
  } catch (error) {
    console.error("🚫 Erro ao buscar dados:", error);
    return [];
  }
}
