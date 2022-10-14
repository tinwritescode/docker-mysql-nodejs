FROM node:16
WORKDIR /
COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn install
EXPOSE 3000
CMD yarn start