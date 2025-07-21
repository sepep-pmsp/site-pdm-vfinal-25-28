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

FROM nginx:1.26-alpine

COPY --from=build /usr/src/app/dist/front-end/browser /usr/share/nginx/html
