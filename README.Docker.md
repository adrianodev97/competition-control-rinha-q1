
### README.Docker.md (para rodar com Docker)
```markdown
# Competition Control Rinha Q1 - Docker

Este projeto pode ser rodado em containers utilizando Docker. Aqui está um guia passo a passo para rodar a aplicação usando Docker Compose.

## Pré-requisitos

- Docker
- Docker Compose

## Rodando a aplicação com Docker

### 1. Configuração do Docker

Este projeto já vem com um arquivo docker-compose.yml e um Dockerfile configurados.

Execute os seguintes comandos para construir as imagens e subir os containers:

```bash
docker-compose up --build
```

Isso irá:

1. Criar e iniciar os containers para o backend, MongoDB e Nginx.
2. Mapear a porta 3333 do backend para 3333 localmente.
3. Mapear a porta 8080 para acessar o Nginx.

O MongoDB será inicializado com uma configuração de replicação para suportar o ambiente de produção.

### 2. Inicializando o Replica Set do MongoDB

Após os containers estarem rodando, precisamos inicializar o Replica Set do MongoDB. Para isso, entre no container do MongoDB e execute o comando:

```bash
docker exec -it mongo mongosh
rs.initiate()
```

Isso irá configurar o MongoDB para usar um Replica Set, que é necessário para garantir a alta disponibilidade e confiabilidade do banco de dados.

### 3. Projeto em funcionamento

Agora, o projeto está em pleno funcionamento e pode ser acessado em http://localhost:3333.

## Parando os containers

Para parar os containers, execute:

```bash
docker-compose down
```