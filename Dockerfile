ARG BASE_IMAGE_TAG=20-alpine

FROM node:${BASE_IMAGE_TAG}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npx", "tsx", "src/index.ts"]
