FROM node:15-slim
WORKDIR /home/node/app
CMD [ "npx prisma migrate save --experimental","npx prisma migrate up --experimental","npm install","npm start" ]