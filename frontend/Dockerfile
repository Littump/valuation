FROM node:latest as build
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx 
copy --from=build /frontend/dist /usr/share/nginx/html
