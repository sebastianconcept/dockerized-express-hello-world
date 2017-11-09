# sulvo database engine development

FROM redis:latest

WORKDIR .
COPY ./services/testing/cache/redis.conf /etc/redis.conf

EXPOSE 6379

CMD ["--port 6379"]
ENTRYPOINT /usr/local/bin/redis-server
