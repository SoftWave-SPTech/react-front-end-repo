# Dockerfile para React Frontend
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve build com nginx
FROM nginx:alpine

# Instalar curl
RUN apk add --no-cache curl

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
