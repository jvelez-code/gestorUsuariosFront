#Primera Etapa
FROM node:18.17.0 as node
WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . /app


RUN npm run build  --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine
	#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=node /app/dist/gestor-usuario-front /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
