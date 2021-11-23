import listModel from "./models/list.js";
import jwt from "jsonwebtoken";
// !!! TODO no user validation being done in any of these api calls
// Create API receives the description of a new to-do task.
// Returns the title and body to the to-do database of the user.
// NOTE: I THINK NOTES ARE NOT BEING INSERTED FOR SPECIFIC USERS
// We can not insert notes for everyone in general.

async function create(req, res, next) {

    // Check if JSON request payload exists.
    if (!req.body) {
        return res.status(400).json({
            error: "empty note"
        });
    }
     
    jwt.verify(req.body.token, process.env.LOGIN_KEY, async (err, decoded) => {

        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });

        // Create a new to do task with a title and a body.
        const note = new listModel({
            UserId: decoded.id,
            Title: req.body.title,
            Body: req.body.note
        });

        // Save note in the database.
        await note.save()
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
                for (const note of list) {
                    out.push({
                        id: note._id,
                        title: note.Title,
                        note: note.Body,
                        created: note.createdAt,
                        updated: note.updatedAt
                    });
                }
                res.send(out);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error finding note"
                });
            });
    });
}

// Update API receives the ID, UID, title, body of the note.
async function update(req, res, next) {

    // Check if JSON payload request has content.
    if (!req.body)
        return res
            .status(400)
            .json({
                error: "Can not submit an empty note."
            });

    const id = req.body.id;
    const title = req.body.title;
    const note = req.body.note;

    const requiredFields = ["id", "title", "note", "token"];

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
                error: "Can not update a note without an id"
            });

    if (title === "")
        return res
            .status(400)
            .send({
                error: "Can not submit a note with an empty title"
            });

    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });

        listModel.findOneAndUpdate({_id: id, UserId: decoded.id}, {Title: title, Body: note})
            .then(data => {
                if (!data) {
                    // Data does not exist.
                    res.status(404).send({
                        error: `Note with ID: ${id} can not be updated.`
                    });
                    return;
                }

                res.send({
                    message: "note update success"
                });
            })
            .catch(err => {
                if (err.path === "_id")
                    return res.status(500).send({
                        error: `Cannot find note with id '${id}'`
                    });
                res.status(500).send({
                    error: err.message || "Error updating note"
                });
            });
        });
}

// Delete API receives the ID, body, title, and respective UID of the note.
// Deletes note from the specific user from the database.
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
                        error: `Note with ID ${id} does not exist.`
                    })
                    return;
                }

                res.send({
                    message: "Note was deleted successfully."
                });
            })
            .catch(err => { // There is an error trying to delete one of the notes.
                res.status(500).send({
                    error: `Note ${id} could not be deleted.`
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