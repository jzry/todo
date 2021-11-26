const axios = require("axios");

const login = {
    login: "test",
    password: "password"
}

function getToken() {
    return new Promise((resolve, reject) => {

        const config = {
            method: "post",
            url: "http://localhost:8090/api/users/login", // ew
            headers: {
                "Content-Type": "application/json"
            },
            data: login
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
}

describe("POST /api/lists", () => {

    describe("Create a list", () => {
        // create a list in the database
        // should respond with a json object containing the list id
        // should respond with a 200 status code

        test("should respond with a 200 status code", async () => {
            let token
            try {

                token = await getToken();

            } catch(e) {
                done(e);
            }

            const config = {
                method: "post",
                url: "http://localhost:8090/api/lists/create",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    token: token,
                    title: "Sample",
                    list: []
                }
            };


            axios(config)
                .then(async function (response) {
                    const res = response.data;
                    if (res.error) {
                        console.error(res.error);
                        return;
                    }

                    expect(res.id).toBeDefined();

                })
                .catch(function (error) {
                    if (error.response) {
                        console.error(error.response.data);
                        return;
                    }
                    console.error(error);
                });
        });
    })

    describe("Read the list", () => {

        test("should respond with a 200 status code", async () => {
            let token
            try {

                token = await getToken();

            } catch(e) {
                done(e);
            }

            const config = {
                method: "post",
                url: "http://localhost:8090/api/lists/read",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    token: token,
                    search: ""
                }
            };
    
            axios(config)
                .then(function (response) {
                    const res = response.data;
                    // const res = undefined;
                    if (res.error) {
                        console.error(res.error);
                        return;
                    }

                    expect(res).toBeDefined();

                })
                .catch(function (error) {
                    if (error.response) {
                        console.error(error.response.data);
                        return;
                    }
                    console.error(error);
                });
        });

    })
    describe("update the list", () => {
        // updates the list in the database
        // should respond with a 200 status and update the list
    })

    describe("deletes the list", () => {
        // deletes the list from the database
        // should respond with a 200 status and deletes the list
        
    })
})