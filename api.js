import User from "./models/user.js";
import token from "./createJWT.js";
import list from "./models/list.js";

// NOTE: APIs are UNTESTED and UNCOMPLETED. @Paul and @Jaeden, check over this.

function setApp(app, client)
{
    // Login API receives login & password.
    // Returns ID, firstName, lastName, error.
    app.post('/api/login', async(req, res, next) =>
    {
            const error = "";
            const { login, password } = req.body;
            const db = client.db();
            const results = await db.collection('Users').findOne({
                $and: [{ Password: password }, { $or: [{ Email: login }, { Login: login }] }]
            });

            let id = -1;
            let fn = '';
            let ln = '';
            let un = '';
            let verStatus = 0;

            if (results)
            {
                id = results._id;
                fn = results.FirstName;
                ln = results.LastName;
                un = results.Login;
                verStatus = results.AuthStatus;

                if (verStatus == 0)
                {
                    ret = { error: "Account not verified." };
                }
                else
                {
                    try
                    {
                        const token = require("./createJWT.js");
                        ret = token.createToken(fn, ln, un, id);
                    }
                    catch (e)
                    {
                        ret = { error: e.message };
                    }
                }

            }
            else
            {
                ret = { error: "Login/Password incorrect." };
            }
            res.status(200).json(ret);
    });

    // Forgot Password API receives email.
    // Sends email verification via SMTP sendgrid.
    app.post('/api/forgotpassword', async (req, res, next) =>
    {
        const { email } = req.body;
        const db = client.db();

        db.collection('Users').findOne({ Email: email }, (err, user) =>
        {
            // If there is an error or user is not found, return an error.
            if (err || !user)
            {
                return res.status(400).json({ error: "Account with email does not exist." });
            }

            // Javascript web token receives information
            const jwtoken = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });

            // TODO: do this as HTML.
            let message = "Hello, this is a password reset request for your Todo account! If you did not request this, please ignore. Reset your password here: https://cop4331-test123.herokuapp.com/";
            message += jwtoken;

            // Send email.
            const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);

            // Modifies an existing document or documents in a collection.
            db.collection('Users').updateOne({ _id: user._id }, {$set: { resetPassword: jwtoken }});

            return res.status(200).json({ error: "" });
        });
    });

    // Reset Password API receives resetLink and newPassword.
    // Updates the new password in the database.
    app.post('/api/resetpassword', async (req, res, next) =>
    {
            const { resetLink, newPassword } = req.body;
            const db = client.db();
            if (resetLink)
            {
                    // Verify the javascript encrypted payload.
                    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) =>
                    {

                               if (err)
                               {
                               return res.status(401).json({ error: "Invalid token (either incorrect or expired)." });
                               }

                               // Return the correct user.
                               db.collection('Users').findOne({ resetPassword: resetLink }, (err, user) =>
                               {
                                        if (err || !user)
                                        {
                                            // User isn't found or there is an error.
                                            return res.status(400).json({ error: "Invalid token." });
                                        }
                                        else
                                        {
                                            db.collection('Users').updateOne({ _id: user._id }, {$set: { Password: newPassword }})
                                            return res.status(200).json({ error: "" });
                                        }
                                })
                })
            }
            else
            {
                return res.status(401).json({ error: "Authentication error." });
            }
        }
    );

    // Create API receives the description of a new to-do task.
    // Returns the title and body to the to-do database of the user.
    // NOTE: I THINK NOTES ARE NOT BEING INSERTED FOR SPECIFIC USERS
    // We can not insert notes for everyone in general.
    app.post('/api/createNote', async (req, res, next) =>
    {
            // Check if JSON request payload exists.
            if (!req.body)
            {
                res.status(400).send({ message: "Note cannnot be empty!" });
            }

            // Create a new to do task with a title and a body.
            const note = new Listsdb({
                Title: req.body.title,
                Body: req.body.note
            })

            // Save note in the database.
            .save(note)
            .then(data => {res.send(data)})
            .catch(err => {res.status(500).send({message: err.message || "Some error occured."}); });

            // Inser the new task note in the Todo database.
            const result = await client.db("Tododb").collection("lists").insertOne(newnote);

            // Check if this shows up in browser as HTML.
            console.log("\"${result.insertId}\" added");
        }
    );

    // Read API.
    app.get('/api/read', async (req, res, next) =>
    {
            list.find()
            .then(list => {res.send(list) })
            .catch(err => {res.status(500).send({ message: err.message || "Error finding note" }); });
    });

    // Update API receives the ID, UID, title, body of the note.
    app.put('/api/updateNote', async (req, res, next) =>
    {
            // Check if JSON payload request has content.
            if (!req.body)
            {
                return res
                .status(400)
                .send({ message: "Can not submit an empty note." });
            }

            // Contains the request for the note ID.
            const id = req.params.id;

            Tododb
                .findbyIdAndUpdate(id, req.body, { useFindAndModify: false })
                .then(data =>
                {
                    if (!data)
                    {
                        // Data does not exist.
                        res.status(404).send({ message: "Note with ID: ${id} can not be updated." })
                    }
                    else
                    {
                        res.send(data)
                    }
                })
                .catch(err => {res.status(500).send({ message: err.message || "Error updating note" });
                });
        }
    );

    // Delete API receives the ID, body, title, and respective UID of the note.
    // Deletes note from the specific user from the database.
    app.post('/api/delete', async (req, res, next) =>
    {
             const noteId = req.params.id;

             // Is it Tododb or tododb @Joel?
             tododb
                .findByIdAndDelete(id)
                .then(data =>
                {
                   if (!data)
                   {
                        res.status(404).send({ message: "Note with ID ${id} does not exist." })
                   }
                   else
                   {
                        res.send({message: "Note was deleted successfully."})
                   }
                })

             // There is an error trying to delete one of the notes.
             .catch(err => { res.status(500).send({message: "Note " + noteId + "could not be deleted."}) });
    });
}

export default { setApp };
