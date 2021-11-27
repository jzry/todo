const axios = require("axios");
const dotenv = require("dotenv");
const { describe, test } = require("jest-circus");
const { ROOT_DESCRIBE_BLOCK_NAME } = require("jest-circus/build/state");
const { resolveContent } = require("nodemailer/lib/shared");

dotenv.config();
const PORT = process.env.PORT || 8090;

describe("Test /api/users endpoints", () => {
    describe("Register a user", () => {
        // register a user in the database
        // has to send email and grab token from email..
        
        test("Registers a user with given parameters", async () => {

            const config = {
                method: "post",
                url: "http://localhost:8090/api/users/register",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    firstname: "John",
                    lastname: "Doe",
                    email: "test@test.com",
                    login: "test",
                    password: "hashpassword",
                    authstatus: "1",
                }
            };

            axios(config)
            .then(function (response) {
                const res = response.data;
                if (res.error){
                    reject(res.error);
                    return;
                }
                resolve(res.token);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                    return;
                }
                reject(error);
        });
    });
});
})

describe("login user", () => {
    test("logs the user into the website", async () => {
        return new Promise((resolve, reject) => {

            const config = {
                method: "post",
                url: "http://localhost:8090/api/users/login", // ew
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    login: "test",
                    password: "hashedpassword"
                }
            };
    
            axios(config)
                .then(function (response) {
                    const res = response.data;
                    if (res.error) {
                        reject(res.error);
                        return;
                    }
                    resolve(res.token);
                })
                .catch(function (error) {
                    if (error.response) {
                        reject(error.response);
                        return;
                    }
                });
        });
    })
})





