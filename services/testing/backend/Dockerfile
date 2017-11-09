# sulvo ad backend development

FROM node:latest

WORKDIR .

RUN mkdir /src
RUN mkdir /src/server
RUN mkdir /src/node_modules

RUN mkdir /build
RUN mkdir /build/server
RUN mkdir /src/config/

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install -y mongodb-org-shell

COPY ./config/testing/backend-settings.js /src/config/backend-settings.js

COPY ./webpack.helper.js /src/webpack.helper.js
COPY ./services/testing/backend/webpack.config.js /src/webpack.config.js
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./services/testing/backend/gulpfile.js /src/gulpfile.js

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install nodejs -y
RUN apt-get install --yes build-essential

RUN npm install -g nodemon
RUN npm install gulp-cli -g
RUN npm install gulp -D
RUN npm install webpack -g


WORKDIR /src
CMD gulp run
