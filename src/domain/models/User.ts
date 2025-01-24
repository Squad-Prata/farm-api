import bcrypt from "bcrypt";

// Constantes de Validação
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfRegex = /^\d{11}$/;
const crfRegex = /^\d{5,6}$/;
const nameRegex = /^[A-Za-z\s]{3,50}$/;

// Funções auxiliares de validação
const isFieldEmpty = (field: string) => !field || field.trim().length === 0;
const isValidEmail = (email: string) => emailRegex.test(email);
const isValidName = (name: string) => nameRegex.test(name);
const isValidCPF = (cpf: string) => cpfRegex.test(cpf);
const isValidCRF = (crf: string) => crfRegex.test(crf);

const hashPassword = (passwordPlainText: string) => bcrypt.hashSync(passwordPlainText, 10);

export default class User {
  
  constructor (
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly name: string,
    readonly cpf: string,
    readonly crf: string,
    readonly email: string,
    readonly password: string,
    readonly cargo: string,
    readonly role: string,
    readonly pharmacyId: number,
    readonly ativo: boolean
  ) {
    // Nota: Não valida nada no construtor, pois ele deve ser usado apenas para trazer dados do BD, se se já estão persistidos já foram validados.
  }

  // Static Factory Method - Usado para criar novos usuarios
  static create (
    name: string,
    cpf: string,
    crf: string,
    email: string,
    passwordPlainText: string,
    cargo: string,
    role: string,
    pharmacyId: number
  ) {
      
    // Validação de campos obrigatórios
    if (isFieldEmpty(name)) throw new Error("O nome é obrigatório!");
    if (!isValidName(name)) throw new Error("Nome inválido!");
    if (isFieldEmpty(cargo)) throw new Error("O cargo é obrigatório!");
    // Validação de email
    if (!email || !isValidEmail(email)) throw new Error("Email inválido.");
    // Validação de CRF ou CPF (um dos dois deve ser fornecido)
    if (!crf && !cpf) throw new Error("É obrigatório fornecer o CRF e/ou o CPF.");
    if (crf && !isValidCRF(crf)) throw new Error("CRF inválido. Deve conter de 5 a 6 dígitos." );
    if (cpf && !isValidCPF(cpf)) throw new Error("CPF inválido. Deve conter 11 dígitos.");

    const id = 0;
    const createdAt = new Date();
    const updatedAt = new Date();
    const ativo = false;
    const hashedPassword = hashPassword(passwordPlainText);

    return new User(id,
                    createdAt,
                    updatedAt,
                    name,
                    cpf,
                    crf,
                    email,
                    hashedPassword,
                    cargo,
                    role,
                    pharmacyId,
                    ativo);
}

verifyPassword(passwordPlainText: string) {
  return bcrypt.compareSync(passwordPlainText, this.password);  
}

// toggleActive() {
//   this.ativo = !this.ativo;
// }
  
}




