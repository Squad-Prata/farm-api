# Projeto API do FarmApp  

## Passo a passo para configurar o projeto localmente:  
  
  - Primeiro clone este repositório para sua máquina;
  - Edite o arquivo ".env.example" para somente ".env" e insira os valores "root" e "senhadobanco" nas variáveis "DB_USERNAME" e "DB_PASSWORD" respectivamente.
  - Instale as dependências com o seguinte comando, na raiz do projeto:
  ```
  npm install
  ```
  - Depois, ainda na raiz do projeto, execute o seguinte comando (como administrador (windows) ou super usuario (linux)):
  ```
  docker-compose up -d
  ```
- Este comando acima vai criar o container Docker com o banco de dados PostgreSQL para você  
- Agora, execute o comando para criar as tabelas no banco (por meio das migrations do Prisma):
```
npx prisma migrate dev --name init
```
- Pronto, o banco está disponível e as tabelas também, hora de codar :)