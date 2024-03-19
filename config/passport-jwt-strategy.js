const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// JWT options for extracting token and setting the secret key
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Extract JWT token from the Authorization header
    secretOrKey: 'Alert1234' // Secret key used to sign the JWT tokens
}

// Create a new JWT authentication strategy using Passport
passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
    // Find the user based on the ID extracted from the JWT payload
    User.findById(jwtPayload._id).then(function (user) {
        // If the user is found, return the user object
        if (user) {
            return done(null, user);
        }
        // If the user is not found, return false
        return done(null, false);
    }).catch(function (error) {
        // Handle any errors that occur during the user lookup
        console.log('Error in finding the User from JWT')
        return done(error);
    });
}));

// Export the Passport instance configured with JWT authentication strategy
module.exports = passport;
