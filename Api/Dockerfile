FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3000 

CMD ["yarn","start"]