FROM node:11.4.0

WORKDIR /app

ADD . /app

RUN npm install && npm audit fix && npm install -g nodemon

EXPOSE 2603

# CMD [ "node","app.js" ]