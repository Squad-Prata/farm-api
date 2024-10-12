// Constantes de Validação
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfRegex = /^\d{11}$/;
const crfRegex = /^\d{5,6}$/;

// Funções auxiliares de validação
const isFieldEmpty = (field) => !field || field.trim().length === 0;
const isValidEmail = (email) => emailRegex.test(email);
const isValidCPF = (cpf) => cpfRegex.test(cpf);
const isValidCRF = (crf) => crfRegex.test(crf);


export const userValidations = async (req, res, next) => {
  const { name, email, cargo, crf, cpf } = req.body;

  // Validação de campos obrigatórios
  if (isFieldEmpty(name)) {
    return res.status(400).json({ message: "O nome é obrigatório!"});
  }
  if (isFieldEmpty(cargo)) {
    return res.status(400).json({ message: "O cargo é obrigatório!" });
  }

  // Validação de email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  // Validação de CRF ou CPF (um dos dois deve ser fornecido)
  if (!crf || !cpf) {
    return res.status(400).json({ message: "É obrigatório fornecer o CRF e o CPF." });
  }
  if (crf && !isValidCRF(crf)) {
    return res.status(400).json({ message: "CRF inválido. Deve conter de 5 a 6 dígitos." });
  }
  if (cpf && !isValidCPF(cpf)) {
    return res.status(400).json({ message: "CPF inválido. Deve conter 11 dígitos." });
  }

  next();
};