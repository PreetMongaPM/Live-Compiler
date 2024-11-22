FROM nginx:latest

RUN apt-get update && apt-get install -y iputils-ping

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY index.html .
COPY styles.css .
COPY script.js .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
