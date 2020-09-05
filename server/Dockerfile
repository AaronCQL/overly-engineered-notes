# use the official lightweight node 12 image
FROM node:12-slim

# create and change to app dir
WORKDIR /usr/src/app

# copy local package.json (to optimise build speed)
COPY package.json yarn.lock ./

# ignore devDependencies and only install dependencies
RUN yarn --prod

# copy all local files; check .dockerignore for files that should be copied
COPY . .

# compile ts files and start the server
CMD yarn start
