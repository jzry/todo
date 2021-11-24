
import userModel from "../models/user.js";

import jwt from "jsonwebtoken";

// Reset Password API receives reset_link and new_password.
// Updates the new password in the database.
export default async function (req, res) {

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
        userModel.findOne({ ResetPassword: reset_link }, (err, user) => {
            if (err || !user)
                return res.status(400).json({
                    error: "invalid token"
                });

            userModel.updateOne(
                { _id: user._id }, 
                { $set: { Password: new_password, ResetPassword: "" }
            }).catch(err => {
                return res.status(400).json({
                    error: "password update failed"
                });
            });

            return res.status(200).json({message: "password changed successfully"});
        })
    });
}