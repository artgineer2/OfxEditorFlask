FROM mongo:latest

RUN mkdir -p /tmp/mongodata

copy ./editordb /tmp/mongodata/

copy ./setup.sh /docker-entrypoint-initdb.d/setup.sh
