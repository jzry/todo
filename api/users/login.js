import userModel from "../models/user.js";

import jwt from "jsonwebtoken";

// Login API receives login & password.
// Returns ID, firstName, lastName, error.
export default async function(req, res) {

    if (!process.env.LOGIN_KEY)
        return console.error("LOGIN_KEY not defined in the ENV.");

    const {
        login,
        password
    } = req.body;

    if (!login || !password)
        return res.status(400).json({
            error: "Missing required fields."
        });

    const results = await userModel.findOne({
        $and: [{
                Password: password
            },
            {
                $or: [{
                        Email: login
                    },
                    {
                        Login: login
                    }
                ]
            }
        ]
    });

    if (!results)
        return res.status(400).json({
            error: "Login/password incorrect."
        });

    const verStatus = results.AuthStatus;

    if (verStatus == 0) {
        return res.status(400).json({
            error: "Account not verified."
        });
    }

    try {
        const ret = jwt.sign({
                id: results._id
            },
            process.env.LOGIN_KEY, {
                expiresIn: '20h'
            }
        );

        return res.status(200).json({
            token: ret,
            first_name: results.FirstName,
            last_name: results.LastName,
            login: results.Login,
        });

    } catch (e) {

        return res.status(400).json({
            error: e.message
        });
    }
}