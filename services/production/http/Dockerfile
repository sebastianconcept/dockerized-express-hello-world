# sulvo http

FROM nginx

RUN mkdir /wwwroot
RUN rm /etc/nginx/conf.d/default.conf
COPY ./services/development/http/nginx.conf /etc/nginx/nginx.conf
# RUN apt-get update && apt-get install curl -y

# RUN service nginx start
CMD ["nginx", "-g", "daemon off;"]
