# sulvo ad backend development

FROM ubuntu:latest

WORKDIR .

RUN mkdir /src
RUN mkdir /src/server

# RUN mkdir /build
# RUN mkdir /build/server

RUN apt-get update
RUN apt-get install curl -y

COPY ./webpack.helper.js /src/webpack.helper.js
COPY ./services/production/backend/webpack.config.js /src/webpack.config.js
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./services/production/backend/gulpfile.js /src/gulpfile.js

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install nodejs -y
RUN apt-get install --yes build-essential

RUN npm install webpack -g
RUN npm install pm2 -g
# RUN npm install -g nodemon

WORKDIR /src
RUN webpack build-backend

WORKDIR /build
CMD [ "pm2-docker", "start", "app.js" ]
