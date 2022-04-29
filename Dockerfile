FROM node:12-slim
WORKDIR /JWTTokenAPI
COPY package.json /JWTTokenAPI
RUN npm install
COPY . /JWTTokenAPI
CMD ["npm", "start"]