import { profileAdm } from "./profile_adm.js";
import { profileDoctor } from "./profile_medico.js";
import { profilePatient } from "./profile_paciente.js";
import { profileSecretary } from "./profile_secretaria.js";

export async function getProfileByRole(role) {
  try {
    let data;

    switch (role) {
      case "Admin":
        data = await profileAdm();
        break;
      case "Doctor":
        data = await profileDoctor();
        break;
      case "Patient":
        data = await profilePatient();
        break;
      case "Secretary":
        data = await profileSecretary();
        break;
      default:
        throw new Error("Tipo de usuário desconhecido: " + role);
    }

    if (data && data.success) {
      return data.data;
    } else {
      console.error("Erro ao buscar perfil:", data);
      return null;
    }
  } catch (err) {
    console.error("Erro ao carregar perfil:", err);
    return null;
  }
}
