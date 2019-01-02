FROM node:10.14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
