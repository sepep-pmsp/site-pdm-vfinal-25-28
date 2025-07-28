FROM node:22-alpine AS build

RUN npm create vite@latest . --template react

WORKDIR /usr/src/app

COPY package-lock.json .

COPY package.json .

COPY public ./public

COPY src ./src

COPY . .

RUN npm install -D tailwindcss postcss autoprefixer

RUN npm install

RUN npm run build

EXPOSE 5173

# Comando padrão: aplica migrações e inicia o servidor
CMD ["sh", "-c", "npm run dev -- --host"]