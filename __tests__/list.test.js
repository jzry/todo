const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8080;

function getToken() {
    return new Promise((resolve, reject) => {

        const config = {
            method: "post",
            url: "http://localhost:8090/api/users/login", // ew
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                login: "test",
                password: "password"
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
}

const title = `${Math.random() % 100}-title`;
const updatedTitle = `${Math.random() % 100}-title-updated`;

function readTestList(title) {
    return new Promise(async (resolve, reject) => {
        let token;
        try {
            token = await getToken();
        }
         catch(e) {
            reject(e);
         }

        const config = {
            method: "post",
            url: `http://localhost:${PORT}/api/lists/read`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                token: token,
                search: title
            }
        };

        axios(config)
            .then(function (response) {
                const res = response.data;
                if (res.error) {
                    reject(res.error);
                    return;
                }
                resolve(res[0]?.id);

            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response.data);
                    return;
                }
                reject(error);
            });
        }); 
}


describe("Test /api/lists endpoints", () => {
    describe("Create a list", () => {
        // create a list in the database
        // should respond with a json object containing the list id
        // change this please :)

        test("creates a new list with a randomly generated title", async () => {
            let token;
            try {
                token = await getToken();
            }
             catch(e) {
                 expect(e).toBeUndefined();
             }

            const config = {
                method: "post",
                url: `http://localhost:${PORT}/api/lists/create`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    token: token,
                    title: title,
                    list: []
                }
            };

            axios(config)
                .then(async function (response) {
                    const res = response.data;
                    if (res.error) {
                        expect(res.error).toBeUndefined();
                    }

                    expect(res.id).toBeDefined();

                })
                .catch(function (error) {
                    expect(error).toBeUndefined();
                });
        });
    })

    describe("Read lists", () => {
        test("reads all the lists associated with the test user", async () => {
            let token;
            try {
                token = await getToken();
            }
             catch(e) {
                 expect(e).toBeUndefined();
             }

            const config = {
                method: "post",
                url: `http://localhost:${PORT}/api/lists/read`,
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
                    if (res.error) {
                        expect(res.error).toBeUndefined();
                    }
                    expect(res).toBeDefined();

                })
                .catch(function (error) {
                    expect(error).toBeUndefined();
                });
            }); 
        });

    describe("update the list",  () => {
        test("updates the title to a randomly generated title", async () => {
            let id, token;
            try {
                id = await readTestList(title);
                token = await getToken();
            }
             catch(e) {
                 expect(e).toBeUndefined();
             }

        const config = {
            method: "post",
            url: `http://localhost:${PORT}/api/lists/update`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                id: id,
                token: token,
                title: updatedTitle,
                list: []
            }
        };
    

        axios(config)
            .then(async function (response) {
                const res = response.data;
                if (res.error) {
                    expect(res.error).toBeUndefined();
                }
                expect(res.message).toEqual("list update success");
            })
            .catch(function (error) {
                expect(error).toBeUndefined();
            });
        });
    });

    describe("deletes the list", () => {
        test("delete a list with a specific id", async () => {
            let id, token;
            try {
                 id = await readTestList(updatedTitle);
                 token = await getToken();
            } catch(e) {
                expect(e).toBeUndefined();
            }
    
            const config = {
                method: "post",
                url: `http://localhost:${PORT}/api/lists/delete`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    id: id,
                    token: token,
                }
            };
        
    
            axios(config)
                .then(async function (response) {
                    const res = response.data;
                    if (res.error) {
                        expect(res.error).toBeUndefined();
                    }
                    expect(res.message).toEqual("list was deleted successfully");
                })
                .catch(function (error) {
                    expect(error).toBeUndefined();
                });
            });
    });
})