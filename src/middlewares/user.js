// Middleware de validação de usuário
exports.validations = async (req, res, next) => {
  const { name, email, cargo, crf, cpf } = req.body;

  // Validação do campo name
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ message: 'O name é obrigatório.' });
  }

  // Validação do campo email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'E-mail inválido.' });
  }

  // Validação do campo cargo
  if (!cargo || cargo.trim().length === 0) {
    return res.status(400).json({ message: 'O cargo é obrigatório.' });
  }

  // Validação do campo CRF ou CPF (um dos dois deve ser fornecido)
  const cpfRegex = /^\d{11}$/;
  const crfRegex = /^\d{5,6}$/;

  if (!crf || !cpf) {
    return res.status(400).json({ message: 'É obrigatório fornecer o CRF ou o CPF.' });
  }

  if (cpf && !cpfRegex.test(cpf)) {
    return res.status(400).json({ message: 'CPF inválido. Deve conter 11 dígitos.' });
  }

  if (crf && !crfRegex.test(crf)) {
    return res.status(400).json({ message: 'CRF inválido. Deve conter de 5 a 6 dígitos.' });
  }

  next();
};
