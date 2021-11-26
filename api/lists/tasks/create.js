import listModel from "../../models/list.js";
import jwt from "jsonwebtoken";

// may switch to http headers for authorization

// Create API receives the description of a new to-do task.
// Returns the title and body to the to-do database of the user.
export default async function(req, res, next) {

    // Check if JSON request payload exists.
    if (!req.body || !req.params) {
        return res.status(400).json({
            error: "empty task"
        });
    }

    const id = req.params.list_id;

    jwt.verify(req.body.token, process.env.LOGIN_KEY, async (err, decoded) => {

        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });

        listModel.findOne({
                _id: id,
                UserId: decoded.id
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        error: `list with ID: ${id} cannot be modified`
                    });
                    return;
                }

                listModel.findOneAndUpdate({
                        _id: id,
                        UserId: decoded.id
                    }, {
                        Body: [...data.Body, {
                            Text: req.body.text
                        }]
                    }, {
                        new: true
                    },
                    (err, updatedData) => {
                        if (!updatedData) {
                            res.status(404).send({
                                error: `cannot add task`
                            });
                            return;
                        }

                        res.send({
                            message: "task added successfully",
                            id: updatedData.Body[updatedData.Body.length - 1]._id
                        });
                    });
            })
            .catch(err => {
                if (err.path === "_id")
                    return res.status(500).send({
                        error: `cannot find list with id '${id}'`
                    });
                res.status(500).send({
                    error: err.message || "error adding task"
                });
            });
    });
}