import User from "./models/user.js";
import token from "./createJWT.js";

function setApp (app, client) {

    app.post(
        "/api/login",
        async (req, res, next) => {

            /*
             * Incoming: login, password
             * outgoing: id, firstName, lastName, error
             */

            const error = "",

                {login, password} = req.body,

                /*
                 * Const db = client.db();
                 * Const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
                 */
                results = await User.find({"Login": login,
                    "Password": password});

            db.collection("Users").find({"Login": login,
                "Password": password}).
                toArray();

            let id = -1,
                fn = "",
                ln = "",
                ret;

            if (results.length > 0) {

                id = results[0].UserId;
                fn = results[0].FirstName;
                ln = results[0].LastName;
                try {

                    ret = token.createToken(
                        fn,
                        ln,
                        id
                    );

                } catch (e) {

                    ret = {"error": e.message};

                }

            } else {

                ret = {"error": "Login/Password incorrect"};

            }

            res.status(200).json(ret);

        }
    );

    app.create(
        "/api/create",
        async (req, res, next) => {
            // test api for create
            const result = await client.db("Tododb").collection("lists").insertOne(newnote);

            console.log('New note created with the following id: ${result.insertId}');

        }
    );

    app.get(
        "/api/read",
        async (req, res, next) => {
            // test api for read
        }
    );

    app.update(
        "/api/update",
        async(req, res, next) => {
            // test api for update
        }
    );
    
    app.delete(
        "/api/delete",
        async (req, res, next) => {
            // test api for delete
        }
    );
    
}

export default {setApp};
