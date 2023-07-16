# build stage
FROM node:18-alpine

WORKDIR /app

COPY . .

# WORKDIR /app/server/

RUN npm ci

EXPOSE 100
# CMD [ "npm", "run", "dev" ]
CMD [ "npm", "start" ]
# https://dotorimook.github.io/post/2020-12-20-docker-pm2/ pm2 docker환경에서 종료될때 글