import jwt from "jsonwebtoken";
import {config as dotenvConfig} from "dotenv";

dotenvConfig();

function createToken (fn, ln, id) {

    let ret;
    try {

        const expiration = new Date(),
            user = {"userId": id,
                "firstName": fn,
                "lastName": ln},
            accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET
            );

        /*
         * In order to exoire with a value other than the default, use the
         * following
         */
        /*
         *Const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,
         *   { expiresIn: '30m'} );
         *                 '24h'
         *                '365d'
         */
        ret = {accessToken};

    } catch (e) {

        ret = {"error": e.message};

    }
    return ret;

}
function isExpired (token) {

    const isError = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, verifiedJwt) => {

            if (err) {

                return true;

            }
            return false;

        }
    );
    return isError;

}

function refresh (token) {

    const ud = jwt.decode(
            token,
            {"complete": true}
        ),
        userId = ud.payload.id,
        {firstName} = ud.payload,
        {lastName} = ud.payload;
    return createToken(
        firstName,
        lastName,
        userId
    );

}

export default {refresh,
    isExpired,
    createToken};
