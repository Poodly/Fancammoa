# build stage
FROM node:18-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm ci

# additional stage for Chrome driver
FROM node:18-alpine as chrome-stage

RUN apk add --no-cache curl unzip
RUN apk add --no-cache chromium chromium-chromedriver
RUN apk add --no-cache xvfb
RUN apk add --no-cache xorg-server

RUN wget https://selenium-release.storage.googleapis.com/3.141/selenium-server-standalone-3.141.0.jar

# final stage
FROM node:18-alpine as final-stage

WORKDIR /app

COPY --from=build-stage /app .

# copy Chrome driver from the chrome-stage
COPY --from=chrome-stage /usr/bin/chromedriver /usr/bin/chromedriver

# copy Selenium server from the chrome-stage
COPY --from=chrome-stage /selenium-server-standalone-3.141.0.jar /selenium-server-standalone-3.141.0.jar

EXPOSE 100

CMD [ "npm", "start" ]


# # build stage
# FROM node:18-alpine as build-stage

# WORKDIR /app

# COPY . .

# RUN npm ci

# # additional stage for Chrome and Chrome driver
# FROM ubuntu:latest as chrome-stage

# RUN apt-get update && \ 
#     # 필요한 패키지를 설치
#     apt-get install -y unzip xvfb libxi6 libgconf-2-4 && \
#     apt-get install -y curl unzip gnupg

# ARG CHROME_DRIVER_VERSION=111.0.5563.64
#     # 크롬을 설치한다.
# RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
#     echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
#     apt-get update && \
#     apt-get -y install google-chrome-stable && \
#     # 크롬 드라이버를 설치하고 압축을 해제
#     wget https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip && \
#     unzip chromedriver_linux64.zip && \
#     # 시스템 구성을 위해 크롬 드라이버를 이동 및 권한을 부여
#     mv chromedriver /usr/bin/chromedriver && \
#     chown root:root /usr/bin/chromedriver && \
#     chmod +x /usr/bin/chromedriver && \
#     # Selenium 서버를 설치 후 실행
#     wget https://selenium-release.storage.googleapis.com/3.141/selenium-server-standalone-3.141.0.jar && \
#     xvfb-run java -Dwebdriver.chrome.driver=/usr/bin/chromedriver -jar selenium-server-standalone-3.141.0.jar

# # final stage
# FROM node:18-alpine as final-stage

# WORKDIR /app

# COPY --from=build-stage /app .

# # copy Chrome and Chrome driver from the chrome-stage
# COPY --from=chrome-stage /usr/bin/google-chrome-stable /usr/bin/google-chrome-stable
# COPY --from=chrome-stage /usr/bin/chromedriver /usr/bin/chromedriver
# COPY --from=chrome-stage /opt/google/chrome/ /opt/google/chrome/

# EXPOSE 100

# CMD [ "npm", "start" ]


# # build stage
# FROM node:18-alpine

# WORKDIR /app

# COPY . .

# # WORKDIR /app/server/

# RUN npm ci

# EXPOSE 100
# # CMD [ "npm", "run", "dev" ]
# CMD [ "npm", "start" ]
# # https://dotorimook.github.io/post/2020-12-20-docker-pm2/ pm2 docker환경에서 종료될때 글