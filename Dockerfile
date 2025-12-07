# Dockerfile — Frontend Vite -> nginx (serve /dist)
# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build

# Stage 2: serve com nginx
FROM nginx:alpine

# Remove conteúdo default
RUN rm -rf /usr/share/nginx/html/*

# Copia o build final
COPY --from=build /app/dist /usr/share/nginx/html

# 🟢 COPIA A CONFIGURAÇÃO QUE EVITA 404 NAS ROTAS
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
