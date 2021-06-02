FROM library/node:14.14.0-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

RUN npm install pm2 -g

LABEL maintainer="Achicgi app"

EXPOSE 3000
# CMD npm run start:prod
CMD ["pm2-runtime", "process.prod.yml"]
