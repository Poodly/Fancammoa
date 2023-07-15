# build stage
FROM node:18-alpine

WORKDIR /app

COPY . .

# WORKDIR /app/server/

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
# CMD [ "npm", "start" ]