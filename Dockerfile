FROM node:alpine

WORKDIR /usr/app/backend

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

# Production only
# CMD ["npm", "run", "build"]