import listModel from "../models/list.js";
import jwt from "jsonwebtoken";

// Update API receives the ID, UID, title, body of the list.
export default async function (req, res, next) {

    // Check if JSON payload request has content.
    if (!req.body)
        return res
            .status(400)
            .json({
                error: "empty update request"
            });

    const id = req.body.id;
    const title = req.body.title;
    const list = req.body.list;
    const token = req.body.token;

    const requiredFields = ["id", "title", "list", "token"];

    for (const field of requiredFields) {
        if (!(field in req.body))
            return res.status(400).send({
                error: `${field} is required`
            });
    }

    if (id === "")
        return res
            .status(400)
            .send({
                error: "Can not update a list without an id"
            });

    if (title === "")
        return res
            .status(400)
            .send({
                error: "Can not submit a list with an empty title"
            });

    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });

        listModel.findOneAndUpdate({_id: id, UserId: decoded.id}, {Title: title, Body: list})
            .then(data => {
                if (!data) {
                    // Data does not exist.
                    res.status(404).send({
                        error: `list with ID: ${id} can not be updated.`
                    });
                    return;
                }

                res.send({
                    message: "list update success"
                });
            })
            .catch(err => {
                if (err.path === "_id")
                    return res.status(500).send({
                        error: `Cannot find list with id '${id}'`
                    });
                res.status(500).send({
                    error: err.message || "Error updating list"
                });
            });
        });
}