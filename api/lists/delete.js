import listModel from "../models/list.js";
import jwt from "jsonwebtoken";

// Delete API receives the ID, body, title, and respective UID of the list.
// Deletes list from the specific user from the database.
export default async function(req, res, next) {

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

        listModel.findOneAndDelete({
                _id: id,
                UserId: decoded.id
            })
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