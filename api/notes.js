import list from "./models/list.js";
 
// Create API receives the description of a new to-do task.
// Returns the title and body to the to-do database of the user.
// NOTE: I THINK NOTES ARE NOT BEING INSERTED FOR SPECIFIC USERS
// We can not insert notes for everyone in general.

const create = async (req, res, next) => {

    // Check if JSON request payload exists.
    if (!req.body) {
        res.status(400).send({
            message: "Note cannnot be empty!"
        });
    }
     
    // Create a new to do task with a title and a body.
    const note = new list({
        Title: req.body.title,
        Body: req.body.note
    });

    // Save note in the database.
    await note.save()
        .then(data => {
            res.send({
                id: data.id
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured."
            });
        });
}

// Read API.
const read = async (req, res, next) => {

    let search = req.body?.search;
    
    if (!search)
        search = "";

    list.find({Title: { $regex: `(?i)${search}`}})
        .then(list => {
            let out = []
            for (const note of list) {
                out.push({
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
}

// Update API receives the ID, UID, title, body of the note.
const update = async (req, res, next) => {

    // Check if JSON payload request has content.
    if (!req.body)
        return res
            .status(400)
            .send({
                message: "Can not submit an empty note."
            });

    const id = req.body.id;
    const title = req.body.title;
    const note = req.body.note;

    const requiredFields = ["id", "title", "note"];

    for (const field of requiredFields) {
        if (!(field in req.body))
            return res.status(400).send({
                error: `${field} is required`
            });
    }

    list.findOneAndUpdate(id, {Title: title, Body: note})
        .then(data => {
            if (!data) {
                // Data does not exist.
                res.status(404).send({
                    message: `Note with ID: ${id} can not be updated.`
                })
            } else {
                res.send("note update success")
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating note"
            });
        });
}

// Delete API receives the ID, body, title, and respective UID of the note.
// Deletes note from the specific user from the database.
const del = async (req, res, next) => {

    const noteId = req.params.id;

    list.findOneAndDelete(noteId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Note with ID ${id} does not exist.`
                })
            } else {
                res.send({
                    message: "Note was deleted successfully."
                })
            }
        })

        // There is an error trying to delete one of the notes.
        .catch(err => {
            res.status(500).send({
                message: `Note ${noteId} could not be deleted.`
            })
        });
}

export default function (app) {
    const prefix = "/api/notes";
    app.post(`${prefix}/create`, create);
    app.get(`${prefix}/read`, read);
    app.put(`${prefix}/update`, update);
    app.post(`${prefix}/delete`, del);
}
