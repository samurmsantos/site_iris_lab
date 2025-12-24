# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Copia todos os arquivos do site para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# O Nginx já inicia automaticamente com a imagem base
CMD ["nginx", "-g", "daemon off;"]
