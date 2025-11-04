import API_URL from "./apiConfig.js";

export async function mostrar_todos(role, token) {
  let url = "";

  if (role === "doctor") {
    url = `${API_URL}/admin/doctorClinic`;
  } else if (role === "doctorAval") {
    url = `${API_URL}/secretary/getDocsAvailable`;
  } else if (role === "examsPend") {
    url = `${API_URL}/doctor/getRequestExamPendent`;
  } else if (role === "tickets") {
    url = `${API_URL}/support/getOpen`;
  } else if (role === "myTickets") {
    url = `${API_URL}/support/getByUser`;
  } else if (role === "registerTicket") {
    url = `${API_URL}/support/registerTicket`;
  } else if (role === "examsReturn") {
    url = `${API_URL}/doctor/getExamsResult`;
  } else if (role === "examsReturnPac") {
    url = `${API_URL}/patient/getExamsResult`;
  } else if (role === "history") {
    url = `${API_URL}/auth/getHistory`;
  } else if (role === "notific") {
    url = `${API_URL}/notification/getNoRead`;
  } else if (role === "pendingExams") {
    url = `${API_URL}/patient/getRequestExamPendent`;
  } else if (role === "examRequests") {
    url = `${API_URL}/laboratory/getRequestExamPendent`;
  } else if (role === "patient") {
    url = `${API_URL}/secretary/getPatientsCli`;
  } else if (role === "lab") {
    url = `${API_URL}/admin/getLabCli`;
  } else if (role === "clinics") {
    url = `${API_URL}/doctor/clinicsDoctor`;
  } else {
    console.error("Role inválida:", role);
    return [];
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!response.ok) throw new Error(`Erro ao buscar dados (${response.status})`);

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("Resposta não é JSON válida:", text);
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
}
