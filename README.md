## Clone the Repository

git clone https://github.com/AlexYadaicela/typing-app.git

## Install dependencies for both the frontend and the backend

1. for the Backend

`cd server`
`npm install `

2. for the Frontend
   `cd client`
   `npm install`

## Create a .env file in the root of the server directory

`MONGO_URI = <MONGODB_CONNECTION_STRING>`
`JWT_SECRET = <YOUR_SECRET_KEY> `
`JWT_LIFETIME = <ex. 7d>`

## Create a .env file in the root of the client directory

`VITE_API_URL: <http://localhost:3000> or port set by user`

## Start the server

`npm start dev`
input the result into the VITE_API_URL environment variable

## Start the client

`npm run dev`
locate the link address of you server
