import listModel from "../models/list.js";
import jwt from "jsonwebtoken";

// may switch to http headers for authorization

// Create API receives the description of a new to-do task.
// Returns the title and body to the to-do database of the user.
export default async function (req, res, next) {

    // Check if JSON request payload exists.
    if (!req.body) {
        return res.status(400).json({
            error: "empty list"
        });
    }
     
    jwt.verify(req.body.token, process.env.LOGIN_KEY, async (err, decoded) => {

        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });

        // Create a new to do task with a title and a body.
        const list = new listModel({
            UserId: decoded.id,
            Title: req.body.title,
            Body: req.body.list
        });

        // Save list in the database.
        await list.save()
            .then(data => {
                res.json({
                    id: data.id
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "something happened"
                });
            });
    });
}