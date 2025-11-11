export const formatCNPJ = (value) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
};

// Formata CPF: 123.456.789-00
export const formatCPF = (value) => {
  if (!value) return "";

  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "").slice(0, 11); // CPF tem 11 dígitos

  // Aplica a máscara progressivamente
  let formatted = numbers;

  if (numbers.length > 3 && numbers.length <= 6) {
    formatted = numbers.replace(/^(\d{3})(\d+)/, "$1.$2");
  } else if (numbers.length > 6 && numbers.length <= 9) {
    formatted = numbers.replace(/^(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  } else if (numbers.length > 9) {
    formatted = numbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  }

  return formatted;
};


// Formata telefone: (11) 91234-5678
export const formatPhone = (value) => {
  if (!value) return "";

  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos

  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};


// Formata CRM (opcionalmente com traço entre UF e número)
export const formatCRM = (value) => {
  if (!value) return "";

  // Remove tudo que não for letra ou número
  let cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  // Pega os 6 primeiros números
  const digits = cleaned.slice(0, 6).replace(/[^0-9]/g, "");

  // Pega as 2 últimas letras para o UF
  const letters = cleaned.slice(6, 8).replace(/[^A-Z]/g, "");

  // Monta o CRM no formato NNNNNN/UF
  return digits + (letters ? "/" + letters : "");
};
export const formatCID = (value) => {
  if (!value) return "";

  let cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (cleaned.length <= 3) return cleaned; // A00, B12

  return cleaned.slice(0, 3) + "." + cleaned.slice(3, 4); // ex: A001 -> A00.1
};

export const formatCEP = (value) => {
  if (!value) return "";

  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "").slice(0, 8); // CEP tem 8 dígitos

  // Adiciona o traço após o quinto dígito
  if (numbers.length > 5) {
    return numbers.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
  }

  return numbers;
};


// Remove qualquer formatação (para enviar limpo ao back-end)
export const unmask = (value) => value.replace(/\D/g, "");
