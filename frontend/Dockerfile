FROM node:latest as build
WORKDIR /app
COPY package.json ./
RUN npm install --only=prod
COPY . /app
RUN npm run build
