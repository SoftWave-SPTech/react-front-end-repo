# build stage
FROM node:20-alpine as build
WORKDIR /app

# instalar dependências (npm ci é reprodutível)
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# copiar fontes e build
COPY . .
# se tiver problema de memória, a linha abaixo ajuda:
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build

# production stage: serve static with nginx
FROM nginx:alpine AS prod
# limpa conteúdo default do nginx (opcional)
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
