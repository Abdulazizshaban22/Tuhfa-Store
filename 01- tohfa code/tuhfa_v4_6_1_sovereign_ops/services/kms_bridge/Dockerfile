
FROM node:20-alpine
WORKDIR /app
COPY package.json /app/
RUN npm install --omit=dev
COPY server.mjs /app/
EXPOSE 8090
CMD ["npm", "start"]
