import userModel from "../models/user.js";
import _validateEmail from "../util/validate-email.js"
import sendEmail from "../util/email.js";

import jwt from "jsonwebtoken";


function _createNewUser(req, res) {
    const user = new userModel({
        FirstName: req.body.first_name,
        LastName: req.body.last_name,
        Email: req.body.email,
        Login: req.body.login,
        Password: req.body.password,
        AuthStatus: 0
    });

    user.save()
        .then((result) => {
            res.send({
                message: "account successfully created"
            })
        })
        .catch((e) => {
            console.error(e.message);
        })

    const jwtoken = jwt.sign({
            id: user._id
        },
        process.env.LOGIN_KEY, {
            expiresIn: '7d'
        }
    );

    // use an html page here with css styling and better content
    const emailContent = `
    Hello ${req.body.first_name} ${req.body.last_name}, <br>
    
    This verification link expires in 24 hours:
    <a href="https://cop4331-test123.herokuapp.com/verify/${jwtoken}">Verify your email</a></br>
    `;

    // send verification email
    sendEmail({
        address: req.body.email,
        subject: "todo Account Email Verification",
        html: emailContent
    }).catch(e => {
        console.error(e.message)
    });
}

export default async function(req, res) {
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
    userModel.findOne({
        Email: req.body.email
    }, (err, user) => {
        if (err === null && user)
            return res.status(400).send({
                error: `user account with email already exists`
            });

        userModel.findOne({
            Login: req.body.login
        }, (err, user) => {
            if (err === null && user)
                return res.status(400).send({
                    error: `user account with login already exists`
                });

            _createNewUser(req, res);
        });
    });
}