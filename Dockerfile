FROM node:12

# create app dir
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./
RUN npm install

# bundle app source
COPY . .

EXPOSE 4000

RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
