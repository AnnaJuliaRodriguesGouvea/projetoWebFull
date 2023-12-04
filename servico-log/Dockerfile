FROM node:18.7.0

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY consumer .

CMD [ "node", "index.js"]
