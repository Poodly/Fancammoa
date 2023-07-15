# build stage
FROM node:18-alpine

WORKDIR /app

COPY . .

# WORKDIR /app/server/

RUN npm ci  && npm run build

EXPOSE 5000

CMD [ "npm", "start" ]