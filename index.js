const express = require('express');
const app = express();

// Define the port number
const port = 6500;

// Import the database connection from './config/mongoose'
const db = require('./config/mongoose');

// Import passport and passport JWT strategy
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Initialize passport middleware
app.use(passport.initialize());

// Use express router for routing
app.use('/', require('./routes/index'));

// Start the server and listen on the specified port
app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the Server. Error is : ${error}`);
        return;
    }
    console.log(`connected to http://localhost:${port}`);
});
