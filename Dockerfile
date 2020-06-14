FROM node:10.13-alpine as runtime
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install

FROM node:10.13-alpine as build
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install && npm install typescript -g
COPY ./tsconfig.json .
COPY ./*.ts .
RUN npm run build

FROM runtime as final
COPY --from=build /usr/src/app/dist .
CMD ["node","server.js"]