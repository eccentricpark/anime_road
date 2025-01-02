FROM node:18-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

COPY dist ./dist

RUN npm install

EXPOSE 3000

ENV PORT=3000

CMD ["node", "./dist/app.js"]