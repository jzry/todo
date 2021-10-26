import User from "./models/user.js";
import Card from "./models/card.js";
import token from "./createJWT.js";

function setApp (app, client) {

    app.post(
        "/api/addcard",
        async (req, res, next) => {

            /*
             * Incoming: userId, color
             * outgoing: error
             */

            const {userId, card, jwtToken} = req.body;
            try {

                if (token.isExpired(jwtToken)) {

                    const r = {"error": "The JWT is no longer valid",
                        "jwtToken": ""};
                    res.status(200).json(r);
                    return;

                }

            } catch (e) {

                console.log(e.message);

            }

            // Const newCard = { Card: card, UserId: userId };
            const newCard = new Card({"Card": card,
                "UserId": userId});
            let error = "";
            try {

                /*
                 * Const db = client.db();
                 * const result = db.collection('Cards').insertOne(newCard);
                 */
                newCard.save();

            } catch (e) {

                error = e.toString();

            }

            let refreshedToken = null;
            try {

                refreshedToken = token.refresh(jwtToken);

            } catch (e) {

                console.log(e.message);

            }

            const ret = {error,
                "jwtToken": refreshedToken};

            res.status(200).json(ret);

        }
    );

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

    app.post(
        "/api/searchcards",
        async (req, res, next) => {

            /*
             * Incoming: userId, search
             * outgoing: results[], error
             */

            const error = "",

                {userId, search, jwtToken} = req.body;
            try {

                if (token.isExpired(jwtToken)) {

                    const r = {"error": "The JWT is no longer valid",
                        "jwtToken": ""};
                    res.status(200).json(r);
                    return;

                }

            } catch (e) {

                console.log(e.message);

            }

            const _search = search.trim(),

                /*
                 *   Const db = client.db();
                 *   Const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();
                 */
                results = await Card.find({"Card": {"$regex": `${_search}.*`,
                    "$options": "r"}}),

                _ret = [];
            for (let i = 0; i < results.length; i++) {

                _ret.push(results[i].Card);

            }

            let refreshedToken = null;
            try {

                refreshedToken = token.refresh(jwtToken);

            } catch (e) {

                console.log(e.message);

            }

            const ret = {"results": _ret,
                error,
                "jwtToken": refreshedToken};

            res.status(200).json(ret);

        }
    );

}

export default {setApp};
