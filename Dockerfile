FROM node:4.2
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE 4000
CMD ["node", "/src/server.js"]