# Creates an docker image
FROM node:12

ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
ADD ./webpack.config.js /app/webpack.config.js
ADD ./src /app/src

WORKDIR /app
RUN npm install
CMD ["npm", "start"]