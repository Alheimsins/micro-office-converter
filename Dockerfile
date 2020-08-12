FROM node:14.8.0-alpine3.11

# Install LibreOffice and friends

RUN apk add libreoffice openjdk11-jre font-noto

#### Begin setup ####

# Bundle app source
COPY . /src

# Change working directory
WORKDIR /src

# Install dependencies
RUN npm install --production

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start