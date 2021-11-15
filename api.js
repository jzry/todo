import list from "./api/models/list.js";
import mongoose from "mongoose";
import users from "./api/users.js"

// NOTE: APIs are UNTESTED and UNCOMPLETED. @Paul and @Jaeden, check over this.

function setApp(app, mongoUri) {

    mongoose.connect(mongoUri)
        .then(() => console.log("Mongo DB connected"))
        .catch((e) => console.error(e));

    users(app);

    // Create API receives the description of a new to-do task.
    // Returns the title and body to the to-do database of the user.
    // NOTE: I THINK NOTES ARE NOT BEING INSERTED FOR SPECIFIC USERS
    // We can not insert notes for everyone in general.

    app.post('/api/note/create', async (req, res, next) => {

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
        })

        // Save note in the database.
        note.save()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured."
                });
            });

        // Inser the new task note in the Todo database.
        const q = list.find();
        const result = await q.insertOne(note);

        // Check if this shows up in browser as HTML.
        console.log(`"${result.insertId}" added`);
    });

    // Read API.
    app.get('/api/note/read', async (req, res, next) => {
        list.find()
            .then(list => {
                res.send(list)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error finding note"
                });
            });
    });

    // Update API receives the ID, UID, title, body of the note.
    app.put('/api/note/update', async (req, res, next) => {
        // Check if JSON payload request has content.
        if (!req.body) {
            return res
                .status(400)
                .send({
                    message: "Can not submit an empty note."
                });
        }

        // Contains the request for the note ID.
        const id = req.params.id;

        list.findOneAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            .then(data => {
                if (!data) {
                    // Data does not exist.
                    res.status(404).send({
                        message: `Note with ID: ${id} can not be updated.`
                    })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error updating note"
                });
            });
    });

    // Delete API receives the ID, body, title, and respective UID of the note.
    // Deletes note from the specific user from the database.
    app.post('/api/note/delete', async (req, res, next) => {

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
    });
}

export default {
    setApp
};