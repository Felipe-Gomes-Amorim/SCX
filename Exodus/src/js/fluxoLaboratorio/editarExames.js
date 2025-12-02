import API_URL from "../apiConfig.js";

export async function updateExamRequest(token, file, fileName, examType) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("examType", examType);

    const response = await fetch(`${API_URL}/laboratory/updateExam`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar exame");
    }

    return await response.text();
}
