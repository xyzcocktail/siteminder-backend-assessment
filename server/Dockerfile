FROM node:12-slim

WORKDIR /usr/src/siteminder/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn

EXPOSE 8080

CMD ["yarn", "run", "dev"]
