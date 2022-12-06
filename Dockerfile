FROM node:18-alpine
RUN mkdir code
WORKDIR /code
COPY ./package.json /code
RUN yarn