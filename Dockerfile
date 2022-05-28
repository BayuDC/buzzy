FROM node:16

WORKDIR /app

RUN apt update && apt install -y lame

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=80    

ENV NODE_ENV production

RUN npm prune --production

CMD ["npm", "start"]
