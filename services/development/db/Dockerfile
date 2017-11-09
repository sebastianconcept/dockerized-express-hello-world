# sulvo database engine development

FROM mongo:latest

WORKDIR .

RUN apt-get update
RUN apt-get install curl -y

EXPOSE 27017

# CMD ["--port 27017", "--smallfiles"]
CMD ["--port 27017"]
ENTRYPOINT usr/bin/mongod
