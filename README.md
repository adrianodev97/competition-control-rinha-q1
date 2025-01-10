# Competition Control Rinha Q1

Este projeto é uma aplicação backend construída com Fastify, Prisma e MongoDB. O objetivo é gerenciar entradas e saídas de caixa, retornando extratos em tempo real.

## Pré-requisitos

- Node.js (versão 20.x ou superior)
- Bun (gerenciador de pacotes)
- MongoDB

## Rodando a aplicação localmente

### 1. Clonando o repositório

Primeiro, clone o repositório:

```bash
git clone https://github.com/adrianodev97/competition-control-rinha-q1.git
cd competition-control-rinha-q1
```

### 2. Instale as dependências

Instale as dependências do projeto utilizando o Bun:

```bash
bun install
```

### 3. Configuração do MongoDB

Certifique-se de que o MongoDB está rodando localmente. Você pode usar o MongoDB Atlas ou configurar um MongoDB localmente. O banco de dados é configurado através da variável de ambiente DATABASE_URL.

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
DATABASE_URL=DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.fbp5s.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=<appname>
```

### 4. Rodando a aplicação

Execute o servidor de desenvolvimento com o comando:

```bash
bun serve
```

A aplicação estará rodando em http://localhost:3333.

### 5. Prisma

Para gerar o cliente Prisma, execute o seguinte comando:

```bash
bunx prisma generate
```

Este comando irá gerar o cliente que o backend usará para interagir com o banco de dados.

## Acessando o Projeto

Você pode acessar a aplicação diretamente em http://localhost:3333 ou por meio de um proxy configurado via Nginx.

Para saber como rodar o projeto utilizando Docker, consulte o arquivo [README.Docker.md](README.Docker.md).


