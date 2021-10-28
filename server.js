import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import api from "./api.js";
import { config as dotenvConfig } from "dotenv";
import mongoose from "mongoose";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import users from "./models/user.js";
import list from "./models/list.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenvConfig();

const PORT = process.env.PORT || 5000,
    app = express();

app.set(
    "port",
    process.env.PORT || 5000
);

app.use(cors());
app.use(bodyParser.json());

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

app.listen(
    PORT,
    () => {

        console.log(`Server listening on port ${PORT}`);

    }
);

const url = process.env.MONGODB_URI;
mongoose.connect(url)
    .then(() => console.log("Mongo DB connected"))
    .catch((e) => console.error(e));

api.setApp(
    app,
    mongoose
);

app.get(
    "/api",
    (req, res) => {
        res.send("<h1>API Docs</h2>")
    }
);

app.get(
    "/api/add-user",
    (req, res) => {
        const user = new users({
            UserId: '0',
            FirstName: 'Joel',
            LastName: 'Cruz',
            Email: 'dbtest@testdb.com',
            Login: 'dbmaster',
            Password: 'Project2'
        }
    );

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((e) => {
            console.error(e);
        }
    );

});

app.get(
    "/api/*",
    (req, res) => {
        res.send({ message: "404: Not Found" 
    });
});

if (process.env.NODE_ENV === "production") {

    // Set static folder
    app.use(express.static("frontend/build"));

    app.get(
        "*",
        (req, res) => {

            res.sendFile(path.resolve(
                __dirname,
                "frontend",
                "build",
                "index.html"
            ));

        }
    );
}
else {
    app.get(
        "*",
        (req, res) => {

            res.send(
                `Application running in debug mode for API testing. 
                The frontend is run separately and therefore not deployed in debug mode.`
                );

        }
    );
}
