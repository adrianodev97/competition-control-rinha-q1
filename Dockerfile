# syntax=docker/dockerfile:1

# Imagem Node.js Alpine para manter o tamanho leve
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-alpine

# Configuração de ambiente para produção
ENV NODE_ENV production

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos de dependências
COPY package.json bun.lockb ./

# Instalar o Bun globalmente e instalar as dependências do projeto
RUN npm install -g bun && bun install

# Copiar apenas o schema para otimizar cache
COPY prisma/schema.prisma prisma/

# Gerar o cliente Prisma
RUN npx prisma generate

# Mudar o usuário para node por questões de segurança
USER node

# Copiar o restante dos arquivos da aplicação
COPY . .

# Configurar permissões para o usuário node
RUN chown -R node:node /usr/src/app

# Expor a porta do servidor
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["bun", "serve"]
