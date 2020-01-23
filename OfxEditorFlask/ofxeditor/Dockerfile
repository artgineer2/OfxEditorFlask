# pull official base image
FROM python:3.7-alpine

# set work directory
WORKDIR /usr/src/ofxeditor

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# add bash for "wait-for-it.sh"
RUN apk update && apk add bash \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk del build-deps

# install dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
COPY ./Pipfile /usr/src/ofxeditor/Pipfile
RUN pipenv install --skip-lock --system --dev


copy ./wait-for-it.sh /wait-for-it.sh
copy ./entrypoint.sh /entrypoint.sh

# copy project
COPY . /usr/src/ofxeditor/

# run entrypoint.prod.sh
ENTRYPOINT ["/bin/sh","-c","/wait-for-it.sh mongodb:27017 -t 0 -- /entrypoint.sh"]
