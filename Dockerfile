# Dockerfile — Frontend Vite -> nginx (serve /dist)
# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app
# Copia package.json + lockfile e instala dependências
COPY package*.json ./
# use npm ci para build reprodutível
RUN npm ci --prefer-offline --no-audit

# Copia código e gera build (gera /app/dist quando Vite default)
COPY . .
# ajustar memória para builds grandes
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build

# Stage 2: serve com nginx
FROM nginx:alpine

# Remove conteúdo default (opcional)
RUN rm -rf /usr/share/nginx/html/*

# Copia build final (Vite -> dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Copia (opcional) um nginx.conf customizado se quiser (substitui o default)
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Mantém nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
