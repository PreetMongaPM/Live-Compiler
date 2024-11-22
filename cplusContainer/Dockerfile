FROM node:16
RUN apt-get update && apt-get install -y g++ && apt-get clean
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
