import userModel from "./models/user.js";
import jwt from "jsonwebtoken";
import sendEmail from "./email.js";

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
        Password:   req.body.password,
        AuthStatus: 0
    });

    user.save()
        .then((result) => {
            res.send({
                message: "account successfully created"
            })
        })
        .catch((e) => {
            console.error(e);
        })

    const jwtoken = jwt.sign(
        { id: user._id }, 
        process.env.LOGIN_KEY,
        { expiresIn: '24h'}
    );

    // use an html page here with css styling and better content
    const emailContent = `
    Hello ${req.body.first_name} ${req.body.last_name}, <br>
    
    This verification link expires in 24 hours:
    <a href="https://cop4331-test123.herokuapp.com/verifyemail?q=${jwtoken}">Verify your email</a></br>
    `;

    // send verification email
    sendEmail({
        address: req.body.email,
        subject: "todo Account Email Verification",
        html: emailContent 
    }).catch(e => {console.error(e.message)});
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

async function verifyEmail(req, res) {
    const token = req.query?.q;
    if (!token)
        return res.json({"error": "no token provided"});
    
    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                "error": "invalid token"
            });
        
        userModel.updateOne({ _id: decoded.id, AuthStatus: 0}, {$set: {AuthStatus: 1}}, (err, user) => {
            if (err || !user)
                return res.status(400).json({error: err.message || "could not verify email"});
            if (user.matchedCount === 0)
                return res.status(400).json({error: "account already verified"});
            return res.status(200).json({message: "email verified successfully"});
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

    if (!results)
        return res.status(400).json({
            error: "login/Password incorrect"
        });

    const verStatus = results.AuthStatus;

    if (verStatus == 0) {
        return res.status(400).json({
            error: "account not verified"
        });
    }

    try {
        const ret = jwt.sign({
                first_name: results.FirstName,
                last_name: results.LastName,
                login: results.Login, 
                id: results._id
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

    const emailSentMsg = "the account recovery link has been sent to the provided email";

    userModel.findOne({ Email: email }, (err, user) => {

        // If there is no account with email, do not let the user know if they exists or not
        // the existence of an email on our site should only be known to owner

        // NEVER CONFIRM OR DENY THE EXISTENCE OF AN ACCOUNT WITH A GIVEN EMAIL OR USERNAME

        if (err || !user) {
            // send an email stating account not found following a link to create a new account
            // TODO: do this as HTML template with username.
            let message = `Hello there,<br>
                You have made a request to reset your todo account password.<br>
                However, an account associated with this email does not exist on this website.<br><br>
                If you want to create a new account, please use the following link: 
                <a href="https://cop4331-test123.herokuapp.com/signup">https://cop4331-test123.herokuapp.com/signup</a><br>`;

            // Send email.
            // const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);
            sendEmail({
                address: email,
                subject: "todo Account Password Reset",
                html: message 
            }).catch(e => {console.error(e.message)});


            return res.status(200).json({
                message: emailSentMsg
            });
        }

        // Javascript web token receives information
        const jwtoken = jwt.sign(
            { _id: user._id }, 
            process.env.RESET_PASSWORD_KEY,
            { expiresIn: '15m'}
        );

        // TODO: do this as HTML template with username.
        let message = `Hello ${user.FirstName} ${user.LastName},<br>
            You have made a request to reset your todo account password.<br>
            If you did not make this request, you can safely ignore this email.<br><br>
            To reset the password (expires in 15m), click here:
            <a href="https://cop4331-test123.herokuapp.com/resetpassword?q=${jwtoken}">Reset your password here</a><br>
            You can also the following link on your web browser:<br>
            https://cop4331-test123.herokuapp.com/resetpw?q=${jwtoken}`;
        
        // Send email.
        // const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);
        sendEmail({
            address: email,
            subject: "todo Account Password Reset",
            html: message 
        }).catch(e => {console.error(e.message)});

        // Modifies an existing document or documents in a collection.
        userModel.updateOne({ _id: user._id }, {
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
        return res.status(400).json({ error: "required fields missing" });


    // Verify the javascript encrypted payload.
    jwt.verify(reset_link, process.env.RESET_PASSWORD_KEY, (err, _) => {

        if (err) {
            return res.status(401).json({
                error: "invalid token (either incorrect or expired)"
            });
        }

        // Return the correct user.
        userModel.findOne({ resetPassword: reset_link }, (err, user) => {
            if (err || !user)
                return res.status(400).json({
                    error: "invalid token"
                });

            userModel.updateOne(
                { _id: user._id }, 
                { $set: { Password: new_password }
            }).catch(err => {
                return res.status(400).json({
                    error: "password update failed"
                });
            });

            return res.status(200).json({message: "password changed successfully"});
        })
    });
}

export default {
    verify: verifyEmail,
    register: register,
    login: login,
    forgot: forgot,
    reset: reset
}