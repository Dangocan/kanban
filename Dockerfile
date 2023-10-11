FROM node:alpine

WORKDIR /usr/app/backend

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "build"]

# Dev only
# CMD ["npm", "run", "start:dev"]