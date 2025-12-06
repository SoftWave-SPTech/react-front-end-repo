# Dockerfile (para frontend estático já buildado)
FROM nginx:alpine

# delete default nginx html (opcional)
RUN rm -rf /usr/share/nginx/html/*

# Copia build produzido localmente para a imagem
COPY build/ /usr/share/nginx/html/

# Se você tiver um nginx.conf customizado, copia também:
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Mantém nginx rodando em foreground
CMD ["nginx", "-g", "daemon off;"]
