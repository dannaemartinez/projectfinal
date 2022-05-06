FROM node:18-alpine3.14
# RUN mkdir /usr/src/frontend
WORKDIR /usr/src/frontend
COPY package.json ./
# COPY package.lock.json ./
COPY ./ ./
RUN npm install --quiet
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
