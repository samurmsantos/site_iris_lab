# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Remove arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o HTML
COPY index.html /usr/share/nginx/html/

# Copia o CSS
COPY index.css /usr/share/nginx/html/

# Copia o JavaScript
COPY index.js /usr/share/nginx/html/

# Copia a pasta de assets
COPY assets/ /usr/share/nginx/html/assets/

# Expõe a porta 80
EXPOSE 80

# O Nginx já inicia automaticamente com a imagem base
CMD ["nginx", "-g", "daemon off;"]
