// Importing the 'config' function from the 'dotenv' package
import { config }  from 'dotenv';

// Calling the 'config' function to load environment variables from a '.env' file into 'process.env'
config();

// Importing the 'sign' and 'verify' functions from the 'jsonwebtoken' package
import { sign, verify } from 'jsonwebtoken';

// Defining a function named 'createToken' that takes a 'user' object as a parameter
function createToken(user) {
    // Returning a JSON Web Token (JWT) created using the 'sign' function
    return sign(
        {
            // Payload data (contents of the token)
            emailAdd: user.emailAdd, // User's email address
            userPwd: user.userPwd    // User's password (note: it's not recommended to include sensitive data in the payload)
        },
        process.env.SECRET_KEY,     // Secret key used to sign the token, retrieved from environment variables
        {
            expiresIn: "1h"         // Expiration time of the token (1 hour from the time it's created)
        }
    );
}

function verifyAToken(req, res, next) {
    // Retrieve a Token from the browser
    const token = req.headers['authorization'];
    if(token) {
        if(verify(token, process.env.SECRET)) {
            // If the token is valid, add the decoded payload to the request so it can
            next()
            } else {
                res?.json({
                    status: res.statusCode,
                    message: `Invalid or no Authorization header found.(please provide the correct credentials.)`
                })
            }
}
}