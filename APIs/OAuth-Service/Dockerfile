FROM node:8

LABEL SERVICE_NAME=OAuth
ENV APP_HOME /src
ENV PORT 8001
ENV ENVIROMENT PROD

ARG PORT=$PORT
ARG ENVIROMENT=$ENVIROMENT

COPY . $APP_HOME

ADD dist/ ./

RUN cd $APP_HOME \
    && mkdir exportFiles

WORKDIR $APP_HOME

EXPOSE $PORT

ENTRYPOINT node ./dist/server.js