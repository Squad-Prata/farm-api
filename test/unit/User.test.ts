import User from "../../src/domain/models/User";

test("Deve criar um Usuario", function () {
  const user = User.create('John Doe', '12345678910', '123456', 'john.doe@gmail.com', 'abc123', 'cargo', 'admin', 0);
  expect(user).toBeDefined();
  expect(user.id).toBe(0);
  expect(user.ativo).toBe(false);
  expect(user.password).not.toBe('abc123');
});

test("Deve criar um Usuario sem CPF e com CRF", function () {
  const user = User.create('John Doe', '', '123456', 'john.doe@gmail.com', 'abc123', 'cargo', 'admin', 0);
  expect(user).toBeDefined();
  expect(user.id).toBe(0);
  expect(user.ativo).toBe(false);
  expect(user.password).not.toBe('abc123');
  expect(user.cpf).toBeFalsy();
  expect(user.crf).toBeDefined();
});


test("Deve criar um Usuario com CPF e sem CRF", function () {
  const user = User.create('John Doe', '12345678910', '', 'john.doe@gmail.com', 'abc123', 'cargo', 'admin', 0);
  expect(user).toBeDefined();
  expect(user.id).toBe(0);
  expect(user.ativo).toBe(false);
  expect(user.password).not.toBe('abc123');
  expect(user.cpf).toBeDefined();
  expect(user.crf).toBeFalsy();
});

test("Não deve criar um Usuario com sem Nome ou com Nome Inválido", function () {
  expect(() => 
      User.create('', '12345678910', '123456', 'john.doe@gmail.com', 'abc123', 'cargo', 'admin', 0)
    ).toThrow("O nome é obrigatório!");

  expect(() => 
      User.create('Ze', '12345678910', '123456', 'john.doe@gmail.com', 'abc123', 'cargo', 'admin', 0)
    ).toThrow(new Error("Nome inválido!"));
});

test("Não deve criar um Usuario sem Cargo", function () {
  expect(() => 
      User.create('John Doe', '12345678910', '123456', 'john.doe@gmail.com', 'abc123', '', 'admin', 0)
    ).toThrow("O cargo é obrigatório!");
});

test("Não deve criar um Usuario com Email inválido", function () {
  expect(() => 
    User.create('John Doe', '12345678910', '123456', '', 'abc123', 'Cargo', 'admin', 0)
  ).toThrow("Email inválido.");

  expect(() => 
      User.create('John Doe', '12345678910', '123456', 'john.doe#gmail.com', 'abc123', 'Cargo', 'admin', 0)
    ).toThrow("Email inválido.");
});

test("Não deve criar um Usuario sem CPF e sem CRF", function () {
  expect(() => 
    User.create('John Doe', '', '', 'john.doe@gmail.com', 'abc123', 'Cargo', 'admin', 0)
    ).toThrow("É obrigatório fornecer o CRF e/ou o CPF.");
});

test("Não deve criar um Usuario com CPF inválido", function () {
  expect(() => 
    User.create('John Doe', '123456789', '123456', 'john.doe@gmail.com', 'abc123', 'Cargo', 'admin', 0)
  ).toThrow("CPF inválido. Deve conter 11 dígitos.");

  expect(() => 
      User.create('John Doe', '1234567891055', '123456', 'john.doe@gmail.com', 'abc123', 'Cargo', 'admin', 0)
    ).toThrow("CPF inválido. Deve conter 11 dígitos.");
});

test("Não deve criar um Usuario com CRF inválido", function () {
  expect(() => 
    User.create('John Doe', '12345678910', '1234', 'john.doe@gmail.com', 'abc123', 'Cargo', 'admin', 0)
  ).toThrow("CRF inválido. Deve conter de 5 a 6 dígitos.");

  expect(() => 
      User.create('John Doe', '12345678910', '1234567', 'john.doe@gmail.com', 'abc123', 'Cargo', 'admin', 0)
    ).toThrow("CRF inválido. Deve conter de 5 a 6 dígitos.");
});

test("Deve validar a senha", function () {
  const user = User.create('John Doe', '12345678910', '123456', 'john.doe@gmail.com', 'abc123', 'cargo', 'admin', 0);
  expect(user).toBeDefined();
  expect(user.id).toBe(0);
  expect(user.ativo).toBe(false);
  expect(user.password).not.toBe('abc123');
  console.log(user.password);
});
