# **ToDo-plus App**
This is a Todo App that allows users to create, edit and delete Todo and their tasks. The app is built with React.js on the frontend and Node.js, Express.js and MongoDB on the backend.

## Backend Setup

To run the backend, follow these steps:

1. Clone the repository and navigate to the backend directory:
```
https://github.com/waqui27/ToDo_plus_App_MERN_Stack.git
cd server
```
2. Install the dependencies:
```
npm install
```
3. Create a .env file in the root directory with the following variables:
```
PORT = 4000
MONGO_URI=<your-mongodb-uri>
SECRET_KEY=<your-secret-key>
```
4. Start the server:
```
npm start
```

You can also setup nodemon.
Also, you have to change the origin of the corsOptions to you local host in `app.js` or you can completely avoid using cors for local environment.


## Frontend Setup
To run the frontend, follow these steps:

1. Navigate to the frontend directory:
```
cd client
```
2. Install the dependencies:
```
npm install
```
3. Start the app:
```
npm start
```
You have to set a proxy like "proxy": `"http://localhost:4000"`, and comment out the `BASE_URL` from every where if you want to use it on local machine

## Features
The Todo App has the following features:
- User authentication: Users can sign up and log in to their accounts.
- Create, edit and delete Todos and tasks: Users can create new Todo and their tasks, edit existing Todo and their tasks and delete Todo and their tasks.
- Task completion: Users can mark tasks as completed for each Todo

## Technologies Used
The Todo App uses the following technologies:

- React.js: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js: A minimalist web framework for Node.js.
- MongoDB: A document-oriented NoSQL database.
- Mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.
- JSON Web Tokens (JWT): A compact, URL-safe means of representing claims to be transferred between two parties.
- bcrypt.js: A library to help you hash passwords.

## Contributing
Contributions are welcome! If you find a bug or want to add a feature, feel free to open an issue or submit a pull request.
