import listModel from "../models/list.js";
import jwt from "jsonwebtoken";

function _getListById(list_id, token, res) {
    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });
        listModel.find({
            _id: list_id,
            UserId: decoded.id
        })
            .then(list => {

                let out = []

                for (const l of list) {
                    let body = [];

                    for (const b of l.Body) {
                        body.push({
                            completed: b.Completed,
                            text: b.Text,
                            id: b._id
                        });
                    }

                    out.push({
                        id: l._id,
                        title: l.Title,
                        list: body,
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

export default async function (req, res, next) {

    const search = req.query?.search || req.body?.search || "";
    const token = req.body?.token || "";

    const list_id = req.params?.list_id;

    if (list_id)
        return _getListById(list_id, token, res);

    jwt.verify(token, process.env.LOGIN_KEY, (err, decoded) => {
        if (err)
            return res.status(400).json({
                error: "unauthorized access"
            });
        listModel.find({
            Title: {
                $regex: `(?i)${search}`
            },
            UserId: decoded.id
        })
            .then(list => {

                let out = []

                for (const l of list) {
                    let body = [];

                    for (const b of l.Body) {
                        body.push({
                            completed: b.Completed,
                            text: b.Text,
                            id: b._id
                        });
                    }

                    out.push({
                        id: l._id,
                        title: l.Title,
                        list: body,
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