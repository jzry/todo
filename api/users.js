import user from "./models/user.js";
import token from "./createJWT.js";
import jwt from "jsonwebtoken";

async function register(req, res) {
    if (!req.body) {
        return res.status(400).send({
            error: "missing required fields"
        });
    }

    const requiredFields = ["id", "first_name", "last_name", "email", "login", "password"];

    for (const field of requiredFields) {
        if (field in req.body)
            continue;
        return res.status(400).send({
            error: `${field} is required`
        });
    }

    (new user({
        UserId: req.body.id,
        FirstName: req.body.first_name,
        LastName: req.body.last_name,
        Email: req.body.email,
        Login: req.body.login,
        Password: req.body.password
    })) 
        .save()
        .then((result) => {
            res.send(result)
        })
        .catch((e) => {
            console.error(e);
        });
}

// Login API receives login & password.
// Returns ID, firstName, lastName, error.
async function login(req, res) {

    const {
        login,
        password
    } = req.body;

    if (!login || !password) 
        return res.status(400).json({
            error: "missing required fields"
        });

    const results = await user.findOne({
        $and: [{
            Password: password
        }, {
            $or: [{
                Email: login
            }, {
                Login: login
            }]
        }]
    });

    if (results) {
        verStatus = results.AuthStatus;

        if (verStatus == 0) {
            return res.status(400).json({
                error: "Account not verified."
            });
        } else {
            try {
                ret = token.createToken(
                        results.FirstName,
                        results.LastName,
                        results.Login, 
                        results._id
                    );
        
                return res.status(200).json(ret);

            } catch (e) {
                
                return res.status(400).json({
                    error: e.message
                });
            }
        }
    }

    return res.status(400).json({
        error: "Login/Password incorrect."
    });
}

// Forgot Password API receives email.
// Sends email verification via SMTP sendgrid.
async function forgot(req, res) {

    const { email } = req.body;

    if (!email)
        return res.status(400).send({
            error: `email is required`
        });

    user.findOne({
        Email: email
    }, (err, user) => {
        // If there is an error or user is not found, return an error.
        if (err || !user) {
            return res.status(400).json({
                error: "Account with email does not exist."
            });
        }

        // Javascript web token receives information
        const jwtoken = jwt.sign({
            _id: user._id
        }, process.env.RESET_PASSWORD_KEY, {
            expiresIn: '20m'
        });

        // TODO: do this as HTML.
        let message = `Hello, this is a password reset request for your Todo account!
            If you did not request this, please ignore.
            Reset your password here: https://cop4331-test123.herokuapp.com/`;
        
        message += jwtoken;

        // Send email.
        // const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);

        // Modifies an existing document or documents in a collection.
        user.updateOne({
            _id: user._id
        }, {
            $set: {
                resetPassword: jwtoken
            }
        });

        return res.status(200).json({
            message: "200: OK"
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
        user.findOne({
            resetPassword: reset_link
        }, (err, user) => {
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

export default function (app) {
    const prefix = "/api/users";

    app.post(`${prefix}/register`, register);
    app.post(`${prefix}/login`, login);
    app.post(`${prefix}/forgotpassword`, forgot);
    app.get(`${prefix}/resetpassword`, reset);
}