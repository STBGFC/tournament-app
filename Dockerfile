FROM node:4-onbuild
MAINTAINER STBGFC <admin@stbgfc.co.uk>

RUN apt-get update && apt-get upgrade -y
WORKDIR /opt

ADD server /opt/server
ADD node_modules /opt/node_modules
RUN ["npm", "install", "bcrypt"]
ENV JWT_EXPIRES_IN_MINUTES=600 \
    JWT_SECRET_KEY=this-should-be-0verr1dd3n-when-running-the-container \
    NODE_ENV=prod

ENTRYPOINT ["node", "/opt/server/app.js"]
EXPOSE 3000

