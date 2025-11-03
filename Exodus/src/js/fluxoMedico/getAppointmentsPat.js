export async function getAppointmentsPat(token) {
  try {
    const response = await fetch("http://localhost:8080/doctor/getAppointmentsPat", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data; // deve retornar lista de atendimentos
  } catch (error) {
    console.error("Erro ao buscar prontuário do paciente:", error);
    return { success: false, message: "Erro de conexão" };
  }
}
