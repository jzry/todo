import listModel from "../../models/list.js";
import jwt from "jsonwebtoken";

// may switch to http headers for authorization

// Create API receives the description of a new to-do task.
// Returns the title and body to the to-do database of the user.
export default async function (req, res, next) {

    // Check if JSON request payload exists.
    if (!req.body || !req.params) {
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

        listModel.findOne({_id: list_id, UserId: decoded.id})
            .then(data => {
                if (!data)
                    return res.status(404).send({
                        error: `list with ID: ${id} cannot be modified`
                    });
                

                if (data.Body.filter(body => body._id == task_id).length === 0)
                    return res.status(404).send({
                        error: `task not found`
                    });

                listModel.findOneAndUpdate({_id: list_id}, {Body: data.Body.filter(body => body._id != task_id)})
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                            error: `cannot remove task`
                        });
                        return;
                    }
                    
                    res.send({
                        message: "task removed successfully"
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        error: err.message || "error removing task"
                    });
                });
            })
            .catch(err => {
                if (err.path === "_id")
                    return res.status(500).send({
                        error: `cannot find list'`
                    });
                res.status(500).send({
                    error: err.message || "error removing task"
                });
            });
    });
}