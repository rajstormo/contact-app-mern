FROM node:18.14.0-alpine
WORKDIR /contact-frontend
COPY ./package.json ./
COPY ./package-lock.json ./
COPY . .
EXPOSE 5173
RUN npm install
CMD ["npm","run","host"]
