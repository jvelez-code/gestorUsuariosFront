#Primera Etapa
FROM node:20.10.0 AS node

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install --force

COPY . /app


RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine

COPY --from=node /app/dist/gestorfront /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 para servir la app
EXPOSE 80

# Definimos el comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
