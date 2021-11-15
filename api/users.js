import user from "./models/user.js";
import token from "./createJWT.js";

// fix this
const register = async (req, res) => {
    const user = new users({
        UserId: '0',
        FirstName: 'Joel',
        LastName: 'Cruz',
        Email: 'dbtest@testdb.com',
        Login: 'dbmaster',
        Password: 'Project2'
    }
    );

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((e) => {
            console.error(e);
        }
    );
}

// Login API receives login & password.
// Returns ID, firstName, lastName, error.
const login =  async (req, res, _next) => {

    const error = "";
    const {
        login,
        password
    } = req.body;
    
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

    let id = -1;
    let fn = '';
    let ln = '';
    let un = '';
    let verStatus = 0;
    let ret;

    if (results) {

        id = results._id;
        fn = results.FirstName;
        ln = results.LastName;
        un = results.Login;
        verStatus = results.AuthStatus;

        if (verStatus == 0) {
            ret = {
                error: "Account not verified."
            };
        } else {
            try {
                ret = token.createToken(fn, ln, un, id);
            } catch (e) {
                ret = {
                    error: e.message
                };
            }
        }

    } else {
        ret = {
            error: "Login/Password incorrect."
        };
    }
    res.status(200).json(ret);
}

// Forgot Password API receives email.
// Sends email verification via SMTP sendgrid.
const forgot =  async (req, res, next) => {

    const { email } = req.body;
    
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
        let message = "Hello, this is a password reset request for your Todo account! If you did not request this, please ignore. Reset your password here: https://cop4331-test123.herokuapp.com/";
        message += jwtoken;

        // Send email.
        const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);

        // Modifies an existing document or documents in a collection.
        user.updateOne({
            _id: user._id
        }, {
            $set: {
                resetPassword: jwtoken
            }
        });

        return res.status(200).json({
            error: ""
        });
    });
}

// Reset Password API receives resetLink and newPassword.
// Updates the new password in the database.
const reset = async (req, res, next) => {

    const { resetLink, newPassword } = req.body;

    if (resetLink) {
        // Verify the javascript encrypted payload.
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {

            if (err) {
                return res.status(401).json({
                    error: "Invalid token (either incorrect or expired)."
                });
            }

            // Return the correct user.
            user.findOne({
                resetPassword: resetLink
            }, (err, user) => {
                if (err || !user) {
                    // User isn't found or there is an error.
                    return res.status(400).json({
                        error: "Invalid token."
                    });
                } else {
                    user.updateOne(
                        { _id: user._id }, 
                        { $set: { Password: newPassword }
                    });

                    return res.status(200).json({  error: "" });
                }
            })
        })
    } else {
        return res.status(401).json({ error: "Authentication error." });
    }
}

export default function (app) {
    const prefix = "/api/users";

    app.get(`${prefix}/register`, register);
    app.post(`${prefix}/login`, login);
    app.post(`${prefix}/forgotpassword`, forgot);
    app.post(`${prefix}/resetpassword`, reset);
}