# Creates an docker image
FROM node:12

ADD . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]