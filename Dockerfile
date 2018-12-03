FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./nodemon-debug.json /usr/src/app/
COPY ./nodemon.json /usr/src/app/
COPY ./credentials /usr/src/app/
COPY ./package.json /usr/src/app/
COPY ./tsconfig.json /usr/src/app/
COPY ./tslint.json /usr/src/app/
COPY ./swaggerConfig.json /usr/src/app/

RUN npm install

COPY . /usr/src/app
COPY ./fix/typescript-rest-swagger/dist /usr/src/app/node_modules/typescript-rest-swagger/dist

EXPOSE 8080

RUN npm install -g nodemon

CMD ["nodemon"]
