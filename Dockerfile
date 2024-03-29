FROM node:21
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
ENTRYPOINT [ "node", "dist/index.js" ]