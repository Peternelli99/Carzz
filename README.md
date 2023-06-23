# Carzz

<h1 align="center">PROJETO FINAL</h1>
<p align="center">
  Projeto final da disciplina de Engenharia de Software GCC-188, cursada no período 2023/1.
</p>

---
## Descrição

- Este é um sistema desenvolvido para concessionárias e revendedores automotivos, com o objetivo de facilitar o controle e a organização das transações de compra e venda de veículos. O software desenvolvido é um sistema de gerenciamento de vendas de carros, projetado para concessionárias e revendedores automotivos. A principal finalidade desse sistema é facilitar o controle e a organização das transações de compra e venda de veículos. O sistema é composto pelas seguintes entidades: Cliente, Vendedor e Concessionária.

- O sistema de gerenciamento de vendas de carros visa otimizar e simplificar o processo de venda, fornecendo um ambiente centralizado para acompanhar e controlar todas as etapas do processo de vendas. Ele permite que os vendedores tenham acesso rápido a informações atualizadas sobre carros disponíveis, clientes e vendas, facilitando a tomada de decisões e proporcionando uma experiência mais eficiente e personalizada para os clientes interessados em comprar um veículo.
---

## Desenvolvedores
 - Leonardo Basso
 - Mateus Peternelli

## Tecnologias e Versões

### Front End:

![React](https://img.shields.io/badge/react-v18.2.0-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-v12.2.5-%2320232a.svg?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-v4.7.4-%2320232a.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-v3.1.8-%2320232a.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Back End:

![Spring](https://img.shields.io/badge/spring-v2.7.0-%2320232a.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/Java-v11.0.16-%2320232a?style=for-the-badge&logo=java&logoColor=white)

### Data Base:

![MySQL](https://img.shields.io/badge/mysql-v8.0.0-%2320232a.svg?style=for-the-badge&logo=mysql&logoColor=white)

---
### Principais Funcionalidades
- Cadastro de clientes e vendedores;
- Cadastro de carros com informações detalhadas;
- Controle de estoque de veículos;
- Registro de transações de compra e venda de carros;
- Geração de relatórios de vendas e desempenho dos vendedores.

### Tipos de Usuários
O sistema destina-se a dois tipos de usuários:

- Vendedores: Responsáveis por conduzir as vendas de carros. Eles têm acesso ao cadastro de clientes, carros disponíveis e registro de vendas.
- Concessionária(administrador): Responsáveis por gerenciar o sistema como um todo. Eles têm acesso total a todas as funcionalidades do sistema, incluindo o cadastro de vendedores e clientes, controle do estoque e geração de relatórios.
- Clientes: Responsáveis por listar os carros disponíveis, comprar e visualizar os carros comprados.

---

### Estrutura de Diretório do Projeto

- backend/                  # Código-fonte do backend
  - src/                  # Arquivos-fonte do backend
  - tests/                # Testes do backend
  - config/               # Configurações do backend
  - docs/                 # Documentação do backend
  
- frontend/                 # Código-fonte do frontend
  - src/                  # Arquivos-fonte do frontend
  - public/               # Arquivos públicos do frontend
  - tests/                # Testes do frontend
  - config/               # Configurações do frontend
  - docs/                 # Documentação do frontend
  
- database/                 # Arquivos relacionados ao banco de dados
  - migrations/           # Scripts de migração do banco de dados
  - seeds/                # Scripts para popular o banco de dados com dados iniciais
  - config/               # Configurações do banco de dados
  
- docs/                     # Documentação geral do projeto
  
- .gitignore                # Arquivo para especificar arquivos/diretórios ignorados pelo Git
  
- README.md                 # Documentação principal do projeto


---
## Regras de Uso do Git

### 1. Commits semânticos:

Utilize o seguinte padrão para descrever o que foi feito indicando a ação:

  - <ação>: <descrição>. 
  - Exemplo: feat: Criar tela de login.

### 2. Branches:

main, backend e frontend

### 3. Boas Práticas:

- Aplicar Clean Code
- Nomes significativos
- Notação: camelCase
- Comentários: não comentar
- Identar código
- Testar sempre os programas

---

## Regras, padrões e boa práticas de desenvolvimento

### 1. SOLID
Como está sendo utilizado o paradigm Orientado a Objetos para o desenvolvimento desta aplicação deve-se buscar seguir os princípios do SOLID que resumidamente determinam:
 - SRP - Princípio da Responsabilidade Única. Uma classe deve ter apenas uma única responsabilidade.
 - OCP - Princípio do Aberto/Fechado. Entidade de software devem ser abertas para expansões, mas fechadas para modificações. Ex:para cada nova função que não pertence ao funcionamento original, outro método deve ser chamado, e não modificar o funcionamento atual do meu método ou classe; 
 - LSP - Princípio da Substituição de Liskov. As superclasses devem permitem substituição pelas subclasses.
 - ISP - Princípio da Segregação de Interfaces. Muitas interfaces de clientes específicas, são melhores do que uma geral.
 - DIP - Princípio da inversão de dependência . Dependa de abstrações e não de implementações

### 2. Tamanho
Quanto menor melhor, isso vale para tudo, nomes, tamanho de métodos, quantidade de ifs, e a fins. A exceção dessa regra é a performance, algumas vezes é necessário abrir mão do tamanho reduzido de código para ter uma melhor performance, lembrando sempre que é uma exceção e mesmo nesses casos é obrigatório tentar manter tudo o menor possível.

### 3.Comentários
Comentários são úteis para ajudar a compreender o código, mas se é preciso explicar o código, é porque ele não está legível o suficiente. Assim, os comentários devem ser utilizados para facilitar em momentos como quando temos vários blocos de código na mesma classe, colocar um comentário dizendo onde começa determinado bloco pode facilitar na navegação do mesmo.

### 4. Indentação
É extremamente importante manter a indentação do código em dia, além de facilitar a leitura, serve para identificar onde começa e onde termina qualquer bloco de código, seja um método ou uma parametrização.

### 5. Nomes
Os nomes devem ser precisos e sucintos, descrevendo com poucas letras ou palavras o que está fazendo ou significa.
- Nome de variáveis:
  - Começar sempre com letra minúscula;
  - Não atribuir nome de ações a variáveis;

- Nome de métodos:
  - Começar sempre com letra minúscula;
  - Tratar métodos como ações.

- Nome de classes e interfaces:
  - Começar sempre com letra maiúscula;
  - Tratar as classes como objetos, não atribuir nome de ações a classes ou interfaces.

### 6. Boas práticas para o FrontEnd
  - Notificar todas respostas das ações na tela. Ex: se foi um sucesso, se houve uma falha e qual o motivo da falha;
  - Exibir uma confirmação para todas as ações (a não ser que seja especificado que não deve haver confirmação);
  - Trocar a cor de textos de alerta de erro para vermelho, ou alguma cor que destaque um erro;
