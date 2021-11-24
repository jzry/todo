import express from "express";
import cors from "cors";
import path from "path";

import mongoose from "mongoose";
import users from "./api/users.js"
import lists from "./api/lists.js"

import { config as envConfig } from "dotenv";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

envConfig();

const apiPrefix = "/api";
const listsPrefix = `${apiPrefix}/lists`;
const usersPrefix = `${apiPrefix}/users`;

const PORT = process.env.PORT || 8080;
const app = express();

app.set("port", PORT);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    
    next();

});

app.listen( PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongo DB connected"))
    .catch((e) => console.error(e));

app.get(`/verify`, users.verify);

app.post(`${usersPrefix}/register`, users.register);
app.post(`${usersPrefix}/login`, users.login);
app.post(`${usersPrefix}/forgotpassword`, users.forgot);
app.post(`${usersPrefix}/resetpassword`, users.reset);

app.post(`${listsPrefix}/create`, lists.create);
app.post(`${listsPrefix}/read`, lists.read);
app.post(`${listsPrefix}/update`, lists.update);
app.post(`${listsPrefix}/delete`, lists.delete);

app.get( `${apiPrefix}`, (req, res, next) => {
    res.send("<h1>API Docs</h2>")
    next()
});

app.get(`${apiPrefix}/*`, (_, res) => {
    res.status(404).json({ error: "404: Not Found" });
});

app.post(`${apiPrefix}/*`, async (_, res) => {
    res.status(404).json({ error: "404: Not Found" });
});

app.put(`${apiPrefix}/*`, async (_, res) => {
    res.status(404).json({ error: "404: Not Found" });
});

if (process.env.NODE_ENV === "production") {

    // Set static folder
    app.use(express.static("frontend/build"));

    app.get( "*", (req, res) => {
        res.sendFile(path.resolve( __dirname, "frontend", "build", "index.html"));
    });
}
else {
    app.get("*", (req, res) => {
        res.send(
            `Application running in debug mode for API testing. 
            The frontend is run separately and therefore not deployed in debug mode.`
        );
    });
}
