import bcrypt from "bcrypt";
import DomainError from "../../application/error/DomainError";

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
    public id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly name: string,
    readonly cpf: string,
    readonly crf: string,
    readonly email: string,
    private password: string,
    readonly cargo: string,
    readonly role: string,
    readonly pharmacyId: number,
    private ativo: boolean
  ) {
    // Nota: Não valida nada no construtor, pois ele deve ser usado apenas para trazer dados do BD. Se está persistido já foi validados.
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
    if (isFieldEmpty(name)) throw new DomainError("O nome é obrigatório!");
    if (!isValidName(name)) throw new DomainError("Nome inválido!");
    if (isFieldEmpty(cargo)) throw new DomainError("O cargo é obrigatório!");
    // Validação de email
    if (!email || !isValidEmail(email)) throw new DomainError("Email inválido.");
    // Validação de CRF ou CPF (um dos dois deve ser fornecido)
    if (!crf && !cpf) throw new DomainError("É obrigatório fornecer o CRF e/ou o CPF.");
    if (crf && !isValidCRF(crf)) throw new DomainError("CRF inválido. Deve conter de 5 a 6 dígitos." );
    if (cpf && !isValidCPF(cpf)) throw new DomainError("CPF inválido. Deve conter 11 dígitos.");

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

  changePassword(passwordPlainText: string) {
    const hashedPassword = hashPassword(passwordPlainText);
    this.password = hashedPassword;
  }

  getHashPassword(): string {
    return this.password;
  }

  active() {
    if (this.ativo) new DomainError("Usuário já está ativo.");
    this.ativo = true;
  }

  inactive() {
    if  (!this.ativo) new DomainError("Usuário já está inativo.");
    this.ativo = false;
  }

  getActive(): boolean {
    return this.ativo;
  }

}




