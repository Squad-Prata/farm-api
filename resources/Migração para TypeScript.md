### Benefícios e Otimizações

É um liguagem de programação que complementa e transpila para JavaScript

O Typescript traz muitos benefícios a longo prazo, como a detecção de erros em tempo de compilação e melhor suporte para autocompletar e refatoração.

- Melhor experiência de desenvolvedor: Com a tipagem, o autocompletamento e as verificações de erros em tempo de compilação, o TypeScript proporciona uma experiência de desenvolvimento muito mais robusta.
- Detecção antecipada de erros: O TypeScript ajuda a evitar erros comuns em tempo de execução, já que muitos erros de tipo são detectados durante a compilação.
- Refatoração mais segura: O TypeScript torna o processo de refatoração mais seguro e simples, pois você pode garantir que todas as mudanças no código sejam seguidas por verificações de tipo.
- Brilha na Orientação a Objeto: Permite trabalhar melhor com Orientação Objeto, principios de SOLID, Clean Arch, Domain Driven Designer e outros.

### Abortagem

A conversão de JavaScript para TypeScript é um processo bem estruturado e gradual, e pode ser iniciado com etapas simples como instalar o TypeScript, configurar o tsconfig.json, renomear os arquivos e adicionar tipagens. Não há necessidade de fazer tudo de uma vez — você pode refatorar partes do código aos poucos até que o projeto inteiro esteja no formato TypeScript.

### Como realizar a conversão

Aqui está um passo a passo para realizar a conversão do seu projeto:

1. Instalar o TypeScript no projeto

   O primeiro passo é adicionar o TypeScript ao seu projeto.

   ```bash
   npm install --save-dev typescript
   ```

   É recomendado adicionar a dependencia **ts-node** que permite que executar o **nodemon** sobre o TypeScript execurtando a tranxpilação em memoria

   ```bash
   npm install --save-dev ts-node
   ```

2. Adicionar o arquivo tsconfig.json

   O tsconfig.json é o arquivo de configuração do TypeScript, que define várias opções sobre como o compilador deve lidar com o código TypeScript.

   Para criar o arquivo, você pode usar o comando:

   ```bash
   npx tsc --init
   ```

   Isso vai criar um arquivo tsconfig.json com a configuração padrão.

   O arquivo tsconfig.josn **centraliza todas as regras de análise estática e de transpilação** e é importante configurá-lo de forma adequada, *conforme a necessidades e políticas do projeto*.
   
   Segue as alterações realizadas na configuração padrão do tsconfig.json:
   ```json
   {
     "compilerOptions": {
       "incremental": true, // Habilita a transpilação incremental, guardando uma cache que agiliza futuras transpilações. 
       "outDir": "./dist", // Define o diretório de saída para os arquivos transpilados
     },
     "include": [
       "src", // Adiciona a pasta src
       "test" // Adiciona a pasta test 
       <!-- "src/**/*.ts", // Adiciona arquivos TypeScript da pasta src -->
       <!-- "test/**/*.ts" // Adiciona arquivos TypeScript da pastsa test  -->
     ],
     "exclude": [
       "node_modules" // Exclui a pasta node_modules do projeto
     ]
   }
   ```

3. Renomear arquivos .js para .ts

   Uma vez que o TypeScript está instalado e configurado, comece a renomear os arquivos .js para .ts. Isso é o mais simples e o primeiro passo. O TypeScript irá começar a verificar seus arquivos e vai identificar onde há problemas de tipo.

4. Adicionar Tipos ao Código

   O maior benefício do TypeScript vem ao adicionar tipos. O TypeScript pode inferir muitos tipos automaticamente, mas você pode começar a adicionar anotações de tipos manualmente para garantir maior segurança.

   Exemplo:

   ```typescript
   // Antes (em JavaScript)
   function somar(a, b) {
     return a + b;
   }

   // Depois (em TypeScript)
   function somar(a: number, b: number): number {
     return a + b;
   }
   ```

   Dicas para adicionar tipos:

   Definir tipos para variáveis e parâmetros de função.
   Usar tipos explícitos, como number, string, boolean, any (caso necessário), etc.

   Refatorar qualquer código dinâmico para um tipo mais específico, como usando object ou Record<string, unknown> para objetos.

5. Configurar Tipos de Dependências

Algumas bibliotecas de terceiros podem não ter tipagem explícita no TypeScript, mas você pode instalar definições de tipo para elas, se disponíveis.

Por exemplo, para bibliotecas populares como lodash ou express, você pode instalar os tipos correspondentes:

```bash
npm install --save-dev @types/express
npm install --save-dev @types/lodash
```

O TypeScript tem uma enorme coleção de pacotes de tipos disponíveis no DefinitelyTyped.

6. Configurar o Ambiente de Desenvolvimento

   Se você estiver usando algum editor de código como o VSCode, ele já tem suporte embutido para TypeScript, com funcionalidades como autocompletar, detecção de erros em tempo real, etc.

   Certifique-se de que seu editor esteja configurado para reconhecer os arquivos TypeScript e que o plugin do TypeScript esteja habilitado.

7. Corrigir Erros de Tipagem

   Agora que você começou a trabalhar com TypeScript, a ferramenta vai começar a indicar erros de tipagem. Alguns erros podem ser simples de corrigir, mas outros podem exigir refatoração do código.

8. Refatoração Gradual (Opcional)

Se o seu projeto for grande, pode ser interessante fazer a migração de forma gradual. O TypeScript permite que você comece com JavaScript "não tipado" e adicione os tipos aos poucos.

Para isso, você pode configurar a opção "allowJs": true no seu tsconfig.json, o que permite que você tenha arquivos .js e .ts no mesmo projeto. Com isso, você pode ir convertendo partes do código para TypeScript conforme necessário, sem quebrar o projeto.

9. Testes automtizados

Utilizaremos o Jest adicionar testes automatizados ao projeto, o que aumenta a confiabilidade e facilita a manutenção do projeto a longo prazo.
Inicialmente faremos a migração de forma gradual, escrevendo os testes conforme formos convertendo o código.

Para instalar o jest :
```bash
npm install --save-dev jest @types/jest
```

É necessário  instalar o ts-jest, que é um pré-processador TypeScript com suporte a mapa de origem para Jest que permite usar Jest para testar projetos escritos em TypeScript.

```bash
npm install --save-dev ts-jest
```

Para criar o arquivo de configuração para utilização com TypeScript.

```bash
npx ts-jest config:init
```

10. Outras dependências que estão sendo necessárias durante a migração

```bash
npm install --save-dev @types/bcrypt
```
