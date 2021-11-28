import listModel from "../../models/list.js";
import jwt from "jsonwebtoken";

// may switch to http headers for authorization

// Create API receives the description of a new to-do task.
// Returns the title and body to the to-do database of the user.
export default async function(req, res, next) {

    // Check if JSON request payload exists.
    if (!req.body ||
        !req.params ||
        (req.body.completed === undefined && !req.body.text)) {

        return res.status(400).json({
            error: "empty task"
        });
    }

    const list_id = req.params.list_id;
    const task_id = req.params.task_id;

    jwt.verify(req.body.token, process.env.LOGIN_KEY, async (err, decoded) => {

        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });

        listModel.findOne({
                _id: list_id,
                UserId: decoded.id
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        error: `list with ID: ${id} cannot be modified`
                    });
                    return;
                }

                for (const [i, task] of data.Body.entries()) {
                    if (task._id != task_id)
                        continue;

                    if (req.body.completed !== undefined)
                        data.Body[i].Completed = req.body.completed;
                    if (req.body.text)
                        data.Body[i].Text = req.body.text;
                }

                listModel.findOneAndUpdate({
                        _id: list_id,
                        UserId: decoded.id
                    }, {
                        Body: data.Body
                    },
                    (err, updatedData) => {
                        if (!updatedData) {
                            res.status(404).send({
                                error: `cannot update task`
                            });
                            return;
                        }

                        res.send({
                            message: "task updated successfully"
                        });
                    });
            })
            .catch(err => {
                if (err.path === "_id")
                    return res.status(500).send({
                        error: `cannot find list with id '${id}'`
                    });
                res.status(500).send({
                    error: err.message || "error updating task"
                });
            });
    });
}