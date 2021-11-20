import userModel from "./models/user.js";
import jwt from "jsonwebtoken";

function _validateEmail(email) {
    const rexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!rexp.test(email))
        return false;

    const addrParts = email.split("@");

    if(addrParts[0].length > 64)
        return false;

    const domainParts = addrParts[1].split(".");
    if(domainParts.some(part => { return part.length > 63; }))
        return false;    
    
    return true;
}

function _createNewUser(req, res) {
    const user = new userModel({
        FirstName:  req.body.first_name,
        LastName:   req.body.last_name,
        Email:      req.body.email,
        Login:      req.body.login,
        Password:   req.body.password
    });

    user.save()
        .then((result) => {
            res.send({
                message: "Account successfully created"
            })
        })
        .catch((e) => {
            console.error(e);
        })
}

async function register(req, res) {
    if (!req.body) {
        return res.status(400).send({
            error: "missing required fields"
        });
    }

    const requiredFields = ["first_name", "last_name", "email", "login", "password"];

    for (const field of requiredFields) {
        if (!(field in req.body))
            return res.status(400).send({
                error: `${field} is required`
            });
    }

    if (!_validateEmail(req.body.email))
        return res.status(400).send({
            error: `invalid email`
        });
        
    // gross
    userModel.findOne({ Email: req.body.email }, (err, user) => {
        if (err === null && user)
            return res.status(400).send({
                error: `user account with email already exists`
            });
        
        userModel.findOne({ Login: req.body.login }, (err, user) => {
            if (err === null && user)
                return res.status(400).send({
                    error: `user account with login already exists`
                });
            
            _createNewUser(req, res);
        });
    });
}

// Login API receives login & password.
// Returns ID, firstName, lastName, error.
async function login(req, res) {

    if (!process.env.LOGIN_KEY)
        return console.error("LOGIN_KEY not defined in the ENV");

    const { login, password } = req.body;

    if (!login || !password) 
        return res.status(400).json({
            error: "missing required fields"
        });

    const results = await userModel.findOne({
        $and: [
            { Password: password }, 
            { $or: [
                    { Email: login }, 
                    { Login: login }
                ]
            }]
        });

    if (results) {
        const verStatus = results.AuthStatus;

        if (verStatus == 0) {
            return res.status(400).json({
                error: "Account not verified."
            });
        }

        try {
            const ret = jwt.sign({
                    first_name: results.FirstName,
                    last_name: results.LastName,
                    login: results.Login, 
                    _id: results._id
                },
                process.env.LOGIN_KEY, {
                    expiresIn: '20h'
                }
            );
    
            return res.status(200).json(ret);

        } catch (e) {
            
            return res.status(400).json({
                error: e.message
            });
        }
    }

    return res.status(400).json({
        error: "Login/Password incorrect."
    });
}

// Forgot Password API receives email.
// Sends email verification via SMTP sendgrid.
async function forgot(req, res) {
    if (!process.env.RESET_PASSWORD_KEY)
        return console.error("RESET_PASSWORD_KEY not defined in the ENV");

    const email = req.body?.email;

    if (!email)
        return res.status(400).send({
            error: `email is required`
        });
   
    if (!_validateEmail(email))
        return res.status(400).send({
            error: `invalid email`
        });

    const emailSentMsg = "The recovery email has been sent to the provided email";

    userModel.findOne({ Email: email }, (err, user) => {

        // If there is no account with email, do not let the user know if they exists or not
        // the existence of an email on our site should only be known to owner

        // NEVER CONFIRM OR DENY THE EXISTENCE OF AN ACCOUNT WITH A GIVEN EMAIL OR USERNAME

        if (err || !user) {
            // send an email stating account not found following a link to create a new account
            // sendAccountNotFound()
            return res.status(200).json({
                message: emailSentMsg
            });
        }

        // Javascript web token receives information
        const jwtoken = jwt.sign(
            { _id: user._id }, 
            process.env.RESET_PASSWORD_KEY,
            { expiresIn: '20m'}
        );

        // TODO: do this as HTML template with username.
        let message = `Hello, this is a password reset request for your Todo account!
            If you did not request this, please ignore.
            Reset your password here: https://cop4331-test123.herokuapp.com/`;
        
        message += jwtoken;
        console.log(message);
        // Send email.
        // const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);

        // Modifies an existing document or documents in a collection.
        user.updateOne({ _id: user._id }, {
            $set: {
                resetPassword: jwtoken
            }
        });

        return res.status(200).json({
            message: emailSentMsg
        });
    });
}

// Reset Password API receives reset_link and new_password.
// Updates the new password in the database.
async function reset(req, res) {

    const { reset_link, new_password } = req.body;

    if (!reset_link || !new_password)
        return res.status(400).json({ error: "Required fields missing" });


    // Verify the javascript encrypted payload.
    jwt.verify(reset_link, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {

        if (err) {
            return res.status(401).json({
                error: "Invalid token (either incorrect or expired)."
            });
        }

        // Return the correct user.
        userModel.findOne({ resetPassword: reset_link }, (err, user) => {
            if (err || !user) {
                // User isn't found or there is an error.
                return res.status(400).json({
                    error: "Invalid token."
                });
            } else {
                user.updateOne(
                    { _id: user._id }, 
                    { $set: { Password: new_password }
                });

                return res.status(200).json({  error: "" });
            }
        })
    });

    return res.status(401).json({ error: "Authentication error." });
}

export default {
    register: register,
    login: login,
    forgot: forgot,
    reset: reset
}