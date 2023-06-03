# Contact App

This is a full-stack contact app built using MERN stack. It allows users to manage their contacts by performing CRUD (Create, Read, Update, Delete) operations.

## Features

- User-friendly interface for managing contacts
- Create new contacts with details such as name, profile photo, phone number, and email
- View a list of all contacts
- Update contact information
- Delete contacts from the database

## Technologies Used

- Frontend:
  - React: A JavaScript library for building user interfaces
  - Tailwind CSS: A utility-first CSS framework
- Backend:
  - Express: A fast and minimalist web application framework for Node.js
  - MongoDB Cloud: A fully managed cloud database service for MongoDB

## Prerequisites

Before running the app, ensure you have the following:

- Node.js and npm installed on your local machine
- MongoDB Cloud account and connection details (URI)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/rajstormo/contact-app-mern.git
```

2. Navigate to the project directory:

```shell
cd contact-app-mern
```

3. Install the dependencies for both frontend and backend:

```shell
cd frontend
npm install
cd ../backend
npm install
```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

```
DATABASE_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_jwt_secret_token
PORT=port_no
```

Replace `your_mongodb_uri` with your MongoDB Cloud connection URI.

5. Create a `.env` file in the `backend` directory and add the following environment variables:

```
VITE_BACKEND_URL=backend_url 
VITE_CLOUD_NAME=cloudinary_cloud_name
VITE_PRESET_NAME=cloudinary_preset_name
```


## Usage

1. Start the backend server:

```shell
cd backend
npm start
```

The server will run on `http://localhost:3000` if port not defined in the .env file

2. Start the frontend development server:

```shell
cd frontend
npm run dev
```

The app will open in your default browser at `http://localhost:5173`.

3. Use the app in the browser and manage your contacts.

## Deployment

To deploy the app to a production environment, follow the deployment instructions for both the frontend and backend separately. Here are a few options:

- Frontend (React + Tailwind CSS):
  - Deploy the frontend to Netlify, GitHub Pages, or another hosting service that supports static website hosting.
  - Add the environment variables required on the particular website.
- Backend (Express + MongoDB Cloud):
  - Deploy the backend to a cloud platform such as Render or AWS. Set the `DATABASE_URI` environment variable to the appropriate MongoDB Cloud connection URI in the deployment environment.

Ensure you update the necessary configuration files and environment variables specific to your deployment environment.

- check live on [https://contact-app-frontend.onrender.com/](https://contact-app-frontend.onrender.com/)