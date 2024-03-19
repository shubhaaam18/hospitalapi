const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Function to create a new user
module.exports.create = async function(req, res) {
    try {
        // Check if the username already exists in the database
        let user = await User.findOne({ username: req.body.username });

        if (user) {
            // If the username exists, return a conflict status (409)
            return res.status(409).json({
                message: 'Username Already Exists',
            });
        }

        // Create a new user with the provided details
        user = await User.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            type: 'Doctor' // Assuming this is a doctor type user
        });

        // Return a success message with status code 201 (Created)
        return res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        // Handle any errors that occur during user creation
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// Function to create a session (authenticate user and generate JWT token)
module.exports.createSession = async function(req, res) {
    try {
        // Find the user in the database based on the provided username
        let user = await User.findOne({ username: req.body.username });

        // Check if the user exists and the password matches
        if (!user || user.password != req.body.password) {
            // If user doesn't exist or password doesn't match, return a status of 422 (Unprocessable Entity)
            return res.status(422).json({
                message: 'Invalid Username or Password'
            });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(user.toJSON(), 'Alert1234', { expiresIn: '1000000000000000000' });

        // Return a success message with the generated token
        return res.status(200).json({
            message: 'Sign in successful. Here is your token, please keep it safe',
            data: {
                token: token
            }
        });
    } catch (error) {
        // Handle any errors that occur during session creation
        console.log('Error', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
