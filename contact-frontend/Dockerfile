FROM node:alpine
WORKDIR ./contact-frontend
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./ ./
RUN npm install
CMD ["npm","run","host"]
EXPOSE 5173