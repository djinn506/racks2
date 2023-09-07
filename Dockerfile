FROM node:18-alpine

WORKDIR opt

COPY . ./

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]

