FROM node:18.14.0-alpine
WORKDIR /contact-backend
COPY package*.json ./
COPY . .
ENV PORT=3000
ENV DATABASE_URI=mongodb+srv://rajstormo:rajstormo123@myproject.qxmggst.mongodb.net/contact-app?retryWrites=true&w=majority
ENV ACCESS_TOKEN_SECRET=defcb45a1078c4574fc9361f6b1f1629ed252440f9123207c7ff028074801a439fdf8fc6e3e36c73293cb0d7307c4df73c4c5322e0e585da490a505723936d6f
EXPOSE 3000
RUN npm install 
CMD ["npm","start"]
