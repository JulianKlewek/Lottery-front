FROM node:19.2.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . ./
RUN ng build --configuration=production

FROM nginx:1.25.3-alpine-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build app/dist/lottery-front /usr/share/nginx/html
EXPOSE 4200
