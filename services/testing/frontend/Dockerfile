# sulvo ad client development

FROM node:latest

WORKDIR .

RUN mkdir /src
RUN mkdir /src/client
RUN mkdir /src/node_modules

RUN mkdir /build
RUN mkdir /build/client

RUN apt-get update
RUN apt-get install curl -y

COPY ./webpack.helper.js /src/webpack.helper.js
COPY ./services/testing/frontend/webpack.config.js /src/webpack.config.js
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./services/testing/frontend/gulpfile.js /src/gulpfile.js
COPY ./karma.conf.js /src/karma.conf.js

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install nodejs -y
RUN apt-get install --yes build-essential

RUN npm install -g nodemon
RUN npm install gulp-cli -g
RUN npm install gulp -D
RUN npm install webpack -g

WORKDIR /src
CMD gulp run
