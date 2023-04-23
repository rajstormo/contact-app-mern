FROM node:18.14.0-alpine
WORKDIR /contact-frontend
COPY ./package.json ./
COPY ./package-lock.json ./
COPY . .
ENV VITE_BACKEND_URL=http://65.2.78.150:3000
ENV VITE_CLOUD_NAME=dzaj6rovc
ENV VITE_PRESET_NAME=contactApp
EXPOSE 5173
RUN npm install
CMD ["npm","run","host"]
