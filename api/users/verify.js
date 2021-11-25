import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

export default async function(req, res) {
    const token = req.query?.q;
    if (!token)
        return res.json({
            "error": "no token provided"
        });

    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                "error": "invalid token"
            });

        userModel.updateOne({
            _id: decoded.id,
            AuthStatus: 0
        }, {
            $set: {
                AuthStatus: 1
            }
        }, (err, user) => {
            if (err || !user)
                return res.status(400).json({
                    error: err.message || "could not verify email"
                });
            if (user.matchedCount === 0)
                return res.status(400).json({
                    error: "account already verified"
                });
            return res.status(200).json({
                message: "email verified successfully"
            });
        });
    });
}