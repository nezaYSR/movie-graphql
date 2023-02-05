FROM node:12.17.0-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:12.17.0-alpine
WORKDIR /usr
COPY package.json ./
EXPOSE 3000
CMD ["node","src/server.js"]