# sulvo database engine development

FROM mongo:latest

RUN mkdir -p /data/db
COPY ./services/testing/db/mongod.conf /etc/mongod.conf

EXPOSE 27017

# CMD ["--port 27017", "--smallfiles"]
CMD ["--port 27017 --config /etc/mongod.conf"]
ENTRYPOINT usr/bin/mongod
