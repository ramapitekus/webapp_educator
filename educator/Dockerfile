FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package.json .
COPY . .
EXPOSE 3000

RUN npm install

CMD ["npm", "start"]