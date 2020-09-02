# use the official lightweight node 12 image
FROM node:12-slim

# create and change to app dir
WORKDIR /usr/src/app

# copy all local files; check .dockerignore for files to be ignored
COPY . .

# ignore devDeps and only install deps
RUN yarn --prod

# compile ts files and start the server
CMD yarn start
