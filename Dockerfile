FROM node:latest
RUN mkdir code
WORKDIR /code
COPY package.json /code
RUN yarn