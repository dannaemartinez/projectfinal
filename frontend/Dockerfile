FROM node:18-alpine3.14
# RUN mkdir /usr/src/frontend
WORKDIR /usr/src/frontend
COPY package.json ./
# COPY package.lock.json ./
COPY ./ ./
ARG BASE_API_URI

RUN npm install --quiet

ENV REACT_APP_BASE_API_URI=${BASE_API_URI}
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
