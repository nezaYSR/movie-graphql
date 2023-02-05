FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY ormconfig.docker.json ./ormconfig.json
COPY . ./
EXPOSE 3000
CMD ["npm","run","dev"]
