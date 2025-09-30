#docker compose
rm docker-compose.yml
ln -s docker-compose-prod.yml docker-compose.yml

#configs traefik
ln -s traefik/traefik_prod.yml traefik.yml
ln -s traefik/dynamic_prod.yml dynamic.yml

#env do backend
cp backend/.env.example backend/.env

#vite config
rm frontend/vite.config.js
cp frontend/vite.config-prod.js frontend/vite.config.js

#Dockerfile do front
rm frontend/Dockerfile
cp frontend/Dockerfile-prod frontend/Dockerfile