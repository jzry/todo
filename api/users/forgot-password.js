import userModel from "../models/user.js";
import sendEmail from "../util/email.js";
import _validateEmail from "../util/validate-email.js"

import jwt from "jsonwebtoken";

// Forgot Password API receives email.
// Sends email verification
export default async function(req, res) {
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

    userModel.findOne({
        Email: email
    }, (err, user) => {

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
            }).catch(e => {
                console.error(e.message)
            });


            return res.status(200).json({
                message: emailSentMsg
            });
        }

        // Javascript web token receives information
        const jwtoken = jwt.sign({
                _id: user._id
            },
            process.env.RESET_PASSWORD_KEY, {
                expiresIn: '15m'
            }
        );

        // TODO: do this as HTML template with username.
        let message = `Hello ${user.FirstName} ${user.LastName},<br>
            You have made a request to reset your todo account password.<br>
            If you did not make this request, you can safely ignore this email.<br><br>
            To reset the password (expires in 15m), click here:
            <a href="https://cop4331-test123.herokuapp.com/resetpassword?q=${jwtoken}">Reset your password here</a><br>
            You can also the following link on your web browser:<br>
            https://cop4331-test123.herokuapp.com/resetpassword?q=${jwtoken}`;

        // Send email.
        // const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);
        sendEmail({
            address: email,
            subject: "todo Account Password Reset",
            html: message
        }).catch(e => {
            console.error(e.message)
        });

        // Modifies an existing document or documents in a collection.
        userModel.updateOne({
            _id: user._id
        }, {
            $set: {
                ResetPassword: jwtoken
            }
        }).catch(err => {
            return res.status(400).json({
                error: "password reset request failed"
            });
        });

        return res.status(200).json({
            message: emailSentMsg
        });
    });
}