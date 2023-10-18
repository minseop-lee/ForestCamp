FROM node:18

WORKDIR /oauth

COPY oauth.tar.gz .
RUN tar xvzf oauth.tar.gz

WORKDIR /oauth/server

RUN npm install

CMD ["node", "server.js"]