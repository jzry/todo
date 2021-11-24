import listModel from "./models/list.js";
import jwt from "jsonwebtoken";

// may switch to http headers for authorization

// Create API receives the description of a new to-do task.
// Returns the title and body to the to-do database of the user.
async function create(req, res, next) {

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

async function read(req, res, next) {

    const search = req.query?.search || req.body?.search || req.params?.search || "";
    const token = req.body?.token || "";

    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });
        listModel.find({Title: { $regex: `(?i)${search}`}, UserId: decoded.id })
            .then(list => {
                let out = []
                for (const l of list) {
                    out.push({
                        id: l._id,
                        title: l.Title,
                        list: l.Body,
                        created: l.createdAt,
                        updated: l.updatedAt
                    });
                }
                res.send(out);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "error finding list"
                });
            });
    });
}

// Update API receives the ID, UID, title, body of the list.
async function update(req, res, next) {

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

// Delete API receives the ID, body, title, and respective UID of the list.
// Deletes list from the specific user from the database.
async function del (req, res, next) {

    const id = req.body?.id;
    const token = req.body?.token;

    if (!id || !token)
        return res.status(400).send({
            error: "missing required field(s)"
        });

    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });

        listModel.findOneAndDelete({_id: id, UserId: decoded.id})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        error: `list with id:${id} does not exist`
                    })
                    return;
                }

                res.send({
                    message: "list was deleted successfully"
                });
            })
            .catch(err => { // There is an error trying to delete one of the lists.
                res.status(500).send({
                    error: `list id:${id} could not be deleted`
                })
            });
        });
}

export default {
    create: create,
    read: read,
    update: update,
    delete: del
}